const path = require("path");

const FONT_DIR = path.join(__dirname, "..", "assets", "fonts");

// Curated set of bundled, open-license (OFL) fonts. Bundling the actual
// .ttf files (instead of relying on whatever happens to be installed on
// the host) means banners render identically on every machine this app
// runs on. Add more here any time — just drop the .ttf into assets/fonts
// and add an entry below.
const FONTS = {
  "poppins-bold": {
    label: "Poppins Bold (modern, bold)",
    family: "Poppins",
    weight: "bold",
    style: "normal",
    file: path.join(FONT_DIR, "Poppins-Bold.ttf"),
  },
  "poppins-regular": {
    label: "Poppins Regular (clean, modern)",
    family: "Poppins",
    weight: "normal",
    style: "normal",
    file: path.join(FONT_DIR, "Poppins-Regular.ttf"),
  },
  "playfair-bold": {
    label: "Playfair Display (elegant serif)",
    family: "Playfair Display",
    weight: "bold",
    style: "normal",
    file: path.join(FONT_DIR, "PlayfairDisplay.ttf"),
  },
  "lora-bold": {
    label: "Lora Bold (classic serif)",
    family: "Lora",
    weight: "bold",
    style: "normal",
    file: path.join(FONT_DIR, "Lora.ttf"),
  },
  "dancing-script": {
    label: "Dancing Script (festive cursive)",
    family: "Dancing Script",
    weight: "normal",
    style: "normal",
    file: path.join(FONT_DIR, "DancingScript.ttf"),
  },
  pacifico: {
    label: "Pacifico (fun script)",
    family: "Pacifico",
    weight: "normal",
    style: "normal",
    file: path.join(FONT_DIR, "Pacifico-Regular.ttf"),
  },
};

const DEFAULT_FONT_KEY = "poppins-bold";

function getFont(key) {
  return FONTS[key] || FONTS[DEFAULT_FONT_KEY];
}

function listFonts() {
  return Object.entries(FONTS).map(([key, f]) => ({
    key,
    label: f.label,
    family: f.family,
    weight: f.weight,
    style: f.style,
  }));
}

module.exports = { FONTS, DEFAULT_FONT_KEY, getFont, listFonts, FONT_DIR };
