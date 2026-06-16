const DATA_URL = new URLSearchParams(window.location.search).get("data") || "./data/skill-daily.json";
const REFRESH_INTERVAL_MS = 30 * 60 * 1000;

const toneMap = {
  cyan: "var(--cyan)",
  green: "var(--green)",
  violet: "var(--violet)",
  amber: "var(--amber)"
};

const app = document.querySelector("#app");
let lastLoadedAt = null;
let currentData = null;
let currentLang = localStorage.getItem("skillDailyLang") || "zh";

const PAGE_EN = {
  title: "Skill Rankings Daily",
  subtitle: "Daily Skill Ecosystem Leaderboard",
  period: "Daily live snapshot",
  refreshCadence: "Daily at 00:00 Beijing time",
  sourceSummary: "Single-skill influence: parent repo heat, reuse signals, install visibility, and scenario coverage.",
  sourceChips: [
    "Composite influence",
    "Parent repo stars / forks",
    "Install visibility",
    "Cross-repo references",
    "Scenario reuse"
  ]
};

const UI = {
  zh: {
    backTop: "回到顶部",
    searchPlaceholder: "搜索 skill、来源、场景或上榜理由",
    clear: "清除",
    refresh: "刷新",
    syncing: "同步中",
    todaySignal: "今日主线",
    noInsight: "暂无洞察。",
    snapshot: "Snapshot",
    timezone: "Timezone",
    browse: "Browse",
    rankingLogic: "Ranking logic",
    sideNote: "年度看单 Skill 综合影响力，月度看增长趋势，专项看领域场景价值。",
    showing: "个 skill 正在展示",
    matched: query => `个结果匹配「${query}」`,
    emptyTitle: "没有匹配的 skill",
    emptyBody: "换一个关键词试试，比如 GitHub、PPT、文档、设计、数据分析。",
    searchEmptyTitle: "没有找到",
    searchEmptyHint: "试试来源、英文名或场景词",
    matchCount: count => `${count} 个匹配`,
    enterHint: "Enter 定位第一个结果",
    why: "为什么上榜",
    capability: "能做什么",
    openSource: "打开来源",
    topPick: "今日优先看",
    keyMetric: "关键指标",
    rankingSignal: "上榜信号",
    type: "口径类型",
    jump: "跳转",
    methodologyTitle: "排名方法与数据含义",
    methodologySubtitle: "年度榜综合多个公开信号，专项榜保留领域内场景价值口径，避免把仓库 stars 当成唯一答案。",
    loadingErrorTitle: "日报数据没有装载成功",
    loadingErrorBody: dataUrl => `请通过本地服务打开页面，或检查 ${dataUrl} 是否存在。`
  },
  en: {
    backTop: "Back to top",
    searchPlaceholder: "Search skill, source, scenario, or ranking reason",
    clear: "Clear",
    refresh: "Refresh",
    syncing: "Syncing",
    todaySignal: "Today’s signal",
    noInsight: "No insight yet.",
    snapshot: "Snapshot",
    timezone: "Timezone",
    browse: "Browse",
    rankingLogic: "Ranking logic",
    sideNote: "Annual ranks single-skill influence; monthly ranks growth; specialty ranks domain value.",
    showing: " skills showing",
    matched: query => ` results for “${query}”`,
    emptyTitle: "No matching skill",
    emptyBody: "Try GitHub, PPT, documents, design, or data analysis.",
    searchEmptyTitle: "No results",
    searchEmptyHint: "Try a source, English name, or scenario term",
    matchCount: count => `${count} matches`,
    enterHint: "Press Enter to jump to the first result",
    why: "Why it ranks",
    capability: "What it does",
    openSource: "Open source",
    topPick: "Today’s pick",
    keyMetric: "Key metric",
    rankingSignal: "Ranking signal",
    type: "Signal type",
    jump: "Open",
    methodologyTitle: "Ranking Method & Data Meaning",
    methodologySubtitle: "Annual ranking blends multiple public signals; specialty rankings keep domain-specific value instead of treating repo stars as the only answer.",
    loadingErrorTitle: "Daily data failed to load",
    loadingErrorBody: dataUrl => `Open the page through a local server, or check whether ${dataUrl} exists.`
  }
};

const INSIGHTS_EN = [
  {
    title: "Ecosystem gateway skills keep leading",
    body: "Skill Creator and Find / Install Skills sit near the top, showing that ecosystem growth still depends on creation, discovery, and installation."
  },
  {
    title: "Developer workflows are becoming mainstream",
    body: "AI coding engineering, Claude Code workflow, and Copilot configuration all rank highly as coding-agent skills move from prompts into reusable engineering processes."
  },
  {
    title: "Office and visual delivery remain stable",
    body: "Frontend design, presentations, documents/PDF, and spreadsheets cover real deliverables with steady reuse and immediately visible value."
  }
];

const SECTION_EN = {
  annual: {
    title: "Annual Community Influence Top 10",
    shortTitle: "Annual Influence",
    subtitle: "Ranks single skills by parent repo heat, reuse references, install visibility, scenario coverage, and independent usability."
  },
  monthly: {
    title: "Monthly Growth Trend Top 5",
    shortTitle: "Monthly Growth",
    subtitle: "Measures 30-day growth, recent updates, directory heat, discussion frequency, and scenario clarity."
  },
  finance: {
    title: "Finance & Investing Top 5",
    shortTitle: "Finance & Investing",
    subtitle: "Ranks investing skills by research depth, valuation rigor, risk control, market context, and decision support."
  },
  data: {
    title: "Data Analysis Top 5",
    shortTitle: "Data Analysis",
    subtitle: "Ranks data-analysis skills by processing completeness, output quality, and reusability."
  },
  design: {
    title: "Design & Multimedia Top 5",
    shortTitle: "Design & Media",
    subtitle: "Ranks design and multimedia skills by output quality and delivery efficiency."
  },
  docs: {
    title: "Docs & Office Top 5",
    shortTitle: "Docs & Office",
    subtitle: "Ranks office-delivery skills by document generation, verification, and collaboration reuse."
  },
  dev: {
    title: "Development Workflow Top 5",
    shortTitle: "Development",
    subtitle: "Ranks development skills by code-delivery coverage, maintenance activity, and practical usability."
  }
};

const STAT_EN = {
  "年度榜": "Annual",
  "月度榜": "Monthly",
  "专项榜": "Specialty",
  "更新频率": "Refresh"
};

const KIND_EN = {
  "生态基础": "Ecosystem foundation",
  "生态入口": "Ecosystem gateway",
  "设计交付": "Design delivery",
  "开发编程": "Development",
  "金融投资": "Finance & investing",
  "风控审查": "Risk review",
  "宏观策略": "Macro strategy",
  "财务分析": "Financial analysis",
  "办公交付": "Office delivery",
  "数据分析": "Data analysis",
  "官方共享": "Official shared",
  "独立项目": "Independent project",
  "社区索引": "Community index",
  "专项场景": "Specialty scenario",
  "AI 生产力应用": "AI productivity",
  "插件市场": "Plugin marketplace",
  "资源合集": "Resource collection"
};

const TYPE_EN = {
  "单 Skill 综合影响力": "Single-skill influence",
  "生态入口型": "Ecosystem gateway",
  "官方共享型": "Official shared",
  "独立项目型": "Independent project",
  "社区索引型": "Community index",
  "专项场景型": "Scenario-specific"
};

const METRIC_EN = {
  "目录 / 安装入口": "Directory / install gateway",
  "交付场景强": "Strong delivery scenario",
  "官方复用强": "Strong official reuse",
  "办公数据高频": "High-frequency office data",
  "生态入口 / 目录热度": "Ecosystem gateway / directory heat",
  "场景价值分": "Scenario value score",
  "共享口径": "Shared-source signal",
  "专项场景": "Scenario skill"
};

const ITEM_EN = {
  "技能创建器": {
    reason: "It ranks because skill creation defines how the ecosystem grows, with strong parent-repo heat, cross-ecosystem references, and install demand.",
    description: "Packages experience, tools, and workflows into reusable SKILL.md files, making it the production gateway for Agent Skills."
  },
  "找技能与安装": {
    reason: "It ranks because discovery, comparison, and installation are the first needs for new users entering the skill ecosystem.",
    description: "Helps users find public skills, judge source credibility, and move into installation or reuse workflows."
  },
  "前端设计": {
    reason: "It ranks because frontend delivery is one of the most common real-world coding-agent scenarios, with strong design and implementation reuse.",
    description: "Improves layout, hierarchy, typography, color, responsive behavior, usability, and product-level interface details."
  },
  "AI 编程工程技能": {
    reason: "It ranks because coding, debugging, testing, refactoring, and engineering delivery are among the highest-frequency agent workflows.",
    description: "Organizes code generation, debugging, architecture judgment, test repair, performance work, and delivery processes into reusable skills."
  },
  "Claude Code 工作流": {
    reason: "It ranks because Claude Code commands, hooks, agents, and skills are widely reused by developers.",
    description: "Turns Claude Code commands, hooks, subagents, and automation into stable reusable coding workflows."
  },
  "技能市场与批量安装": {
    reason: "It ranks because installable skill libraries and installer CLIs connect discovery, downloading, installation, bundles, and reuse.",
    description: "Helps users browse, install, combine, and migrate skills across different agent CLIs."
  },
  "Copilot 指令与 Agent 配置": {
    reason: "It ranks because GitHub’s community collection has strong credibility and high reuse for instructions, agents, and skill configuration.",
    description: "Configures Copilot instructions, agents, prompt files, and workflows so Copilot better fits project context."
  },
  "演示文稿生成": {
    reason: "It ranks because slides are high-frequency visible deliverables, with clear reuse signals across independent projects and official skills.",
    description: "Generates deliverable presentations from topics, outlines, materials, and visual direction, with rendering and layout checks."
  },
  "文档与 PDF 处理": {
    reason: "It ranks because documents, PDFs, comments, formatting, and verification are stable high-frequency office scenarios.",
    description: "Handles Word, PDF, long documents, comments, revisions, and visual verification for reports and knowledge materials."
  },
  "表格与数据分析": {
    reason: "It ranks because CSV/XLSX cleaning, formulas, charts, and reports are high-frequency office and data tasks.",
    description: "Reads spreadsheets, cleans data, builds formulas, generates charts, and formats analytical reports."
  },
  "找技能": {
    reason: "It ranks because users search before adding new skills, making it a high-value ecosystem gateway.",
    description: "Solves discovery, validation, installation, and comparison for open ecosystem skills."
  },
  "归藏 PPT 技能": {
    reason: "It ranks because presentation generation demand remains strong and the deliverable is clear.",
    description: "Generates single-page HTML, slides, image prompts, and layout directions."
  },
  "Codex 技能精选集": {
    reason: "It ranks because it is still used as an entry point for workflow selection.",
    description: "Organizes scattered Codex scenarios into a browsable collection."
  },
  "Agent 技能索引": {
    reason: "It ranks because cross-platform agent skill directories have obvious comparison value.",
    description: "Helps users compare skill resources across different agent ecosystems."
  },
  "Draw.io 图表技能": {
    reason: "It ranks because automated diagram delivery is heating up.",
    description: "Lets agents create and self-check editable draw.io architecture diagrams, flowcharts, and sequence diagrams."
  },
  "表格分析": {
    reason: "It ranks because data cleaning, formulas, and reporting cover the broadest analysis workflows.",
    description: "Reads XLSX/CSV files, cleans data, builds formulas, creates charts, and formats reports."
  },
  "论文上下文解析": {
    reason: "It ranks because research reproduction has a clear workflow.",
    description: "Organizes data, code, environment, and experiment steps needed to reproduce a paper."
  },
  "SEO 审计": {
    reason: "It ranks because website growth and content operations have clear demand.",
    description: "Checks page structure, keywords, content quality, and visibility issues."
  },
  "云成本优化": {
    reason: "It ranks because cloud bill analysis has clear ROI.",
    description: "Analyzes resource utilization, billing structure, and waste, then suggests cost reductions."
  },
  "数据可视化": {
    reason: "It ranks because analytical results need visual explanation.",
    description: "Turns raw data into charts, dashboards, and explanatory conclusions."
  },
  "图像生成": {
    reason: "It ranks because posters, product images, and asset generation have broad demand.",
    description: "Generates image assets and requires saved files plus visual-quality checks."
  },
  "Remotion 视频": {
    reason: "It ranks because automated video delivery has high value.",
    description: "Creates video templates, subtitles, transitions, and batch assets with code."
  },
  "网页设计指南": {
    reason: "It ranks because web design guidance can significantly improve implementation quality.",
    description: "Provides advice on information architecture, visual hierarchy, and responsive details."
  },
  "UI/UX Pro Max": {
    reason: "It ranks because product-experience detail optimization is a steady need.",
    description: "Finds interaction, information hierarchy, and visual consistency issues."
  },
  "演示文稿": {
    reason: "It ranks because pitch decks, reports, and proposal decks are frequent deliverables.",
    description: "Creates, edits, renders, and checks PPTX files."
  },
  "Word 文档": {
    reason: "It ranks because formal document creation and verification are stable needs.",
    description: "Creates, edits, comments on, and visually verifies DOCX files."
  },
  "PDF 处理": {
    reason: "It ranks because PDF reading and extraction are frequent knowledge-work tasks.",
    description: "Extracts, summarizes, annotates, and checks PDF content and layout."
  },
  "会议纪要": {
    reason: "It ranks because meeting summaries are a high-frequency collaboration scenario.",
    description: "Turns transcripts into decisions, action items, risks, and follow-up plans."
  },
  "产品需求文档": {
    reason: "It ranks because product and engineering collaboration needs structured requirements.",
    description: "Turns rough ideas into PRDs, user stories, acceptance criteria, and edge cases."
  },
  "GitHub 工作流": {
    reason: "It ranks because PRs, issues, reviews, and CI are central to developer workflows.",
    description: "Inspects GitHub repositories, summarizes PRs/issues, fixes CI, and supports publishing changes."
  },
  "代码安全扫描": {
    reason: "It ranks because security review is a high-value requirement for code delivery.",
    description: "Scans repositories or diffs, validates findings, traces attack paths, and fixes plausible issues."
  },
  "插件创建器": {
    reason: "It ranks because teams need to package tools and integrations as reusable plugins.",
    description: "Creates Codex plugin directories, manifests, optional folders, and marketplace metadata."
  }
};

const METHOD_EN = {
  "年度榜怎么排": {
    title: "How Annual Ranking Works",
    subtitle: "Single-skill influence score"
  },
  "月度榜怎么排": {
    title: "How Monthly Ranking Works",
    subtitle: "Recent growth score"
  },
  "专项榜怎么排": {
    title: "How Specialty Ranking Works",
    subtitle: "Scenario value score"
  }
};

const WEIGHT_EN = {
  "父仓库热度": "Parent repo heat",
  "复用引用": "Reuse references",
  "安装可见": "Install visibility",
  "场景覆盖": "Scenario coverage",
  "独立可用": "Standalone usability",
  "30d 增长": "30d growth",
  "更新": "Updates",
  "讨论": "Discussion",
  "相关性": "Relevance",
  "复用性": "Reusability",
  "可信源": "Trusted source"
};

const LEGEND_EN = [
  "Influence = weighted multi-signal score",
  "Parent repo heat = stars / forks / topic signals",
  "Install visibility = directories, installers, download entry points",
  "Reuse references = cross-repo listings, community indexes, workflow mentions",
  "Specialty ranking = concrete capability / scenario value",
  "Scenario value score = domain-specific composite score"
];

const FOOTER_NOTE_EN = "Annual ranking is not a raw repo-stars list. It estimates single-skill community influence using parent repo stars/forks plus install visibility, cross-repo references, scenario coverage, and standalone usability. Specialty rankings continue to use domain-specific capability value.";

async function loadData({ quiet = false } = {}) {
  if (!quiet) {
    app.querySelector(".status-text")?.replaceChildren(document.createTextNode(t("syncing")));
  }

  if (window.location.protocol === "file:" && window.SKILL_DAILY_DATA) {
    lastLoadedAt = new Date();
    currentData = window.SKILL_DAILY_DATA;
    render(currentData);
    return;
  }

  try {
    const url = new URL(DATA_URL, window.location.href);
    url.searchParams.set("_", Date.now().toString());
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    currentData = await response.json();
    lastLoadedAt = new Date();
    render(currentData);
  } catch (error) {
    if (window.SKILL_DAILY_DATA) {
      lastLoadedAt = new Date();
      currentData = window.SKILL_DAILY_DATA;
      render(currentData);
      return;
    }
    renderError(error);
  }
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function tone(name) {
  return toneMap[name] || toneMap.cyan;
}

function shortSectionTitle(title) {
  return title.replace(" Top 10", "").replace(" Top 5", "");
}

function t(key) {
  return UI[currentLang][key] ?? UI.zh[key] ?? key;
}

function pageText(data, key) {
  if (currentLang === "en" && PAGE_EN[key]) return PAGE_EN[key];
  return data[key];
}

function sourceChips(data) {
  return currentLang === "en" ? PAGE_EN.sourceChips : data.sourceChips;
}

function sectionTitle(section) {
  return currentLang === "en" ? (SECTION_EN[section.id]?.title || section.title) : section.title;
}

function sectionShortTitle(section) {
  if (currentLang === "en") return SECTION_EN[section.id]?.shortTitle || sectionTitle(section);
  return shortSectionTitle(section.title);
}

function sectionSubtitle(section) {
  return currentLang === "en" ? (SECTION_EN[section.id]?.subtitle || section.subtitle) : section.subtitle;
}

function insightText(item, index, key) {
  return currentLang === "en" ? (INSIGHTS_EN[index]?.[key] || item?.[key]) : item?.[key];
}

function statLabel(stat) {
  return currentLang === "en" ? (STAT_EN[stat.label] || stat.label) : stat.label;
}

function itemName(item) {
  return currentLang === "en" ? (ITEM_EN[item.name]?.name || item.englishName || item.name) : item.name;
}

function kindText(item) {
  return currentLang === "en" ? (ITEM_EN[item.name]?.kind || KIND_EN[item.kind] || item.kind) : item.kind;
}

function typeText(item) {
  return currentLang === "en" ? (ITEM_EN[item.name]?.type || TYPE_EN[item.type] || item.type) : item.type;
}

function metricText(item) {
  if (currentLang !== "en") return item.metric;
  if (ITEM_EN[item.name]?.metric) return ITEM_EN[item.name].metric;
  return METRIC_EN[item.metric] || item.metric.replace("父仓库约", "Parent repo ~");
}

function reasonText(item) {
  const value = currentLang === "en" ? (ITEM_EN[item.name]?.reason || item.reason) : item.reason;
  return String(value || "").replace(/^上榜理由：/, "").replace(/^Ranking reason:\s*/i, "");
}

function descriptionText(item) {
  return currentLang === "en" ? (ITEM_EN[item.name]?.description || item.description) : item.description;
}

function itemMetaLine(item) {
  return currentLang === "en"
    ? `${esc(item.source)} · ${esc(kindText(item))}`
    : `${esc(item.englishName)} · ${esc(item.source)}`;
}

function loadedLabel(data) {
  const loaded = lastLoadedAt
    ? lastLoadedAt.toLocaleTimeString(currentLang === "en" ? "en-US" : "zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "--:--";
  return `${esc(pageText(data, "refreshCadence"))} · ${loaded}`;
}

function repoSearchUrl(item) {
  const query = encodeURIComponent(item.searchQuery || item.englishName || item.name);
  return `https://github.com/search?q=${query}&type=repositories`;
}

function repoCodeSearchUrl(repo, item) {
  const query = encodeURIComponent(item.englishName || item.name);
  return `https://github.com/${repo}/search?q=${query}&type=code`;
}

function sourceUrl(item) {
  if (item.url) return item.url;

  const sourceLinks = {
    "vercel-labs/skills": "https://github.com/vercel-labs/skills/tree/main/skills/find-skills",
    "openai/skills": repoCodeSearchUrl("openai/skills", item),
    "gp7418/guizang-ppt": "https://github.com/op7418/guizang-ppt-skill",
    "op7418/guizang-ppt-skill": "https://github.com/op7418/guizang-ppt-skill",
    "Copilot9/awesome-codex-skills": "https://github.com/search?q=awesome-codex-skills&type=repositories",
    "heilcheng/awesome-agent-skills": "https://github.com/heilcheng/awesome-agent-skills",
    "Agents365-ai/drawio-skill": "https://github.com/Agents365-ai/drawio-skill",
    "GitHub plugin": repoCodeSearchUrl("openai/codex", item),
    "Codex Security plugin": repoCodeSearchUrl("openai/codex", item),
    "local skill": repoSearchUrl(item),
    "community skill": repoSearchUrl(item)
  };

  if (sourceLinks[item.source]) return sourceLinks[item.source];
  if (/^[\w.-]+\/[\w.-]+$/.test(item.source)) return `https://github.com/${item.source}`;
  return repoSearchUrl(item);
}

function iconSvg(kind = "star") {
  const common = `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
  const icons = {
    search: `<svg ${common}><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path><path d="M8.2 11h5.6"></path></svg>`,
    trend: `<svg ${common}><path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15l3-4 3 2 4-7"></path></svg>`,
    palette: `<svg ${common}><path d="M12 3a9 9 0 0 0 0 18h1.2a1.8 1.8 0 0 0 1.2-3.1 1.8 1.8 0 0 1 1.2-3.1H17a4 4 0 0 0 4-4A8 8 0 0 0 12 3Z"></path><circle cx="7.5" cy="10" r=".7"></circle><circle cx="10" cy="7.5" r=".7"></circle><circle cx="14" cy="7.5" r=".7"></circle></svg>`,
    doc: `<svg ${common}><path d="M7 3h7l4 4v14H7z"></path><path d="M14 3v5h5"></path><path d="M9.5 13h5"></path><path d="M9.5 17h5"></path></svg>`,
    code: `<svg ${common}><path d="m9 18-6-6 6-6"></path><path d="m15 6 6 6-6 6"></path><path d="m13 4-2 16"></path></svg>`,
    layers: `<svg ${common}><path d="m12 3 8 4.5-8 4.5-8-4.5Z"></path><path d="m4 12 8 4.5 8-4.5"></path><path d="m4 16.5 8 4.5 8-4.5"></path></svg>`,
    refresh: `<svg ${common}><path d="M21 12a9 9 0 0 1-15.1 6.6"></path><path d="M3 12A9 9 0 0 1 18.1 5.4"></path><path d="M18 2v4h-4"></path><path d="M6 22v-4h4"></path></svg>`,
    filter: `<svg ${common}><path d="M4 5h16"></path><path d="M7 12h10"></path><path d="M10 19h4"></path></svg>`,
    star: `<svg ${common}><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.9-5.4 2.9 1-6-4.4-4.3 6.1-.9z"></path></svg>`
  };
  return icons[kind] || icons.star;
}

function iconFor(item) {
  const text = `${item.name} ${item.englishName}`;
  if (text.includes("找技能") || text.includes("Find")) return "search";
  if (text.includes("投资") || text.includes("估值") || text.includes("宏观") || text.includes("财报") || text.includes("风险")) return "trend";
  if (text.includes("表格") || text.includes("数据") || text.includes("SEO") || text.includes("云成本")) return "trend";
  if (text.includes("前端") || text.includes("图像") || text.includes("Remotion") || text.includes("UI") || text.includes("网页")) return "palette";
  if (text.includes("文档") || text.includes("PDF") || text.includes("会议") || text.includes("演示") || text.includes("需求")) return "doc";
  if (text.includes("GitHub") || text.includes("代码") || text.includes("插件") || text.includes("技能创建")) return "code";
  return "star";
}

function signalFan() {
  return `
    <div class="signal-fan" aria-hidden="true">
      <svg viewBox="0 0 310 138">
        <defs>
          <linearGradient id="fanBeam" x1="30" y1="103" x2="270" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#2d8b78" stop-opacity=".58" />
            <stop offset=".52" stop-color="#74cfc1" stop-opacity=".28" />
            <stop offset="1" stop-color="#d49345" stop-opacity=".06" />
          </linearGradient>
          <linearGradient id="fanLine" x1="35" y1="106" x2="282" y2="16" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#2d8b78" />
            <stop offset=".58" stop-color="#74cfc1" />
            <stop offset="1" stop-color="#d49345" />
          </linearGradient>
        </defs>
        <path d="M47 100 C98 72 154 47 258 20 L266 60 C175 70 111 87 47 100Z" fill="url(#fanBeam)" opacity=".76"></path>
        <path d="M48 101 C101 75 159 48 258 20" stroke="url(#fanLine)" stroke-width="2.2"></path>
        <path d="M50 101 C110 90 176 76 266 60" stroke="#2d8b78" stroke-width="1.2" opacity=".30"></path>
        <path d="M62 100 C128 80 183 52 242 32" stroke="#d49345" stroke-width="1.1" opacity=".26"></path>
        <circle cx="47" cy="100" r="10" fill="#2d8b78" opacity=".95"></circle>
        <circle cx="47" cy="100" r="20" fill="none" stroke="#2d8b78" stroke-opacity=".18"></circle>
        <g font-family="Readex Pro, Noto Sans SC, PingFang SC, sans-serif" font-size="10" font-weight="760">
          <rect x="215" y="14" width="44" height="22" rx="11" fill="rgba(8,17,27,.84)" stroke="rgba(255,255,255,.16)"></rect>
          <text x="237" y="29" text-anchor="middle" fill="#d8ebe7">stars</text>
          <rect x="252" y="43" width="38" height="22" rx="11" fill="rgba(8,17,27,.84)" stroke="rgba(255,255,255,.16)"></rect>
          <text x="271" y="58" text-anchor="middle" fill="#d8ebe7">30d</text>
          <rect x="188" y="54" width="52" height="22" rx="11" fill="rgba(8,17,27,.84)" stroke="rgba(255,255,255,.16)"></rect>
          <text x="214" y="69" text-anchor="middle" fill="#d8ebe7">signal</text>
        </g>
      </svg>
    </div>`;
}

function flattenItems(data) {
  return data.sections.flatMap(section => section.items.map((item, index) => ({ section, item, index })));
}

function insightTone(index) {
  return ["cyan", "green", "violet"][index] || "green";
}

function entryId(section, index) {
  return `skill-${section?.id || "section"}-${index + 1}`;
}

function render(data) {
  document.documentElement.lang = currentLang === "en" ? "en" : "zh-CN";
  const allItems = flattenItems(data);
  const annual = data.sections.find(section => section.id === "annual");
  const monthly = data.sections.find(section => section.id === "monthly");
  const topPick = monthly?.items?.[0] || annual?.items?.[0];
  const nav = data.sections
    .map(section => `<a href="#${esc(section.id)}"><span>${esc(section.number)}</span>${esc(sectionShortTitle(section))}</a>`)
    .join("");

  app.innerHTML = `
    <main class="product-shell">
      <header class="topbar">
        <a class="brand-lockup" href="#top" aria-label="${esc(t("backTop"))}">
          <span class="brand-mark"></span>
          <span>${esc(data.eyebrow)}</span>
        </a>
        <div class="search-shell">
          <label class="global-search">
            ${iconSvg("search")}
            <input type="search" data-search placeholder="${esc(t("searchPlaceholder"))}" autocomplete="off" />
            <button class="search-clear" type="button" data-search-clear hidden aria-label="${esc(t("clear"))}">${esc(t("clear"))}</button>
          </label>
          <div class="search-popover" data-search-results hidden></div>
        </div>
        <div class="top-actions">
          <div class="language-toggle" aria-label="Language">
            <button type="button" data-lang="zh" aria-pressed="${currentLang === "zh"}">中文</button>
            <button type="button" data-lang="en" aria-pressed="${currentLang === "en"}">EN</button>
          </div>
          <span class="live-status"><i></i><span class="status-text">${esc(loadedLabel(data))}</span></span>
          <button class="refresh-button" type="button" data-refresh>${iconSvg("refresh")}${esc(t("refresh"))}</button>
        </div>
      </header>

      <section class="hero" id="top">
        <div class="hero-copy">
          <p class="section-label">Daily Skill Intelligence</p>
          <h1>${esc(pageText(data, "title"))}</h1>
          <p class="hero-lede">${esc(pageText(data, "subtitle"))} · ${esc(pageText(data, "period"))} · ${esc(data.snapshotDate)}<br>${esc(pageText(data, "sourceSummary"))}</p>
          <div class="source-row">${sourceChips(data).map(chip => `<span>${esc(chip)}</span>`).join("")}</div>
        </div>
        <aside class="hero-signal">
          ${signalFan()}
          <div class="snapshot-lines">
            <div><span>${esc(t("snapshot"))}</span><b>${esc(data.snapshotDate)}</b></div>
            <div><span>${esc(t("timezone"))}</span><b>${esc(data.timezone)}</b></div>
          </div>
        </aside>
      </section>

      <section class="briefing">
        <article class="lead-brief" style="--accent:${tone(data.insights[0]?.tone || "cyan")}">
          <span>${esc(t("todaySignal"))}</span>
          <h2>${esc(insightText(data.insights[0], 0, "title") || t("noInsight"))}</h2>
          <p>${esc(insightText(data.insights[0], 0, "body") || t("noInsight"))}</p>
        </article>
        <div class="brief-column">
          ${data.insights.slice(1).map((item, index) => `
            <article class="brief-note" style="--accent:${tone(item.tone || insightTone(index + 1))}">
              <span>${String(index + 2).padStart(2, "0")}</span>
              <div><b>${esc(insightText(item, index + 1, "title"))}</b><p>${esc(insightText(item, index + 1, "body"))}</p></div>
            </article>`).join("")}
        </div>
        ${renderTodayPick(topPick)}
      </section>

      <section class="metrics-strip" aria-label="日报概览">
        ${data.stats.map(renderStat).join("")}
      </section>

      <div class="workspace">
        <aside class="sidebar">
          <div class="side-sticky">
            <div class="sidebar-title">${iconSvg("filter")} ${esc(t("browse"))}</div>
            <nav class="side-nav" aria-label="日报榜单导航">${nav}</nav>
            <div class="side-note">
              <b>${esc(t("rankingLogic"))}</b>
              <p>${esc(t("sideNote"))}</p>
            </div>
          </div>
        </aside>

        <div class="content-flow">
          <div class="result-line"><span data-result-count>${allItems.length}</span><b data-result-copy>${esc(t("showing"))}</b></div>
          <div class="empty-search" data-empty-search hidden>
            <b>${esc(t("emptyTitle"))}</b>
            <p>${esc(t("emptyBody"))}</p>
          </div>
          ${data.sections.map(renderSection).join("")}
          ${renderMethodology(data)}
        </div>
      </div>
    </main>`;

  app.querySelector("[data-refresh]")?.addEventListener("click", () => loadData());
  app.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", () => {
      currentLang = button.dataset.lang || "zh";
      localStorage.setItem("skillDailyLang", currentLang);
      render(currentData || data);
    });
  });
  const searchInput = app.querySelector("[data-search]");
  const searchPanel = app.querySelector("[data-search-results]");
  searchInput?.addEventListener("input", event => applySearch(event.target.value));
  searchInput?.addEventListener("focus", event => applySearch(event.target.value));
  searchInput?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      jumpToFirstSearchResult();
    }
    if (event.key === "Escape") {
      clearSearch();
    }
  });
  app.querySelector("[data-search-clear]")?.addEventListener("click", clearSearch);
  searchPanel?.addEventListener("click", event => {
    const target = event.target.closest("[data-jump-entry]");
    if (target) jumpToEntry(target.dataset.jumpEntry);
  });
}

function renderTodayPick(item) {
  if (!item) return "";
  return `
    <article class="today-pick" style="--accent:var(--cyan)">
      <div class="pick-icon">${iconSvg(iconFor(item))}</div>
      <span>${esc(t("topPick"))}</span>
      <b>${esc(itemName(item))}</b>
      <p>${esc(reasonText(item))}</p>
    </article>`;
}

function renderStat(stat) {
  return `
    <article class="metric-tile" style="--accent:${tone(stat.tone)}">
      <span>${esc(statLabel(stat))}</span>
      <b>${esc(stat.value)}</b>
    </article>`;
}

function renderSection(section) {
  const accent = tone(section.accent);
  const body = section.layout === "annual"
    ? `<div class="annual-list">${section.items.map((item, index) => renderListEntry(item, index, accent, "annual-entry", section)).join("")}</div>`
    : `<div class="collection-list">${section.items.map((item, index) => renderCollectionEntry(item, index, accent, section)).join("")}</div>`;

  return `
    <section class="rank-section" id="${esc(section.id)}" style="--accent:${accent}">
      <div class="section-head">
        <div>
          <span>${esc(section.number)}</span>
          <h2>${esc(sectionTitle(section))}</h2>
        </div>
        <p>${esc(sectionSubtitle(section))}</p>
      </div>
      ${body}
    </section>`;
}

function searchableText(item) {
  return [
    item.name,
    item.englishName,
    item.kind,
    kindText(item),
    item.source,
    item.metric,
    metricText(item),
    item.type,
    typeText(item),
    item.reason,
    reasonText(item),
    item.description,
    descriptionText(item)
  ].join(" ").toLowerCase();
}

function renderListEntry(item, index, accent, extraClass = "", section = null) {
  const rank = String(index + 1).padStart(2, "0");
  return `
    <a class="rank-entry ${extraClass}" id="${esc(entryId(section, index))}" href="${esc(sourceUrl(item))}" target="_blank" rel="noopener noreferrer" style="--accent:${accent}" data-search-text="${esc(searchableText(item))}" data-section="${esc(section ? sectionTitle(section) : "")}" data-rank="${rank}" data-name="${esc(itemName(item))}" data-english-name="${esc(item.englishName)}" data-metric="${esc(metricText(item))}" data-source="${esc(item.source)}" aria-label="${esc(t("openSource"))}: ${esc(itemName(item))}">
      <div class="entry-rank">${rank}</div>
      <div class="entry-main">
        <div class="entry-title">
          <div>
            <h3>${esc(itemName(item))}</h3>
            <p>${itemMetaLine(item)}</p>
          </div>
          <strong>${esc(metricText(item))}</strong>
        </div>
        <div class="entry-tags">
          <span>${esc(typeText(item))}</span>
          <span>${esc(kindText(item))}</span>
        </div>
      </div>
      <div class="entry-explain">
        <p><b>${esc(t("why"))}</b><span>${esc(reasonText(item))}</span></p>
        <p><b>${esc(t("capability"))}</b><span>${esc(descriptionText(item))}</span></p>
        <span class="open-link">${esc(t("openSource"))}</span>
      </div>
    </a>`;
}

function renderCollectionEntry(item, index, accent, section = null) {
  if (index === 0) {
    const signal = reasonText(item).split(/[，。；;,.]/)[0];
    return `
      <a class="rank-entry collection-lead" id="${esc(entryId(section, index))}" href="${esc(sourceUrl(item))}" target="_blank" rel="noopener noreferrer" style="--accent:${accent}" data-search-text="${esc(searchableText(item))}" data-section="${esc(section ? sectionTitle(section) : "")}" data-rank="01" data-name="${esc(itemName(item))}" data-english-name="${esc(item.englishName)}" data-metric="${esc(metricText(item))}" data-source="${esc(item.source)}" aria-label="${esc(t("openSource"))}: ${esc(itemName(item))}">
        <div class="lead-badge">
          <div>${iconSvg(iconFor(item))}</div>
          <b>01</b>
          <span>TOP PICK</span>
        </div>
        <div class="lead-copy">
          <h3>${esc(itemName(item))}</h3>
          <p>${itemMetaLine(item)}</p>
          <div class="entry-tags">
            <span>${esc(typeText(item))}</span>
            <span>${esc(kindText(item))}</span>
          </div>
          <p class="lead-reason"><b>${esc(t("why"))}</b><span>${esc(reasonText(item))}</span></p>
          <p class="lead-description"><b>${esc(t("capability"))}</b><span>${esc(descriptionText(item))}</span></p>
        </div>
        <aside class="proof-list">
          <div><span>${esc(t("keyMetric"))}</span><b>${esc(metricText(item))}</b></div>
          <div><span>${esc(t("rankingSignal"))}</span><b>${esc(signal)}</b></div>
          <div><span>${esc(t("type"))}</span><b>${esc(typeText(item))}</b></div>
          <div><span>${esc(t("jump"))}</span><b>${esc(t("openSource"))}</b></div>
        </aside>
      </a>`;
  }

  return renderListEntry(item, index, accent, "compact-entry", section);
}

function renderMethodology(data) {
  return `
    <footer class="methodology" id="methodology">
      <div class="section-head">
        <div>
          <span>M</span>
          <h2>${esc(t("methodologyTitle"))}</h2>
        </div>
        <p>${esc(t("methodologySubtitle"))}</p>
      </div>
      <div class="method-grid">
        ${data.methodology.map(method => `
          <article class="method-card" style="--accent:${tone(method.tone)}">
            <div class="method-title">
              <div>${iconSvg(method.icon)}</div>
              <span>${esc(currentLang === "en" ? (METHOD_EN[method.title]?.title || method.title) : method.title)}</span>
              <p>${esc(currentLang === "en" ? (METHOD_EN[method.title]?.subtitle || method.subtitle) : method.subtitle)}</p>
            </div>
            <div class="weight-list">
              ${method.weights.map(weight => `
                <div class="weight">
                  <span>${esc(currentLang === "en" ? (WEIGHT_EN[weight.label] || weight.label) : weight.label)}</span>
                  <div><i style="--w:${Number(weight.value)}"></i></div>
                  <b>${Number(weight.value)}%</b>
                </div>`).join("")}
            </div>
          </article>`).join("")}
      </div>
      <div class="legend-row">${(currentLang === "en" ? LEGEND_EN : data.legend).map(item => `<span>${esc(item)}</span>`).join("")}</div>
      <p class="footer-note">Source snapshot: GitHub repositories, OpenAI skills, skills directory, community lists and visible discussion signals.<br>${esc(currentLang === "en" ? FOOTER_NOTE_EN : data.footerNote)}</p>
    </footer>`;
}

function applySearch(rawQuery) {
  const query = rawQuery.trim().toLowerCase();
  const entries = [...document.querySelectorAll(".rank-entry")];
  const sections = [...document.querySelectorAll(".rank-section")];
  const matches = [];
  let visible = 0;

  for (const entry of entries) {
    const matched = !query || entry.dataset.searchText.includes(query);
    entry.hidden = !matched;
    entry.classList.toggle("is-search-hit", Boolean(query && matched));
    entry.classList.remove("is-search-focus");
    if (matched) visible += 1;
    if (query && matched) matches.push(entry);
  }

  for (const section of sections) {
    section.hidden = Boolean(query && !section.querySelector(".rank-entry:not([hidden])"));
  }

  const count = document.querySelector("[data-result-count]");
  if (count) count.textContent = String(visible);

  const copy = document.querySelector("[data-result-copy]");
  if (copy) copy.textContent = query ? t("matched")(rawQuery.trim()) : t("showing");

  const empty = document.querySelector("[data-empty-search]");
  if (empty) empty.hidden = !query || visible > 0;

  const clear = document.querySelector("[data-search-clear]");
  if (clear) clear.hidden = !query;

  renderSearchResults(query, matches);
}

function renderSearchResults(query, matches) {
  const panel = document.querySelector("[data-search-results]");
  if (!panel) return;
  if (!query) {
    panel.hidden = true;
    panel.innerHTML = "";
    return;
  }

  panel.hidden = false;
  if (!matches.length) {
    panel.innerHTML = `
      <div class="search-empty">
        <b>${esc(t("searchEmptyTitle"))}</b>
        <span>${esc(t("searchEmptyHint"))}</span>
      </div>`;
    return;
  }

  panel.innerHTML = `
    <div class="search-summary">
      <b>${esc(t("matchCount")(matches.length))}</b>
      <span>${esc(t("enterHint"))}</span>
    </div>
    ${matches.slice(0, 6).map(entry => `
      <button class="search-result" type="button" data-jump-entry="${esc(entry.id)}">
        <span>${esc(entry.dataset.section)} · #${esc(entry.dataset.rank)}</span>
        <b>${esc(entry.dataset.name)}</b>
        <em>${esc(entry.dataset.metric)}</em>
      </button>`).join("")}`;
}

function jumpToFirstSearchResult() {
  const first = document.querySelector(".rank-entry.is-search-hit:not([hidden])");
  if (first) jumpToEntry(first.id);
}

function jumpToEntry(id) {
  const entry = document.getElementById(id);
  if (!entry) return;
  const section = entry.closest(".rank-section");
  if (section) section.hidden = false;
  entry.hidden = false;
  entry.classList.add("is-search-focus");
  entry.scrollIntoView({ behavior: "smooth", block: "center" });
  entry.focus({ preventScroll: true });
}

function clearSearch() {
  const input = document.querySelector("[data-search]");
  if (input) input.value = "";
  applySearch("");
  input?.focus();
}

function renderError(error) {
  app.innerHTML = `
    <div class="error-shell">
      <div>
        <b>${esc(t("loadingErrorTitle"))}</b>
        <p>${esc(error.message)}。${esc(t("loadingErrorBody")(DATA_URL))}</p>
      </div>
    </div>`;
}

loadData();
window.setInterval(() => loadData({ quiet: true }), REFRESH_INTERVAL_MS);
