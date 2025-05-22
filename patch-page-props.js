const fs = require("fs");
const path = require("path");

const pageTypesPath = path.join(
  ".next",
  "types",
  "app",
  "candidate",
  "[slug]",
  "page.d.ts"
);

if (!fs.existsSync(pageTypesPath)) {
  console.error("❌ Could not find generated page.d.ts");
  process.exit(1);
}

let content = fs.readFileSync(pageTypesPath, "utf8");

content = content.replace(
  /export interface PageProps\s*{[^}]+}/,
  `export interface PageProps {
  params: { slug: string };
  searchParams?: Record<string, string | string[]>;
}`
);

fs.writeFileSync(pageTypesPath, content);
console.log("✅ Patched PageProps successfully.");