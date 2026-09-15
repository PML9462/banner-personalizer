# Banner Studio

Upload a banner image, drag-and-drop to place where a name should appear, and
generate a personalized shareable link for each recipient — e.g. upload one
"Happy Diwali" banner and generate a different link for every name, each one
showing that person's name baked into the image.

No login/authentication (by design, per the brief). No database — everything
is stored as JSON files under `data/` and images under `uploads/`.

## How it works

1. **Admin uploads a banner** (`/admin`) — a PNG/JPG/WEBP image.
2. **Admin positions the name** by dragging a marker directly on the image —
   choosing font, size, color, outline, alignment, and a text template like
   `Happy Diwali, {{name}}!`. This is saved once per banner.
3. **Admin generates a link** by typing a name and clicking "Generate link".
   Each link gets a short, random ID (e.g. `/card/QJFleIc7`) — the name is
   *not* stored in the URL, so it isn't guessable/editable by the recipient.
4. **Anyone who opens the link** (any browser, any device, no login) sees the
   banner with that name composited into the image, at the exact position
   configured in step 2.

The image itself is generated server-side (not just overlaid with CSS), so
right-click → save/download always gives a real, flattened image — not a
webpage with floating text.

### Long names auto-fit

The rendering engine measures the actual pixel width of the name text (using
the real bundled font file) and shrinks the font size automatically if the
name would overflow the "max width" boundary you set while positioning. Short
names keep their designed size; long names shrink just enough to fit.

### Fully responsive

Both the admin panel and the public card page adapt across phones, tablets,
laptops, and desktops — no horizontal scrolling, touch-friendly drag targets
on the positioning canvas (bigger hit area on touchscreens), stacked layouts
on narrow screens, and a scrollable links table on mobile.

### Celebration animation on the card page

When someone opens a personalized link, gently falling flower petals drift
down the page and a few fluttering butterflies cross the screen — pure
CSS/SVG animation (transform + opacity only, so it stays smooth), with the
number of petals/butterflies scaled down automatically on smaller screens.
It respects `prefers-reduced-motion` (the animation is skipped entirely for
anyone with that OS/browser setting) and pauses automatically when the
browser tab isn't visible, so it doesn't burn battery in the background.

### Fonts

Six curated, open-license (OFL) fonts are bundled directly in
`assets/fonts/` — Poppins, Playfair Display, Lora, Dancing Script, and
Pacifico — so rendering looks identical wherever you run this, regardless of
what fonts happen to be installed on the host. Names in other scripts (e.g.
Hindi/Devanagari) automatically fall back to a system font that supports
those characters.

## Tech stack

- **Node.js + Express** — server and API
- **Sharp** (libvips) — image compositing; renders an SVG text layer onto the
  banner
- **fontkit** — measures real font-file text width for the auto-fit sizing
- **Multer** — handles image uploads
- **JSON files** (`data/banners.json`, `data/links.json`) — storage, no DB
- **Vanilla HTML/CSS/JS** — admin panel and public card page (no build step)

## Project structure

```
banner-personalizer/
├── server.js              # Entry point
├── routes/
│   ├── banners.js         # Upload, list, position-config, delete
│   └── links.js           # Generate/list/delete links + the render endpoint
├── utils/
│   ├── db.js               # Tiny JSON-file "database" helper
│   ├── fonts.js             # Font catalog
│   ├── render.js            # Sharp/SVG compositing + auto-fit sizing
│   └── sanitize.js          # Plain-text input cleanup
├── assets/fonts/            # Bundled .ttf font files
├── public/
│   ├── admin.html/.css/.js  # Admin panel (upload, position, generate, links)
│   └── view.html/.css/.js   # Public /card/:id page
├── data/
│   ├── banners.json         # Banner records (created at first run)
│   └── links.json           # Link records (created at first run)
└── uploads/
    ├── banners/              # Original uploaded images
    └── rendered/              # Cached, name-composited output images
```

## Running it

Requires Node.js 18+.

```bash
cd banner-personalizer
npm install
npm start
```

Then open **http://localhost:3000/admin** in your browser.

The server prints the URLs it's serving on startup. To use a different port:

```bash
PORT=4000 npm start
```

### Step by step: creating your first personalized banner

1. Go to `http://localhost:3000/admin`.
2. Under **Library**, click the upload box, choose your banner image (e.g. a
   Happy Diwali graphic), give it a title, and click **Upload banner**.
3. The banner appears in the library and opens in the workspace. Drag the
   small marigold dot on the image to where you want the name to sit
   (usually near the bottom). Adjust:
   - **Text template** — e.g. `Happy Diwali, {{name}}!` (the `{{name}}`
     placeholder gets replaced with whatever name each link uses)
   - **Font**, **alignment**, **font size**, **max width** (how wide the text
     can get before it starts auto-shrinking)
   - **Text color**, **outline**, **drop shadow**
4. Click **Save position**.
5. Under **Generate a link**, type a name (e.g. `Kamlesh`) and click
   **Generate link**. You'll get a URL like
   `http://localhost:3000/card/QJFleIc7` plus a live preview.
6. Copy that link and open it in another browser/device/incognito window —
   it shows the banner with that name rendered in. Generate as many links as
   you like, one per name — they all reuse the same uploaded banner and
   position.
7. The **Generated links** tab lists every link you've created, with quick
   open/delete actions.

### Deploying it (so links work for other people, not just localhost)

Right now links look like `http://localhost:3000/card/...`, which only
works on your own machine. To share real links:

- Deploy this app to any Node-capable host (a VPS, Render, Railway, Fly.io,
  etc.) and make sure `uploads/` and `data/` are on **persistent** storage
  (not wiped on redeploy) — a plain VPS with a persistent disk is the
  simplest option, since some platforms reset the filesystem on every
  deploy.
- Set the `PORT` environment variable if your host requires a specific port.
- Put it behind a domain/HTTPS (e.g. via Nginx + Let's Encrypt, or your
  host's built-in HTTPS) — the app itself doesn't handle TLS.
- The generated links automatically use whatever host/protocol the request
  came in on, so once it's live at your real domain, newly generated links
  will use that domain automatically.

### A note on "no authentication"

As requested, `/admin` has no login — anyone who can reach that URL can
upload banners and generate/delete links. That's fine for local/internal use
or a trusted network. If you ever deploy this somewhere public, consider
putting the `/admin` route behind a simple reverse-proxy password (e.g.
Nginx `auth_basic`) rather than opening it to the whole internet — that
requires no code changes here, just a proxy config.

## Notes on file-based storage

- `data/banners.json` and `data/links.json` are written atomically (write to
  a temp file, then rename) to avoid corruption from concurrent writes.
- Rendered images are cached to `uploads/rendered/<linkId>.jpg|png` the first
  time a link is opened, so repeat visits are instant. If you edit a
  banner's position/style after links already exist, those links' cached
  renders are automatically cleared so they regenerate with the new look.
- Deleting a banner cascades: it also deletes every link generated from it
  and their cached renders.
- This is intentionally simple (no DB) per the brief. If you outgrow it
  (thousands of banners/links, need search, multiple admins, etc.), the
  `utils/db.js` module is the one place you'd swap for a real database.
# banner-personalizer
