const express = require("express");
const fs = require("fs");
const { nanoid } = require("nanoid");

const db = require("../utils/db");
const sanitize = require("../utils/sanitize");
const { renderBanner, renderedFilePath, clearRenderedCache } = require("../utils/render");

const router = express.Router();

function baseUrl(req) {
  return `${req.protocol}://${req.get("host")}`;
}

function toPublicLink(link, banner, req) {
  return {
    id: link.id,
    name: link.name,
    bannerId: link.bannerId,
    bannerTitle: banner ? banner.originalName : "(deleted banner)",
    bannerThumb: banner ? `/uploads/banners/${banner.filename}` : null,
    createdAt: link.createdAt,
    url: `${baseUrl(req)}/card/${link.id}`,
    renderUrl: `${baseUrl(req)}/api/render/${link.id}`,
  };
}

// POST /api/links - generate a new personalized link for a banner + name
router.post("/", express.json(), async (req, res) => {
  const bannerId = typeof req.body?.bannerId === "string" ? req.body.bannerId : "";
  const name = sanitize(req.body?.name, 60);

  if (!bannerId) return res.status(400).json({ error: "bannerId is required." });
  if (!name) return res.status(400).json({ error: "A name is required." });

  const banner = db.readJSON("banners").find((b) => b.id === bannerId);
  if (!banner) return res.status(404).json({ error: "Banner not found." });
  if (!banner.config) {
    return res.status(400).json({
      error: "Set the name position on this banner first (Position tab) before generating links.",
    });
  }

  const link = {
    id: nanoid(8),
    bannerId,
    name,
    createdAt: new Date().toISOString(),
  };

  await db.update("links", (list) => {
    list.unshift(link);
    return list;
  });

  res.status(201).json(toPublicLink(link, banner, req));
});

// GET /api/links - list all generated links (most recent first)
router.get("/", (req, res) => {
  const banners = db.readJSON("banners");
  const links = db.readJSON("links");
  const result = links.map((l) => toPublicLink(l, banners.find((b) => b.id === l.bannerId), req));
  res.json(result);
});

// GET /api/links/:id - single link + its banner's dimensions (used by the public view page)
router.get("/:id", (req, res) => {
  const link = db.readJSON("links").find((l) => l.id === req.params.id);
  if (!link) return res.status(404).json({ error: "This link doesn't exist (or was deleted)." });
  const banner = db.readJSON("banners").find((b) => b.id === link.bannerId);
  if (!banner) return res.status(404).json({ error: "The banner behind this link was deleted." });

  res.json({
    ...toPublicLink(link, banner, req),
    width: banner.width,
    height: banner.height,
  });
});

// DELETE /api/links/:id
router.delete("/:id", async (req, res) => {
  let removed = null;
  await db.update("links", (list) => {
    const idx = list.findIndex((l) => l.id === req.params.id);
    if (idx === -1) return list;
    removed = list[idx];
    list.splice(idx, 1);
    return list;
  });
  if (!removed) return res.status(404).json({ error: "Link not found." });
  clearRenderedCache(removed.id);
  res.json({ success: true });
});

// --- Rendering endpoint (mounted separately in server.js at /api/render) ---
async function renderHandler(req, res) {
  const link = db.readJSON("links").find((l) => l.id === req.params.id);
  if (!link) return res.status(404).send("Link not found.");
  const banner = db.readJSON("banners").find((b) => b.id === link.bannerId);
  if (!banner) return res.status(404).send("Banner behind this link was deleted.");

  try {
    const ext = banner.ext === "png" ? "png" : "jpg";
    const cachedPath = renderedFilePath(link.id, ext);

    if (!fs.existsSync(cachedPath)) {
      await renderBanner(banner, link.name, link.id);
    }

    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.sendFile(cachedPath);
  } catch (err) {
    console.error("Render failed:", err);
    res.status(500).send("Could not render this banner.");
  }
}

module.exports = router;
module.exports.renderHandler = renderHandler;
