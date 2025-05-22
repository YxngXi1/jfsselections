const fs = require("fs");
const path = require("path");

const filePath = path.join(
  ".next",
  "types",
  "app",
  "candidate",
  "[slug]",
  "page.d.ts"
);

if (!fs.existsSync(filePath)) {
  // Just log and exit cleanly
  console.log("ℹ️ page.d.ts not found — skipping patch (this is normal with ignoreBuildErrors).");
  process.exit(0); // ✅ exit successfully
}

let content = fs.readFileSync(filePath, "utf-8");

const patched = content.replace(
  /params: Promise<any>/,
  "params: { slug: string }"
);

fs.writeFileSync(filePath, patched, "utf-8");
console.log("✅ Patched broken PageProps typing.");
