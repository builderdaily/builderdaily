# Builder Daily

[English](#english) | [中文](#中文)

## English

Builder Daily is an open-source daily research site for turning fast-moving AI
and developer-tooling signals into concrete business webapp opportunities.

It is intentionally narrow: it is not a news feed, a launch tracker, or another
AI hype board. Each daily article asks one practical question:

> If a builder had to ship a commercial webapp from today's AI signals, what is
> the highest-value opportunity worth validating first?

Production site:

```text
https://builderdaily.news
```

Repository:

```text
https://github.com/builderdaily/builderdaily
```

### Why This Exists

AI news moves too quickly for builders to turn it into product judgment. Model
launches, agent frameworks, security incidents, infrastructure changes, and
platform shifts all arrive as scattered links. Most summaries stop at "what
happened"; Builder Daily tries to answer "what can be built and sold from this?"

Each daily report filters the day's signals through a business lens:

- Is there a real buyer with urgency?
- What are users doing today instead?
- Can the opportunity be tested with a narrow MVP?
- Is there a plausible acquisition channel?
- What platform, legal, trust, or competition risks matter?
- Which single opportunity deserves deeper work first?

### What Is In The Site

The current static site includes:

- A dated archive of AI opportunity reports.
- Source tags that distinguish AI HOT, AI HOT daily fallback, BuilderPulse, and
  other original sources.
- Source links on both article pages and opportunity cards.
- Scored opportunity cards for commercial value, traffic potential, and
  validation wedge.
- A deep-dive page for the top opportunity of the latest report.
- Dark mode.
- Static deployment support for GitHub Pages, Cloudflare Pages, Netlify, Vercel,
  or any plain file server.

### Current Research Sources

Builder Daily currently uses two primary signal streams:

- **AI HOT**: daily and all-pool AI trend items from `aihot.virxact.com`.
- **BuilderPulse**: builder and developer-tooling signals from
  `github.com/BuilderPulse/BuilderPulse`.

When the AI HOT full-pool window does not cover an older date, the article marks
that date as an AI HOT daily fallback instead of pretending it was full-pool
coverage.

### Repository Structure

```text
.
├── index.html              # Static HTML shell
├── CNAME                   # Custom domain for static hosting
├── assets/
│   ├── app.js              # Hash-router, rendering, filtering, article pages
│   └── styles.css          # Responsive layout, dark mode, cards, research UI
└── data/
    └── articles.js         # Daily report data and deep-dive content
```

There is no build step. This is deliberate: the project should be easy to fork,
audit, deploy, and contribute to.

### Local Development

Serve the repository root with any static file server:

```powershell
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

You can also use any other static server, for example:

```powershell
npx serve .
```

### Validation

The site is plain JavaScript. Before committing content or UI changes, run:

```powershell
node --check assets\app.js
node --check data\articles.js
```

For UI changes, open the site in a browser and check:

- Homepage article spacing and archive navigation.
- Article pages and source links.
- Top-opportunity deep-dive pages.
- Dark mode contrast.
- Mobile layout around `390px` width.

### Content Model

Daily reports live in `data/articles.js` under:

```js
window.AI_OPPORTUNITY_ARTICLES = [
  {
    date,
    title,
    summary,
    tags,
    sourceTags,
    scores,
    winner,
    conclusion,
    opportunities,
    rejected,
    sources,
  },
];
```

Each report should include at least three opportunities. Every opportunity should
cover:

- `demand`: why the need is real.
- `statusQuo`: what users do today.
- `wedge`: the narrowest useful MVP.
- `distribution`: how the product can acquire customers.
- `risk`: what could kill the idea.
- `validation`: the next practical test.

The top opportunity can also include a `deepDive` object with:

- Why now.
- MVP phases.
- Technical feasibility.
- Go-to-market plan.
- Pricing.
- Validation plan.
- Risks and mitigations.

### Editorial Standard

Builder Daily should be useful to someone deciding what to build next. A good
article is specific enough that a builder can leave with a concrete test plan.

Preferred writing style:

- Write from evidence, not vibes.
- Link to source material for traceability.
- Separate traffic potential from commercial value.
- Prefer narrow, testable products over broad platform ideas.
- Be explicit about buyer, workflow, risk, and first validation step.
- Do not turn every model launch into a startup idea.

### Deployment

Because this is a static site, deployment is simple:

- GitHub Pages: serve `main` from `/`.
- Cloudflare Pages: framework preset `None`, build command empty, output
  directory `/`.
- Vercel/Netlify: static project with no build command.

The intended custom domain is:

```text
builderdaily.news
```

### Contributing

Contributions are welcome when they improve research quality, source coverage,
or the reading experience.

Useful contribution types:

- Add a new daily report.
- Add or improve a top-opportunity deep dive.
- Improve source attribution and link quality.
- Improve mobile, dark mode, or accessibility.
- Add lightweight validation tooling that keeps the project static-first.

Please keep changes focused. If you add a daily report, include source links and
make sure the top opportunity is connected to its source material.

### License

No license has been selected yet. Until a license is added, all rights are
reserved by the repository owner.

## 中文

Builder Daily 是一个开源的每日 AI 商业机会研究站点。它把快速变化的
AI、Agent、开发者工具和基础设施信号，转化成更具体、可验证、可做成
商业 WebApp 的机会判断。

这个项目不是新闻聚合，也不是产品发布清单，更不是泛泛的 AI 热点榜。
每一篇日报只回答一个问题：

> 如果一个 builder 今天必须从 AI 热点里选一个商业 WebApp 去验证，哪个机会最值得先做？

线上站点：

```text
https://builderdaily.news
```

代码仓库：

```text
https://github.com/builderdaily/builderdaily
```

### 为什么做这个项目

AI 新闻太快了。模型发布、Agent 框架、安全事故、基础设施变化、平台策略
每天都在变，但大多数摘要只停在“发生了什么”。Builder Daily 关心的是：
这些信号背后有没有真实买家、真实预算和可以一周内验证的产品切口。

每篇日报会从商业角度过滤当天信号：

- 是否存在有急迫性的真实买家？
- 用户今天用什么替代方案解决？
- 能不能用一个很窄的 MVP 验证？
- 有没有可行的获客路径？
- 平台、法律、信任、竞争风险是什么？
- 今天最值得深挖的唯一机会是哪一个？

### 站点包含什么

当前静态站点包含：

- 按日期归档的 AI 机会日报。
- 区分 AI HOT、AI HOT 日报追溯、BuilderPulse 和其他原始来源的 source tag。
- 文章页和机会卡片上的原文溯源链接。
- 按商业价值、流量潜力、可验证切口评分的机会卡片。
- 最新日报第一优先级机会的深度拆解页。
- 暗色模式。
- 对 GitHub Pages、Cloudflare Pages、Netlify、Vercel 和普通静态服务器的部署支持。

### 当前研究来源

Builder Daily 当前主要使用两类信号源：

- **AI HOT**：来自 `aihot.virxact.com` 的 AI 热点全量池和日报数据。
- **BuilderPulse**：来自 `github.com/BuilderPulse/BuilderPulse` 的 builder 和开发者工具信号。

如果 AI HOT 全量池的保留窗口覆盖不到较早日期，文章会明确标注为
AI HOT 日报追溯，而不会伪装成全量覆盖。

### 仓库结构

```text
.
├── index.html              # 静态 HTML 外壳
├── CNAME                   # 静态托管自定义域名
├── assets/
│   ├── app.js              # Hash 路由、渲染、筛选、文章页
│   └── styles.css          # 响应式布局、暗色模式、卡片和研究页样式
└── data/
    └── articles.js         # 日报数据和深度拆解内容
```

项目没有构建步骤，这是刻意保持的：它应该容易 fork、审查、部署和贡献。

### 本地开发

用任意静态服务器启动仓库根目录：

```powershell
python -m http.server 4173
```

然后打开：

```text
http://127.0.0.1:4173/
```

也可以使用其他静态服务器，例如：

```powershell
npx serve .
```

### 校验

站点是纯 JavaScript。提交内容或 UI 修改前，先运行：

```powershell
node --check assets\app.js
node --check data\articles.js
```

如果改了 UI，请在浏览器里检查：

- 首页文章卡片间距和日期归档导航。
- 文章页和原文溯源链接。
- 第一优先级机会的深度拆解页。
- 暗色模式对比度。
- `390px` 左右的移动端布局。

### 内容模型

日报数据存放在 `data/articles.js`：

```js
window.AI_OPPORTUNITY_ARTICLES = [
  {
    date,
    title,
    summary,
    tags,
    sourceTags,
    scores,
    winner,
    conclusion,
    opportunities,
    rejected,
    sources,
  },
];
```

每篇日报至少包含 3 个候选机会。每个机会都应该覆盖：

- `demand`：为什么需求真实存在。
- `statusQuo`：用户今天怎么解决。
- `wedge`：最窄可用 MVP 是什么。
- `distribution`：产品怎么获客。
- `risk`：这个机会可能死在哪里。
- `validation`：下一步怎么验证。

第一优先级机会可以额外包含 `deepDive`：

- 为什么现在值得做。
- MVP 阶段拆解。
- 技术可行性。
- Go-to-market 计划。
- 定价方式。
- 验证计划。
- 风险和应对。

### 编辑标准

Builder Daily 应该服务于“今天到底该做什么”的决策。好的文章要具体到
builder 看完能带走一个真实验证计划。

推荐写作标准：

- 基于证据写，不靠感觉写。
- 每个关键判断尽量关联原文溯源。
- 区分流量潜力和商业价值。
- 优先选择窄而可测试的产品，而不是宏大的平台叙事。
- 明确买家、工作流、风险和第一步验证动作。
- 不要把每个模型发布都包装成创业机会。

### 部署

这是静态站点，部署很简单：

- GitHub Pages：从 `main` 分支 `/` 根目录部署。
- Cloudflare Pages：Framework preset 选 `None`，build command 留空，output
  directory 填 `/`。
- Vercel/Netlify：静态项目，无需 build command。

计划使用的自定义域名：

```text
builderdaily.news
```

### 贡献

欢迎能提升研究质量、来源质量或阅读体验的贡献。

适合贡献的方向：

- 新增一篇日报。
- 新增或完善第一优先级机会的深度拆解。
- 改进原文溯源和链接质量。
- 改善移动端、暗色模式或可访问性。
- 增加轻量校验工具，但保持项目 static-first。

请保持改动聚焦。如果新增日报，请包含来源链接，并确保第一优先级机会能
追溯到对应原文。

### License

项目暂未选择开源许可证。在正式添加 license 前，仓库所有权利由仓库所有者保留。
