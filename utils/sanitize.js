// Strips control characters and collapses whitespace. This is NOT an
// HTML sanitizer for rich content - it's meant for short plain-text
// fields (banner titles, names) that get stored in JSON and later
// escaped again at render time before ever touching SVG/HTML.
module.exports = function sanitize(input, maxLen = 120) {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u001F\u007F]/g, "") // control chars
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
};
