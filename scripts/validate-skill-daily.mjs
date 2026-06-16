import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const jsonPath = path.join(projectRoot, "data", "skill-daily.json");
const jsPath = path.join(projectRoot, "data", "skill-daily.js");

const requiredItemFields = [
  "name",
  "englishName",
  "kind",
  "source",
  "metric",
  "type",
  "reason",
  "description"
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const data = JSON.parse(await fs.readFile(jsonPath, "utf8"));

assert(data.title === "全网 Skill 排行榜日报", "Unexpected Chinese product title");
assert(Array.isArray(data.insights) && data.insights.length >= 3, "At least three insights are required");
assert(Array.isArray(data.sections) && data.sections.length >= 6, "Required ranking sections are missing");
assert(Array.isArray(data.methodology) && data.methodology.length >= 3, "Methodology cards are required");

const sectionIds = new Set();
for (const section of data.sections) {
  assert(section.id && !sectionIds.has(section.id), `Duplicate or missing section id: ${section.id}`);
  sectionIds.add(section.id);
  assert(section.title && section.subtitle, `Section copy is incomplete: ${section.id}`);
  assert(Array.isArray(section.items) && section.items.length > 0, `Section has no items: ${section.id}`);

  section.items.forEach((item, index) => {
    for (const field of requiredItemFields) {
      assert(item[field], `Missing item.${field} in ${section.id} #${index + 1}`);
    }
  });
}

const expectedFallback = `window.SKILL_DAILY_DATA = ${JSON.stringify(data, null, 2)};\n`;
const actualFallback = await fs.readFile(jsPath, "utf8");
assert(actualFallback === expectedFallback, "data/skill-daily.js is not synced with data/skill-daily.json");

console.log("[validate] Skill daily data is valid and fallback JS is synced");
