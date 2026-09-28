(() => {
  "use strict";

  // ---------- Font catalog (must mirror utils/fonts.js CSS-wise) ----------
  // Backend renders with the actual bundled .ttf files; here we just need
  // matching CSS font-family/weight so the on-screen drag preview lines up.
  const FONT_CSS = {
    "poppins-bold": { family: "'Poppins', sans-serif", weight: 700, style: "normal" },
    "poppins-regular": { family: "'Poppins', sans-serif", weight: 400, style: "normal" },
    "roboto-bold": { family: "'Roboto', sans-serif", weight: 700, style: "normal" },
    "opensans-bold": { family: "'Open Sans', sans-serif", weight: 700, style: "normal" },
    "lato-bold": { family: "'Lato', sans-serif", weight: 700, style: "normal" },
    "inter-bold": { family: "'Inter', sans-serif", weight: 700, style: "normal" },
    "nunito-bold": { family: "'Nunito', sans-serif", weight: 700, style: "normal" },
    "raleway-bold": { family: "'Raleway', sans-serif", weight: 700, style: "normal" },
    "worksans-bold": { family: "'Work Sans', sans-serif", weight: 700, style: "normal" },
    "rubik-bold": { family: "'Rubik', sans-serif", weight: 700, style: "normal" },
    "manrope-bold": { family: "'Manrope', sans-serif", weight: 700, style: "normal" },
    "dmsans-bold": { family: "'DM Sans', sans-serif", weight: 700, style: "normal" },
    "karla-bold": { family: "'Karla', sans-serif", weight: 700, style: "normal" },
    "mulish-bold": { family: "'Mulish', sans-serif", weight: 700, style: "normal" },
    "barlow-bold": { family: "'Barlow', sans-serif", weight: 700, style: "normal" },
    "sourcesans-bold": { family: "'Source Sans 3', sans-serif", weight: 700, style: "normal" },
    "notosans-bold": { family: "'Noto Sans', sans-serif", weight: 700, style: "normal" },
    "archivo-bold": { family: "'Archivo', sans-serif", weight: 700, style: "normal" },
    "outfit-bold": { family: "'Outfit', sans-serif", weight: 700, style: "normal" },
    "spacegrotesk-bold": { family: "'Space Grotesk', sans-serif", weight: 700, style: "normal" },
    "josefinsans-bold": { family: "'Josefin Sans', sans-serif", weight: 700, style: "normal" },
    "questrial": { family: "'Questrial', sans-serif", weight: 400, style: "normal" },
    "exo2-bold": { family: "'Exo 2', sans-serif", weight: 700, style: "normal" },
    "montserrat-bold": { family: "'Montserrat', sans-serif", weight: 700, style: "normal" },
    "quicksand-bold": { family: "'Quicksand', sans-serif", weight: 700, style: "normal" },
    "playfair-bold": { family: "'Playfair Display', serif", weight: 700, style: "normal" },
    "lora-bold": { family: "'Lora', serif", weight: 700, style: "normal" },
    "merriweather-bold": { family: "'Merriweather', serif", weight: 700, style: "normal" },
    "cormorant-semibold": { family: "'Cormorant Garamond', serif", weight: 600, style: "normal" },
    "ptserif-bold": { family: "'PT Serif', serif", weight: 700, style: "normal" },
    "notoserif-bold": { family: "'Noto Serif', serif", weight: 700, style: "normal" },
    "crimsontext-bold": { family: "'Crimson Text', serif", weight: 700, style: "normal" },
    "librebaskerville-bold": { family: "'Libre Baskerville', serif", weight: 700, style: "normal" },
    "ebgaramond-bold": { family: "'EB Garamond', serif", weight: 700, style: "normal" },
    "bitter-bold": { family: "'Bitter', serif", weight: 700, style: "normal" },
    "domine-bold": { family: "'Domine', serif", weight: 700, style: "normal" },
    "vollkorn-bold": { family: "'Vollkorn', serif", weight: 700, style: "normal" },
    "spectral-bold": { family: "'Spectral', serif", weight: 700, style: "normal" },
    "cardo-bold": { family: "'Cardo', serif", weight: 700, style: "normal" },
    "bebas-neue": { family: "'Bebas Neue', sans-serif", weight: 400, style: "normal" },
    "anton": { family: "'Anton', sans-serif", weight: 400, style: "normal" },
    "oswald-bold": { family: "'Oswald', sans-serif", weight: 700, style: "normal" },
    "alfaslabone": { family: "'Alfa Slab One', sans-serif", weight: 400, style: "normal" },
    "passionone-bold": { family: "'Passion One', sans-serif", weight: 700, style: "normal" },
    "fjallaone": { family: "'Fjalla One', sans-serif", weight: 400, style: "normal" },
    "righteous": { family: "'Righteous', sans-serif", weight: 400, style: "normal" },
    "bungee": { family: "'Bungee', sans-serif", weight: 400, style: "normal" },
    "abrilfatface": { family: "'Abril Fatface', serif", weight: 400, style: "normal" },
    "lobster": { family: "'Lobster', cursive", weight: 400, style: "normal" },
    "comfortaa-bold": { family: "'Comfortaa', sans-serif", weight: 700, style: "normal" },
    "baloo2-bold": { family: "'Baloo 2', sans-serif", weight: 700, style: "normal" },
    "fredoka-bold": { family: "'Fredoka', sans-serif", weight: 700, style: "normal" },
    "dancing-script": { family: "'Dancing Script', cursive", weight: 400, style: "normal" },
    "pacifico": { family: "'Pacifico', cursive", weight: 400, style: "normal" },
    "great-vibes": { family: "'Great Vibes', cursive", weight: 400, style: "normal" },
    "sacramento": { family: "'Sacramento', cursive", weight: 400, style: "normal" },
    "caveat-bold": { family: "'Caveat', cursive", weight: 700, style: "normal" },
    "satisfy": { family: "'Satisfy', cursive", weight: 400, style: "normal" },
    "kalam-bold": { family: "'Kalam', cursive", weight: 700, style: "normal" },
    "shadowsintolight": { family: "'Shadows Into Light', cursive", weight: 400, style: "normal" },
    "indieflower": { family: "'Indie Flower', cursive", weight: 400, style: "normal" },
    "amaticsc-bold": { family: "'Amatic SC', cursive", weight: 700, style: "normal" },
    "permanentmarker": { family: "'Permanent Marker', cursive", weight: 400, style: "normal" },
    "courgette": { family: "'Courgette', cursive", weight: 400, style: "normal" },
    "parisienne": { family: "'Parisienne', cursive", weight: 400, style: "normal" },
    "yellowtail": { family: "'Yellowtail', cursive", weight: 400, style: "normal" },
    "allura": { family: "'Allura', cursive", weight: 400, style: "normal" },
    "tangerine-bold": { family: "'Tangerine', cursive", weight: 700, style: "normal" },
    "homemadeapple": { family: "'Homemade Apple', cursive", weight: 400, style: "normal" },
    "marckscript": { family: "'Marck Script', cursive", weight: 400, style: "normal" },
    "pinyonscript": { family: "'Pinyon Script', cursive", weight: 400, style: "normal" },
    "playball": { family: "'Playball', cursive", weight: 400, style: "normal" },
    "cookie": { family: "'Cookie', cursive", weight: 400, style: "normal" },
    "handlee": { family: "'Handlee', cursive", weight: 400, style: "normal" },
    "patrickhand": { family: "'Patrick Hand', cursive", weight: 400, style: "normal" },
    "damion": { family: "'Damion', cursive", weight: 400, style: "normal" },
    "robotomono-bold": { family: "'Roboto Mono', monospace", weight: 700, style: "normal" },
    "spacemono-bold": { family: "'Space Mono', monospace", weight: 700, style: "normal" },
    "jetbrainsmono-bold": { family: "'JetBrains Mono', monospace", weight: 700, style: "normal" },
    "courierprime-bold": { family: "'Courier Prime', monospace", weight: 700, style: "normal" },

    // ---- More: Sans-serif ----
    "abel": { family: "'Abel', sans-serif", weight: 400, style: "normal" },
    "actor": { family: "'Actor', sans-serif", weight: 400, style: "normal" },
    "alata": { family: "'Alata', sans-serif", weight: 400, style: "normal" },
    "aldrich": { family: "'Aldrich', sans-serif", weight: 400, style: "normal" },
    "alegreyasans-bold": { family: "'Alegreya Sans', sans-serif", weight: 700, style: "normal" },
    "allerta": { family: "'Allerta', sans-serif", weight: 400, style: "normal" },
    "allertastencil": { family: "'Allerta Stencil', sans-serif", weight: 400, style: "normal" },
    "amaranth-bold": { family: "'Amaranth', sans-serif", weight: 700, style: "normal" },
    "andika-bold": { family: "'Andika', sans-serif", weight: 700, style: "normal" },
    "antic": { family: "'Antic', sans-serif", weight: 400, style: "normal" },
    "barlowcondensed-bold": { family: "'Barlow Condensed', sans-serif", weight: 700, style: "normal" },
    "barlowsemicondensed-bold": { family: "'Barlow Semi Condensed', sans-serif", weight: 700, style: "normal" },
    "bayon": { family: "'Bayon', sans-serif", weight: 400, style: "normal" },
    "bevietnampro-bold": { family: "'Be Vietnam Pro', sans-serif", weight: 700, style: "normal" },
    "cabincondensed-bold": { family: "'Cabin Condensed', sans-serif", weight: 700, style: "normal" },
    "cagliostro": { family: "'Cagliostro', sans-serif", weight: 400, style: "normal" },
    "candal": { family: "'Candal', sans-serif", weight: 400, style: "normal" },
    "cantarell-bold": { family: "'Cantarell', sans-serif", weight: 700, style: "normal" },
    "carme": { family: "'Carme', sans-serif", weight: 400, style: "normal" },
    "convergence": { family: "'Convergence', sans-serif", weight: 400, style: "normal" },
    "daysone": { family: "'Days One', sans-serif", weight: 400, style: "normal" },
    "didactgothic": { family: "'Didact Gothic', sans-serif", weight: 400, style: "normal" },
    "dorsa": { family: "'Dorsa', sans-serif", weight: 400, style: "normal" },
    "electrolize": { family: "'Electrolize', sans-serif", weight: 400, style: "normal" },
    "federo": { family: "'Federo', sans-serif", weight: 400, style: "normal" },
    "firasans-bold": { family: "'Fira Sans', sans-serif", weight: 700, style: "normal" },
    "firasanscondensed-bold": { family: "'Fira Sans Condensed', sans-serif", weight: 700, style: "normal" },
    "firasansextracondensed-bold": { family: "'Fira Sans Extra Condensed', sans-serif", weight: 700, style: "normal" },
    "francoisone": { family: "'Francois One', sans-serif", weight: 400, style: "normal" },
    "geo": { family: "'Geo', sans-serif", weight: 400, style: "normal" },
    "gfsneohellenic-bold": { family: "'GFS Neohellenic', sans-serif", weight: 700, style: "normal" },
    "gothica1-bold": { family: "'Gothic A1', sans-serif", weight: 700, style: "normal" },
    "hammersmithone": { family: "'Hammersmith One', sans-serif", weight: 400, style: "normal" },
    "hind-bold": { family: "'Hind', sans-serif", weight: 700, style: "normal" },
    "istokweb-bold": { family: "'Istok Web', sans-serif", weight: 700, style: "normal" },
    "jockeyone": { family: "'Jockey One', sans-serif", weight: 400, style: "normal" },
    "kanit-bold": { family: "'Kanit', sans-serif", weight: 700, style: "normal" },
    "livvic-bold": { family: "'Livvic', sans-serif", weight: 700, style: "normal" },
    "mako": { family: "'Mako', sans-serif", weight: 400, style: "normal" },
    "marvel-bold": { family: "'Marvel', sans-serif", weight: 700, style: "normal" },
    "metrophobic": { family: "'Metrophobic', sans-serif", weight: 400, style: "normal" },
    "michroma": { family: "'Michroma', sans-serif", weight: 400, style: "normal" },
    "molengo": { family: "'Molengo', sans-serif", weight: 400, style: "normal" },
    "moulpali": { family: "'Moulpali', sans-serif", weight: 400, style: "normal" },
    "mukta-bold": { family: "'Mukta', sans-serif", weight: 700, style: "normal" },
    "newscycle-bold": { family: "'News Cycle', sans-serif", weight: 700, style: "normal" },
    "nobile-bold": { family: "'Nobile', sans-serif", weight: 700, style: "normal" },
    "numans": { family: "'Numans', sans-serif", weight: 400, style: "normal" },
    "oxygen-bold": { family: "'Oxygen', sans-serif", weight: 700, style: "normal" },
    "paytoneone": { family: "'Paytone One', sans-serif", weight: 400, style: "normal" },
    "philosopher-bold": { family: "'Philosopher', sans-serif", weight: 700, style: "normal" },
    "play-bold": { family: "'Play', sans-serif", weight: 700, style: "normal" },
    "preahvihear": { family: "'Preahvihear', sans-serif", weight: 400, style: "normal" },
    "prompt-bold": { family: "'Prompt', sans-serif", weight: 700, style: "normal" },
    "ptsans-bold": { family: "'PT Sans', sans-serif", weight: 700, style: "normal" },
    "ptsanscaption-bold": { family: "'PT Sans Caption', sans-serif", weight: 700, style: "normal" },
    "ptsansnarrow-bold": { family: "'PT Sans Narrow', sans-serif", weight: 700, style: "normal" },
    "puritan-bold": { family: "'Puritan', sans-serif", weight: 700, style: "normal" },
    "rajdhani-bold": { family: "'Rajdhani', sans-serif", weight: 700, style: "normal" },
    "rationale": { family: "'Rationale', sans-serif", weight: 400, style: "normal" },
    "russoone": { family: "'Russo One', sans-serif", weight: 400, style: "normal" },
    "sarabun-bold": { family: "'Sarabun', sans-serif", weight: 700, style: "normal" },
    "secularone": { family: "'Secular One', sans-serif", weight: 400, style: "normal" },
    "shanti": { family: "'Shanti', sans-serif", weight: 400, style: "normal" },
    "signikanegativesc-bold": { family: "'Signika Negative SC', sans-serif", weight: 700, style: "normal" },
    "sixcaps": { family: "'Six Caps', sans-serif", weight: 400, style: "normal" },
    "snippet": { family: "'Snippet', sans-serif", weight: 400, style: "normal" },
    "spinnaker": { family: "'Spinnaker', sans-serif", weight: 400, style: "normal" },
    "tajawal-bold": { family: "'Tajawal', sans-serif", weight: 700, style: "normal" },
    "tenorsans": { family: "'Tenor Sans', sans-serif", weight: 400, style: "normal" },
    "titilliumweb-bold": { family: "'Titillium Web', sans-serif", weight: 700, style: "normal" },
    "varela": { family: "'Varela', sans-serif", weight: 400, style: "normal" },
    "varelaround": { family: "'Varela Round', sans-serif", weight: 400, style: "normal" },
    "voltaire": { family: "'Voltaire', sans-serif", weight: 400, style: "normal" },
    "wireone": { family: "'Wire One', sans-serif", weight: 400, style: "normal" },

    // ---- More: Serif ----
    "abhayalibre-bold": { family: "'Abhaya Libre', serif", weight: 700, style: "normal" },
    "alice": { family: "'Alice', serif", weight: 400, style: "normal" },
    "amiri-bold": { family: "'Amiri', serif", weight: 700, style: "normal" },
    "artifika": { family: "'Artifika', serif", weight: 400, style: "normal" },
    "arvo-bold": { family: "'Arvo', serif", weight: 700, style: "normal" },
    "bentham": { family: "'Bentham', serif", weight: 400, style: "normal" },
    "bevan": { family: "'Bevan', serif", weight: 400, style: "normal" },
    "brawler-bold": { family: "'Brawler', serif", weight: 700, style: "normal" },
    "breeserif": { family: "'Bree Serif', serif", weight: 400, style: "normal" },
    "cantataone": { family: "'Cantata One', serif", weight: 400, style: "normal" },
    "caudex-bold": { family: "'Caudex', serif", weight: 700, style: "normal" },
    "copse": { family: "'Copse', serif", weight: 400, style: "normal" },
    "cormorantsc-bold": { family: "'Cormorant SC', serif", weight: 700, style: "normal" },
    "creteround": { family: "'Crete Round', serif", weight: 400, style: "normal" },
    "dmserifdisplay": { family: "'DM Serif Display', serif", weight: 400, style: "normal" },
    "dmseriftext": { family: "'DM Serif Text', serif", weight: 400, style: "normal" },
    "gfsdidot": { family: "'GFS Didot', serif", weight: 400, style: "normal" },
    "gildadisplay": { family: "'Gilda Display', serif", weight: 400, style: "normal" },
    "goudybookletter1911": { family: "'Goudy Bookletter 1911', serif", weight: 400, style: "normal" },
    "holtwoodonesc": { family: "'Holtwood One SC', serif", weight: 400, style: "normal" },
    "ibmplexserif-bold": { family: "'IBM Plex Serif', serif", weight: 700, style: "normal" },
    "imfelldoublepica": { family: "'IM Fell Double Pica', serif", weight: 400, style: "normal" },
    "imfelldoublepicasc": { family: "'IM Fell Double Pica SC', serif", weight: 400, style: "normal" },
    "imfelldwpica": { family: "'IM Fell DW Pica', serif", weight: 400, style: "normal" },
    "imfelldwpicasc": { family: "'IM Fell DW Pica SC', serif", weight: 400, style: "normal" },
    "imfellenglish": { family: "'IM Fell English', serif", weight: 400, style: "normal" },
    "imfellenglishsc": { family: "'IM Fell English SC', serif", weight: 400, style: "normal" },
    "imfellfrenchcanon": { family: "'IM Fell French Canon', serif", weight: 400, style: "normal" },
    "imfellfrenchcanonsc": { family: "'IM Fell French Canon SC', serif", weight: 400, style: "normal" },
    "imfellgreatprimer": { family: "'IM Fell Great Primer', serif", weight: 400, style: "normal" },
    "imfellgreatprimersc": { family: "'IM Fell Great Primer SC', serif", weight: 400, style: "normal" },
    "judson-bold": { family: "'Judson', serif", weight: 700, style: "normal" },
    "lusitana-bold": { family: "'Lusitana', serif", weight: 700, style: "normal" },
    "marcellus": { family: "'Marcellus', serif", weight: 400, style: "normal" },
    "marcellussc": { family: "'Marcellus SC', serif", weight: 400, style: "normal" },
    "martel-bold": { family: "'Martel', serif", weight: 700, style: "normal" },
    "neuton-bold": { family: "'Neuton', serif", weight: 700, style: "normal" },
    "noticiatext-bold": { family: "'Noticia Text', serif", weight: 700, style: "normal" },
    "odormeanchey": { family: "'Odor Mean Chey', serif", weight: 400, style: "normal" },
    "oflsortsmillgoudytt": { family: "'OFL Sorts Mill Goudy TT', serif", weight: 400, style: "normal" },
    "oldstandardtt-bold": { family: "'Old Standard TT', serif", weight: 700, style: "normal" },
    "ovo": { family: "'Ovo', serif", weight: 400, style: "normal" },
    "playfairdisplaysc-bold": { family: "'Playfair Display SC', serif", weight: 700, style: "normal" },
    "prata": { family: "'Prata', serif", weight: 400, style: "normal" },
    "ptserifcaption": { family: "'PT Serif Caption', serif", weight: 400, style: "normal" },
    "rufina-bold": { family: "'Rufina', serif", weight: 700, style: "normal" },
    "slabo27px": { family: "'Slabo 27px', serif", weight: 400, style: "normal" },
    "sortsmillgoudy": { family: "'Sorts Mill Goudy', serif", weight: 400, style: "normal" },
    "suwannaphum-bold": { family: "'Suwannaphum', serif", weight: 700, style: "normal" },
    "thabit-bold": { family: "'Thabit', serif", weight: 700, style: "normal" },
    "tienne-bold": { family: "'Tienne', serif", weight: 700, style: "normal" },
    "tinos-bold": { family: "'Tinos', serif", weight: 700, style: "normal" },
    "trirong-bold": { family: "'Trirong', serif", weight: 700, style: "normal" },
    "unna-bold": { family: "'Unna', serif", weight: 700, style: "normal" },
    "zillaslab-bold": { family: "'Zilla Slab', serif", weight: 700, style: "normal" },

    // ---- More: Display / decorative ----
    "angkor": { family: "'Angkor', sans-serif", weight: 400, style: "normal" },
    "astloch-bold": { family: "'Astloch', sans-serif", weight: 700, style: "normal" },
    "audiowide": { family: "'Audiowide', sans-serif", weight: 400, style: "normal" },
    "bangers": { family: "'Bangers', sans-serif", weight: 400, style: "normal" },
    "battambang-bold": { family: "'Battambang', sans-serif", weight: 700, style: "normal" },
    "bigshotone": { family: "'Bigshot One', sans-serif", weight: 400, style: "normal" },
    "blackopsone": { family: "'Black Ops One', sans-serif", weight: 400, style: "normal" },
    "bokor": { family: "'Bokor', sans-serif", weight: 400, style: "normal" },
    "bowlbyone": { family: "'Bowlby One', sans-serif", weight: 400, style: "normal" },
    "buda": { family: "'Buda', sans-serif", weight: 300, style: "normal" },
    "cabinsketch-bold": { family: "'Cabin Sketch', sans-serif", weight: 700, style: "normal" },
    "carterone": { family: "'Carter One', sans-serif", weight: 400, style: "normal" },
    "changaone": { family: "'Changa One', sans-serif", weight: 400, style: "normal" },
    "coda": { family: "'Coda', sans-serif", weight: 400, style: "normal" },
    "concertone": { family: "'Concert One', sans-serif", weight: 400, style: "normal" },
    "corben-bold": { family: "'Corben', sans-serif", weight: 700, style: "normal" },
    "creepster": { family: "'Creepster', sans-serif", weight: 400, style: "normal" },
    "dangrek": { family: "'Dangrek', sans-serif", weight: 400, style: "normal" },
    "freehand": { family: "'Freehand', sans-serif", weight: 400, style: "normal" },
    "fugazone": { family: "'Fugaz One', sans-serif", weight: 400, style: "normal" },
    "gruppo": { family: "'Gruppo', sans-serif", weight: 400, style: "normal" },
    "kenia": { family: "'Kenia', sans-serif", weight: 400, style: "normal" },
    "koulen": { family: "'Koulen', sans-serif", weight: 400, style: "normal" },
    "lilitaone": { family: "'Lilita One', sans-serif", weight: 400, style: "normal" },
    "lilyscriptone": { family: "'Lily Script One', sans-serif", weight: 400, style: "normal" },
    "medievalsharp": { family: "'MedievalSharp', sans-serif", weight: 400, style: "normal" },
    "megrim": { family: "'Megrim', sans-serif", weight: 400, style: "normal" },
    "metal": { family: "'Metal', sans-serif", weight: 400, style: "normal" },
    "miltonian": { family: "'Miltonian', sans-serif", weight: 400, style: "normal" },
    "miltoniantattoo": { family: "'Miltonian Tattoo', sans-serif", weight: 400, style: "normal" },
    "monoton": { family: "'Monoton', sans-serif", weight: 400, style: "normal" },
    "moul": { family: "'Moul', sans-serif", weight: 400, style: "normal" },
    "novacut": { family: "'Nova Cut', sans-serif", weight: 400, style: "normal" },
    "novaflat": { family: "'Nova Flat', sans-serif", weight: 400, style: "normal" },
    "novaoval": { family: "'Nova Oval', sans-serif", weight: 400, style: "normal" },
    "novaround": { family: "'Nova Round', sans-serif", weight: 400, style: "normal" },
    "novascript": { family: "'Nova Script', sans-serif", weight: 400, style: "normal" },
    "novaslim": { family: "'Nova Slim', sans-serif", weight: 400, style: "normal" },
    "novasquare": { family: "'Nova Square', sans-serif", weight: 400, style: "normal" },
    "oleoscript-bold": { family: "'Oleo Script', sans-serif", weight: 700, style: "normal" },
    "patuaone": { family: "'Patua One', sans-serif", weight: 400, style: "normal" },
    "pressstart2p": { family: "'Press Start 2P', sans-serif", weight: 400, style: "normal" },
    "rammettoone": { family: "'Rammetto One', sans-serif", weight: 400, style: "normal" },
    "shrikhand": { family: "'Shrikhand', sans-serif", weight: 400, style: "normal" },
    "sigmarone": { family: "'Sigmar One', sans-serif", weight: 400, style: "normal" },
    "smythe": { family: "'Smythe', sans-serif", weight: 400, style: "normal" },
    "sniglet": { family: "'Sniglet', sans-serif", weight: 400, style: "normal" },
    "squadaone": { family: "'Squada One', sans-serif", weight: 400, style: "normal" },
    "staatliches": { family: "'Staatliches', sans-serif", weight: 400, style: "normal" },
    "taprom": { family: "'Taprom', sans-serif", weight: 400, style: "normal" },
    "titanone": { family: "'Titan One', sans-serif", weight: 400, style: "normal" },
    "unifrakturcook-bold": { family: "'UnifrakturCook', sans-serif", weight: 700, style: "normal" },
    "unifrakturmaguntia": { family: "'UnifrakturMaguntia', sans-serif", weight: 400, style: "normal" },
    "wallpoet": { family: "'Wallpoet', sans-serif", weight: 400, style: "normal" },
    "yesevaone": { family: "'Yeseva One', sans-serif", weight: 400, style: "normal" },

    // ---- More: Script / handwriting ----
    "alexbrush": { family: "'Alex Brush', cursive", weight: 400, style: "normal" },
    "annieuseyourtelescope": { family: "'Annie Use Your Telescope', cursive", weight: 400, style: "normal" },
    "architectsdaughter": { family: "'Architects Daughter', cursive", weight: 400, style: "normal" },
    "arizonia": { family: "'Arizonia', cursive", weight: 400, style: "normal" },
    "badscript": { family: "'Bad Script', cursive", weight: 400, style: "normal" },
    "berkshireswash": { family: "'Berkshire Swash', cursive", weight: 400, style: "normal" },
    "bilboswashcaps": { family: "'Bilbo Swash Caps', cursive", weight: 400, style: "normal" },
    "cedarvillecursive": { family: "'Cedarville Cursive', cursive", weight: 400, style: "normal" },
    "chilanka": { family: "'Chilanka', cursive", weight: 400, style: "normal" },
    "coveredbyyourgrace": { family: "'Covered By Your Grace', cursive", weight: 400, style: "normal" },
    "dawningofanewday": { family: "'Dawning of a New Day', cursive", weight: 400, style: "normal" },
    "delius": { family: "'Delius', cursive", weight: 400, style: "normal" },
    "deliusswashcaps": { family: "'Delius Swash Caps', cursive", weight: 400, style: "normal" },
    "gaegu-bold": { family: "'Gaegu', cursive", weight: 700, style: "normal" },
    "giveyouglory": { family: "'Give You Glory', cursive", weight: 400, style: "normal" },
    "gloriahallelujah": { family: "'Gloria Hallelujah', cursive", weight: 400, style: "normal" },
    "gochihand": { family: "'Gochi Hand', cursive", weight: 400, style: "normal" },
    "herrvonmuellerhoff": { family: "'Herr Von Muellerhoff', cursive", weight: 400, style: "normal" },
    "italianno": { family: "'Italianno', cursive", weight: 400, style: "normal" },
    "itim": { family: "'Itim', cursive", weight: 400, style: "normal" },
    "justmeagaindownhere": { family: "'Just Me Again Down Here', cursive", weight: 400, style: "normal" },
    "kaushanscript": { family: "'Kaushan Script', cursive", weight: 400, style: "normal" },
    "kristi": { family: "'Kristi', cursive", weight: 400, style: "normal" },
    "labelleaurore": { family: "'La Belle Aurore', cursive", weight: 400, style: "normal" },
    "leaguescript": { family: "'League Script', cursive", weight: 400, style: "normal" },
    "leckerlione": { family: "'Leckerli One', cursive", weight: 400, style: "normal" },
    "lovedbytheking": { family: "'Loved by the King', cursive", weight: 400, style: "normal" },
    "mali-bold": { family: "'Mali', cursive", weight: 700, style: "normal" },
    "meddon": { family: "'Meddon', cursive", weight: 400, style: "normal" },
    "mrdafoe": { family: "'Mr Dafoe', cursive", weight: 400, style: "normal" },
    "mrssaintdelafield": { family: "'Mrs Saint Delafield', cursive", weight: 400, style: "normal" },
    "neucha": { family: "'Neucha', cursive", weight: 400, style: "normal" },
    "niconne": { family: "'Niconne', cursive", weight: 400, style: "normal" },
    "norican": { family: "'Norican', cursive", weight: 400, style: "normal" },
    "nothingyoucoulddo": { family: "'Nothing You Could Do', cursive", weight: 400, style: "normal" },
    "overtherainbow": { family: "'Over the Rainbow', cursive", weight: 400, style: "normal" },
    "pangolin": { family: "'Pangolin', cursive", weight: 400, style: "normal" },
    "petitformalscript": { family: "'Petit Formal Script', cursive", weight: 400, style: "normal" },
    "reeniebeanie": { family: "'Reenie Beanie', cursive", weight: 400, style: "normal" },
    "rougescript": { family: "'Rouge Script', cursive", weight: 400, style: "normal" },
    "shortstack": { family: "'Short Stack', cursive", weight: 400, style: "normal" },
    "sofia": { family: "'Sofia', cursive", weight: 400, style: "normal" },
    "sriracha": { family: "'Sriracha', cursive", weight: 400, style: "normal" },
    "stylescript": { family: "'Style Script', cursive", weight: 400, style: "normal" },
    "sueellenfrancisco": { family: "'Sue Ellen Francisco', cursive", weight: 400, style: "normal" },
    "swankyandmoomoo": { family: "'Swanky and Moo Moo', cursive", weight: 400, style: "normal" },
    "thegirlnextdoor": { family: "'The Girl Next Door', cursive", weight: 400, style: "normal" },
    "vibur": { family: "'Vibur', cursive", weight: 400, style: "normal" },
    "waitingforthesunrise": { family: "'Waiting for the Sunrise', cursive", weight: 400, style: "normal" },
    "zeyada": { family: "'Zeyada', cursive", weight: 400, style: "normal" },

    // ---- More: Monospace ----
    "anonymouspro-bold": { family: "'Anonymous Pro', monospace", weight: 700, style: "normal" },
    "cousine-bold": { family: "'Cousine', monospace", weight: 700, style: "normal" },
    "cutivemono": { family: "'Cutive Mono', monospace", weight: 400, style: "normal" },
    "digitalnumbers": { family: "'Digital Numbers', monospace", weight: 400, style: "normal" },
    "dmmono": { family: "'DM Mono', monospace", weight: 400, style: "normal" },
    "firamono-bold": { family: "'Fira Mono', monospace", weight: 700, style: "normal" },
    "ibmplexmono-bold": { family: "'IBM Plex Mono', monospace", weight: 700, style: "normal" },
    "lekton-bold": { family: "'Lekton', monospace", weight: 700, style: "normal" },
    "majormonodisplay": { family: "'Major Mono Display', monospace", weight: 400, style: "normal" },
    "monofett": { family: "'Monofett', monospace", weight: 400, style: "normal" },
    "novamono": { family: "'Nova Mono', monospace", weight: 400, style: "normal" },
    "oxygenmono": { family: "'Oxygen Mono', monospace", weight: 400, style: "normal" },
    "ptmono": { family: "'PT Mono', monospace", weight: 400, style: "normal" },
    "sharetechmono": { family: "'Share Tech Mono', monospace", weight: 400, style: "normal" },
    "vt323": { family: "'VT323', monospace", weight: 400, style: "normal" },
  };

  const DEFAULT_CONFIG = {
    xPercent: 50,
    yPercent: 85,
    align: "middle",
    fontKey: "poppins-bold",
    fontSizePercent: 6,
    maxWidthPercent: 80,
    color: "#ffffff",
    strokeColor: "#000000",
    strokeWidthPercent: 6,
    shadow: false,
    template: "{{name}}",
    canvasWidth: null, // set per-banner in selectBanner()
    canvasHeight: null,
    fit: "cover",
    canvasBackground: "#000000",
    gradient: {
      enabled: false,
      direction: "to-bottom",
      startColor: "#000000",
      startOpacity: 0,
      endColor: "#000000",
      endOpacity: 70,
    },
    logo: {
      enabled: true,
      xPercent: 50,
      yPercent: 15,
      widthPercent: 20,
      opacity: 100,
    },
  };

  // ---------- State ----------
  let banners = [];
  let selectedBannerId = null;
  let currentBanner = null;
  let workingConfig = { ...DEFAULT_CONFIG };
  let draggingText = false;
  let draggingLogo = false;

  // ---------- Element refs ----------
  const $ = (id) => document.getElementById(id);

  const els = {
    uploadForm: $("uploadForm"),
    fileInput: $("fileInput"),
    titleInput: $("titleInput"),
    uploadBtn: $("uploadBtn"),
    uploadStatus: $("uploadStatus"),
    bannerList: $("bannerList"),

    emptyWorkspace: $("emptyWorkspace"),
    positioner: $("positioner"),
    posBannerTitle: $("posBannerTitle"),
    saveStatus: $("saveStatus"),
    deleteBannerBtn: $("deleteBannerBtn"),
    savePositionBtn: $("savePositionBtn"),

    canvasStage: $("canvasStage"),
    canvasImg: $("canvasImg"),
    guideBox: $("guideBox"),
    textHandle: $("textHandle"),
    handleText: $("handleText"),
    logoHandle: $("logoHandle"),

    templateInput: $("templateInput"),
    fontSelect: $("fontSelect"),
    alignSegmented: $("alignSegmented"),
    fontSizeRange: $("fontSizeRange"),
    fontSizeValue: $("fontSizeValue"),
    maxWidthRange: $("maxWidthRange"),
    maxWidthValue: $("maxWidthValue"),
    colorInput: $("colorInput"),
    strokeEnabled: $("strokeEnabled"),
    strokeColorInput: $("strokeColorInput"),
    strokeWidthRange: $("strokeWidthRange"),
    strokeWidthValue: $("strokeWidthValue"),
    shadowEnabled: $("shadowEnabled"),

    canvasWidthInput: $("canvasWidthInput"),
    canvasHeightInput: $("canvasHeightInput"),
    fitSegmented: $("fitSegmented"),
    canvasBackgroundGroup: $("canvasBackgroundGroup"),
    canvasBackgroundInput: $("canvasBackgroundInput"),
    resetCanvasSizeBtn: $("resetCanvasSizeBtn"),

    gradientEnabled: $("gradientEnabled"),
    gradientControlsRow: $("gradientControlsRow"),
    gradientStartRow: $("gradientStartRow"),
    gradientEndRow: $("gradientEndRow"),
    gradientDirectionSelect: $("gradientDirectionSelect"),
    gradientStartColor: $("gradientStartColor"),
    gradientStartOpacity: $("gradientStartOpacity"),
    gradientStartOpacityValue: $("gradientStartOpacityValue"),
    gradientEndColor: $("gradientEndColor"),
    gradientEndOpacity: $("gradientEndOpacity"),
    gradientEndOpacityValue: $("gradientEndOpacityValue"),

    logoUploadGroup: $("logoUploadGroup"),
    logoFileInput: $("logoFileInput"),
    logoUploadLabel: $("logoUploadLabel"),
    logoControlsRow: $("logoControlsRow"),
    logoWidthRange: $("logoWidthRange"),
    logoWidthValue: $("logoWidthValue"),
    logoOpacityRange: $("logoOpacityRange"),
    logoOpacityValue: $("logoOpacityValue"),
    logoActionsRow: $("logoActionsRow"),
    logoEnabled: $("logoEnabled"),
    removeLogoBtn: $("removeLogoBtn"),
    logoDragHint: $("logoDragHint"),

    customerLinkHint: $("customerLinkHint"),
    customerLinkResult: $("customerLinkResult"),
    customerLinkUrl: $("customerLinkUrl"),
    copyCustomerLinkBtn: $("copyCustomerLinkBtn"),
    openCustomerLinkBtn: $("openCustomerLinkBtn"),
    customerLinkNote: $("customerLinkNote"),

    toast: $("toast"),
  };

  // ---------- Toast ----------
  let toastTimer = null;
  function showToast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("is-visible"), 2400);
  }

  // ---------- API helpers ----------
  async function api(path, options = {}) {
    const res = await fetch(path, {
      headers: options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : undefined,
      ...options,
    });
    let data = null;
    try { data = await res.json(); } catch { /* no body */ }
    if (!res.ok) throw new Error((data && data.error) || `Request failed (${res.status})`);
    return data;
  }

  // ---------- Upload ----------
  els.fileInput.addEventListener("change", () => {
    const label = els.uploadForm.querySelector(".upload-drop-label");
    label.textContent = els.fileInput.files[0]?.name || "Drop an image or click to choose";
  });

  els.uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!els.fileInput.files[0]) return;

    const fd = new FormData();
    fd.append("image", els.fileInput.files[0]);
    fd.append("title", els.titleInput.value);

    els.uploadBtn.disabled = true;
    setStatus(els.uploadStatus, "Uploading…", null);

    try {
      const banner = await api("/api/banners", { method: "POST", body: fd });
      setStatus(els.uploadStatus, "Uploaded!", "ok");
      els.uploadForm.reset();
      els.uploadForm.querySelector(".upload-drop-label").textContent = "Drop an image or click to choose";
      await loadBanners();
      selectBanner(banner.id);
    } catch (err) {
      setStatus(els.uploadStatus, err.message, "error");
    } finally {
      els.uploadBtn.disabled = false;
    }
  });

  function setStatus(el, msg, kind) {
    el.textContent = msg || "";
    el.classList.remove("is-error", "is-ok");
    if (kind === "error") el.classList.add("is-error");
    if (kind === "ok") el.classList.add("is-ok");
  }

  // ---------- Banner library ----------
  async function loadBanners() {
    banners = await api("/api/banners");
    renderBannerList();
  }

  function renderBannerList() {
    if (!banners.length) {
      els.bannerList.innerHTML = `<p class="empty-hint">No banners yet — upload one above to get started.</p>`;
      return;
    }
    els.bannerList.innerHTML = "";
    banners.forEach((b) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "banner-card" + (b.id === selectedBannerId ? " is-selected" : "");
      card.innerHTML = `
        <img src="${b.previewUrl}" alt="" />
        <div class="banner-card-meta">
          <strong>${escapeHtml(b.title)}</strong>
          <span>${b.width}×${b.height}</span>
          <span class="badge ${b.config ? "badge-ok" : "badge-todo"}">${b.config ? "Positioned" : "Needs position"}</span>
        </div>`;
      card.addEventListener("click", () => selectBanner(b.id));
      els.bannerList.appendChild(card);
    });
  }

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  // ---------- Positioner ----------
  function selectBanner(id) {
    selectedBannerId = id;
    const banner = banners.find((b) => b.id === id);
    if (!banner) return;
    currentBanner = banner;

    renderBannerList();

    els.emptyWorkspace.hidden = true;
    els.positioner.hidden = false;
    els.posBannerTitle.textContent = banner.title;
    els.canvasImg.src = banner.previewUrl;

    const saved = banner.config || {};
    workingConfig = {
      ...DEFAULT_CONFIG,
      canvasWidth: banner.width,
      canvasHeight: banner.height,
      ...saved,
      gradient: { ...DEFAULT_CONFIG.gradient, ...(saved.gradient || {}) },
      logo: { ...DEFAULT_CONFIG.logo, ...(saved.logo || {}) },
    };
    applyConfigToControls();
    updateCanvasStageFrame();
    updateLogoUploadUI();

    // Wait for the image to have real layout size before drawing the handle.
    if (els.canvasImg.complete) {
      updateHandlePosition();
      updateLogoHandlePosition();
    } else {
      els.canvasImg.onload = () => {
        updateHandlePosition();
        updateLogoHandlePosition();
      };
    }

    setStatus(els.saveStatus, "", null);

    updateCustomerLink(banner);
  }

  function updateCustomerLink(banner) {
    if (banner.config) {
      const url = `${window.location.origin}/customer/${banner.id}`;
      els.customerLinkUrl.value = url;
      els.customerLinkResult.hidden = false;
      els.customerLinkNote.hidden = false;
      els.customerLinkHint.hidden = true;
      els.openCustomerLinkBtn.href = url;
    } else {
      els.customerLinkResult.hidden = true;
      els.customerLinkNote.hidden = true;
      els.customerLinkHint.hidden = false;
      els.customerLinkHint.textContent = "Save the position above to activate the customer link.";
    }
  }

  // The stage represents the CONFIGURED canvas (which can differ from the
  // original image's own dimensions), so its aspect ratio and the image's
  // object-fit are driven by workingConfig, not the image's intrinsic size.
  function updateCanvasStageFrame() {
    const w = workingConfig.canvasWidth || 1;
    const h = workingConfig.canvasHeight || 1;
    els.canvasStage.style.aspectRatio = `${w} / ${h}`;
    els.canvasImg.style.objectFit = workingConfig.fit === "fill" ? "fill" : workingConfig.fit;
    els.canvasStage.style.backgroundColor = workingConfig.fit === "contain" ? workingConfig.canvasBackground : "";
  }

  function updateLogoUploadUI() {
    const hasLogo = !!(currentBanner && currentBanner.logoUrl);
    els.logoControlsRow.hidden = !hasLogo;
    els.logoActionsRow.hidden = !hasLogo;
    els.logoDragHint.hidden = !hasLogo;
    els.logoUploadLabel.textContent = hasLogo ? "Replace logo or sticker" : "Upload a logo or sticker";
    if (hasLogo) {
      els.logoWidthRange.value = workingConfig.logo.widthPercent;
      els.logoWidthValue.textContent = `${workingConfig.logo.widthPercent}%`;
      els.logoOpacityRange.value = workingConfig.logo.opacity;
      els.logoOpacityValue.textContent = `${workingConfig.logo.opacity}%`;
      els.logoEnabled.checked = workingConfig.logo.enabled;
    }
  }

  function applyConfigToControls() {
    els.templateInput.value = workingConfig.template;
    els.fontSelect.value = workingConfig.fontKey;
    els.fontSizeRange.value = workingConfig.fontSizePercent;
    els.fontSizeValue.textContent = `${workingConfig.fontSizePercent}%`;
    els.maxWidthRange.value = workingConfig.maxWidthPercent;
    els.maxWidthValue.textContent = `${workingConfig.maxWidthPercent}%`;
    els.colorInput.value = workingConfig.color;
    els.strokeEnabled.checked = !!workingConfig.strokeColor;
    els.strokeColorInput.value = workingConfig.strokeColor || "#000000";
    els.strokeColorInput.disabled = !els.strokeEnabled.checked;
    els.strokeWidthRange.value = workingConfig.strokeWidthPercent;
    els.strokeWidthValue.textContent = `${workingConfig.strokeWidthPercent}%`;
    els.shadowEnabled.checked = !!workingConfig.shadow;

    els.alignSegmented.querySelectorAll("button").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.align === workingConfig.align);
    });

    // Canvas size
    els.canvasWidthInput.value = workingConfig.canvasWidth;
    els.canvasHeightInput.value = workingConfig.canvasHeight;
    els.fitSegmented.querySelectorAll("button").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.fit === workingConfig.fit);
    });
    els.canvasBackgroundGroup.hidden = workingConfig.fit !== "contain";
    els.canvasBackgroundInput.value = workingConfig.canvasBackground;

    // Gradient
    els.gradientEnabled.checked = workingConfig.gradient.enabled;
    const gHidden = !workingConfig.gradient.enabled;
    els.gradientControlsRow.hidden = gHidden;
    els.gradientStartRow.hidden = gHidden;
    els.gradientEndRow.hidden = gHidden;
    els.gradientDirectionSelect.value = workingConfig.gradient.direction;
    els.gradientStartColor.value = workingConfig.gradient.startColor;
    els.gradientStartOpacity.value = workingConfig.gradient.startOpacity;
    els.gradientStartOpacityValue.textContent = `${workingConfig.gradient.startOpacity}%`;
    els.gradientEndColor.value = workingConfig.gradient.endColor;
    els.gradientEndOpacity.value = workingConfig.gradient.endOpacity;
    els.gradientEndOpacityValue.textContent = `${workingConfig.gradient.endOpacity}%`;
  }

  function updateHandlePosition() {
    const stageW = els.canvasStage.clientWidth;
    const stageH = els.canvasStage.clientHeight;
    if (!stageW || !stageH) return;

    const xPx = (workingConfig.xPercent / 100) * stageW;
    const yPx = (workingConfig.yPercent / 100) * stageH;

    els.textHandle.style.left = `${xPx}px`;
    els.textHandle.style.top = `${yPx}px`;

    const fontDef = FONT_CSS[workingConfig.fontKey] || FONT_CSS["poppins-bold"];
    const fontSizePx = (workingConfig.fontSizePercent / 100) * stageW;
    const strokeWidthPx = workingConfig.strokeColor
      ? Math.max(0, (workingConfig.strokeWidthPercent / 100) * fontSizePx)
      : 0;

    const sampleName = "Your Name";
    const text = (workingConfig.template || "{{name}}").replace(/\{\{\s*name\s*\}\}/gi, sampleName);

    // xPercent marks the CENTER of a fixed-width box (width =
    // maxWidthPercent) that stays put regardless of alignment — matches
    // utils/render.js exactly, so this preview matches the real output.
    // Alignment only decides where text sits *inside* that unmoving box,
    // rather than flipping the text to the opposite side of the canvas.
    const maxWidthPx = (workingConfig.maxWidthPercent / 100) * stageW;
    let textX = xPx;
    if (workingConfig.align === "start") textX = xPx - maxWidthPx / 2;
    else if (workingConfig.align === "end") textX = xPx + maxWidthPx / 2;

    els.handleText.textContent = text;
    els.handleText.style.left = `${textX}px`;
    els.handleText.style.top = `${yPx}px`;
    els.handleText.style.fontFamily = fontDef.family;
    els.handleText.style.fontWeight = fontDef.weight;
    els.handleText.style.fontStyle = fontDef.style;
    els.handleText.style.fontSize = `${fontSizePx}px`;
    els.handleText.style.color = workingConfig.color;
    els.handleText.style.webkitTextStroke = strokeWidthPx > 0 ? `${strokeWidthPx}px ${workingConfig.strokeColor}` : "0px transparent";
    els.handleText.style.textShadow = workingConfig.shadow ? "0 2px 6px rgba(0,0,0,0.5)" : "none";

    const xOffset = workingConfig.align === "start" ? "0%" : workingConfig.align === "end" ? "-100%" : "-50%";
    els.handleText.style.transform = `translate(${xOffset}, -50%)`;
    els.handleText.style.textAlign = workingConfig.align === "start" ? "left" : workingConfig.align === "end" ? "right" : "center";

    // Guide box = the max-width wrap boundary. Always centered on the drag
    // anchor (xPx) now, regardless of alignment, since the box itself no
    // longer moves when alignment changes — only the text within it does.
    const boxHeight = fontSizePx * 1.6;
    const boxLeft = xPx - maxWidthPx / 2;

    els.guideBox.style.left = `${boxLeft}px`;
    els.guideBox.style.top = `${yPx - boxHeight / 2}px`;
    els.guideBox.style.width = `${maxWidthPx}px`;
    els.guideBox.style.height = `${boxHeight}px`;
  }

  function updateLogoHandlePosition() {
    const hasLogo = !!(currentBanner && currentBanner.logoUrl);
    if (!hasLogo || !workingConfig.logo.enabled) {
      els.logoHandle.hidden = true;
      return;
    }
    const stageW = els.canvasStage.clientWidth;
    const stageH = els.canvasStage.clientHeight;
    if (!stageW || !stageH) return;

    els.logoHandle.hidden = false;
    els.logoHandle.src = currentBanner.logoUrl;

    const xPx = (workingConfig.logo.xPercent / 100) * stageW;
    const yPx = (workingConfig.logo.yPercent / 100) * stageH;
    const widthPx = (workingConfig.logo.widthPercent / 100) * stageW;
    const ratio = (currentBanner.logoHeight || 1) / (currentBanner.logoWidth || 1);
    const heightPx = widthPx * ratio;

    els.logoHandle.style.left = `${xPx}px`;
    els.logoHandle.style.top = `${yPx}px`;
    els.logoHandle.style.width = `${widthPx}px`;
    els.logoHandle.style.height = `${heightPx}px`;
    els.logoHandle.style.opacity = (workingConfig.logo.opacity ?? 100) / 100;
  }

  window.addEventListener("resize", () => {
    if (!els.positioner.hidden) {
      updateHandlePosition();
      updateLogoHandlePosition();
    }
  });

  // ---------- Dragging ----------
  function pointFromEvent(evt) {
    const rect = els.canvasStage.getBoundingClientRect();
    const point = evt.touches ? evt.touches[0] : evt;
    const x = ((point.clientX - rect.left) / rect.width) * 100;
    const y = ((point.clientY - rect.top) / rect.height) * 100;
    return { x: clamp(x, 0, 100), y: clamp(y, 0, 100) };
  }

  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

  function startDrag(evt) {
    draggingText = true;
    evt.preventDefault();
    moveDrag(evt);
  }

  function moveDrag(evt) {
    if (!draggingText) return;
    const { x, y } = pointFromEvent(evt);
    workingConfig.xPercent = Math.round(x * 10) / 10;
    workingConfig.yPercent = Math.round(y * 10) / 10;
    updateHandlePosition();
    setStatus(els.saveStatus, "Unsaved position", null);
  }

  function endDrag() { draggingText = false; }

  els.textHandle.addEventListener("mousedown", startDrag);
  window.addEventListener("mousemove", moveDrag);
  window.addEventListener("mouseup", endDrag);

  els.textHandle.addEventListener("touchstart", startDrag, { passive: false });
  window.addEventListener("touchmove", moveDrag, { passive: false });
  window.addEventListener("touchend", endDrag);

  // Keyboard nudging for accessibility
  els.textHandle.addEventListener("keydown", (evt) => {
    const step = evt.shiftKey ? 5 : 1;
    let moved = true;
    if (evt.key === "ArrowLeft") workingConfig.xPercent = clamp(workingConfig.xPercent - step, 0, 100);
    else if (evt.key === "ArrowRight") workingConfig.xPercent = clamp(workingConfig.xPercent + step, 0, 100);
    else if (evt.key === "ArrowUp") workingConfig.yPercent = clamp(workingConfig.yPercent - step, 0, 100);
    else if (evt.key === "ArrowDown") workingConfig.yPercent = clamp(workingConfig.yPercent + step, 0, 100);
    else moved = false;
    if (moved) {
      evt.preventDefault();
      updateHandlePosition();
      setStatus(els.saveStatus, "Unsaved position", null);
    }
  });

  // ---------- Logo dragging ----------
  function startLogoDrag(evt) {
    draggingLogo = true;
    evt.preventDefault();
    moveLogoDrag(evt);
  }

  function moveLogoDrag(evt) {
    if (!draggingLogo) return;
    const { x, y } = pointFromEvent(evt);
    workingConfig.logo.xPercent = Math.round(x * 10) / 10;
    workingConfig.logo.yPercent = Math.round(y * 10) / 10;
    updateLogoHandlePosition();
    setStatus(els.saveStatus, "Unsaved position", null);
  }

  function endLogoDrag() { draggingLogo = false; }

  els.logoHandle.addEventListener("mousedown", startLogoDrag);
  window.addEventListener("mousemove", moveLogoDrag);
  window.addEventListener("mouseup", endLogoDrag);

  els.logoHandle.addEventListener("touchstart", startLogoDrag, { passive: false });
  window.addEventListener("touchmove", moveLogoDrag, { passive: false });
  window.addEventListener("touchend", endLogoDrag);

  els.logoHandle.addEventListener("keydown", (evt) => {
    const step = evt.shiftKey ? 5 : 1;
    let moved = true;
    if (evt.key === "ArrowLeft") workingConfig.logo.xPercent = clamp(workingConfig.logo.xPercent - step, 0, 100);
    else if (evt.key === "ArrowRight") workingConfig.logo.xPercent = clamp(workingConfig.logo.xPercent + step, 0, 100);
    else if (evt.key === "ArrowUp") workingConfig.logo.yPercent = clamp(workingConfig.logo.yPercent - step, 0, 100);
    else if (evt.key === "ArrowDown") workingConfig.logo.yPercent = clamp(workingConfig.logo.yPercent + step, 0, 100);
    else moved = false;
    if (moved) {
      evt.preventDefault();
      updateLogoHandlePosition();
      setStatus(els.saveStatus, "Unsaved position", null);
    }
  });

  // ---------- Control bindings ----------
  els.templateInput.addEventListener("input", () => { workingConfig.template = els.templateInput.value; updateHandlePosition(); markUnsaved(); });
  els.fontSelect.addEventListener("change", () => { workingConfig.fontKey = els.fontSelect.value; updateHandlePosition(); markUnsaved(); });

  els.alignSegmented.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    workingConfig.align = btn.dataset.align;
    els.alignSegmented.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b === btn));
    updateHandlePosition();
    markUnsaved();
  });

  els.fontSizeRange.addEventListener("input", () => {
    workingConfig.fontSizePercent = Number(els.fontSizeRange.value);
    els.fontSizeValue.textContent = `${workingConfig.fontSizePercent}%`;
    updateHandlePosition();
    markUnsaved();
  });

  els.maxWidthRange.addEventListener("input", () => {
    workingConfig.maxWidthPercent = Number(els.maxWidthRange.value);
    els.maxWidthValue.textContent = `${workingConfig.maxWidthPercent}%`;
    updateHandlePosition();
    markUnsaved();
  });

  els.colorInput.addEventListener("input", () => { workingConfig.color = els.colorInput.value; updateHandlePosition(); markUnsaved(); });

  els.strokeEnabled.addEventListener("change", () => {
    els.strokeColorInput.disabled = !els.strokeEnabled.checked;
    workingConfig.strokeColor = els.strokeEnabled.checked ? els.strokeColorInput.value : null;
    updateHandlePosition();
    markUnsaved();
  });

  els.strokeColorInput.addEventListener("input", () => {
    workingConfig.strokeColor = els.strokeColorInput.value;
    updateHandlePosition();
    markUnsaved();
  });

  els.strokeWidthRange.addEventListener("input", () => {
    workingConfig.strokeWidthPercent = Number(els.strokeWidthRange.value);
    els.strokeWidthValue.textContent = `${workingConfig.strokeWidthPercent}%`;
    updateHandlePosition();
    markUnsaved();
  });

  els.shadowEnabled.addEventListener("change", () => {
    workingConfig.shadow = els.shadowEnabled.checked;
    updateHandlePosition();
    markUnsaved();
  });

  // ---------- Canvas size controls ----------
  els.canvasWidthInput.addEventListener("change", () => {
    const v = clampInt(els.canvasWidthInput.value, 100, 4000, currentBanner.width);
    workingConfig.canvasWidth = v;
    els.canvasWidthInput.value = v;
    updateCanvasStageFrame();
    updateHandlePosition();
    updateLogoHandlePosition();
    markUnsaved();
  });

  els.canvasHeightInput.addEventListener("change", () => {
    const v = clampInt(els.canvasHeightInput.value, 100, 4000, currentBanner.height);
    workingConfig.canvasHeight = v;
    els.canvasHeightInput.value = v;
    updateCanvasStageFrame();
    updateHandlePosition();
    updateLogoHandlePosition();
    markUnsaved();
  });

  els.fitSegmented.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    workingConfig.fit = btn.dataset.fit;
    els.fitSegmented.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b === btn));
    els.canvasBackgroundGroup.hidden = workingConfig.fit !== "contain";
    updateCanvasStageFrame();
    markUnsaved();
  });

  els.canvasBackgroundInput.addEventListener("input", () => {
    workingConfig.canvasBackground = els.canvasBackgroundInput.value;
    updateCanvasStageFrame();
    markUnsaved();
  });

  els.resetCanvasSizeBtn.addEventListener("click", () => {
    if (!currentBanner) return;
    workingConfig.canvasWidth = currentBanner.width;
    workingConfig.canvasHeight = currentBanner.height;
    els.canvasWidthInput.value = currentBanner.width;
    els.canvasHeightInput.value = currentBanner.height;
    updateCanvasStageFrame();
    updateHandlePosition();
    updateLogoHandlePosition();
    markUnsaved();
  });

  function clampInt(val, min, max, fallback) {
    const n = parseInt(val, 10);
    if (!Number.isFinite(n)) return fallback;
    return Math.min(max, Math.max(min, n));
  }

  // ---------- Gradient controls ----------
  els.gradientEnabled.addEventListener("change", () => {
    workingConfig.gradient.enabled = els.gradientEnabled.checked;
    const hidden = !workingConfig.gradient.enabled;
    els.gradientControlsRow.hidden = hidden;
    els.gradientStartRow.hidden = hidden;
    els.gradientEndRow.hidden = hidden;
    markUnsaved();
  });

  els.gradientDirectionSelect.addEventListener("change", () => {
    workingConfig.gradient.direction = els.gradientDirectionSelect.value;
    markUnsaved();
  });

  els.gradientStartColor.addEventListener("input", () => {
    workingConfig.gradient.startColor = els.gradientStartColor.value;
    markUnsaved();
  });

  els.gradientStartOpacity.addEventListener("input", () => {
    workingConfig.gradient.startOpacity = Number(els.gradientStartOpacity.value);
    els.gradientStartOpacityValue.textContent = `${workingConfig.gradient.startOpacity}%`;
    markUnsaved();
  });

  els.gradientEndColor.addEventListener("input", () => {
    workingConfig.gradient.endColor = els.gradientEndColor.value;
    markUnsaved();
  });

  els.gradientEndOpacity.addEventListener("input", () => {
    workingConfig.gradient.endOpacity = Number(els.gradientEndOpacity.value);
    els.gradientEndOpacityValue.textContent = `${workingConfig.gradient.endOpacity}%`;
    markUnsaved();
  });

  // ---------- Logo controls ----------
  els.logoFileInput.addEventListener("change", async () => {
    const file = els.logoFileInput.files[0];
    if (!file || !selectedBannerId) return;

    const fd = new FormData();
    fd.append("logo", file);

    els.logoUploadLabel.textContent = "Uploading…";
    try {
      const updated = await api(`/api/banners/${selectedBannerId}/logo`, { method: "POST", body: fd });
      currentBanner = updated;
      const idx = banners.findIndex((b) => b.id === selectedBannerId);
      if (idx !== -1) banners[idx] = updated;
      updateLogoUploadUI();
      updateLogoHandlePosition();
      showToast("Logo uploaded");
    } catch (err) {
      showToast(err.message);
      els.logoUploadLabel.textContent = currentBanner && currentBanner.logoUrl ? "Replace logo or sticker" : "Upload a logo or sticker";
    } finally {
      els.logoFileInput.value = "";
    }
  });

  els.logoWidthRange.addEventListener("input", () => {
    workingConfig.logo.widthPercent = Number(els.logoWidthRange.value);
    els.logoWidthValue.textContent = `${workingConfig.logo.widthPercent}%`;
    updateLogoHandlePosition();
    markUnsaved();
  });

  els.logoOpacityRange.addEventListener("input", () => {
    workingConfig.logo.opacity = Number(els.logoOpacityRange.value);
    els.logoOpacityValue.textContent = `${workingConfig.logo.opacity}%`;
    updateLogoHandlePosition();
    markUnsaved();
  });

  els.logoEnabled.addEventListener("change", () => {
    workingConfig.logo.enabled = els.logoEnabled.checked;
    updateLogoHandlePosition();
    markUnsaved();
  });

  els.removeLogoBtn.addEventListener("click", async () => {
    if (!selectedBannerId) return;
    if (!confirm("Remove the logo from this banner?")) return;
    try {
      const updated = await api(`/api/banners/${selectedBannerId}/logo`, { method: "DELETE" });
      currentBanner = updated;
      const idx = banners.findIndex((b) => b.id === selectedBannerId);
      if (idx !== -1) banners[idx] = updated;
      updateLogoUploadUI();
      updateLogoHandlePosition();
      showToast("Logo removed");
    } catch (err) {
      showToast(err.message);
    }
  });

  function markUnsaved() { setStatus(els.saveStatus, "Unsaved changes", null); }

  // ---------- Save position ----------
  els.savePositionBtn.addEventListener("click", async () => {
    if (!selectedBannerId) return;
    els.savePositionBtn.disabled = true;
    setStatus(els.saveStatus, "Saving…", null);
    try {
      const updated = await api(`/api/banners/${selectedBannerId}/config`, {
        method: "PUT",
        body: JSON.stringify(workingConfig),
      });
      currentBanner = updated;
      const idx = banners.findIndex((b) => b.id === selectedBannerId);
      if (idx !== -1) banners[idx] = updated;
      renderBannerList();
      setStatus(els.saveStatus, "Saved", "ok");
      updateCustomerLink(updated);
      showToast("Position saved");
    } catch (err) {
      setStatus(els.saveStatus, err.message, "error");
    } finally {
      els.savePositionBtn.disabled = false;
    }
  });

  // ---------- Delete banner ----------
  els.deleteBannerBtn.addEventListener("click", async () => {
    if (!selectedBannerId) return;
    if (!confirm("Delete this banner and every link generated from it? This can't be undone.")) return;
    try {
      await api(`/api/banners/${selectedBannerId}`, { method: "DELETE" });
      selectedBannerId = null;
      els.positioner.hidden = true;
      els.emptyWorkspace.hidden = false;
      await loadBanners();
      showToast("Banner deleted");
    } catch (err) {
      showToast(err.message);
    }
  });

  // ---------- Customer link actions ----------
  els.copyCustomerLinkBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(els.customerLinkUrl.value);
      showToast("Link copied");
    } catch {
      els.customerLinkUrl.select();
      document.execCommand("copy");
      showToast("Link copied");
    }
  });

  els.openCustomerLinkBtn.addEventListener("click", (e) => {
    if (!els.customerLinkUrl.value) e.preventDefault();
  });

  // ---------- Init ----------
  async function init() {
    const fonts = await api("/api/fonts");
    els.fontSelect.innerHTML = fonts.map((f) => `<option value="${f.key}">${escapeHtml(f.label)}</option>`).join("");
    await loadBanners();
  }

  init().catch((err) => showToast(err.message));
})();
