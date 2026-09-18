const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const crypto = require("crypto");
const sanitize = require("../utils/sanitize");

const db = require("../utils/db");
const { renderBanner, renderedFilePath, clearRenderedCache, clearPreviewCache } = require("../utils/render");

const router = express.Router();

const BANNERS_DIR = path.join(__dirname, "..", "uploads", "banners");
fs.mkdirSync(BANNERS_DIR, { recursive: true });

const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "image/webp"]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, BANNERS_DIR),
  filename: (req, file, cb) => {
    const id = crypto.randomBytes(8).toString("hex");
    const ext = file.mimetype === "image/png" ? "png" : "jpg";
    cb(null, `${id}.${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error("Only PNG, JPG, or WEBP images are allowed."));
    }
    cb(null, true);
  },
});

// POST /api/banners - upload a new banner image
router.post("/", (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "No image uploaded." });

    try {
      const meta = await sharp(req.file.path).metadata();
      const ext = req.file.filename.endsWith(".png") ? "png" : "jpg";

      const banner = {
        id: path.parse(req.file.filename).name,
        filename: req.file.filename,
        filePath: req.file.path,
        ext,
        originalName: sanitize(req.body.title || req.file.originalname || "Untitled banner"),
        width: meta.width,
        height: meta.height,
        uploadedAt: new Date().toISOString(),
        config: null,
      };

      await db.update("banners", (list) => {
        list.unshift(banner);
        return list;
      });

      res.status(201).json(toPublicBanner(banner));
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to process uploaded image." });
    }
  });
});

// GET /api/banners - list all banners
router.get("/", (req, res) => {
  const banners = db.readJSON("banners").map(toPublicBanner);
  res.json(banners);
});

// GET /api/banners/:id - single banner
router.get("/:id", (req, res) => {
  const banner = db.readJSON("banners").find((b) => b.id === req.params.id);
  if (!banner) return res.status(404).json({ error: "Banner not found." });
  res.json(toPublicBanner(banner));
});

// PUT /api/banners/:id/config - save text placement/style config
router.put("/:id/config", express.json(), async (req, res) => {
  const {
    xPercent,
    yPercent,
    align,
    fontKey,
    fontSizePercent,
    maxWidthPercent,
    color,
    strokeColor,
    strokeWidthPercent,
    shadow,
    template,
  } = req.body || {};

  if (
    typeof xPercent !== "number" ||
    typeof yPercent !== "number" ||
    xPercent < 0 ||
    xPercent > 100 ||
    yPercent < 0 ||
    yPercent > 100
  ) {
    return res.status(400).json({ error: "xPercent/yPercent must be numbers between 0 and 100." });
  }

  const config = {
    xPercent,
    yPercent,
    align: ["start", "middle", "end"].includes(align) ? align : "middle",
    fontKey: typeof fontKey === "string" ? fontKey : "poppins-bold",
    fontSizePercent: clampNum(fontSizePercent, 1, 40, 6),
    maxWidthPercent: clampNum(maxWidthPercent, 5, 100, 80),
    color: /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color || "") ? color : "#ffffff",
    strokeColor:
      strokeColor && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(strokeColor) ? strokeColor : null,
    strokeWidthPercent: clampNum(strokeWidthPercent, 0, 30, 6),
    shadow: !!shadow,
    template: typeof template === "string" && template.trim() ? template.slice(0, 200) : "{{name}}",
  };

  let updatedBanner = null;
  await db.update("banners", (list) => {
    const idx = list.findIndex((b) => b.id === req.params.id);
    if (idx === -1) return list;
    list[idx] = { ...list[idx], config };
    updatedBanner = list[idx];
    return list;
  });

  if (!updatedBanner) return res.status(404).json({ error: "Banner not found." });

  // Any links (legacy) or customer-portal previews generated against this
  // banner are now stale (position/style changed) - drop their cached
  // renders so they regenerate on next view.
  const links = db.readJSON("links").filter((l) => l.bannerId === req.params.id);
  links.forEach((l) => clearRenderedCache(l.id));
  clearPreviewCache(req.params.id);

  res.json(toPublicBanner(updatedBanner));
});

// DELETE /api/banners/:id
router.delete("/:id", async (req, res) => {
  let removed = null;
  await db.update("banners", (list) => {
    const idx = list.findIndex((b) => b.id === req.params.id);
    if (idx === -1) return list;
    removed = list[idx];
    list.splice(idx, 1);
    return list;
  });

  if (!removed) return res.status(404).json({ error: "Banner not found." });

  if (fs.existsSync(removed.filePath)) fs.unlinkSync(removed.filePath);

  // Cascade: remove links + cached renders that pointed at this banner
  const links = db.readJSON("links");
  const staleLinks = links.filter((l) => l.bannerId === req.params.id);
  staleLinks.forEach((l) => clearRenderedCache(l.id));
  await db.update("links", (list) => list.filter((l) => l.bannerId !== req.params.id));
  clearPreviewCache(req.params.id);

  res.json({ success: true });
});

function clampNum(val, min, max, fallback) {
  const n = typeof val === "number" && !Number.isNaN(val) ? val : fallback;
  return Math.min(max, Math.max(min, n));
}

function toPublicBanner(b) {
  return {
    id: b.id,
    title: b.originalName,
    width: b.width,
    height: b.height,
    uploadedAt: b.uploadedAt,
    config: b.config,
    previewUrl: `/uploads/banners/${b.filename}`,
  };
}

// --- Customer-portal rendering (mounted separately in server.js at
// GET /api/banners/:id/render) ---
// Unlike the legacy per-link renderer, there's no pre-created record here:
// the customer types a name directly on the /customer/:id page, so the
// cache key is derived from the name itself (hashed, so odd characters in
// a name can't affect the filename).
function previewCacheKey(bannerId, name) {
  const hash = crypto.createHash("sha1").update(name).digest("hex").slice(0, 16);
  return `preview_${bannerId}_${hash}`;
}

async function renderPreviewHandler(req, res) {
  const banner = db.readJSON("banners").find((b) => b.id === req.params.id);
  if (!banner) return res.status(404).send("Banner not found.");
  if (!banner.config) return res.status(400).send("This banner isn't set up yet.");

  const name = sanitize(req.query.name, 60);
  if (!name) return res.status(400).send("A name is required.");

  try {
    const ext = banner.ext === "png" ? "png" : "jpg";
    const cacheKey = previewCacheKey(banner.id, name);
    const cachedPath = renderedFilePath(cacheKey, ext);

    if (!fs.existsSync(cachedPath)) {
      await renderBanner(banner, name, cacheKey);
    }

    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.sendFile(cachedPath);
  } catch (err) {
    console.error("Preview render failed:", err);
    res.status(500).send("Could not render this banner.");
  }
}

module.exports = router;
module.exports.renderPreviewHandler = renderPreviewHandler;
