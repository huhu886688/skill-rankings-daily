# DESIGN.md

## Product

Name: 全网 Skill 排行榜日报

Purpose: A daily, data-dense Skill community ranking dashboard. It helps readers quickly understand which skills matter, why they rank, what they do, and how the ranking logic works.

Audience: AI power users, Codex users, builders, product/design operators, and people tracking the public Skill ecosystem.

Core promise: The page must feel like a premium daily intelligence product, not a marketing landing page and not a poster converted into HTML.

Publishing target: a public static product on Cloudflare Pages, deployed from a GitHub repository. The default public URL can use Cloudflare's free `pages.dev` domain.

Update cadence: daily at 00:00 Beijing time. GitHub Actions generates the latest static JSON snapshot and Cloudflare Pages serves the updated static site.

## Visual Theme & Atmosphere

Direction: calm authoritative skill directory.

The interface should feel:

- premium, calm, and precise
- data-rich but readable
- lightly technical, never noisy
- editorial enough to explain rankings clearly
- dashboard-like enough for daily reuse
- clearly green-teal led, with a warm-gold signal accent

The most memorable visual signature is the signal fan radar mark in the hero area. It implies all-network scanning and signal convergence without becoming a literal data-source diagram. Its palette should follow green-teal signals with a restrained warm-gold highlight.

Avoid:

- generic purple gradient SaaS look
- heavy black-gold density
- playful mascot-first design
- marketing hero layout
- decorative blobs, random orbs, bokeh, or meaningless background art
- cards inside cards
- huge empty spaces in ranking sections
- long-poster composition copied directly into the browser
- cold blue-black poster styling

## Content Invariants

Never remove ranking information for style reasons.

Every ranked item must include:

- rank number
- Chinese name
- English name
- type label
- source or repository
- key metric
- reason for ranking
- capability explanation

Required sections:

- 本日洞察
- 年度社区影响力榜 Top 10
- 月度增长趋势榜 Top 5
- 数据分析 Top 5
- 设计与多媒体 Top 5
- 文档办公 Top 5
- 开发编程 Top 5
- 排名方法与数据含义

The Chinese page title must be:

全网 Skill 排行榜日报

The English page title should be:

Skill Rankings Daily

Do not use:

- 全员全网
- Codex Skills 社区周报
- Skill 社区周报 as the main title
- All-Network Skill Community Daily

## Color Palette & Roles

Base surfaces:

- bg: `#f5faf8` for page background
- bg-2: `#eef7f4` for soft green page bands
- panel: `rgba(255, 255, 255, .86)` for primary content panels
- panel-2: `rgba(255, 255, 255, .94)` for ranking cards
- panel-3: `rgba(235, 247, 243, .78)` for secondary controls

Text:

- text: `#203b35` for primary text
- soft: `#435d56` for body explanations
- muted: `#657a74` for metadata and secondary labels
- faint: `#8aa19a` for low-priority hints

Accents:

- teal: `#2d8b78` for annual榜, radar signal, primary scan energy
- fresh teal: `#3aa58f` for monthly trend and growth signals
- muted teal: `#5b8d83` for specialty and method highlights
- warm gold: `#d49345` for recommendation, proof, and high-value callouts

Rules:

- Use accents sparingly as signal colors, not as large text backgrounds.
- Body copy should sit on calm light surfaces with strong contrast.
- Avoid high-saturation backgrounds behind paragraphs.
- Avoid returning to the earlier multicolor poster palette or blue-black dashboard palette unless explicitly requested.
- Do not use warm gold as a normal section, insight, or methodology identity color; it is only a small highlight.

## Typography Rules

Preferred font stack:

- Display: `"Readex Pro", "Noto Sans SC", "PingFang SC", sans-serif`
- Body: `"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`

Hierarchy:

- H1: 82px desktop, 68px tablet, 50px mobile
- Section title: 35px desktop, 28px mobile
- Insight title: 34px desktop, 28px mobile
- Card title: 19px
- Body explanation: 13px to 14px, line-height at least 1.65
- Metadata: 11px to 12px

Rules:

- Letter spacing must be `0`.
- Do not scale font size with viewport width.
- Do not use tiny body text to force content into a card.
- If content is long, expand the card height naturally.
- Keep Chinese text crisp and high contrast.

## Layout Principles

Overall layout:

- Max content width around 1360px.
- Use a product-style shell: sticky topbar, global search, hero, briefing board, metric strip, left index navigation, right content flow.
- First viewport should show product identity, radar mark, refresh status, briefing insights, and the beginning of the ranking system.
- Use a sticky left index on desktop for scanning long content.
- On tablet and mobile, collapse the index into a horizontal scroll nav.
- Use full-width page flow, not a poster canvas.

Header:

- Topbar: brand lockup on the left, global search in the center, live update status and refresh action on the right.
- Hero left side: label, title, subtitle, source chips.
- Hero right side: signal fan radar mark and snapshot metadata.
- Do not put multiple white stat boxes in the header.
- Do not draw lines through chips, labels, or visual marks.
- The signal fan should be decorative and light; it must not compete with the title.

Briefing layout:

- Use one large lead insight, two compact secondary insights, and a "今日优先看" skill recommendation.
- The briefing should feel editorial, closer to a daily intelligence memo than a poster intro card.
- The lead insight may be larger, but its copy must wrap cleanly and remain readable.

Ranking layout:

- Annual Top 10 uses a GitHub Trending-like scannable list, not large equal cards.
- Annual Top 10 is a single-Skill community influence ranking, not a repository Most-stars ranking. Parent repository stars/forks are only one signal; also weigh install/download visibility, cross-repository citations, directory presence, scenario coverage, and whether the skill can be used independently.
- Monthly and specialty榜 use a Raycast/Product Hunt-like collection layout: one lead Top Pick row plus compact explanatory rows.
- On mobile, all cards collapse to one column.
- Avoid empty horizontal strips. If a section has spare space, use structured chips, proof panels, or two-column compact cards.
- Ranking sections should feel like scannable intelligence modules, not poster blocks.

Top 1 hero card:

- Left: icon, rank, TOP PICK label.
- Middle: complete item identity and explanation.
- Right: proof chips for key metric, ranking signal, and口径类型.
- The hero card should feel special but not oversized.

## Component Styling

Cards:

- Border radius: 8px.
- Border: subtle green-gray line, usually `#d5e7e1`.
- Background: white or soft green panel with a restrained teal wash.
- No nested card shells.
- Each card may have a 4px left accent rule.

Search:

- Global search should filter rendered skill entries by name, source, type, metric, reason, and capability.
- Search must not remove content from the source data; it only hides unmatched visible entries.
- Default state must show all ranking content.

Links:

- Every visible skill entry must be a clickable module.
- Public repository-backed skills should link to the best known GitHub repository or skill directory.
- Installed local or official shared skills should link to a public repository, repository code search, or GitHub repository search.
- If a unique source is unknown, link to a GitHub repository search for that skill instead of leaving the card inert.
- Do not expose machine-local `.codex` cache paths in user-facing links.
- Clickable cards must have a visible "打开来源" affordance or equivalent cue.

Chips:

- Use pill chips for metadata and source categories.
- Chips should be low contrast, compact, and readable.
- Avoid turning long paragraphs into chips.

Buttons:

- Use icon + short label for commands like refresh.
- Button radius may be pill-shaped when it is a command control.
- Hover should lift slightly and brighten the border.

Methodology:

- Must be designed, not plain footnote text.
- Use three method cards:
  - 年度榜怎么排
  - 月度榜怎么排
  - 专项榜怎么排
- Include icon, subtitle, and weight bars.
- Include data meaning chips for stars, forks, 共享口径, 目录热度, 场景价值分.
- Make the grain clear: 年度榜 = single Skill 综合影响力; 专项榜 = concrete scenario value within one domain.

## Depth & Elevation

Use depth quietly:

- Primary panels: soft shadow around `0 18px 54px rgba(36,75,66,.10)`.
- Ranking cards: smaller shadow around `0 14px 34px rgba(36,75,66,.08)`.
- Accent glow is allowed only for radar signal and active status.

Do not use:

- glossy glassmorphism everywhere
- large glow behind every card
- bright color fogs under body text

## Motion & Interaction

Motion should feel like an intelligence product refreshing, not a game.

Allowed:

- subtle page load rise
- hover lift on refresh button
- active green status dot glow
- sticky nav hover state

Avoid:

- constant animated backgrounds
- spinning decorative radar if it distracts from reading
- animation that shifts card layout

Respect `prefers-reduced-motion`.

## Responsive Behavior

Breakpoints:

- Desktop: two-column annual and compact grids.
- Tablet under 1040px: header collapses to one column; proof panel moves below hero content.
- Mobile under 820px: all ranking cards become one column; hero card stacks vertically.

Rules:

- No horizontal overflow.
- Text must wrap inside cards.
- Long repository names and metrics must not push card width.
- Navigation can scroll horizontally.

## Accessibility & Readability

Minimum goals:

- Body text must remain readable on light surfaces.
- Color cannot be the only information carrier; use labels and section titles.
- Buttons need clear visible text.
- Avoid tiny low-contrast Chinese text.
- Keep semantic section structure.

## Do's

- Preserve all ranking content.
- Prefer dense but organized information.
- Use accents to identify榜单类型.
- Keep the signal fan radar as the header signature.
- Make reasons and capability explanations easy to find.
- Keep the bottom methodology visually structured.

## Don'ts

- Do not redesign into a landing page.
- Do not remove explanations to make cards shorter.
- Do not hide the methodology in a tiny footnote.
- Do not use giant hero imagery.
- Do not use generic AI gradients.
- Do not use one-note black-gold density.
- Do not let text overflow cards.
- Do not make Top 1 visually disconnected from the rest of the section.

## Agent Prompt Guide

When asked to update this UI, follow this prompt:

Use `DESIGN.md` as the visual contract. Keep the full Skill ranking content intact. Build a calm authoritative skill directory with Readex Pro + Noto Sans SC, green-teal primary identity, warm-gold small accents, sticky topbar, global search, hero, signal fan radar signature, editorial briefing board, metric strip, sticky index navigation, annual scannable ranking list, monthly/specialty collection layouts with Top Pick lead rows, and designed methodology footer. Improve readability, density, spacing, or daily update affordances without changing the ranking logic or removing explanations.
