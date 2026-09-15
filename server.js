const fs = require("fs");
const path = require("path");

// --- Configure a private fontconfig BEFORE sharp is ever required. ---
// This makes the bundled fonts in assets/fonts (Poppins, Dancing Script,
// Pacifico, etc.) available for name-overlay text rendering, regardless
// of what fonts happen to be installed on the host machine.
const FONT_DIR = path.join(__dirname, "assets", "fonts");
const FC_CACHE_DIR = path.join(__dirname, ".fontconfig-cache");
const FC_CONF_PATH = path.join(__dirname, ".fontconfig", "fonts.conf");
fs.mkdirSync(path.dirname(FC_CONF_PATH), { recursive: true });
fs.mkdirSync(FC_CACHE_DIR, { recursive: true });
fs.writeFileSync(
  FC_CONF_PATH,
  `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${FONT_DIR}</dir>
  <dir>/usr/share/fonts</dir>
  <cachedir>${FC_CACHE_DIR}</cachedir>
  <include ignore_missing="yes">/etc/fonts/conf.d</include>
</fontconfig>
`
);
process.env.FONTCONFIG_FILE = FC_CONF_PATH;

// --- Now safe to load everything else ---
const express = require("express");
const cors = require("cors");

const bannersRouter = require("./routes/banners");
const linksRouter = require("./routes/links");
const { listFonts } = require("./utils/fonts");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Static assets: admin panel, public card page, and uploaded/rendered images
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads/banners", express.static(path.join(__dirname, "uploads", "banners")));

// --- API ---
app.get("/api/fonts", (req, res) => res.json(listFonts()));
app.use("/api/banners", bannersRouter);
app.use("/api/links", linksRouter);
app.get("/api/render/:id", linksRouter.renderHandler);

// --- Public shareable card page: /card/:linkId ---
// Same static HTML for every link; the page itself fetches
// /api/links/:id and /api/render/:id client-side based on the URL.
app.get("/card/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "view.html"));
});

// --- Admin panel ---
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.get("/", (req, res) => res.redirect("/admin"));

// Basic JSON error handler (e.g. multer file-size errors bubble up here too)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Something went wrong." });
});

app.listen(PORT, () => {
  console.log(`\n  Banner Personalizer running:`);
  console.log(`  Admin panel:  http://localhost:${PORT}/admin`);
  console.log(`  API base:     http://localhost:${PORT}/api\n`);
});
