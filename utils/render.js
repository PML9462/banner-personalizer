const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const fontkit = require("fontkit");
const { getFont } = require("./fonts");

const RENDERED_DIR = path.join(__dirname, "..", "uploads", "rendered");
fs.mkdirSync(RENDERED_DIR, { recursive: true });

// Cache opened fontkit font objects so we don't re-parse the .ttf file
// on every single render request.
const fontCache = new Map();
function loadFontkitFont(filePath) {
  if (!fontCache.has(filePath)) {
    fontCache.set(filePath, fontkit.openSync(filePath));
  }
  return fontCache.get(filePath);
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Measures how wide `text` would render at `fontSizePx` using the actual
// font file, so we can shrink long names to fit instead of letting them
// overflow the banner.
function measureTextWidthPx(text, fontFilePath, fontSizePx) {
  try {
    const font = loadFontkitFont(fontFilePath);
    const run = font.layout(text);
    return (run.advanceWidth / font.unitsPerEm) * fontSizePx;
  } catch (err) {
    // Fall back to a rough estimate if measurement fails for any reason
    // (e.g. unusual glyphs) rather than breaking the render.
    return text.length * fontSizePx * 0.6;
  }
}

function applyTemplate(template, name) {
  const safeTemplate = template && template.trim() ? template : "{{name}}";
  return safeTemplate.replace(/\{\{\s*name\s*\}\}/gi, name);
}

function renderedFilePath(linkId, ext) {
  return path.join(RENDERED_DIR, `${linkId}.${ext}`);
}

/**
 * Composite a name (via a text template) onto a banner image, auto-fitting
 * the font size so it never overflows the configured max width.
 *
 * @param {object} banner - banner record from banners.json (must have config)
 * @param {string} name - raw name supplied via the link
 * @returns {Promise<string>} absolute path to the rendered image file on disk
 */
async function renderBanner(banner, name, linkId) {
  if (!banner.config) {
    throw new Error("This banner has no text position configured yet.");
  }
  const cfg = banner.config;
  const { width, height } = banner;

  const text = applyTemplate(cfg.template, name);
  const fontDef = getFont(cfg.fontKey);

  const basePx = (percent) => (percent / 100) * width;

  let fontSizePx = Math.max(6, basePx(cfg.fontSizePercent ?? 6));
  const maxWidthPx = Math.max(10, basePx(cfg.maxWidthPercent ?? 80));

  const measured = measureTextWidthPx(text, fontDef.file, fontSizePx);
  if (measured > maxWidthPx) {
    const scale = maxWidthPx / measured;
    fontSizePx = Math.max(8, fontSizePx * scale);
  }

  const xPx = basePx(cfg.xPercent ?? 50);
  const yPx = (cfg.yPercent ?? 85) / 100 * height;
  const strokeWidthPx = cfg.strokeColor
    ? Math.max(0, (cfg.strokeWidthPercent ?? 6) / 100 * fontSizePx)
    : 0;

  const anchor = ["start", "middle", "end"].includes(cfg.align)
    ? cfg.align
    : "middle";

  const shadowFilter = cfg.shadow
    ? `<filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
         <feDropShadow dx="0" dy="${Math.max(1, fontSizePx * 0.04)}" stdDeviation="${Math.max(1, fontSizePx * 0.05)}" flood-color="#000000" flood-opacity="0.45"/>
       </filter>`
    : "";

  const textAttrs = [
    `x="${xPx.toFixed(2)}"`,
    `y="${yPx.toFixed(2)}"`,
    `text-anchor="${anchor}"`,
    `dominant-baseline="middle"`,
    `font-family="${escapeXml(fontDef.family)}"`,
    `font-weight="${fontDef.weight}"`,
    `font-style="${fontDef.style}"`,
    `font-size="${fontSizePx.toFixed(2)}"`,
    `fill="${escapeXml(cfg.color || "#ffffff")}"`,
    `paint-order="stroke fill"`,
    strokeWidthPx > 0 ? `stroke="${escapeXml(cfg.strokeColor)}"` : "",
    strokeWidthPx > 0 ? `stroke-width="${strokeWidthPx.toFixed(2)}"` : "",
    strokeWidthPx > 0 ? `stroke-linejoin="round"` : "",
    cfg.shadow ? `filter="url(#textShadow)"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>${shadowFilter}</defs>
    <text ${textAttrs}>${escapeXml(text)}</text>
  </svg>`;

  const outExt = banner.ext === "png" ? "png" : "jpg";
  const outPath = renderedFilePath(linkId, outExt);

  let pipeline = sharp(banner.filePath).composite([
    { input: Buffer.from(svg), top: 0, left: 0 },
  ]);

  pipeline =
    outExt === "png"
      ? pipeline.png({ quality: 92 })
      : pipeline.jpeg({ quality: 92 });

  await pipeline.toFile(outPath);
  return outPath;
}

function clearRenderedCache(linkId) {
  for (const ext of ["png", "jpg"]) {
    const p = renderedFilePath(linkId, ext);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
}

module.exports = {
  renderBanner,
  renderedFilePath,
  clearRenderedCache,
  applyTemplate,
  measureTextWidthPx,
};
