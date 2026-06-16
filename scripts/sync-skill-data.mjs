import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultProjectRoot = path.resolve(__dirname, "..");

export async function syncSkillData({ projectRoot = defaultProjectRoot } = {}) {
  const jsonPath = path.join(projectRoot, "data", "skill-daily.json");
  const jsPath = path.join(projectRoot, "data", "skill-daily.js");
  const data = JSON.parse(await fs.readFile(jsonPath, "utf8"));
  const output = `window.SKILL_DAILY_DATA = ${JSON.stringify(data, null, 2)};\n`;
  await fs.writeFile(jsPath, output);
  return { jsonPath, jsPath };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const { jsonPath, jsPath } = await syncSkillData();
  console.log(`[sync:data] ${path.basename(jsonPath)} -> ${path.basename(jsPath)}`);
}
