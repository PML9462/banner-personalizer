const path = require("path");

const FONT_DIR = path.join(__dirname, "..", "assets", "fonts");

function f(file) {
  return path.join(FONT_DIR, file);
}

// A large, curated library of bundled, open-license (OFL/Apache) fonts —
// not literally every Google Font (1,800+ families would be gigabytes and
// an unusable dropdown), but a wide, organized spread across every major
// style so there's a good fit for almost any banner. Bundling the actual
// .ttf files (instead of relying on whatever happens to be installed on
// the host) means banners render identically on every machine this app
// runs on. Add more here any time — just drop the .ttf into assets/fonts
// and add an entry below.
const FONTS = {
  // ---------------- Sans-serif (clean / modern) ----------------
  "poppins-bold": { label: "Poppins Bold (modern, bold)", family: "Poppins", weight: "bold", style: "normal", file: f("Poppins-Bold.ttf") },
  "poppins-regular": { label: "Poppins Regular (clean, modern)", family: "Poppins", weight: "normal", style: "normal", file: f("Poppins-Regular.ttf") },
  "roboto-bold": { label: "Roboto Bold (Google's workhorse sans)", family: "Roboto", weight: "bold", style: "normal", file: f("Roboto.ttf") },
  "opensans-bold": { label: "Open Sans Bold (friendly, readable)", family: "Open Sans", weight: "bold", style: "normal", file: f("OpenSans-Bold.ttf") },
  "lato-bold": { label: "Lato Bold (warm, humanist)", family: "Lato", weight: "bold", style: "normal", file: f("Lato-Bold.ttf") },
  "inter-bold": { label: "Inter Bold (crisp, UI-native)", family: "Inter", weight: "bold", style: "normal", file: f("Inter.ttf") },
  "nunito-bold": { label: "Nunito Bold (soft, rounded)", family: "Nunito", weight: "bold", style: "normal", file: f("Nunito.ttf") },
  "raleway-bold": { label: "Raleway Bold (elegant sans)", family: "Raleway", weight: "bold", style: "normal", file: f("Raleway.ttf") },
  "worksans-bold": { label: "Work Sans Bold (grotesque, versatile)", family: "Work Sans", weight: "bold", style: "normal", file: f("WorkSans.ttf") },
  "rubik-bold": { label: "Rubik Bold (rounded corners)", family: "Rubik", weight: "bold", style: "normal", file: f("Rubik.ttf") },
  "manrope-bold": { label: "Manrope Bold (modern geometric)", family: "Manrope", weight: "bold", style: "normal", file: f("Manrope.ttf") },
  "dmsans-bold": { label: "DM Sans Bold (low-contrast geometric)", family: "DM Sans", weight: "bold", style: "normal", file: f("DMSans.ttf") },
  "karla-bold": { label: "Karla Bold (grotesque, friendly)", family: "Karla", weight: "bold", style: "normal", file: f("Karla.ttf") },
  "mulish-bold": { label: "Mulish Bold (minimalist sans)", family: "Mulish", weight: "bold", style: "normal", file: f("Mulish.ttf") },
  "barlow-bold": { label: "Barlow Bold (slightly condensed)", family: "Barlow", weight: "bold", style: "normal", file: f("Barlow.ttf") },
  "sourcesans-bold": { label: "Source Sans Bold (Adobe's UI sans)", family: "Source Sans 3", weight: "bold", style: "normal", file: f("SourceSans3.ttf") },
  "notosans-bold": { label: "Noto Sans Bold (broad language support)", family: "Noto Sans", weight: "bold", style: "normal", file: f("NotoSans.ttf") },
  "archivo-bold": { label: "Archivo Bold (grotesque, sturdy)", family: "Archivo", weight: "bold", style: "normal", file: f("Archivo.ttf") },
  "outfit-bold": { label: "Outfit Bold (contemporary geometric)", family: "Outfit", weight: "bold", style: "normal", file: f("Outfit.ttf") },
  "spacegrotesk-bold": { label: "Space Grotesk Bold (techy, proportional)", family: "Space Grotesk", weight: "bold", style: "normal", file: f("SpaceGrotesk.ttf") },
  "josefinsans-bold": { label: "Josefin Sans Bold (geometric, vintage)", family: "Josefin Sans", weight: "bold", style: "normal", file: f("JosefinSans.ttf") },
  questrial: { label: "Questrial (light geometric)", family: "Questrial", weight: "normal", style: "normal", file: f("Questrial-Regular.ttf") },
  "exo2-bold": { label: "Exo 2 Bold (futuristic geometric)", family: "Exo 2", weight: "bold", style: "normal", file: f("Exo2.ttf") },
  "montserrat-bold": { label: "Montserrat Bold (modern geometric)", family: "Montserrat", weight: "bold", style: "normal", file: f("Montserrat.ttf") },
  "quicksand-bold": { label: "Quicksand Bold (friendly, rounded)", family: "Quicksand", weight: "bold", style: "normal", file: f("Quicksand.ttf") },

  // ---------------- Serif (elegant / editorial) ----------------
  "playfair-bold": { label: "Playfair Display (elegant serif)", family: "Playfair Display", weight: "bold", style: "normal", file: f("PlayfairDisplay.ttf") },
  "lora-bold": { label: "Lora Bold (classic serif)", family: "Lora", weight: "bold", style: "normal", file: f("Lora.ttf") },
  "merriweather-bold": { label: "Merriweather Bold (readable serif)", family: "Merriweather", weight: "bold", style: "normal", file: f("Merriweather.ttf") },
  "cormorant-semibold": { label: "Cormorant Garamond (refined, elegant)", family: "Cormorant Garamond", weight: "600", style: "normal", file: f("CormorantGaramond.ttf") },
  "ptserif-bold": { label: "PT Serif Bold (transitional serif)", family: "PT Serif", weight: "bold", style: "normal", file: f("PTSerif-Bold.ttf") },
  "notoserif-bold": { label: "Noto Serif Bold (broad language support)", family: "Noto Serif", weight: "bold", style: "normal", file: f("NotoSerif.ttf") },
  "crimsontext-bold": { label: "Crimson Text Bold (book-style serif)", family: "Crimson Text", weight: "bold", style: "normal", file: f("CrimsonText-Bold.ttf") },
  "librebaskerville-bold": { label: "Libre Baskerville Bold (classic book serif)", family: "Libre Baskerville", weight: "bold", style: "normal", file: f("LibreBaskerville.ttf") },
  "ebgaramond-bold": { label: "EB Garamond Bold (timeless Garamond)", family: "EB Garamond", weight: "bold", style: "normal", file: f("EBGaramond.ttf") },
  "bitter-bold": { label: "Bitter Bold (slab serif)", family: "Bitter", weight: "bold", style: "normal", file: f("Bitter.ttf") },
  "domine-bold": { label: "Domine Bold (sturdy serif)", family: "Domine", weight: "bold", style: "normal", file: f("Domine.ttf") },
  "vollkorn-bold": { label: "Vollkorn Bold (warm text serif)", family: "Vollkorn", weight: "bold", style: "normal", file: f("Vollkorn.ttf") },
  "spectral-bold": { label: "Spectral Bold (crisp editorial serif)", family: "Spectral", weight: "bold", style: "normal", file: f("Spectral-Bold.ttf") },
  "cardo-bold": { label: "Cardo Bold (classical serif)", family: "Cardo", weight: "bold", style: "normal", file: f("Cardo-Bold.ttf") },

  // ---------------- Display / decorative (posters, headlines) ----------------
  "bebas-neue": { label: "Bebas Neue (tall poster display)", family: "Bebas Neue", weight: "normal", style: "normal", file: f("BebasNeue-Regular.ttf") },
  anton: { label: "Anton (ultra-bold condensed)", family: "Anton", weight: "normal", style: "normal", file: f("Anton-Regular.ttf") },
  "oswald-bold": { label: "Oswald Bold (condensed, sturdy)", family: "Oswald", weight: "bold", style: "normal", file: f("Oswald.ttf") },
  alfaslabone: { label: "Alfa Slab One (chunky slab)", family: "Alfa Slab One", weight: "normal", style: "normal", file: f("AlfaSlabOne-Regular.ttf") },
  "passionone-bold": { label: "Passion One Bold (rounded impact)", family: "Passion One", weight: "bold", style: "normal", file: f("PassionOne-Bold.ttf") },
  fjallaone: { label: "Fjalla One (compact display)", family: "Fjalla One", weight: "normal", style: "normal", file: f("FjallaOne-Regular.ttf") },
  righteous: { label: "Righteous (rounded, retro-futuristic)", family: "Righteous", weight: "normal", style: "normal", file: f("Righteous-Regular.ttf") },
  bungee: { label: "Bungee (bold urban display)", family: "Bungee", weight: "normal", style: "normal", file: f("Bungee-Regular.ttf") },
  abrilfatface: { label: "Abril Fatface (high-contrast display serif)", family: "Abril Fatface", weight: "normal", style: "normal", file: f("AbrilFatface-Regular.ttf") },
  lobster: { label: "Lobster (bold retro script)", family: "Lobster", weight: "normal", style: "normal", file: f("Lobster-Regular.ttf") },
  "comfortaa-bold": { label: "Comfortaa Bold (rounded geometric)", family: "Comfortaa", weight: "bold", style: "normal", file: f("Comfortaa.ttf") },
  "baloo2-bold": { label: "Baloo 2 Bold (playful rounded)", family: "Baloo 2", weight: "bold", style: "normal", file: f("Baloo2.ttf") },
  "fredoka-bold": { label: "Fredoka Bold (bubbly, friendly)", family: "Fredoka", weight: "bold", style: "normal", file: f("Fredoka.ttf") },

  // ---------------- Script / handwriting (festive, personal) ----------------
  "dancing-script": { label: "Dancing Script (festive cursive)", family: "Dancing Script", weight: "normal", style: "normal", file: f("DancingScript.ttf") },
  pacifico: { label: "Pacifico (fun script)", family: "Pacifico", weight: "normal", style: "normal", file: f("Pacifico-Regular.ttf") },
  "great-vibes": { label: "Great Vibes (elegant signature script)", family: "Great Vibes", weight: "normal", style: "normal", file: f("GreatVibes-Regular.ttf") },
  sacramento: { label: "Sacramento (delicate script)", family: "Sacramento", weight: "normal", style: "normal", file: f("Sacramento-Regular.ttf") },
  "caveat-bold": { label: "Caveat (handwritten, bold)", family: "Caveat", weight: "bold", style: "normal", file: f("Caveat.ttf") },
  satisfy: { label: "Satisfy (casual brush script)", family: "Satisfy", weight: "normal", style: "normal", file: f("Satisfy-Regular.ttf") },
  "kalam-bold": { label: "Kalam Bold (handwritten, warm)", family: "Kalam", weight: "bold", style: "normal", file: f("Kalam-Bold.ttf") },
  shadowsintolight: { label: "Shadows Into Light (light handwriting)", family: "Shadows Into Light", weight: "normal", style: "normal", file: f("ShadowsIntoLight.ttf") },
  indieflower: { label: "Indie Flower (bubbly handwriting)", family: "Indie Flower", weight: "normal", style: "normal", file: f("IndieFlower-Regular.ttf") },
  "amaticsc-bold": { label: "Amatic SC Bold (tall, hand-drawn)", family: "Amatic SC", weight: "bold", style: "normal", file: f("AmaticSC-Bold.ttf") },
  permanentmarker: { label: "Permanent Marker (thick marker pen)", family: "Permanent Marker", weight: "normal", style: "normal", file: f("PermanentMarker-Regular.ttf") },
  courgette: { label: "Courgette (smooth casual script)", family: "Courgette", weight: "normal", style: "normal", file: f("Courgette-Regular.ttf") },
  parisienne: { label: "Parisienne (flowing French script)", family: "Parisienne", weight: "normal", style: "normal", file: f("Parisienne-Regular.ttf") },
  yellowtail: { label: "Yellowtail (bold brush script)", family: "Yellowtail", weight: "normal", style: "normal", file: f("Yellowtail-Regular.ttf") },
  allura: { label: "Allura (delicate calligraphy)", family: "Allura", weight: "normal", style: "normal", file: f("Allura-Regular.ttf") },
  "tangerine-bold": { label: "Tangerine Bold (classic calligraphy)", family: "Tangerine", weight: "bold", style: "normal", file: f("Tangerine-Bold.ttf") },
  homemadeapple: { label: "Homemade Apple (natural handwriting)", family: "Homemade Apple", weight: "normal", style: "normal", file: f("HomemadeApple-Regular.ttf") },
  marckscript: { label: "Marck Script (warm cursive)", family: "Marck Script", weight: "normal", style: "normal", file: f("MarckScript-Regular.ttf") },
  pinyonscript: { label: "Pinyon Script (formal invitation script)", family: "Pinyon Script", weight: "normal", style: "normal", file: f("PinyonScript-Regular.ttf") },
  playball: { label: "Playball (bold single-stroke script)", family: "Playball", weight: "normal", style: "normal", file: f("Playball-Regular.ttf") },
  cookie: { label: "Cookie (playful brush script)", family: "Cookie", weight: "normal", style: "normal", file: f("Cookie-Regular.ttf") },
  handlee: { label: "Handlee (casual handwriting)", family: "Handlee", weight: "normal", style: "normal", file: f("Handlee-Regular.ttf") },
  patrickhand: { label: "Patrick Hand (neat handwriting)", family: "Patrick Hand", weight: "normal", style: "normal", file: f("PatrickHand-Regular.ttf") },
  damion: { label: "Damion (elegant brush script)", family: "Damion", weight: "normal", style: "normal", file: f("DamionRegular.ttf") },

  // ---------------- Monospace (technical, retro-typewriter) ----------------
  "robotomono-bold": { label: "Roboto Mono Bold (clean monospace)", family: "Roboto Mono", weight: "bold", style: "normal", file: f("RobotoMono.ttf") },
  "spacemono-bold": { label: "Space Mono Bold (retro-futuristic mono)", family: "Space Mono", weight: "bold", style: "normal", file: f("SpaceMono-Bold.ttf") },
  "jetbrainsmono-bold": { label: "JetBrains Mono Bold (developer mono)", family: "JetBrains Mono", weight: "bold", style: "normal", file: f("JetBrainsMono.ttf") },
  "courierprime-bold": { label: "Courier Prime Bold (typewriter)", family: "Courier Prime", weight: "bold", style: "normal", file: f("CourierPrime-Bold.ttf") },
};

const DEFAULT_FONT_KEY = "poppins-bold";

function getFont(key) {
  return FONTS[key] || FONTS[DEFAULT_FONT_KEY];
}

function listFonts() {
  return Object.entries(FONTS).map(([key, font]) => ({
    key,
    label: font.label,
    family: font.family,
    weight: font.weight,
    style: font.style,
  }));
}

module.exports = { FONTS, DEFAULT_FONT_KEY, getFont, listFonts, FONT_DIR };
