import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { syncSkillData } from "./sync-skill-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const dataPath = path.join(projectRoot, "data", "skill-daily.json");

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "skill-rankings-daily"
};

if (process.env.GITHUB_TOKEN || process.env.GH_TOKEN) {
  GITHUB_HEADERS.Authorization = `Bearer ${process.env.GITHUB_TOKEN || process.env.GH_TOKEN}`;
}

const SECTION_RULES = {
  annual: {
    weights: {
      repoHeat: 0.30,
      reuseReferences: 0.25,
      installVisibility: 0.20,
      scenarioCoverage: 0.15,
      standaloneUsability: 0.10
    }
  },
  monthly: {
    weights: {
      momentum: 0.35,
      updateActivity: 0.15,
      discussionSignal: 0.20,
      repoHeat: 0.15,
      scenarioCoverage: 0.15
    }
  },
  default: {
    weights: {
      relevance: 0.30,
      scenarioCoverage: 0.20,
      sourceCredibility: 0.20,
      repoHeat: 0.20,
      updateActivity: 0.10
    }
  }
};

const ITEM_OVERRIDES = {
  "技能创建器": {
    repo: "anthropics/skills",
    searchQuery: "skill creator SKILL.md agent skills",
    installVisibility: 85,
    reuseReferences: 96,
    scenarioCoverage: 92,
    standaloneUsability: 96
  },
  "找技能与安装": {
    repo: "anthropics/skills",
    searchQuery: "topic:agent-skills skill install directory",
    installVisibility: 100,
    reuseReferences: 90,
    scenarioCoverage: 88,
    standaloneUsability: 90
  },
  "前端设计": {
    repo: "nexu-io/open-design",
    searchQuery: "frontend design agent skill",
    scenarioCoverage: 95,
    standaloneUsability: 92
  },
  "AI 编程工程技能": {
    repo: "addyosmani/agent-skills",
    searchQuery: "coding agent skills workflow",
    scenarioCoverage: 98,
    standaloneUsability: 90
  },
  "Claude Code 工作流": {
    repo: "hesreallyhim/awesome-claude-code",
    searchQuery: "claude code skills hooks agents",
    scenarioCoverage: 93,
    standaloneUsability: 88
  },
  "技能市场与批量安装": {
    repo: "sickn33/antigravity-awesome-skills",
    searchQuery: "agent skills marketplace installer",
    installVisibility: 96,
    scenarioCoverage: 88
  },
  "Copilot 指令与 Agent 配置": {
    repo: "github/awesome-copilot",
    searchQuery: "copilot instructions agents skills",
    reuseReferences: 90,
    scenarioCoverage: 92
  },
  "演示文稿生成": {
    searchQuery: "presentation generation agent skill pptx slides",
    scenarioCoverage: 94,
    standaloneUsability: 86
  },
  "文档与 PDF 处理": {
    searchQuery: "documents pdf agent skill docx",
    scenarioCoverage: 92,
    standaloneUsability: 88
  },
  "表格与数据分析": {
    searchQuery: "spreadsheet data analysis agent skill xlsx csv",
    scenarioCoverage: 92,
    standaloneUsability: 88
  },
  "找技能": {
    repo: "vercel-labs/skills",
    pathUrl: "https://github.com/vercel-labs/skills/tree/main/skills/find-skills",
    searchQuery: "find install agent skills directory",
    installVisibility: 98,
    scenarioCoverage: 90,
    repoHeat: 86,
    momentum: 92,
    updateActivity: 82,
    discussionSignal: 86
  },
  "归藏 PPT 技能": {
    repo: "op7418/guizang-ppt-skill",
    pathUrl: "https://github.com/op7418/guizang-ppt-skill",
    searchQuery: "guizang ppt skill slides",
    scenarioCoverage: 92
  },
  "Codex 技能精选集": {
    repo: "Copilot9/awesome-codex-skills",
    searchQuery: "awesome codex skills",
    installVisibility: 84,
    scenarioCoverage: 86
  },
  "Agent 技能索引": {
    repo: "heilcheng/awesome-agent-skills",
    searchQuery: "awesome agent skills",
    installVisibility: 90,
    scenarioCoverage: 86
  },
  "Draw.io 图表技能": {
    repo: "Agents365-ai/drawio-skill",
    searchQuery: "drawio skill agent diagram",
    scenarioCoverage: 88
  },
  "投资研究": {
    searchQuery: "investment research agent skill stock analysis",
    relevance: 98,
    scenarioCoverage: 96,
    sourceCredibility: 82,
    updateActivity: 78,
    discussionSignal: 76
  },
  "估值模型": {
    searchQuery: "valuation model dcf comparable analysis agent skill",
    relevance: 95,
    scenarioCoverage: 94,
    sourceCredibility: 80,
    updateActivity: 72,
    discussionSignal: 70
  },
  "投资风险检查": {
    searchQuery: "investment risk analysis portfolio downside agent skill",
    relevance: 93,
    scenarioCoverage: 92,
    sourceCredibility: 82,
    updateActivity: 74,
    discussionSignal: 72
  },
  "宏观市场简报": {
    searchQuery: "macro market briefing rates inflation central bank agent skill",
    relevance: 90,
    scenarioCoverage: 88,
    sourceCredibility: 78,
    updateActivity: 76,
    discussionSignal: 74
  },
  "财报与指标解读": {
    searchQuery: "financial statement analysis earnings metrics agent skill",
    relevance: 88,
    scenarioCoverage: 90,
    sourceCredibility: 78,
    updateActivity: 70,
    discussionSignal: 68
  },
  "表格分析": {
    searchQuery: "spreadsheet xlsx csv analysis agent skill",
    scenarioCoverage: 96,
    standaloneUsability: 90
  },
  "论文上下文解析": {
    searchQuery: "paper context resolver research agent skill",
    scenarioCoverage: 84
  },
  "SEO 审计": {
    searchQuery: "seo audit agent skill",
    scenarioCoverage: 82
  },
  "云成本优化": {
    searchQuery: "azure cost optimization agent skill cloud bill",
    scenarioCoverage: 80
  },
  "数据可视化": {
    searchQuery: "data visualization agent skill dashboard chart",
    scenarioCoverage: 86
  },
  "图像生成": {
    searchQuery: "image generation agent skill",
    scenarioCoverage: 94
  },
  "Remotion 视频": {
    searchQuery: "remotion video agent skill",
    scenarioCoverage: 82
  },
  "网页设计指南": {
    repo: "nexu-io/open-design",
    searchQuery: "web design guidelines agent skill",
    scenarioCoverage: 90
  },
  "UI/UX Pro Max": {
    searchQuery: "ui ux agent skill product design",
    scenarioCoverage: 84
  },
  "演示文稿": {
    searchQuery: "presentation pptx agent skill",
    scenarioCoverage: 94
  },
  "Word 文档": {
    searchQuery: "word docx document agent skill",
    scenarioCoverage: 90
  },
  "PDF 处理": {
    searchQuery: "pdf processing agent skill",
    scenarioCoverage: 90
  },
  "会议纪要": {
    searchQuery: "meeting minutes agent skill",
    scenarioCoverage: 82
  },
  "产品需求文档": {
    searchQuery: "prd product requirements agent skill",
    scenarioCoverage: 84
  },
  "GitHub 工作流": {
    searchQuery: "github workflow agent skill pull request ci",
    reuseReferences: 88,
    scenarioCoverage: 92
  },
  "代码安全扫描": {
    searchQuery: "code security scan agent skill",
    reuseReferences: 84,
    scenarioCoverage: 90
  },
  "插件创建器": {
    searchQuery: "codex plugin creator skill",
    scenarioCoverage: 82
  }
};

const REPO_FALLBACKS = {
  "anthropics/skills": { stars: 145_000, forks: 0 },
  "nexu-io/open-design": { stars: 57_300, forks: 0 },
  "addyosmani/agent-skills": { stars: 47_700, forks: 0 },
  "hesreallyhim/awesome-claude-code": { stars: 45_400, forks: 0 },
  "sickn33/antigravity-awesome-skills": { stars: 39_400, forks: 0 },
  "github/awesome-copilot": { stars: 34_300, forks: 0 },
  "op7418/guizang-ppt-skill": { stars: 12_200, forks: 935 },
  "Copilot9/awesome-codex-skills": { stars: 11_700, forks: 1_100 },
  "heilcheng/awesome-agent-skills": { stars: 5_100, forks: 458 },
  "Agents365-ai/drawio-skill": { stars: 1_900, forks: 115 }
};

function beijingDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);

  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function formatSnapshotDate(date = new Date()) {
  const { year, month, day } = beijingDateParts(date);
  return `${year}.${month}.${day}`;
}

function compactNumber(value) {
  if (!Number.isFinite(value) || value <= 0) return "0";
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(value >= 100_000 ? 0 : 1)}K`;
  }
  return String(Math.round(value));
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function normalizeRepo(repo) {
  if (!repo) return "";
  const match = String(repo).match(/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)$/);
  if (!match) return "";
  return `${match[1]}/${match[2]}`;
}

function repoFromUrl(url) {
  if (!url) return "";
  const match = String(url).match(/^https:\/\/github\.com\/([^/\s?#]+)\/([^/\s?#]+)/i);
  if (!match) return "";
  const [, owner, repo] = match;
  if (["search", "topics", "marketplace"].includes(owner.toLowerCase())) return "";
  return normalizeRepo(`${owner}/${repo.replace(/\.git$/, "")}`);
}

function repoForItem(item) {
  const override = ITEM_OVERRIDES[item.name];
  return normalizeRepo(override?.repo) || repoFromUrl(item.url) || normalizeRepo(item.source);
}

function itemSearchQuery(item, sectionId) {
  const override = ITEM_OVERRIDES[item.name];
  if (override?.searchQuery) return override.searchQuery;
  const words = [item.englishName, item.name, sectionId, "agent skill"].filter(Boolean);
  return words.join(" ");
}

function parseMetricNumber(metric, marker = "★") {
  const match = String(metric || "").match(new RegExp(`([\\d.]+)\\s*([KkMm]?)\\s*\\${marker}`));
  if (!match) return 0;
  const value = Number(match[1]);
  const suffix = match[2].toUpperCase();
  if (suffix === "M") return value * 1_000_000;
  if (suffix === "K") return value * 1_000;
  return value;
}

function daysSince(dateValue) {
  if (!dateValue) return 365;
  const then = new Date(dateValue).getTime();
  if (!Number.isFinite(then)) return 365;
  return Math.max(0, (Date.now() - then) / 86_400_000);
}

function heatScore(stars, forks, totalCount) {
  const weighted = stars + forks * 4 + totalCount * 80;
  return clamp((Math.log1p(weighted) / Math.log1p(180_000)) * 100);
}

function recencyScore(days) {
  if (days <= 2) return 100;
  if (days <= 7) return 88;
  if (days <= 30) return 70;
  if (days <= 90) return 48;
  if (days <= 180) return 34;
  return 22;
}

function sourceCredibility(item, repoData) {
  const source = String(item.source || "").toLowerCase();
  if (/anthropic|openai|github/.test(source)) return 96;
  if (/plugin|local skill/.test(source)) return 78;
  if (repoData?.owner?.type === "Organization") return 82;
  if (/awesome|index|目录|社区/.test(`${item.kind} ${item.type} ${item.name}`)) return 74;
  return 62;
}

function keywordBoost(item, words, base = 55) {
  const text = `${item.name} ${item.englishName} ${item.kind} ${item.type} ${item.reason} ${item.description}`.toLowerCase();
  return clamp(base + words.reduce((sum, word) => sum + (text.includes(word) ? 9 : 0), 0));
}

async function fetchJson(url, label) {
  if (typeof fetch !== "function") return null;
  try {
    const response = await fetch(url, { headers: GITHUB_HEADERS });
    if (!response.ok) {
      console.warn(`[generate] GitHub API skipped ${label}: ${response.status}`);
      return null;
    }
    return response.json();
  } catch (error) {
    console.warn(`[generate] GitHub API failed ${label}: ${error.message}`);
    return null;
  }
}

async function fetchRepo(repo, cache) {
  if (!repo) return null;
  if (!cache.has(repo)) {
    cache.set(repo, fetchJson(`https://api.github.com/repos/${repo}`, `repo ${repo}`));
  }
  return cache.get(repo);
}

async function fetchSearch(query, cache) {
  if (!query) return null;
  if (!cache.has(query)) {
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=8`;
    cache.set(query, fetchJson(url, `search ${query}`));
  }
  return cache.get(query);
}

function summarizeSearch(searchData) {
  const items = Array.isArray(searchData?.items) ? searchData.items : [];
  const top = items[0] || null;
  const newestUpdate = items
    .map((repo) => repo.pushed_at || repo.updated_at)
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a))[0];

  return {
    totalCount: Number(searchData?.total_count || 0),
    topStars: Number(top?.stargazers_count || 0),
    topForks: Number(top?.forks_count || 0),
    topRepo: top?.full_name || "",
    newestUpdate
  };
}

function buildSignals(item, sectionId, repoData, searchSummary) {
  const override = ITEM_OVERRIDES[item.name] || {};
  const repo = repoData?.full_name || repoForItem(item) || "";
  const fallback = REPO_FALLBACKS[repo] || {};
  const fallbackStars = parseMetricNumber(item.metric);
  const stars = Number(repoData?.stargazers_count || searchSummary.topStars || fallback.stars || fallbackStars || 0);
  const forks = Number(repoData?.forks_count || searchSummary.topForks || fallback.forks || 0);
  const totalCount = Number(searchSummary.totalCount || 0);
  const updatedAt = repoData?.pushed_at || repoData?.updated_at || searchSummary.newestUpdate || item.dailySignals?.updatedAt;
  const updateDays = daysSince(updatedAt);
  const repoHeat = override.repoHeat ?? heatScore(stars, forks, totalCount);
  const updateActivity = override.updateActivity ?? recencyScore(updateDays);
  const discussionSignal = override.discussionSignal ?? clamp(
    (Math.log1p(Number(repoData?.open_issues_count || 0) + totalCount) / Math.log1p(6_000)) * 100
  );
  const installVisibility = override.installVisibility ?? keywordBoost(item, ["install", "安装", "market", "directory", "目录", "find"], 56);
  const reuseReferences = override.reuseReferences ?? clamp(repoHeat * 0.72 + discussionSignal * 0.28);
  const scenarioCoverage = override.scenarioCoverage ?? keywordBoost(item, ["workflow", "交付", "生成", "处理", "analysis", "design", "code"], 62);
  const standaloneUsability = override.standaloneUsability ?? clamp(sourceCredibility(item, repoData) * 0.55 + scenarioCoverage * 0.45);
  const sourceTrust = override.sourceCredibility ?? sourceCredibility(item, repoData);
  const momentum = override.momentum ?? clamp(repoHeat * 0.42 + updateActivity * 0.34 + discussionSignal * 0.24);
  const relevance = clamp((override.relevance ?? scenarioCoverage) + (sectionId === "annual" ? 0 : 4));

  return {
    repo,
    searchQuery: itemSearchQuery(item, sectionId),
    searchResultCount: totalCount,
    searchTopRepo: searchSummary.topRepo,
    stars,
    forks,
    updatedAt: updatedAt || "",
    repoHeat: Math.round(repoHeat),
    reuseReferences: Math.round(reuseReferences),
    installVisibility: Math.round(installVisibility),
    scenarioCoverage: Math.round(scenarioCoverage),
    standaloneUsability: Math.round(standaloneUsability),
    momentum: Math.round(momentum),
    updateActivity: Math.round(updateActivity),
    discussionSignal: Math.round(discussionSignal),
    sourceCredibility: Math.round(sourceTrust),
    relevance: Math.round(relevance)
  };
}

function weightedScore(signals, sectionId) {
  const rule = SECTION_RULES[sectionId] || SECTION_RULES.default;
  return Object.entries(rule.weights).reduce((sum, [key, weight]) => {
    return sum + Number(signals[key] || 0) * weight;
  }, 0);
}

function metricFromSignals(item, sectionId, signals) {
  const stars = signals.stars || 0;
  const forks = signals.forks || 0;
  const resultCount = signals.searchResultCount || 0;

  if (stars > 0 && forks > 0) {
    return sectionId === "annual"
      ? `父仓库约 ${compactNumber(stars)} ★ / ${compactNumber(forks)} forks`
      : `${compactNumber(stars)} ★ / ${compactNumber(forks)} forks`;
  }

  if (stars > 0) {
    return sectionId === "annual" && signals.repo
      ? `父仓库约 ${compactNumber(stars)} ★`
      : `${compactNumber(stars)} ★`;
  }

  if (resultCount > 0) {
    return `GitHub 约 ${compactNumber(resultCount)} repos`;
  }

  return item.metric || "公开信号待补充";
}

function updateReason(item, sectionId, signals) {
  const reason = String(item.reason || "");
  const cleanReason = reason.replace(/（今日信号：.*?）$/, "");
  const signal = sectionId === "monthly"
    ? `今日信号：动能 ${signals.momentum} / 更新 ${signals.updateActivity}`
    : `今日信号：热度 ${signals.repoHeat} / 场景 ${signals.scenarioCoverage}`;
  return `${cleanReason}（${signal}）`;
}

async function enrichItem(item, sectionId, caches) {
  const repo = repoForItem(item);
  const searchQuery = itemSearchQuery(item, sectionId);
  const [repoData, searchData] = await Promise.all([
    fetchRepo(repo, caches.repo),
    fetchSearch(searchQuery, caches.search)
  ]);
  const searchSummary = summarizeSearch(searchData);
  const signals = buildSignals(item, sectionId, repoData, searchSummary);
  const score = weightedScore(signals, sectionId);

  return {
    ...item,
    url: item.url || ITEM_OVERRIDES[item.name]?.pathUrl,
    metric: metricFromSignals(item, sectionId, signals),
    reason: updateReason(item, sectionId, signals),
    dailySignals: {
      ...signals,
      score: Math.round(score)
    }
  };
}

async function rerankSections(data) {
  const caches = { repo: new Map(), search: new Map() };

  for (const section of data.sections || []) {
    const previousRanks = new Map(section.items.map((item, index) => [item.name, index + 1]));
    const enriched = [];
    for (const item of section.items) {
      enriched.push(await enrichItem(item, section.id, caches));
    }

    enriched.sort((a, b) => {
      const delta = Number(b.dailySignals?.score || 0) - Number(a.dailySignals?.score || 0);
      if (delta !== 0) return delta;
      return String(a.name).localeCompare(String(b.name), "zh-CN");
    });

    section.items = enriched.map((item, index) => ({
      ...item,
      rankDelta: (previousRanks.get(item.name) || index + 1) - (index + 1)
    }));
  }
}

function sectionById(data, id) {
  return data.sections.find((section) => section.id === id);
}

function topMovedItem(section) {
  return [...(section?.items || [])].sort((a, b) => {
    const moveDelta = Number(b.rankDelta || 0) - Number(a.rankDelta || 0);
    if (moveDelta !== 0) return moveDelta;
    return Number(b.dailySignals?.momentum || 0) - Number(a.dailySignals?.momentum || 0);
  })[0];
}

function updateInsights(data) {
  const annual = sectionById(data, "annual");
  const monthly = sectionById(data, "monthly");
  const specialtySections = (data.sections || []).filter((section) => !["annual", "monthly"].includes(section.id));
  const annualTop = annual?.items?.[0];
  const monthlyTop = topMovedItem(monthly);
  const hottestSpecialty = specialtySections
    .map((section) => ({
      section,
      top: section.items[0],
      avg: section.items.reduce((sum, item) => sum + Number(item.dailySignals?.score || 0), 0) / section.items.length
    }))
    .sort((a, b) => b.avg - a.avg)[0];
  const specialtyDescription = (hottestSpecialty?.top?.description || "说明具体场景化能力正在成为用户判断 skill 价值的重要依据。")
    .replace(/[。.!！]+$/, "");

  data.insights = [
    {
      title: `${annualTop?.name || "生态入口类 skill"} 仍是社区影响力核心`,
      body: `${annualTop?.description || "生态基础能力"} 当前以 ${annualTop?.metric || "公开信号"} 领跑年度综合榜，说明创建、发现、安装和可复用工作流仍是 Skill 生态的基础增长链路。`,
      tone: "cyan"
    },
    {
      title: `${monthlyTop?.name || "月度增长项"} 是本期动能观察重点`,
      body: `${monthlyTop?.name || "该 skill"} 的近期动能分为 ${monthlyTop?.dailySignals?.momentum ?? "--"}，结合更新活跃、搜索讨论和仓库热度，是今天最值得优先关注的趋势项。`,
      tone: "green"
    },
    {
      title: `${hottestSpecialty?.section?.title?.replace(/ Top \d+$/, "") || "专项场景"} 的落地价值更突出`,
      body: `${hottestSpecialty?.top?.name || "专项 skill"} 位于该方向首位，${specialtyDescription}。`,
      tone: "violet"
    }
  ];
}

function updateMethodology(data) {
  const monthly = data.methodology?.find((card) => card.title === "月度榜怎么排");
  if (monthly) {
    monthly.subtitle = "近期趋势综合分";
    monthly.weights = [
      { label: "动能代理", value: 35 },
      { label: "更新活跃", value: 15 },
      { label: "讨论搜索", value: 20 },
      { label: "仓库热度", value: 15 },
      { label: "场景覆盖", value: 15 }
    ];
  }
}

function touchDailyFields(data) {
  data.snapshotDate = formatSnapshotDate();
  data.timezone = "Asia/Beijing";
  data.period = "Daily live snapshot";
  data.refreshCadence = "每日 0 点自动更新";
  data.generatedAt = new Date().toISOString();
  data.sourceSummary = "每日抓取 GitHub repo/search 公开信号，重算单 Skill 综合影响力、月度动能和专项场景价值。";
}

async function main() {
  const raw = await fs.readFile(dataPath, "utf8");
  const data = JSON.parse(raw);

  touchDailyFields(data);
  await rerankSections(data);
  updateInsights(data);
  updateMethodology(data);

  await fs.writeFile(dataPath, `${JSON.stringify(data, null, 2)}\n`);
  await syncSkillData({ projectRoot });
  console.log(`[generate] Updated ${path.relative(projectRoot, dataPath)} for ${data.snapshotDate}`);
}

await main();
