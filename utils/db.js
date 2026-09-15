const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");

// Extremely small "queue" to avoid two writes to the same file racing
// each other and corrupting the JSON. Good enough for a low-traffic
// internal admin tool with file-based storage (no real DB).
const writeQueues = {};

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

function readJSON(name) {
  const p = filePath(name);
  if (!fs.existsSync(p)) return [];
  const raw = fs.readFileSync(p, "utf-8").trim();
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to parse ${p}, returning empty array.`, err);
    return [];
  }
}

function writeJSON(name, data) {
  const p = filePath(name);
  const tmp = `${p}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tmp, p); // atomic-ish replace
}

// Runs `mutator(currentArray) => newArray` safely, one at a time per file.
function update(name, mutator) {
  const prev = writeQueues[name] || Promise.resolve();
  const next = prev
    .catch(() => {})
    .then(() => {
      const data = readJSON(name);
      const result = mutator(data);
      writeJSON(name, result);
      return result;
    });
  writeQueues[name] = next;
  return next;
}

module.exports = { readJSON, writeJSON, update };
