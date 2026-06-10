# 全网 Skill 排行榜日报

一个公开静态版 Skill 排行榜产品。页面本身是静态 HTML/CSS/JS，榜单数据由 `data/skill-daily.json` 驱动，并通过 GitHub Actions 每天自动刷新。

## 本地预览

直接打开 `index.html` 可以预览，页面会读取 `data/skill-daily.js` 作为本地 fallback 数据。

也可以用本地 HTTP 服务预览：

```bash
python3 -m http.server 4173
```

然后打开：

```text
http://localhost:4173
```

## 数据更新

手动生成今日数据：

```bash
npm run generate
```

校验数据和本地 fallback 是否同步：

```bash
npm run validate
```

脚本会做三件事：

- 把快照日期刷新为北京时间当天。
- 尝试从 GitHub API 更新公开仓库 stars/forks 等可见指标。
- 同步生成 `data/skill-daily.js`，保证直接打开本地 HTML 也能看到最新数据。

## 每天 0 点自动更新

`.github/workflows/update-daily.yml` 已配置定时任务：

```text
0 16 * * * UTC
```

对应北京时间每天 0 点。GitHub Actions 的定时任务可能会有几分钟延迟，这是 GitHub 平台正常现象。

工作流会：

1. 拉取仓库代码。
2. 执行 `npm run generate`。
3. 执行 `npm run validate`。
4. 如果数据有变化，自动提交 `data/skill-daily.json` 和 `data/skill-daily.js`。

## 发布到 Cloudflare Pages

推荐使用 Cloudflare Pages 免费地址，不需要自有域名。

1. 在 GitHub 新建一个公开仓库，例如 `skill-rankings-daily`。
2. 把本目录里的所有文件提交到这个仓库。
3. 打开 Cloudflare Dashboard，进入 `Workers & Pages`。
4. 选择 `Create application` -> `Pages` -> `Connect to Git`。
5. 选择刚才的 GitHub 仓库。
6. 构建设置：
   - Framework preset: `None`
   - Build command: `npm run build`
   - Build output directory: `.`
7. 保存并部署。

部署成功后，Cloudflare 会给一个免费地址，通常类似：

```text
https://skill-rankings-daily.pages.dev
```

## GitHub Actions 权限

为了让每日任务能把新数据提交回仓库，需要在 GitHub 仓库里确认：

1. `Settings` -> `Actions` -> `General`
2. 找到 `Workflow permissions`
3. 选择 `Read and write permissions`
4. 保存

如果以后接入更多数据源，不要把 token 写进代码。请放在 GitHub `Settings` -> `Secrets and variables` -> `Actions` 里。

## 当前内容结构

- 本日洞察
- 年度社区影响力榜 Top 10
- 月度增长趋势榜 Top 5
- 数据分析 Top 5
- 设计与多媒体 Top 5
- 文档办公 Top 5
- 开发编程 Top 5
- 排名方法与数据含义

## 设计规范

设计原则、文案口径和不可删减的信息项见 `DESIGN.md`。
