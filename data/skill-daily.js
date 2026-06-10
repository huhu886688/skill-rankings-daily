window.SKILL_DAILY_DATA = {
  "title": "全网 Skill 排行榜日报",
  "subtitle": "Daily Skill Ecosystem Leaderboard",
  "eyebrow": "SKILL ECOSYSTEM RADAR",
  "snapshotDate": "2026.06.05",
  "period": "Daily live snapshot",
  "timezone": "Asia/Beijing",
  "refreshCadence": "每日 0 点自动更新",
  "sourceSummary": "单 Skill 综合榜：父仓库热度、复用引用、安装可见、场景覆盖。",
  "sourceChips": [
    "综合影响力分",
    "父仓库 stars / forks",
    "下载/安装可见度",
    "跨仓库引用",
    "场景复用价值"
  ],
  "stats": [
    {
      "label": "年度榜",
      "value": "Top 10",
      "tone": "cyan"
    },
    {
      "label": "月度榜",
      "value": "Top 5",
      "tone": "green"
    },
    {
      "label": "专项榜",
      "value": "4 x Top 5",
      "tone": "violet"
    },
    {
      "label": "更新频率",
      "value": "Daily",
      "tone": "cyan"
    }
  ],
  "insights": [
    {
      "title": "生态入口类 skill 继续领跑",
      "body": "技能创建器、找技能与安装位居年度前列，说明社区增长首先依赖创建、发现、安装这条基础链路。",
      "tone": "cyan"
    },
    {
      "title": "开发工作流正在快速主流化",
      "body": "AI 编程工程技能、Claude Code 工作流、Copilot 配置集中上榜，coding agent skill 正从提示词走向可复用工程流程。",
      "tone": "green"
    },
    {
      "title": "办公与视觉交付仍是稳定主线",
      "body": "前端设计、演示文稿、文档/PDF、表格分析覆盖真实交付场景，复用频率稳定，是最容易被用户感知价值的方向。",
      "tone": "violet"
    }
  ],
  "sections": [
    {
      "id": "annual",
      "number": "01",
      "title": "年度社区影响力榜 Top 10",
      "subtitle": "综合父仓库热度、复用引用、安装可见、场景覆盖与独立可用性排序。",
      "accent": "cyan",
      "layout": "annual",
      "items": [
        {
          "name": "技能创建器",
          "englishName": "Skill Creator",
          "kind": "生态基础",
          "source": "anthropics/skills",
          "url": "https://github.com/anthropics/skills",
          "metric": "父仓库约 145K ★",
          "type": "单 Skill 综合影响力",
          "reason": "上榜理由：定义和扩展 skill 的基础能力，受官方仓库高热度、跨生态引用和安装需求共同加权。",
          "description": "帮助用户把经验、工具链和流程封装成可复用的 SKILL.md，是整个 Agent Skill 生态的生产入口。"
        },
        {
          "name": "找技能与安装",
          "englishName": "Find and Install Skills",
          "kind": "生态入口",
          "source": "anthropics/skills",
          "url": "https://github.com/topics/agent-skills",
          "metric": "目录 / 安装入口",
          "type": "单 Skill 综合影响力",
          "reason": "上榜理由：新用户接触 skill 生态时最先需要发现、比较和安装，目录热度与跨仓库入口价值很高。",
          "description": "帮助用户在公开仓库和社区目录中发现可用 skill，判断来源可信度，并进入安装或复用流程。"
        },
        {
          "name": "前端设计",
          "englishName": "Frontend Design",
          "kind": "设计交付",
          "source": "nexu-io/open-design",
          "url": "https://github.com/nexu-io/open-design",
          "metric": "父仓库约 57.3K ★",
          "type": "单 Skill 综合影响力",
          "reason": "上榜理由：设计类父仓库热度高，且前端界面是 coding agent 最常见的真实交付场景之一。",
          "description": "帮助 agent 处理页面布局、视觉层级、字体、配色、响应式、可用性和产品级细节。"
        },
        {
          "name": "AI 编程工程技能",
          "englishName": "AI Coding Agent Engineering",
          "kind": "开发编程",
          "source": "addyosmani/agent-skills",
          "url": "https://github.com/addyosmani/agent-skills",
          "metric": "父仓库约 47.7K ★",
          "type": "单 Skill 综合影响力",
          "reason": "上榜理由：工程向 agent skills 拥有高父仓库热度，且开发、调试、测试、重构是最高频 agent 使用场景。",
          "description": "把代码生成、调试、架构判断、测试修复、性能优化和工程交付流程组织成可复用技能。"
        },
        {
          "name": "Claude Code 工作流",
          "englishName": "Claude Code Workflow",
          "kind": "开发编程",
          "source": "hesreallyhim/awesome-claude-code",
          "url": "https://github.com/hesreallyhim/awesome-claude-code",
          "metric": "父仓库约 45.4K ★",
          "type": "单 Skill 综合影响力",
          "reason": "上榜理由：Claude Code 的 commands、hooks、agents 与 skills 被大量开发者复用，工程工作流引用信号强。",
          "description": "帮助用户把 Claude Code 的命令、钩子、子代理和自动化流程组织成稳定可复用的编码工作流。"
        },
        {
          "name": "技能市场与批量安装",
          "englishName": "Skill Marketplace and Installer",
          "kind": "生态入口",
          "source": "sickn33/antigravity-awesome-skills",
          "url": "https://github.com/sickn33/antigravity-awesome-skills",
          "metric": "父仓库约 39.4K ★",
          "type": "单 Skill 综合影响力",
          "reason": "上榜理由：可安装 skills 库和 installer CLI 把发现、下载、安装、bundle 复用串起来，安装信号权重高。",
          "description": "帮助用户批量浏览、安装、组合和迁移 skills，让不同 agent CLI 之间的技能复用更容易。"
        },
        {
          "name": "Copilot 指令与 Agent 配置",
          "englishName": "Copilot Instructions and Agents",
          "kind": "开发编程",
          "source": "github/awesome-copilot",
          "url": "https://github.com/github/awesome-copilot",
          "metric": "父仓库约 34.3K ★",
          "type": "单 Skill 综合影响力",
          "reason": "上榜理由：GitHub 官方社区合集带来强公信力，instructions、agents 和 skills 配置在开发者生态中复用度高。",
          "description": "帮助用户配置 Copilot instructions、agents、prompt files 和工作流，让 Copilot 更贴合项目上下文。"
        },
        {
          "name": "演示文稿生成",
          "englishName": "Presentation Generation",
          "kind": "办公交付",
          "source": "openai/skills",
          "url": "https://github.com/search?q=Presentation+Generation+skill&type=repositories",
          "metric": "交付场景强",
          "type": "单 Skill 综合影响力",
          "reason": "上榜理由：PPT/幻灯片是高频可见交付物，独立项目和官方 skill 都有明显复用信号。",
          "description": "帮助 agent 从主题、提纲、材料和视觉风格生成可交付演示稿，并支持渲染、排版和检查。"
        },
        {
          "name": "文档与 PDF 处理",
          "englishName": "Documents and PDF Processing",
          "kind": "办公交付",
          "source": "openai/skills",
          "url": "https://github.com/search?q=Documents+PDF+skill&type=repositories",
          "metric": "官方复用强",
          "type": "单 Skill 综合影响力",
          "reason": "上榜理由：正式文档、PDF 阅读、批注、排版和核验是稳定高频场景，官方共享 skill 复用价值高。",
          "description": "处理 Word、PDF、长文档、批注、修订和视觉核验，适合报告、合同、说明书和知识材料。"
        },
        {
          "name": "表格与数据分析",
          "englishName": "Spreadsheet and Data Analysis",
          "kind": "数据分析",
          "source": "openai/skills",
          "url": "https://github.com/search?q=Spreadsheet+Data+Analysis+skill&type=repositories",
          "metric": "办公数据高频",
          "type": "单 Skill 综合影响力",
          "reason": "上榜理由：CSV/XLSX 清洗、公式、图表和报表是高频办公与数据场景，跨任务复用度高。",
          "description": "帮助 agent 读取表格、清洗数据、建立公式、生成图表和格式化报表。"
        }
      ]
    },
    {
      "id": "monthly",
      "number": "02",
      "title": "月度增长趋势榜 Top 5",
      "subtitle": "衡量近 30 天增长、近期更新、目录热度、讨论频率和场景清晰度。",
      "accent": "green",
      "layout": "featured",
      "items": [
        {
          "name": "找技能",
          "englishName": "Find Skills",
          "kind": "生态入口",
          "source": "vercel-labs/skills",
          "metric": "生态入口 / 目录热度",
          "type": "生态入口型",
          "reason": "上榜理由：新用户新增 skill 前会优先搜索它。",
          "description": "解决发现、验证、安装和比较开放生态 skills 的问题。"
        },
        {
          "name": "归藏 PPT 技能",
          "englishName": "Guizang PPT Skill",
          "kind": "独立项目",
          "source": "gp7418/guizang-ppt",
          "metric": "12.2K ★ / 935 forks",
          "type": "独立项目型",
          "reason": "上榜理由：演示稿生成需求近期仍强。",
          "description": "可生成单页 HTML、幻灯片、配图提示和排版方案。"
        },
        {
          "name": "Codex 技能精选集",
          "englishName": "Awesome Codex Skills",
          "kind": "社区索引",
          "source": "Copilot9/awesome-codex-skills",
          "metric": "11.7K ★ / 1.1K forks",
          "type": "社区索引型",
          "reason": "上榜理由：持续被用作工作流选型入口。",
          "description": "把分散的 Codex 场景整理成可浏览集合。"
        },
        {
          "name": "Agent 技能索引",
          "englishName": "Agent Skill Index",
          "kind": "社区索引",
          "source": "heilcheng/awesome-agent-skills",
          "metric": "5.1K ★ / 458 forks",
          "type": "社区索引型",
          "reason": "上榜理由：跨平台 agent skill 目录价值明显。",
          "description": "帮助用户对比不同 agent 生态里的技能资源。"
        },
        {
          "name": "Draw.io 图表技能",
          "englishName": "Draw.io Skill",
          "kind": "独立项目",
          "source": "Agents365-ai/drawio-skill",
          "metric": "1.9K ★ / 115 forks",
          "type": "独立项目型",
          "reason": "上榜理由：图表自动化交付需求升温。",
          "description": "让 agent 生成并自检可编辑 draw.io 架构图、流程图和序列图。"
        }
      ]
    },
    {
      "id": "data",
      "number": "03",
      "title": "数据分析 Top 5",
      "subtitle": "按数据分析领域内部排序，关注数据处理完整度、输出质量和可复用性。",
      "accent": "violet",
      "layout": "featured",
      "items": [
        {
          "name": "表格分析",
          "englishName": "Spreadsheets",
          "kind": "官方共享",
          "source": "openai/skills",
          "metric": "20.5K ★",
          "type": "官方共享型",
          "reason": "上榜理由：数据清洗、公式和报表输出覆盖面最广。",
          "description": "读取 XLSX/CSV，做数据清洗、公式、图表和格式化报表。"
        },
        {
          "name": "论文上下文解析",
          "englishName": "Paper Context Resolver",
          "kind": "专项场景",
          "source": "community skill",
          "metric": "场景价值分",
          "type": "专项场景型",
          "reason": "上榜理由：研究复现链路清晰。",
          "description": "整理论文复现所需的数据、代码、环境和实验步骤。"
        },
        {
          "name": "SEO 审计",
          "englishName": "SEO Audit",
          "kind": "专项场景",
          "source": "community skill",
          "metric": "场景价值分",
          "type": "专项场景型",
          "reason": "上榜理由：站点增长和内容运营需求明确。",
          "description": "检查网页结构、关键词、内容质量和可见度问题。"
        },
        {
          "name": "云成本优化",
          "englishName": "Azure Cost Optimization",
          "kind": "专项场景",
          "source": "community skill",
          "metric": "场景价值分",
          "type": "专项场景型",
          "reason": "上榜理由：云账单分析有明确 ROI。",
          "description": "分析资源利用率、账单结构和浪费项，给出降本建议。"
        },
        {
          "name": "数据可视化",
          "englishName": "Data Visualization",
          "kind": "专项场景",
          "source": "community skill",
          "metric": "场景价值分",
          "type": "专项场景型",
          "reason": "上榜理由：分析结果需要可视化表达。",
          "description": "把原始数据转成图表、仪表盘和解释性结论。"
        }
      ]
    },
    {
      "id": "design",
      "number": "04",
      "title": "设计与多媒体 Top 5",
      "subtitle": "按设计与多媒体领域内部排序，关注视觉产出质量和交付效率。",
      "accent": "violet",
      "layout": "featured",
      "items": [
        {
          "name": "前端设计",
          "englishName": "Frontend Design",
          "kind": "官方共享",
          "source": "openai/skills",
          "metric": "20.5K ★",
          "type": "官方共享型",
          "reason": "上榜理由：开发交付里最常被复用。",
          "description": "优化页面布局、字体、颜色、状态、响应式和可用性细节。"
        },
        {
          "name": "图像生成",
          "englishName": "Image Generation",
          "kind": "官方共享",
          "source": "openai/skills",
          "metric": "20.5K ★",
          "type": "官方共享型",
          "reason": "上榜理由：海报、产品图和素材生产需求广。",
          "description": "生成图片资产，并要求保存文件和检查画面质量。"
        },
        {
          "name": "Remotion 视频",
          "englishName": "Remotion Best Practices",
          "kind": "专项场景",
          "source": "community skill",
          "metric": "场景价值分",
          "type": "专项场景型",
          "reason": "上榜理由：视频自动化交付价值高。",
          "description": "用代码生成视频模板、字幕、转场和批量素材。"
        },
        {
          "name": "网页设计指南",
          "englishName": "Web Design Guidelines",
          "kind": "专项场景",
          "source": "community skill",
          "url": "https://github.com/nexu-io/open-design",
          "metric": "场景价值分",
          "type": "专项场景型",
          "reason": "上榜理由：网页设计规范能显著提升落地质量。",
          "description": "提供信息架构、视觉层级和响应式细节建议。"
        },
        {
          "name": "UI/UX Pro Max",
          "englishName": "UI UX Pro Max",
          "kind": "专项场景",
          "source": "community skill",
          "metric": "场景价值分",
          "type": "专项场景型",
          "reason": "上榜理由：产品体验细节优化需求稳定。",
          "description": "发现交互、信息层级和视觉一致性问题。"
        }
      ]
    },
    {
      "id": "docs",
      "number": "05",
      "title": "文档办公 Top 5",
      "subtitle": "按办公交付场景内部排序，关注文档生成、核验和协作复用。",
      "accent": "green",
      "layout": "featured",
      "items": [
        {
          "name": "演示文稿",
          "englishName": "Presentations",
          "kind": "官方共享",
          "source": "openai/skills",
          "metric": "20.5K ★",
          "type": "官方共享型",
          "reason": "上榜理由：路演、汇报和方案交付频率高。",
          "description": "创建、修改、渲染并检查 PPTX。"
        },
        {
          "name": "Word 文档",
          "englishName": "Documents",
          "kind": "官方共享",
          "source": "openai/skills",
          "metric": "20.5K ★",
          "type": "官方共享型",
          "reason": "上榜理由：正式文档的生成和核验需求稳定。",
          "description": "创建、编辑、批注和视觉核验 DOCX。"
        },
        {
          "name": "PDF 处理",
          "englishName": "PDF",
          "kind": "官方共享",
          "source": "openai/skills",
          "metric": "20.5K ★",
          "type": "官方共享型",
          "reason": "上榜理由：长文档读取和抽取是高频办公任务。",
          "description": "读取、抽取、总结和转换 PDF 内容。"
        },
        {
          "name": "会议纪要",
          "englishName": "Lark Minutes",
          "kind": "专项场景",
          "source": "community skill",
          "metric": "场景价值分",
          "type": "专项场景型",
          "reason": "上榜理由：会议内容需要沉淀成行动项。",
          "description": "整理会议转写、决策摘要和任务清单。"
        },
        {
          "name": "产品需求文档",
          "englishName": "To PRD",
          "kind": "专项场景",
          "source": "community skill",
          "metric": "场景价值分",
          "type": "专项场景型",
          "reason": "上榜理由：把零散想法结构化成 PRD 的价值高。",
          "description": "适合需求澄清、版本规划和产品协作。"
        }
      ]
    },
    {
      "id": "dev",
      "number": "06",
      "title": "开发编程 Top 5",
      "subtitle": "按开发工作流内部排序，关注代码交付覆盖面、维护活跃和可落地程度。",
      "accent": "cyan",
      "layout": "featured",
      "items": [
        {
          "name": "前端设计",
          "englishName": "Frontend Design",
          "kind": "官方共享",
          "source": "openai/skills",
          "metric": "20.5K ★",
          "type": "官方共享型",
          "reason": "上榜理由：代码能跑之后，最需要它提升产品质感。",
          "description": "解决前端页面的视觉、交互、响应式和落地体验问题。"
        },
        {
          "name": "GitHub 工作流",
          "englishName": "GitHub",
          "kind": "官方共享",
          "source": "GitHub plugin",
          "metric": "共享口径",
          "type": "官方共享型",
          "reason": "上榜理由：覆盖 PR、Issue、CI 和发布协作。",
          "description": "适合处理代码评审、修复检查和仓库上下文。"
        },
        {
          "name": "代码安全扫描",
          "englishName": "Codex Security",
          "kind": "官方共享",
          "source": "Codex Security plugin",
          "metric": "共享口径",
          "type": "官方共享型",
          "reason": "上榜理由：安全审查流程完整。",
          "description": "覆盖威胁建模、发现、验证、攻击路径分析和修复建议。"
        },
        {
          "name": "插件创建器",
          "englishName": "Plugin Creator",
          "kind": "专项场景",
          "source": "local skill",
          "metric": "专项场景",
          "type": "专项场景型",
          "reason": "上榜理由：帮助把能力封装成 Codex plugin。",
          "description": "创建 manifest、目录结构和个人市场条目。"
        },
        {
          "name": "技能创建器",
          "englishName": "Skill Creator",
          "kind": "专项场景",
          "source": "local skill",
          "metric": "专项场景",
          "type": "专项场景型",
          "reason": "上榜理由：开发者能把团队 SOP 固化成 skill。",
          "description": "解决工作流沉淀、复用和分发的问题。"
        }
      ]
    }
  ],
  "methodology": [
    {
      "title": "年度榜怎么排",
      "subtitle": "单 Skill 综合影响力分",
      "icon": "star",
      "tone": "cyan",
      "weights": [
        {
          "label": "父仓库热度",
          "value": 30
        },
        {
          "label": "复用引用",
          "value": 25
        },
        {
          "label": "安装可见",
          "value": 20
        },
        {
          "label": "场景覆盖",
          "value": 15
        },
        {
          "label": "独立可用",
          "value": 10
        }
      ]
    },
    {
      "title": "月度榜怎么排",
      "subtitle": "近期趋势综合分",
      "icon": "trend",
      "tone": "green",
      "weights": [
        {
          "label": "30d 增长",
          "value": 35
        },
        {
          "label": "更新",
          "value": 15
        },
        {
          "label": "讨论",
          "value": 20
        }
      ]
    },
    {
      "title": "专项榜怎么排",
      "subtitle": "场景价值综合分",
      "icon": "layers",
      "tone": "violet",
      "weights": [
        {
          "label": "相关性",
          "value": 30
        },
        {
          "label": "复用性",
          "value": 15
        },
        {
          "label": "可信源",
          "value": 20
        }
      ]
    }
  ],
  "legend": [
    "影响力 = 多因子加权分",
    "父仓库热度 = stars / forks / topic 信号",
    "安装可见 = 目录、installer、下载入口信号",
    "复用引用 = 跨仓库收录、社区索引、工作流引用",
    "专项榜 = 具体能力/场景价值",
    "场景价值分 = 领域内综合分"
  ],
  "footerNote": "年度榜不是仓库 stars 直排，而是单个 Skill 的社区影响力综合分；父仓库 stars/forks 只是热度信号之一，还会结合安装/目录可见度、跨仓库引用、场景覆盖和独立可用性。专项榜继续按具体领域内的能力价值排序。",
  "generatedAt": "2026-06-04T17:37:24.853Z"
};
