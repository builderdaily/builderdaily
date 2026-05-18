const opportunity = (name, verdict, score, demand, statusQuo, wedge, distribution, risk, validation) => ({
  name,
  verdict,
  score: { commercial: score[0], traffic: score[1], wedge: score[2] },
  demand,
  statusQuo,
  wedge,
  distribution,
  risk,
  validation,
});

const source = (type, label, url) => ({ type, label, url });

window.AI_OPPORTUNITY_ARTICLES = [
  {
    date: "2026-05-18",
    title: "Slack 研究助手、个人自动化与 AI 安全加速：今天最值得做的是企业 AI 助手评测与预算路由台",
    summary:
      "AI HOT 全量池按北京时间 2026-05-18 当前可见 29 条，集中在 Perplexity 企业 Slack 集成、Grok 个人任务自动化、代理经济治理、Claude 辅助攻破 Apple M5 macOS 内核漏洞、Codex 跨设备常驻开发和 Perplexity 个人 CFO。BuilderPulse 中文日报 2026-05-18 尚未发布，最新 2026-05-17 的主线是“可检查凭证”：UUID 碰撞、AI 破坏公开 CTF、AI 工具采用证据与 owner panel。两边共同指向一个更可付费的机会：企业已经在多款 AI 助手之间试用和迁移预算，但缺少基于真实问题、真实 Slack 线程和真实账单的评测与路由层。",
    tags: ["AI 预算", "企业搜索", "Agent 治理"],
    sourceTags: ["AI HOT 全量 29条", "BuilderPulse 最新 2026-05-17"],
    scores: { commercial: 95, traffic: 87, wedge: 86 },
    winner: {
      name: "企业 AI 助手评测与预算路由台",
      short:
        "接入 Slack/Teams、Claude、Perplexity、Grok、内部知识库和账单，把同一批真实业务问题跑成来源质量、延迟、token 成本、隐私风险和推荐路由报告。",
    },
    conclusion: [
      "今天最强的商业信号来自 SemiAnalysis 对 Perplexity Slack 集成的评价：公司测试多种 AI 工具后，大多数会被快速淘汰，但一个表现突出的 Slack 研究助手可能让 96% 流向 Anthropic 的 token 预算发生迁移。买方不是缺聊天入口，而是缺一套能解释“哪类问题该交给谁、为什么、花多少钱”的证据。",
      "Grok 正在做邮件回复、股票追踪和消息任务提取，Perplexity 又露出个人 CFO 标签，说明 AI 助手会更深入个人和企业工作流。与此同时，代理经济治理和 Claude 加速安全研究的信号提醒团队：工具一旦能行动，预算、权限、来源和安全责任就必须一起被记录。",
      "最窄切入不是再做一个企业搜索，也不是泛模型网关，而是做一次可复测的“AI 助手采购试验”：从 Slack 历史线程抽样 50 个真实问题，同步跑多款助手，生成来源覆盖、可视化能力、错误率、隐私等级、token 成本和推荐路由表。",
    ],
    opportunities: [
      opportunity(
        "企业 AI 助手评测与预算路由台",
        "今日第一优先级",
        [95, 87, 86],
        "AI 重度团队已经同时试用 Claude、Perplexity、Grok、Codex、内部 RAG 和搜索插件；真实需求是用自己的 Slack 问题、客户资料和账单数据判断哪个工具该保留、迁移或限额。",
        "现在靠员工口头反馈、供应商 demo、零散 Slack 截图、账单总额和安全团队事后追问。负责人很难把“这个助手回答更好”转换成预算、权限和采购决策。",
        "第一版只做 Slack/Teams 评测层：导入最近 30 天高频问题，用户选 20 到 50 条样本，系统并行发送给候选 AI 助手，输出来源质量、答案可用性、延迟、token/订阅成本、敏感数据暴露和推荐路由规则。",
        "用免费“AI assistant bake-off”报告和 Slack bot 获客；团队版按工作区、评测样本、候选工具数量、账单连接、SSO、私有部署和月度采购报告收费。",
        "供应商会展示自己的 ROI 面板，但不会主动比较竞品，也不会把敏感数据、Slack 真实问题和跨工具预算路由放在同一张负责人报告里。",
        "找 8 个已经在 Slack 里使用两款以上 AI 助手的团队，手工跑 30 个真实问题，验证是否能发现一个应迁移预算、限权或淘汰的助手。",
      ),
      opportunity(
        "个人自动化 Agent 权限收据",
        "流量强，付费需聚焦高风险账户",
        [88, 90, 79],
        "Grok 的邮件自动回复、股票追踪和任务提取，加上 Perplexity 个人 CFO，说明个人 AI 会触达邮箱、金融数据、消息和日程；用户需要知道每个 Agent 到底能读什么、能做什么。",
        "现在只能看各平台授权弹窗、隐私政策和账号设置页；普通用户很难把邮箱、交易、记忆、自动回复和撤销入口串起来。",
        "先做浏览器端/本地的授权收据：列出已连接的 AI 功能、账户范围、可执行动作、数据保留、自动化开关和撤销步骤，不碰凭证、不做投资建议。",
        "通过 Grok 自动化、AI 财务、邮箱 AI 助手和隐私教程获客；付费点是持续监控、撤销提醒、家人/小团队共享和高风险动作通知。",
        "消费端付费意愿不稳定，且平台可能补授权管理；最初应面向高风险用户，如创作者、投资者、自由职业者和小企业主。",
        "访谈 30 个愿意连接邮箱或金融 AI 的用户，测试一页权限收据是否能改变他们的授权选择或愿意每月付费监控。",
      ),
      opportunity(
        "AI 安全研究复现与修复证据包",
        "企业价值高，买方更窄",
        [91, 76, 82],
        "Claude 辅助安全团队 5 天构建 Apple M5 macOS 内核利用链，AI 破坏公开 CTF 格式，说明安全研究速度被大幅压缩；企业需要可复现、可修复、可交付的证据，而不是只看爆款报告。",
        "现在安全团队靠漏洞报告、PoC、手工复现、Jira、补丁说明和审计文档；AI 参与后，哪些步骤由模型推断、哪些证据可信、哪些补丁已验证变得更难说明。",
        "先做漏洞复现报告器：上传 PoC、日志、补丁 diff 和环境信息，生成复现步骤、影响面、AI 辅助步骤标记、修复验证和残余风险清单。",
        "从安全团队的 AI-assisted vuln triage 模板获客；按项目、报告导出、私有部署、审计留存和与 Jira/GitHub Security 集成收费。",
        "安全工具市场拥挤且信任门槛高；产品必须站在证据包和修复交付上，而不是声称自动发现高危漏洞。",
        "找 5 个应用安全团队，用最近 3 个真实漏洞报告手工生成证据包，验证是否缩短复现、指派和修复验收时间。",
      ),
    ],
    rejected: [
      "直接做“Perplexity for Slack 替代品”会撞供应商主战场，而且难以复制底层搜索和分发；更好的独立位置是跨助手评测、预算迁移和路由证据。",
      "Grok 个人自动化流量很强，但泛个人助理很难防御平台内置功能；只有绑定权限收据、撤销提醒和高风险账户，才更像可收费产品。",
      "Claude 攻破 Apple M5 的安全故事很震撼，但直接做自动漏洞挖掘门槛和责任都太高；证据包、复现和修复验收更适合作为商业 WebApp 的最窄切入。",
    ],
    sources: [
      source("AI HOT 全量", "SemiAnalysis：Perplexity Slack 集成表现突出，可能改变企业 token 预算分配", "https://x.com/SemiAnalysis_/status/2056060948394221828"),
      source("AI HOT 全量", "Elon Musk：Grok 正在做邮件回复、股票追踪和消息任务提取", "https://x.com/elonmusk/status/2056061134629933072"),
      source("AI HOT 全量", "Chubby：多智能体经济暴露治理真空", "https://x.com/kimmonismus/status/2056058059693465855"),
      source("AI HOT 全量", "Berryxia：Claude Mythos Preview 协助攻破 Apple M5 macOS 内核漏洞", "https://x.com/berryxia/status/2056043674446995887"),
      source("AI HOT 全量", "Greg Brockman：Codex 跨手机、MacBook 与 Mac mini 的常驻开发环境", "https://x.com/gdb/status/2056046844921172243"),
      source("AI HOT 全量", "TestingCatalog：Perplexity 正在开发个人 CFO 标签", "https://x.com/testingcatalog/status/2056043029148922060"),
      source("AI HOT 全量", "Rohan Paul：全双工时间对齐微轮转与 MiniCPM-o 4.5 实时多模态交互", "https://x.com/rohanpaul_ai/status/2056079437394051270"),
      source("BuilderPulse", "BuilderPulse 2026-05-17 中文报告：UUID Collision Receipt 与 owner panel", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-17.md"),
      source("官方或原始信号", "Daring Fireball：AI 是技术而非产品", "https://daringfireball.net/2026/05/ai_is_technology_not_a_product"),
    ],
  },
  {
    date: "2026-05-17",
    title: "开源模型潮、长任务验证与百万级 token 燃烧：今天最值得做的是 AI 长任务复盘与验证报告台",
    summary:
      "AI HOT 全量池按北京时间 2026-05-17 翻页覆盖完整窗口 219 条，集中在开源模型密集发布、Agent 长任务规划验证、幻灯片 Agent 真实榜单、Codex 技能、在线记忆、AI 安全证明和 30 天 130 万美元 token 消耗。BuilderPulse 中文日报 2026-05-17 把同一主题落到 UUID Collision Receipt、公开 CTF 被 AI 破坏、agent 权限和 owner panel。两边合起来指向一个更可付费的机会：团队不是缺更强模型，而是缺一套把长任务过程、验证结果、上下文成本和后续维护债自动沉淀成负责人能读的复盘报告。",
    tags: ["Agent 治理", "AI 成本", "开发者工具"],
    sourceTags: ["AI HOT 全量 219条", "BuilderPulse 2026-05-17"],
    scores: { commercial: 94, traffic: 84, wedge: 88 },
    winner: {
      name: "AI 长任务复盘与验证报告台",
      short:
        "接入 Codex、Claude Code、OpenClaw、CI 和任务日志，把一次长时间 Agent 任务拆成计划、验证、token 成本、失败点、维护债和下一步修复清单。",
    },
    conclusion: [
      "今天最强的商业信号不是某个模型单点领先，而是开源模型、万亿参数 Agent 模型、长上下文记忆和 Codex 技能同时把“让 AI 跑更久”变成常态。宝玉关于长任务必须分阶段规划与验证的讨论，和 30 天 130 万美元 token 消耗的信号，说明买方马上会问：这次长任务到底做对了吗、花了多少钱、留下什么债。",
      "BuilderPulse 的 5 月 17 日中文日报把同一件事换成创始人语言：软件信任正在变成“可检查凭证”问题，UUID 碰撞、公开 CTF 被 AI 破坏、agent 权限和 owner panel 都在要求系统能解释假设、证据、负责人和后续风险。",
      "最窄切入不是再做一个代码 Agent，也不是完整 APM，而是做“任务结束后的证据包”：读取会话、提交、测试、CI、token 与工具调用记录，生成负责人可转发的复盘和修复清单。",
    ],
    opportunities: [
      opportunity(
        "AI 长任务复盘与验证报告台",
        "今日第一优先级",
        [94, 84, 88],
        "AI 重度团队正在让 Codex、Claude Code、OpenClaw 和开源 Agent 模型执行跨小时任务；真实需求是知道任务是否按计划推进、哪些步骤有自动验证、哪里偏航、花掉多少 token、留下多少维护债。",
        "现在靠终端日志、PR diff、聊天记录、CI 结果和人工口头总结。长任务一旦跨越多次工具调用或多个提交，工程负责人很难快速判断它是有效产出还是未来的维护账单。",
        "第一版只做报告层：接入本地会话日志、git diff、测试输出、CI 链接和账单/usage 记录，按阶段生成计划执行图、验证证据、未验证改动、复杂度热点、token 成本和下一步人工检查清单。",
        "用免费“AI task postmortem”CLI 和 GitHub Action 获客；团队版按仓库、成员、日志留存、CI 集成、成本分摊、SSO 和月度维护债报告收费。",
        "底层代码 Agent 会补一些任务摘要；独立产品必须跨工具、跨仓库，并把验证证据、成本解释和管理层报告做深，而不是只复述聊天记录。",
        "找 10 个每周运行长时间代码 Agent 的团队，手工分析最近 3 次任务日志，验证报告是否能发现一个未覆盖测试、重复扫描或明显 token 浪费点。",
      ),
      opportunity(
        "开源模型选型与推理成本沙盘",
        "流量强，适合开发者获客",
        [88, 86, 80],
        "Gemma、DeepSeek、Kimi、MiMo、GLM、Ring-2.6-1T 等开源模型密集发布，团队需要知道某个任务该用本地模型、OpenRouter 折扣模型还是闭源前沿模型。",
        "现在靠榜单、博客、OpenRouter 价格页、Hugging Face 下载量和零散 benchmark；真实工作负载里的速度、上下文、工具调用成功率和单任务成本很难比较。",
        "先做“单任务成本沙盘”：用户上传一个任务描述和上下文大小，选择 5 个候选模型，生成预估 token、推理时间、显存/云成本、许可证风险和推荐组合。",
        "通过开源模型发布追踪、OpenRouter/本地推理教程和免费模型对比表获客；付费点是团队工作负载库、历史成本回测、私有模型目录和采购报告。",
        "模型平台会自带价格与榜单；产品必须绑定用户自己的任务样本和团队采购决策，避免变成又一个泛模型排行榜。",
        "收集 20 个真实 Agent/编码/RAG 任务，在 3 个开源模型和 2 个闭源模型上跑小样本，验证推荐是否能节省 20% 以上成本且不明显降低完成率。",
      ),
      opportunity(
        "Agentic Slides 质量与品牌审查台",
        "垂直明确，付费场景真实",
        [86, 82, 82],
        "Slides Arena 用 370 万真实使用场景给幻灯片 Agent 排名，说明幻灯片生成已经从 demo 进入高频工作流；团队需要的不是再生成一版，而是品牌、逻辑、事实和可交付质量审查。",
        "现在用户在 Manus、Claude、Gamma、Canva、PowerPoint 等工具之间试错，靠人工检查品牌色、结构、错别字、事实来源和视觉一致性。",
        "先做上传 PPT/PDF 的审查器：输出品牌偏差、叙事断点、信息密度、事实待核验、重复页和可直接改的 slide-by-slide checklist。",
        "从“AI 生成 PPT 质检”模板和咨询/销售团队内容获客；按审查次数、品牌规范库、团队协作、导出批注和企业模板收费。",
        "生成平台会加强内置检查；独立机会在跨平台、品牌规范沉淀和面向销售/融资材料的可审计交付。",
        "找 5 个每周产出客户方案或融资材料的团队，手工审 20 份 AI 生成 deck，验证是否能减少返工轮次或提升交付信心。",
      ),
    ],
    rejected: [
      "直接做新的开源模型聚合入口会吃到流量，但差异化弱且容易被 OpenRouter、Hugging Face 和各模型方覆盖；更好的切口是绑定真实任务成本和选型决策。",
      "单独追 SANA-WM、WorldReasonBench 或视频世界模型适合内容流量，但商业 WebApp 还缺明确买方；除非绑定广告素材、仿真或游戏资产验收流程，否则今天不如代码/Agent 复盘直接。",
      "数字主权云和欧洲处理器依赖是重要战略话题，但销售周期偏长；今天更适合把它作为大客户背景风险，而不是独立 WebApp 的首个 MVP。",
    ],
    sources: [
      source("AI HOT 全量", "Interconnects：开源模型密集发布，覆盖 Gemma、DeepSeek、Kimi、MiMo、GLM 等", "https://www.interconnects.ai/p/latest-open-artifacts-21-open-model"),
      source("AI HOT 全量", "SemiAnalysis：Claude CLI 定位与更宏大的 Agent 架构讨论", "https://x.com/SemiAnalysis_/status/2055695091973365824"),
      source("AI HOT 全量", "Slides Arena：基于 370 万真实场景的 Agentic Slides 排行榜", "https://x.com/berryxia/status/2055691224062001462"),
      source("AI HOT 全量", "Ant Ling：Ring-2.6-1T 开源并面向现实世界 Agent 工作流", "https://x.com/AntLingAGI/status/2055690326573211923"),
      source("AI HOT 全量", "宝玉：让 AI 执行长任务的核心是规划与验证", "https://x.com/dotey/status/2055682292937326638"),
      source("AI HOT 全量", "30 天消耗 130 万美元 token 的 AI 竞争信号", "https://x.com/kimmonismus/status/2055673453420609600"),
      source("AI HOT 全量", "Greg Brockman：Codex 复杂度分析技能可报告高复杂度区域", "https://x.com/gdb/status/2055646916499714488"),
      source("官方或原始信号", "arXiv：delta-mem 高效在线记忆机制", "https://arxiv.org/abs/2605.12357"),
      source("BuilderPulse", "BuilderPulse 2026-05-17 中文报告：UUID Collision Receipt 与 owner panel", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-17.md"),
      source("官方或原始信号", "Ask HN：真实 UUID v4 碰撞引发 342 条讨论", "https://news.ycombinator.com/item?id=48060054"),
      source("官方或原始信号", "Frontier AI has broken the open CTF format", "https://kabir.au/blog/the-ctf-scene-is-dead"),
    ],
  },
  {
    date: "2026-05-16",
    title: "Codex 常驻、Agent 订阅与财务连接：今天最值得做的是 Agent 连接器成本与权限报告台",
    summary:
      "AI HOT 全量接口本轮翻页 20 页、覆盖最近 1957 条，其中北京时间 2026-05-16 有 84 条；BuilderPulse 中文日报 2026-05-16 尚未发布，最新 2026-05-15 把 agent connectors、55,000 token 开销与 $2,000 编辑器账单列为主线。两边共同指向一个更接近付费的机会：团队不是缺一个 Agent，而是缺一张能说清连接器权限、上下文成本、订阅来源和高风险动作的负责人报告。",
    tags: ["Agent 治理", "AI 成本", "开发者工具"],
    sourceTags: ["AI HOT 全量 84条", "BuilderPulse 最新 2026-05-15"],
    scores: { commercial: 95, traffic: 86, wedge: 89 },
    winner: {
      name: "Agent 连接器成本与权限报告台",
      short:
        "读取 Claude Code、Codex、Zed Agent、Hermes、MCP/插件清单与账单线索，输出连接器上下文成本、可触达账户、风险动作、订阅来源和负责人可转发的一页报告。",
    },
    conclusion: [
      "今天的强信号不是“再多一个智能体”，而是 Agent 开始常驻在提交、IDE、浏览器、个人财务和开源代理里。Greg Brockman 提到每次提交都跑 Codex，OpenClaw 强调 fs-safe、网络出口策略和命令审批，Claude Code 发布里出现插件上下文成本，Zed 和 Hermes 又把 ChatGPT/Grok 订阅直接接入 Agent。",
      "BuilderPulse 的 5 月 15 日日报把同一件事说得更像买方语言：agent connectors 正在变成隐形成本中心，55,000 token 连接器开销和 $2,000 编辑器账单会让工程经理、财务和安全负责人一起追问谁批准、能碰什么、为什么这么贵。",
      "最窄切入不是做完整 MDM、SIEM 或 Agent 平台，而是做“连接器体检报告”：先只读扫描工具、插件、MCP 配置、订阅入口和最近会话，给出成本预估、权限分级、危险动作清单与可执行整改建议。",
    ],
    opportunities: [
      opportunity(
        "Agent 连接器成本与权限报告台",
        "今日第一优先级",
        [95, 86, 89],
        "AI 重度团队正在把 Codex、Claude Code、Zed Agent、Hermes、OpenClaw、MCP server 和浏览器自动化接进真实代码库与业务账户；负责人需要知道每个连接器会消耗多少上下文、能访问哪些数据、能触发哪些动作。",
        "现在靠各工具自己的设置页、命令日志、账单截图、Slack 约定和人工 code review。问题是跨工具后没人能一眼回答：这个 Agent 为什么能访问 Notion/GitHub/浏览器会话，下一张账单会不会异常。",
        "第一版只做只读报告：导入 Claude Code 插件列表、Codex/CLI 配置、MCP JSON、Zed/Hermes 订阅说明和最近 20 次会话日志，输出连接器成本、权限面、危险动作、重复工具和建议关闭项。",
        "用免费“Agent Bill Guard”报告模板和开源配置扫描器获客；团队版按仓库/成员/连接器数量、日志保留、SSO、私有部署和月度风险报告收费。",
        "底层平台会陆续补成本面板与权限控制；独立产品必须做跨工具统一、白话负责人报告和整改 workflow，而不是停留在单工具监控。",
        "找 10 个每周使用代码 Agent 超过 10 小时的团队，收集他们的插件/连接器配置，手工生成一次报告，验证是否能发现一个会被负责人立即关闭或限额的连接器。",
      ),
      opportunity(
        "个人财务 AI 连接前隐私与订阅审计器",
        "流量强，合规边界要窄",
        [86, 90, 78],
        "ChatGPT Pro 在美国推出通过 Plaid 连接银行账户的个人财务体验，说明用户会把真实交易数据交给 AI，但同时会担心隐私、订阅、外卖消费和完整财务画像的边界。",
        "现在用户只能看 OpenAI/Plaid 的授权说明、银行端授权页和零散隐私政策；很少有人能在连接前看懂哪些账户、交易类别、历史范围和记忆会被使用。",
        "先做浏览器端授权前 checklist：用户选择要连接的账户类型，生成“会暴露什么/不暴露什么/建议关闭哪些记忆/如何撤销授权”的个人风险收据，不代替理财建议。",
        "通过 ChatGPT 财务功能教程、隐私内容和订阅管理关键词获客；付费点是多账户授权追踪、撤销提醒、订阅浪费分析和本地账单导入。",
        "平台可能把说明做清楚，且金融合规风险高；产品必须定位为隐私与授权管理，不做投资建议、不抓银行凭证。",
        "访谈 30 个愿意试用 AI 财务功能的美国用户，观察他们连接前最担心什么，并测试一页风险收据是否提升信任或阻止高风险连接。",
      ),
      opportunity(
        "AI 可访问性修复证据包",
        "企业价值明确，切入较垂直",
        [84, 74, 83],
        "GitHub 正在试点通用无障碍 Agent，说明大型代码平台认为 AI 可以自动发现并修复 accessibility 问题；企业真正需要的是修复证据、人工确认和回归测试，而不是一次性建议。",
        "现在团队靠 Lighthouse、axe、人工 QA、设计规范和 PR 评论；AI 生成修复后，仍要证明问题是什么、改了哪里、是否影响 UI、谁确认过。",
        "先做只面向前端仓库的证据包：扫描关键页面，生成可访问性 issue、AI 修复 PR、截图对比、键盘导航记录和人工验收清单。",
        "从免费 GitHub Action 和可访问性风险报告获客；团队版按页面数量、报告导出、设计系统规则、CI 阻断和审计留存收费。",
        "GitHub/Copilot 可能原生覆盖建议生成；独立空间应落在证据链、跨框架报告和合规交付，而不是“AI 修复代码”本身。",
        "找 5 个有 WCAG/Section 508 压力的 SaaS 团队，对 3 个关键页面跑人工+AI 修复对比，验证报告是否能缩短 QA 与合规沟通时间。",
      ),
    ],
    rejected: [
      "直接做“每次提交跑 100 个 Codex”的云平台听起来有流量，但基础设施成本高且会正面撞 OpenAI、GitHub 和现有 CI 生态；更适合围绕成本、权限和审批做控制层。",
      "Grok/Hermes、Zed/ChatGPT 等订阅接入 Agent 的新闻很热，但单独复制一个代理入口缺少差异化；真正的横向机会是管理这些订阅进入 Agent 后的成本和权限。",
      "X 开源推荐算法会吸引创作者流量，但作为商业 WebApp 容易变成短期算法解读器；除非绑定可复测的内容实验和广告转化，否则今天不如 Agent 连接器治理付费更直接。",
    ],
    sources: [
      source("AI HOT 全量", "OpenClaw 安全机制升级：fs-safe、Proxyline、信任凭证与命令审批", "https://x.com/openclaw/status/2055437760459055405"),
      source("AI HOT 全量", "Greg Brockman：在每次提交上运行 Codex", "https://x.com/gdb/status/2055436684666274020"),
      source("AI HOT 全量", "Claude Code v2.1.143：插件依赖与插件市场上下文成本显示", "https://github.com/anthropics/claude-code/releases/tag/v2.1.143"),
      source("AI HOT 全量", "Zed Agent 支持 ChatGPT 订阅", "https://x.com/testingcatalog/status/2055385457798558188"),
      source("AI HOT 全量", "xAI：Grok 可连接 Hermes Agent", "https://x.com/xai/status/2055375676656783733"),
      source("AI HOT 全量", "ChatGPT 个人财务功能通过 Plaid 连接金融账户", "https://x.com/ChatGPTapp/status/2055317612687675545"),
      source("AI HOT 全量", "GitHub：构建通用无障碍智能体的经验", "https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process"),
      source("BuilderPulse", "BuilderPulse 2026-05-15 中文报告：Agent Bill Guard 与连接器成本权限", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-15.md"),
      source("原始信号", "Theneo：面向人和智能体共同使用的 API 管理", "https://www.producthunt.com/products/theneo"),
    ],
  },
  {
    date: "2026-05-15",
    title: "Codex Hooks、Genkit 中间件与移动审批：今天最值得做的是 Agent 工具调用审批网关",
    summary:
      "AI HOT 全量池 83 条集中指向一个更成熟的团队需求：Agent 已经能远程跑任务、接入 CI/CD、调用浏览器和工具，但企业还缺少跨工具的审批、限权、留痕与成本控制层。BuilderPulse 最新中文日报仍停留在 2026-05-14，因此今天把它作为延续信号而非伪造当日报。",
    tags: ["Agent 治理", "开发者工具", "企业安全"],
    sourceTags: ["AI HOT 全量 83条", "BuilderPulse 最新 2026-05-14"],
    scores: { commercial: 94, traffic: 84, wedge: 87 },
    winner: {
      name: "Agent 工具调用审批网关",
      short:
        "接在 Codex Hooks、Genkit 中间件、Claude Code 和浏览器扩展之间，统一审批高风险工具调用、记录证据链并输出团队策略报告。",
    },
    conclusion: [
      "今天的信号不是单个 Agent 更聪明，而是 Agent 开始进入可远程控制、可脚本化、可接入 CI/CD 的生产环境。Codex Hooks、程序化令牌、移动端审批、Genkit 中间件和 Windows 沙箱都在把“能不能用”推进到“怎么管”。",
      "真实买家不是普通开发者，而是工程负责人、安全负责人和平台团队。他们需要回答：哪些命令可以自动执行、哪些需要批准、谁批准过、token 和外部工具花了多少钱、出事时证据在哪里。",
      "最窄切入不是再做一个 Agent，也不是泛泛的审计看板，而是做工具调用前后的策略网关：高风险动作先拦截、解释、审批、记录，低风险动作自动放行。",
    ],
    opportunities: [
      opportunity(
        "Agent 工具调用审批网关",
        "今日第一优先级",
        [94, 84, 87],
        "团队正在让 Codex、Claude Code、Genkit、Kimi Web Bridge 等 Agent 读写代码、跑命令、调用浏览器和接入发布流程，负责人需要一套可解释的审批与限权机制。",
        "现在靠各工具自己的权限弹窗、终端日志、PR 记录、Slack 口头确认和人工约定；跨工具后很难证明一次任务为什么被允许、谁批准、是否触碰了敏感资源。",
        "先做只支持 3 类高风险动作的网关：写入生产配置、访问密钥/客户数据、触发部署或外部 API。接入 Codex Hooks/Genkit 中间件/CLI wrapper，给出允许、拒绝、人工批准三种结果。",
        "用免费“Agent 风险策略生成器”和开源 hook 模板获客；团队版按席位、策略数量、日志留存、SSO、私有部署收费。",
        "平台会补内置审批；独立产品必须跨 Codex、Claude、浏览器和内部工具，并把策略管理、证据链和管理层报告做成平台不会优先做的横向层。",
        "找 10 个已经把代码 Agent 放进真实仓库的团队，接入一个只读/低风险 hook，验证他们是否愿意把高风险动作交给该网关审批。",
      ),
      opportunity(
        "AI 素材成本与品牌流水线控制台",
        "流量强，适合中小团队",
        [87, 88, 76],
        "Luma Agents、Recraft、Tavus 和 Higgsfield 同时把图片、视频、虚拟人和多模型生产推到营销场景；团队已经出现 AI 图像支出超过编程支出的信号。",
        "现在素材团队在 Luma、Runway、Recraft、Canva、OpenRouter、表格和网盘之间切换，缺少统一预算、品牌一致性、版本对比和投放反馈。",
        "先做“电商广告素材账本”：导入各平台生成记录和素材文件，按品牌、SKU、活动、模型、成本、转化素材版本建立台账。",
        "靠免费素材成本审计和电商模板获客；按品牌资产库、成员、导出量、素材留存和投放复盘收费。",
        "横向生成平台会覆盖创作能力，所以产品不能卖“生成”，要卖预算、版本、品牌一致性和投放复盘。",
        "找 5 个每周固定做广告素材的电商团队，手工整理过去两周素材成本，看是否能发现浪费并愿意持续导入。",
      ),
      opportunity(
        "医院 Shadow AI 使用治理台",
        "客单高，合规慢",
        [90, 70, 74],
        "OpenEvidence 覆盖大量美国医生的信号说明临床人员会先于医院系统自发使用 AI，医院后补企业合作与治理需求会越来越强。",
        "现在医院可能只看到零散采购、浏览器访问、医生自报和安全部门问卷，无法知道哪些科室在用哪些 AI、输入了什么类型的问题、是否符合政策。",
        "先做非侵入式治理：匿名问卷、浏览器/网络域名清单、批准工具目录、风险分级和科室级报告，不碰病人明文数据。",
        "通过医疗 AI 安全内容、合规顾问和 CIO/CMIO 圈层获客；收费点是年度治理报告、政策模板、培训记录和私有部署。",
        "医疗销售周期长且法律风险高；MVP 必须定位为使用治理与政策工具，不提供诊断建议，也不采集 PHI 明文。",
        "访谈 10 位医生和 5 位医院 IT/合规负责人，验证他们是否承认 shadow AI 已经存在，以及是否愿意先做匿名盘点。",
      ),
    ],
    rejected: [
      "Codex 移动端本身流量很强，但直接做“手机写代码”会撞平台入口，独立机会应落在远程任务审批与管理。",
      "AI 虚拟人和单图生成角色展示效果强，但如果不绑定客服转化、素材成本或品牌资产，很容易变成短期 demo。",
      "AI 数据中心、TPU 和中美竞争讨论重要但更偏政策与基础设施，今天不适合作为商业 WebApp 的第一切口。",
    ],
    sources: [
      source("AI HOT 全量", "OpenAI 推出 Codex Hooks 和编程访问令牌", "https://x.com/sama/status/2055034714231345475"),
      source("AI HOT 全量", "Genkit 推出中间件系统", "https://developers.googleblog.com/announcing-genkit-middleware-intercept-extend-and-harden-your-agentic-apps"),
      source("官方", "OpenAI：在 Windows 上构建 Codex 沙箱", "https://openai.com/index/building-codex-windows-sandbox"),
      source("AI HOT 全量", "ChatGPT 移动端预览 Codex", "https://x.com/OpenAI/status/2055016850849993072"),
      source("AI HOT 全量", "Luma Agents 高效生成电商素材全流程", "https://x.com/LumaLabsAI/status/2055046873740984429"),
      source("AI HOT 全量", "团队 AI 图像生成支出超编程", "https://x.com/thdxr/status/2055029113014923400"),
      source("AI HOT 全量", "OpenEvidence 覆盖 65% 美国医生，shadow AI 模式引关注", "https://x.com/frxiaobei/status/2054981573150449754"),
      source("BuilderPulse", "BuilderPulse 2026-05-14 中文报告（当前最新可见）", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-14.md"),
    ],
  },
  {
    date: "2026-05-14",
    title: "主权迁移、退订锁定与 AI 账单：今天最值得做的是团队数字主权体检与迁移路线图",
    summary:
      "AI HOT 全量池 112 条与 BuilderPulse 同时指向一个更接近付费的焦虑：工具到底归谁、退订后数据怎么交接、AI 编程账单如何被控制。最靠谱的切口是把“想迁移/想自托管”变成一份可执行的资产清单与迁移计划。",
    tags: ["数字主权", "开发者工具", "AI 成本治理"],
    sourceTags: ["AI HOT 全量 112条", "BuilderPulse"],
    scores: { commercial: 91, traffic: 76, wedge: 88 },
    winner: {
      name: "团队数字主权体检与迁移路线图",
      short:
        "扫描 GitHub/IdP/文档/云与 AI 工具，生成所有权清单、退出风险评分与分阶段迁移 runbook。",
    },
    conclusion: [
      "今天的热点表面是 AI 硬件与模型，但更能触发购买的是“所有权与可撤销性”：东西住在哪里、谁能把你踢下线、退订后还能不能拿回资产。",
      "AI 编程工具的限制、额度与账单争议把同一个问题放大：团队愿意用，但必须能解释成本、权限与交接，不能靠个人信用硬扛。",
      "最窄切入不是卖“主权理念”，而是卖一份可以交付给老板的报告：现状、风险、替代项、预算区间和 30 天迁移计划。",
    ],
    opportunities: [
      opportunity(
        "团队数字主权体检与迁移路线图",
        "今日第一优先级",
        [91, 76, 88],
        "越来越多团队想把代码托管、身份、文档与关键 SaaS 从“平台默认”变成“可选择、可迁移”的资产，但缺少一张全景地图与可执行计划。",
        "现在靠零散博客、顾问口口相传、运维同事临时拍板；迁移的隐性成本（权限、备份、审计、SSO、合规、运行费用）很难被说明白。",
        "先做只读体检：连接 GitHub/云账单/IdP/文档与工单系统，输出资产清单、退出难度、数据导出路径、关键依赖和“最小迁移顺序”。",
        "用免费“主权评分/退出风险”报告吸引流量；对企业卖付费 PDF/HTML 报告、替代选型对比、迁移 runbook、以及按系统包月的落地支持。",
        "容易沦为咨询；产品必须把采集-评分-报告模板化，并把“迁移前 30 天的可验证成果”定义清楚，避免无限项目。",
        "找 10 个正在讨论自托管/欧洲栈/离开 GitHub 的团队，手工做 1 版报告验证：是否愿意为“可交付给老板的迁移计划”付费。",
      ),
      opportunity(
        "AI 编程工具成本与配额控制台",
        "强需求，切口更窄",
        [88, 72, 86],
        "Claude Code 等 AI 编程进入团队工作流后，负责人需要把额度、账单、重试浪费和第三方工具调用变成可控的预算与策略。",
        "现在要么靠个人信用卡+手动统计，要么只能看平台账单总额；退订/额度调整时还会出现交接和可用性断崖。",
        "先做“账单与浪费解释器”：导入会话/日志与账单，按仓库/成员/任务拆分 token 成本，标记高浪费模式并给出限额与审批建议。",
        "从工程负责人社群、AI 工程工具链内容与开源 CLI 插件获客；团队版按席位或月度预算规模收费，附带审计导出和 SSO。",
        "平台可能推出内置面板；必须做跨工具（Claude/Codex/多模型网关）统一、并把“成本解释”链接到可执行的策略（限额/审批/禁用工具）。",
        "用 3 家团队的真实账单做试点：能否在 1 小时内说清“钱花在哪、怎么省 20%”，并愿意持续导入。",
      ),
      opportunity(
        "安全沙箱与工具权限证明包（Windows/企业环境）",
        "企业价值高，销售更慢",
        [84, 54, 80],
        "团队想在 Windows/企业终端里用 Agent，但安全团队需要证明：沙箱边界、文件/网络权限、可审计日志与可回滚策略。",
        "现在靠安全文档、手写 SOP、临时脚本和重复的审计问答；一旦事故发生很难证明边界是否被突破。",
        "先把“可证明”做成产品化交付：提供一键基线检查（WSL/虚拟化/文件系统隔离/网络策略）、审计日志采集与标准化报告模板。",
        "通过安全咨询伙伴和企业 IT 渠道获客；收费点是企业部署包、合规模板库、定期体检与私有化支持。",
        "需要深入系统权限，风险与交付成本较高；MVP 应坚持只读检测+报告，不做高危自动修复。",
        "找 5 个已经在 Windows 上试用 Agent 的团队，跑一次体检：是否能缩短安全评审时间、是否愿意为报告模板付费。",
      ),
    ],
    rejected: [
      "Googlebook/AI laptop 讨论很热，但独立 WebApp 很难在硬件入口上抢到分发与渠道优势。",
      "单纯追模型预训练加速或量化推理的工具更偏基础设施，对今天的商业 WebApp 切口不够直接。",
      "泛“多智能体系统经验总结”内容价值高，但要落地成产品需要绑定具体组织流程，否则容易变成课程或咨询。",
    ],
    sources: [
      source("AI HOT 全量", "在 Windows 上为 Codex 构建安全有效的沙箱", "https://x.com/hongming731/status/2054719723276063016"),
      source("AI HOT 全量", "Claude Code 的每周限额将增加 50%，持续到 7 月 13 号", "https://x.com/op7418/status/2054725474493067482"),
      source("AI HOT 全量", "Anthropic 为付费 Claude 计划新增程序化调用专用额度", "https://x.com/hongming731/status/2054723213608026145"),
      source("BuilderPulse", "BuilderPulse 2026-05-14 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-14.md"),
      source("原始信号", "I moved my digital stack to Europe", "https://monokai.com/articles/how-i-moved-my-digital-stack-to-europe/"),
      source("原始信号", "Leaving GitHub for Forgejo", "https://jorijn.com/en/blog/leaving-github-for-forgejo/"),
    ],
  },
  {
    date: "2026-05-13",
    title: "从桌面 Agent 到法律插件：今天最值得做的是 AI Agent 动作与成本审计台",
    summary:
      "AI HOT 全量池 161 条里，浏览器、桌面、长流程、法律和安全 Agent 同时升温；真正能卖给团队的是把 Agent 的动作、权限、花费和审批做成可审计报告。",
    tags: ["Agent 治理", "企业工具", "安全审计"],
    sourceTags: ["AI HOT 全量 161条", "BuilderPulse"],
    scores: { commercial: 92, traffic: 80, wedge: 86 },
    winner: {
      name: "AI Agent 动作与成本审计台",
      short:
        "接入 Codex、Claude、Browser Use 等 Agent 日志，输出动作轨迹、权限风险、token 成本、人工审批点和可追溯报告。",
    },
    conclusion: [
      "今天的共同主题不是模型更快，而是 Agent 正在越过聊天框，开始操作浏览器、桌面软件、法律系统和企业长流程。BuilderPulse 也把本地命令、许可证、支付通道和所有权控制列为信号，说明市场开始关心可证明性。",
      "买家不是普通尝鲜用户，而是工程、安全、法务和财务负责人。他们的问题很明确：Agent 到底点了什么、花了多少钱、有没有碰敏感数据、哪些动作需要人批准。",
      "最窄切口不是做另一个 Agent，而是做 Agent 旁边的黑匣子记录仪。第一版只支持浏览器自动化和代码 Agent，也足够验证需求。",
    ],
    opportunities: [
      opportunity(
        "AI Agent 动作与成本审计台",
        "今日第一优先级",
        [92, 80, 86],
        "团队开始让 Agent 操作浏览器、CRM、代码库和内部工具，负责人需要知道它做过什么、为什么做、花了多少、是否越权。",
        "现在靠聊天记录、终端日志、浏览器历史和人工截图复盘，出了问题才补证据，且无法跨工具统一。",
        "先做 Chrome/Codex/Claude Code 会话导入器，输出动作时间线、域名清单、敏感动作、token 成本和审批建议。",
        "用免费会话报告吸引 AI 工程团队和安全团队，团队版按席位、日志保留期、私有部署和合规导出收费。",
        "平台可能自带日志，早期必须做跨工具统一和管理层报告，而不是复制单个平台功能。",
        "找 10 个已经用浏览器/代码 Agent 的团队，导入最近 20 次任务，看是否愿意为可追溯和可控付费。",
      ),
      opportunity(
        "长流程 Agent 状态机模板库",
        "工程价值高",
        [84, 68, 82],
        "Google ADK 长流程 Agent 说明企业任务会跨天、等待外部事件并恢复上下文，工程团队需要可复制方案。",
        "现在开发者把流程塞进 prompt、队列、cron 和数据库字段里，出错后难复盘。",
        "做 5 个高频模板：入职、合同审批、客户跟进、报销、内容审核，带状态机、Webhook、暂停恢复和观察面板。",
        "通过开源模板和部署教程获客，收费点是托管执行、可视化编辑器、团队权限和行业模板包。",
        "容易变成框架生意，用户不愿意换栈；应从可复制模板和现成报告切入。",
        "把 HR 入职模板做成 demo，找 5 个使用 Zapier/Make/脚本的团队比较维护时间。",
      ),
      opportunity(
        "法律团队 Claude 插件落地包",
        "垂直高客单",
        [88, 62, 74],
        "Anthropic 法律行业插件说明法务场景有明确文档工作流、风险和预算，且愿意为可定制标准付费。",
        "律所和企业法务现在靠 Word 模板、人工审阅、知识库和通用 Claude，输出风格不稳定。",
        "先做 NDA/合同条款比对的本地配置包：团队访谈、风格规则、条款库、审阅清单和 Word 插件。",
        "从公开模板、合同风险检查器和法务运营社群获客，按团队部署与模板维护收费。",
        "法律责任边界重，必须定位为内部工作流工具，保留人工批准和证据来源。",
        "拿 30 份公开 NDA 做样例，邀请 3 个法务团队用自己的条款偏好跑一轮。",
      ),
    ],
    rejected: [
      "Claude Opus 4.7 快速模式、Qwen 限免等模型新闻有热度，但单独包装成 WebApp 缺少持久需求。",
      "AI 鼠标指针、Googlebook、Android 主动 AI 是平台级入口，独立创业者不该第一天冲系统层。",
      "语音模型榜单值得跟踪，但今天缺少一个足够窄的付费买家，除非落到客服质检或销售通话评估。",
    ],
    sources: [
      source("AI HOT 全量", "Computer Use 让 Codex 迈向通用桌面 Agent", "https://x.com/shao__meng/status/2054369872663232625"),
      source("AI HOT 全量", "Google ADK：构建可暂停恢复的长时运行 Agent", "https://developers.googleblog.com/build-long-running-ai-agents-that-pause-resume-and-never-lose-context-with-adk"),
      source("AI HOT 全量", "Anthropic：Claude for the Legal Industry", "https://claude.com/blog/claude-for-the-legal-industry"),
      source("AI HOT 全量", "Anthropic 安全团队如何用 Claude Code 构建威胁检测平台", "https://claude.com/blog/how-anthropic-uses-claude-cybersecurity"),
      source("BuilderPulse", "BuilderPulse 2026-05-13 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-13.md"),
    ],
  },
  {
    date: "2026-05-12",
    title: "供应链投毒、数据导出和广告自动化：今天最值得做的是供应链安全响应 Copilot",
    summary:
      "AI HOT 全量池 294 条里，安全事故和 Agent 化开发同时升温；结合 BuilderPulse 对 TanStack/npm 事故的强调，最值得做的是事故发生后 24 小时内可交付的供应链安全响应工具。",
    tags: ["AI 安全", "开发者工具", "B2B SaaS"],
    sourceTags: ["AI HOT 全量 294条", "BuilderPulse"],
    scores: { commercial: 94, traffic: 82, wedge: 88 },
    winner: {
      name: "供应链安全事故响应 Copilot",
      short:
        "连接 GitHub 与 lockfile，自动判断是否受投毒影响，生成风险报告、凭证轮换清单和修复 PR。",
    },
    conclusion: [
      "今天不是单点安全新闻，而是一组连锁信号：npm/TanStack 供应链事故、OpenAI Daybreak、安全团队用 Claude Code 做威胁检测、企业 Agent 进入真实研发流程。",
      "BuilderPulse 的 Top 信号也指向同一件事：短暂恶意发布窗口会迫使大量团队证明凭证是否暴露。这种必须证明的需求比普通安全资讯更接近付费。",
      "最佳切口是事故响应，而不是泛漏洞扫描。用户急的是哪些仓库受影响、哪些密钥要轮换、谁负责、如何向老板和客户交代。",
    ],
    opportunities: [
      opportunity(
        "供应链安全事故响应 Copilot",
        "今日第一优先级",
        [94, 82, 88],
        "研发团队遇到 npm/PyPI/GitHub Actions 投毒时，当天就要确认影响范围并止血。",
        "现在靠人工查公告、grep lockfile、临时脚本、群里分派密钥轮换，最后手写事故报告。",
        "只做事故响应包：上传 lockfile 或连接 GitHub，输出受影响包、安装窗口、凭证类型、修复 PR 和管理层报告。",
        "每次事故天然带搜索流量。免费公开检查器吸流量，私有仓库扫描、团队报告和持续监控收费。",
        "安全结论不能瞎编，必须保留证据链；也会被 Snyk/Socket/GitHub 覆盖。",
        "用 TanStack/npm 事件做检查器，找 20 个 JS 团队问事故当天花了几小时、是否愿意为自动报告付费。",
      ),
      opportunity(
        "个人消费数据仓 + AI 管家上下文工具",
        "流量强，合规重",
        [78, 88, 74],
        "个人 AI 管家缺少真实消费上下文，订单、收藏、外卖和旅行偏好能让推荐从空话变得具体。",
        "数据分散在淘宝、京东、外卖、点评和浏览器收藏里，多数用户只能截图、Excel 或手动整理。",
        "先做本地优先的数据导入器，支持用户主动上传导出文件，生成偏好图谱和可喂给 Agent 的上下文包。",
        "通过开源插件、个人效率博主和 AI 管家模板获客，付费点是多平台导入、长期记忆、家庭共享和隐私本地存储。",
        "平台反爬、账号安全和隐私合规是硬风险，必须避免灰色爬虫。",
        "做只处理导出文件的本地 WebApp，找 50 个重度网购用户测试是否愿意上传三个月数据并付费。",
      ),
      opportunity(
        "中小商家的 AI 广告素材流水线",
        "需求真但竞争密",
        [84, 86, 72],
        "商家每天需要广告图、短视频脚本、平台尺寸、投放文案和 A/B 变体，素材生产是持续预算项。",
        "现在用 Canva、剪映、Midjourney、Luma、外包设计师和代运营拼接，迭代慢且风格不稳定。",
        "不要做通用视频生成，先做商品详情页到 20 条广告变体。",
        "靠模板 SEO、免费广告审计、Shopify/小红书/抖店社群获客，按导出次数、品牌资产库和团队协作收费。",
        "Luma、Canva、CapCut、Adobe 都会覆盖横向能力，所以必须选一个行业或平台先打穿。",
        "选一个品类做 10 个真实商家样片，衡量是否愿意为每周固定素材包付费。",
      ),
    ],
    rejected: [
      "纯模型发布和限时免费有流量，但大多是能力变化，不是稳定付费工作流。",
      "AI 代写种草笔记案很重要，但法律边界复杂，适合做运营风控辅助，不适合作为今天第一推荐。",
      "企业 Agent 治理长期很大，但销售周期比事故响应更重。",
    ],
    sources: [
      source("AI HOT 全量", "npm 生态遭大范围投毒", "https://www.ithome.com/0/949/178.htm"),
      source("原始信号", "Aikido Security：Mini Shai-Hulud is back, TanStack compromised", "https://www.aikido.dev/blog/mini-shai-hulud-is-back-tanstack-compromised"),
      source("官方", "OpenAI：Introducing Daybreak", "https://openai.com/daybreak"),
      source("AI HOT 全量", "Luma Agents 从情绪板到完整广告", "https://x.com/LumaLabsAI/status/2053941836402901409"),
      source("BuilderPulse", "BuilderPulse 2026-05-12 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-12.md"),
    ],
  },
  {
    date: "2026-05-11",
    title: "金融模板、健康 API 和 AI 客服：今天最值得做的是企业 AI 落地资产盘点器",
    summary:
      "AI HOT 全量池 263 条显示，企业 AI 从模型试用进入行业模板、数据连接器、席位套餐和客服转化；最可卖的 WebApp 是帮团队盘点可落地工作流、数据权限和 ROI 的资产报告。",
    tags: ["企业 AI", "数据连接器", "运营效率"],
    sourceTags: ["AI HOT 全量 263条", "BuilderPulse"],
    scores: { commercial: 90, traffic: 70, wedge: 84 },
    winner: {
      name: "企业 AI 落地资产盘点器",
      short:
        "扫描团队现有 SaaS、数据源、角色和流程，生成最适合接入 AI Agent 的 10 个工作流、权限缺口和 ROI 排序。",
    },
    conclusion: [
      "Anthropic 金融 AI 模板、Google Health API、阿里 Token Plan、AI 店小蜜和企业部署公司都在讲同一件事：AI 预算开始绑定行业工作流。",
      "BuilderPulse 从控制层看问题：设备信任、云迁移和本地 AI 都在暴露隐藏成本。买家需要知道自己哪里能落、哪里不能落。",
      "企业 AI 落地资产盘点器不用替客户做完整实施，而是先卖一个清晰可交付的诊断报告：哪些流程适合 Agent，数据在哪，权限缺什么，预计节省多少。",
    ],
    opportunities: [
      opportunity(
        "企业 AI 落地资产盘点器",
        "今日第一优先级",
        [90, 70, 84],
        "企业开始购买 AI 席位和行业模板，但多数团队不知道哪些流程有数据、能自动化、值得优先做。",
        "现状是咨询公司访谈、内部表格、部门负责人拍脑袋，最后做一堆 demo 而没有 ROI 排序。",
        "做问卷 + SaaS 连接器，输出流程清单、数据源、权限缺口、可自动化程度、预计节省和实施顺序。",
        "用免费 AI readiness 评分获客，报告版收费，后续通过连接器、模板市场和实施伙伴分成。",
        "容易变咨询交付，必须把报告标准化，避免每单都靠人工。",
        "找 5 家 50-500 人公司跑一次盘点，验证报告是否能推动他们批准第一个 AI 工作流预算。",
      ),
      opportunity(
        "健康数据 AI Agent SDK",
        "开发者流量强",
        [82, 76, 78],
        "Google Health API 打开 31 种健康数据和 Webhook，开发者会想做个人健康 Agent、教练和医疗前筛。",
        "开发者需要自己处理权限、时间序列清洗、异常解释和隐私边界。",
        "先做开发者 SDK 和示例 WebApp：把健康数据转成睡眠、运动、心率、恢复度四类可解释事件。",
        "通过开源样例、健康黑客松和独立开发者社区获客，按 API 调用、白标和高级洞察收费。",
        "医疗声明和隐私风险很重，必须避开诊断，定位为生活方式和个人数据工具。",
        "做 Fitbit 导入 demo，找 30 个量化自我用户和 10 个教练测试是否能生成可行动周报。",
      ),
      opportunity(
        "AI 客服转化分析面板",
        "现金流机会",
        [86, 78, 76],
        "阿里 AI 店小蜜显示 AI+人 转化率可超过纯人工，商家会关心 AI 客服到底提升还是伤害成交。",
        "中小商家现在看机器人接待量、转人工率和客服主观反馈，缺少从对话到成交的因果分析。",
        "接入客服记录和订单，按问题类型、转人工节点、优惠策略和回复时延分析转化差异。",
        "面向电商服务商和品牌运营团队，先用免费对话漏斗报告获客，再卖持续监控和优化建议。",
        "平台数据接入可能受限，且归因复杂；早期要和服务商合作拿数据。",
        "找 3 个店铺导入一周对话和订单，看能否发现 3 个可执行优化点。",
      ),
    ],
    rejected: [
      "Agent 基准和模型路由有技术价值，但商业买家不如企业盘点清晰。",
      "AI 低质 PR、开源项目维护压力是好痛点，但需要聚焦到具体生态和维护者付费能力。",
      "本地 AI/云退出讨论带有意识形态成分，必须落到迁移报告或合规审计才可销售。",
    ],
    sources: [
      source("AI HOT 全量", "Anthropic 开源金融 AI 全栈模板", "https://x.com/frxiaobei/status/2053861985008431398"),
      source("AI HOT 全量", "Google Health API 开发者体验", "https://x.com/frxiaobei/status/2053804236031639582"),
      source("AI HOT 全量", "阿里发布全新 AI 店小蜜", "https://www.ithome.com/0/948/909.htm"),
      source("AI HOT 全量", "阿里云上线团队版 Token Plan", "https://www.ithome.com/0/948/971.htm"),
      source("BuilderPulse", "BuilderPulse 2026-05-11 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-11.md"),
    ],
  },
  {
    date: "2026-05-10",
    title: "健康数据、桌面 GUI Agent 和攻击自复制：今天最值得做的是 Agent 安全演练靶场",
    summary:
      "AI HOT 全量池 166 条里，AI Agent 能操作桌面、访问健康数据、甚至被研究用于入侵复制；今天最值得做的是让企业用安全靶场测试 Agent 权限边界。",
    tags: ["Agent 安全", "桌面自动化", "企业防御"],
    sourceTags: ["AI HOT 全量 166条", "BuilderPulse"],
    scores: { commercial: 89, traffic: 76, wedge: 82 },
    winner: {
      name: "Agent 安全演练靶场",
      short:
        "给企业和开发者提供可复现环境，测试桌面/浏览器 Agent 在权限、网络、文件和支付动作上的越界风险。",
    },
    conclusion: [
      "今天一边是 UI-TARS-desktop、本地 GUI Agent、Grok Build 这类可操作环境，一边是 AI agents 入侵并复制自己的安全研究。能力越像员工，安全问题越像内控。",
      "BuilderPulse 的登录检查、运行时兼容性和文档篡改信号也说明：软件入口和自动化动作正在产生新的失败模式。",
      "最值得做的是 Agent 安全演练靶场，让团队把自己的 Agent 放进可控环境里跑任务，得到越权、数据泄露、支付误触和提示注入报告。",
    ],
    opportunities: [
      opportunity(
        "Agent 安全演练靶场",
        "今日第一优先级",
        [89, 76, 82],
        "企业想用桌面/浏览器 Agent，但安全负责人需要知道它会不会误删文件、泄露数据、访问钓鱼站或自作主张付款。",
        "现在多靠沙箱、权限提示和开发者自测，缺少专门针对 Agent 行为的红队场景和可读报告。",
        "先做 20 个标准任务：登录、下载、上传、CRM 修改、支付确认、文件读取、提示注入网页，输出失败轨迹和风险等级。",
        "通过开源 mini benchmark 和公开排行榜获客，企业版按私有场景、报告导出、CI 集成和合规审计收费。",
        "需要避免变成纯研究项目，必须把输出对齐到企业审批和采购语言。",
        "邀请 10 个做 Agent 的团队跑同一套靶场，发布匿名风险统计，并验证是否愿意为私有场景测试付费。",
      ),
      opportunity(
        "健康数据 Agent 周报",
        "消费者流量强",
        [78, 82, 72],
        "Health API 让睡眠、心率、运动和血氧实时流入应用，用户想要的不只是图表，而是能解释近期状态的助手。",
        "现有健康 App 数据多但建议泛化，医生级产品又合规重。",
        "只做每周健康复盘：导入可穿戴数据，解释睡眠债、恢复度、运动负荷和异常提醒，避免诊断。",
        "通过量化自我社区、跑步/健身博主和模板分享获客，订阅高级趋势、教练共享和家庭报告。",
        "隐私和医疗边界很敏感，不能做疾病判断，也不能长期存敏感数据而无本地/加密方案。",
        "做 Fitbit/CSV 导入版，找 50 个用户连续两周使用，看复盘是否导致具体行为改变。",
      ),
      opportunity(
        "AI Agent 任务分解教练",
        "一人公司友好",
        [76, 74, 80],
        "一人公司路线图、任务瘫痪、个人第二大脑都指向个人需要把模糊目标拆成可执行任务。",
        "现在用户在 ChatGPT、Notion、Todo、日历之间来回复制，计划常停留在漂亮文档。",
        "先做面向独立开发者的任务分解器：目标、约束、每日动作、阻塞复盘和自动提醒。",
        "靠模板、X 案例和独立开发者社区传播，按月订阅或一次性项目包收费。",
        "消费者付费弱，必须定位到有收入目标的创作者/独立开发者。",
        "找 30 个有产品想法的人跑 7 天游击计划，看是否真正完成一次发布或获客动作。",
      ),
    ],
    rejected: [
      "Grok Build、UI-TARS 等产品本身很热，但直接做竞品会撞平台和模型公司。",
      "AI API 中转站/Agent 金融基础设施想象空间大，但政策、支付和信任门槛太高。",
      "HTML/Markdown 之争适合改进产品体验，不足以成为今天最高商业价值机会。",
    ],
    sources: [
      source("AI HOT 全量", "Google 开放 Fitbit Air Health API", "https://x.com/berryxia/status/2053256690498433146"),
      source("AI HOT 全量", "AI agents can hack computers and copy themselves", "https://the-decoder.com/ai-agents-can-now-hack-computers-and-copy-themselves-and-theyre-getting-better-fast"),
      source("AI HOT 全量", "UI-TARS-desktop 本地桌面 GUI Agent", "https://x.com/berryxia/status/2053283074750976383"),
      source("AI HOT 全量", "Gemini API 多模态文件搜索", "https://blog.google/innovation-and-ai/technology/developers-tools/expanded-gemini-api-file-search-multimodal-rag"),
      source("BuilderPulse", "BuilderPulse 2026-05-10 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-10.md"),
    ],
  },
  {
    date: "2026-05-09",
    title: "团队上下文、HTML 报告和人工审核：今天最值得做的是 AI 工作证据报告生成器",
    summary:
      "AI HOT 全量池 264 条里，ClickUp Brain2、HTML 输出、人工审核工具和 Agent 版本控制都指向同一个需求：团队需要把 AI 工作过程变成可读、可审、可复用的证据。",
    tags: ["团队协作", "AI 报告", "Agent 工作流"],
    sourceTags: ["AI HOT 全量 264条", "BuilderPulse"],
    scores: { commercial: 87, traffic: 84, wedge: 85 },
    winner: {
      name: "AI 工作证据报告生成器",
      short:
        "把 Agent 会话、PR、设计稿、数据查询和人工审批整理成 HTML 证据报告，供团队复盘、审查和交付。",
    },
    conclusion: [
      "今天最有意思的不是 HTML 取代 Markdown 的表层争论，而是团队开始意识到 AI 输出必须更可读、更可审、更能被人接手。",
      "ClickUp Brain2 把团队知识压缩成模型上下文，OpenRouter 加人工审核工具，Agent Git/版本控制出现，BuilderPulse 也在强调隐藏假设证明。",
      "最好的商业切口是 AI 工作证据报告生成器：AI 做了哪些判断，引用了哪些上下文，谁批准了高风险动作，最后交付物为什么可信。",
    ],
    opportunities: [
      opportunity(
        "AI 工作证据报告生成器",
        "今日第一优先级",
        [87, 84, 85],
        "团队用 AI 做 PR、设计、研究和数据分析后，需要把过程交给同事、客户或管理层审查。",
        "现在是聊天记录截图、Markdown、Notion 文档和人工总结混用，证据链断裂且难复用。",
        "导入 Agent 会话、Git diff、网页引用和人工确认点，生成可分享 HTML 报告，含证据链接、风险标注和下一步。",
        "通过免费 Chrome/CLI 导出器获客，团队版按报告数量、模板、品牌化、权限和存档收费。",
        "容易被平台文档功能覆盖，必须做跨工具和审计证据，而不是普通总结。",
        "找 10 个 AI 重度团队，把他们最近一次 AI PR/调研转成报告，测试是否愿意给客户或老板直接看。",
      ),
      opportunity(
        "团队上下文压缩器",
        "需求强但平台近",
        [82, 72, 78],
        "ClickUp Brain2 说明团队上下文会成为 AI 质量差异的关键。",
        "现在靠知识库搜索、手动粘贴文档、项目 README 和个人记忆，常常上下文过载或缺关键事实。",
        "只做 Slack/Notion/GitHub 到上下文卡片的工具，输出任务相关的 2 页上下文。",
        "面向 AI 研发团队和产品团队，用上下文质量评分和 prompt 包分享获客。",
        "Notion、ClickUp、Cursor 可能内置，独立产品要保持跨工具和可解释。",
        "对 20 个真实任务比较人工粘贴上下文与压缩卡片，让用户打分是否减少返工。",
      ),
      opportunity(
        "高风险工具调用人工审核队列",
        "B2B 安全切口",
        [84, 66, 82],
        "OpenRouter 的人工审核工具说明自动化流程需要在付款、删除、提交、发送邮件等动作前暂停。",
        "现在每个开发者自己写确认弹窗或审批逻辑，无法统一策略和审计记录。",
        "做 SDK + Web 队列：Agent 遇到高风险工具调用时进入审核页，支持批准、修改参数、拒绝和留痕。",
        "通过开源 SDK 进入开发者生态，企业版卖策略管理、团队审批、SSO 和日志保留。",
        "若模型平台提供原生 HITL，独立空间变窄；应专注多模型多框架统一。",
        "用 5 个开源 Agent 框架接入 demo，验证开发者是否愿意添加一行 SDK 换取审批记录。",
      ),
    ],
    rejected: [
      "HTML 输出格式本身不是产品，只有变成证据报告、客户交付或审计文档才有商业价值。",
      "模型参数压缩和 ERNIE 5.1 是能力趋势，不适合直接作为 WebApp 创业题。",
      "AI 算命/垂直 Agent 有传播性，但付费和监管边界不如团队工作证据清晰。",
    ],
    sources: [
      source("AI HOT 全量", "ClickUp Brain2 自动集成企业上下文", "https://x.com/testingcatalog/status/2052828735720903095"),
      source("AI HOT 全量", "HTML 取代 Markdown，成 Agent 输出新标准", "https://x.com/berryxia/status/2052884681193144743"),
      source("AI HOT 全量", "OpenRouter SDK 新增人工审核工具", "https://x.com/OpenRouter/status/2052856129961758917"),
      source("AI HOT 全量", "Show HN：适用于 AI 代理的 Git", "https://github.com/regent-vcs/re_gent"),
      source("BuilderPulse", "BuilderPulse 2026-05-09 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-09.md"),
    ],
  },
  {
    date: "2026-05-08",
    title: "Codex 进浏览器、PR 审查和 Token 成本：今天最值得做的是 Agent PR 审查与成本优化器",
    summary:
      "AI HOT 全量池 317 条里，浏览器 Agent、GitHub Token 效率、Agent PR 审查、Bugbot 计费和安全中心同时出现；最值得做的是面向研发团队的 Agent PR 审查与成本优化器。",
    tags: ["AI 编程", "代码审查", "成本优化"],
    sourceTags: ["AI HOT 全量 317条", "BuilderPulse"],
    scores: { commercial: 91, traffic: 86, wedge: 83 },
    winner: {
      name: "Agent PR 审查与成本优化器",
      short:
        "自动审查 AI 生成 PR 的逻辑风险、安全问题和 token 浪费，并给出可执行修复建议。",
    },
    conclusion: [
      "今天 AI 编程和 Agent 工程是主战场。Codex Chrome 插件、GitHub token 优化、Agent PR 审查指南和 Bugbot 计费变化都指向同一个问题：AI 生成代码越来越多，但审查和成本控制跟不上。",
      "BuilderPulse 的社区信号也在说 AI slop 正在伤害社区，agentic engineering 需要控制机制。放在代码场景里，最直接的买家就是工程团队。",
      "最靠谱的机会是 Agent PR 审查与成本优化器。它不替代 GitHub/Cursor，而是在 AI PR 合并前检查风险：遗漏调用点、残留死代码、安全漏洞、测试缺口和 token 浪费。",
    ],
    opportunities: [
      opportunity(
        "Agent PR 审查与成本优化器",
        "今日第一优先级",
        [91, 86, 83],
        "AI PR 数量上升后，团队需要用更少人工审出更多逻辑错误、安全缺口和不必要的上下文消耗。",
        "现在靠人工 reviewer、GitHub Copilot、Cursor/Bugbot 和通用 CI，常见问题是评论太泛、成本不可控。",
        "做 GitHub App：检测 AI 生成 PR，按风险排序评论，标注测试缺口、死代码、调用遗漏和可减少 token 的上下文。",
        "通过开源仓库免费审查和公开案例获客，团队版按仓库数、私有规则、成本面板和合规报告收费。",
        "GitHub/Cursor 可能快速补齐，独立产品必须比平台更专注 AI PR 风险和成本。",
        "选 20 个开源 AI PR 做公开审查报告，联系维护者确认命中率，并找 5 个团队试用私有仓库。",
      ),
      opportunity(
        "浏览器 Agent 业务流程测试器",
        "自动化刚需",
        [84, 78, 80],
        "Codex Chrome 扩展使 Agent 能操作已登录网站，团队会拿它跑 CRM、后台、报销和测试流程。",
        "现在浏览器自动化测试偏 Playwright 脚本，业务人员不会写；Agent 操作又缺少稳定断言。",
        "输入自然语言流程，Agent 执行后自动生成可复跑的 Playwright 测试和失败截图。",
        "面向 SaaS、运营后台和 QA 团队，用免费录一次生成测试获客，按测试次数和团队协作收费。",
        "执行稳定性和账号安全是难点，必须隔离环境和敏感操作审批。",
        "找 5 个真实后台流程，从自然语言生成测试，看一周内能否减少手写测试时间。",
      ),
      opportunity(
        "AI 应用安全中心 Lite",
        "Replit 信号强",
        [82, 70, 78],
        "Replit 安全中心 2.0、Anthropic 漏洞赏金、Firefox AI 抓虫说明 AI 应用部署后安全状态需要持续看板。",
        "小团队通常只有 Dependabot、Sentry 和偶尔人工检查，没有按应用聚合的风险视图。",
        "先做面向 Replit/Vercel/Cloudflare 的安全清单：公开密钥、依赖漏洞、权限、SBOM 和一键修复建议。",
        "用免费域名/仓库安全扫描获客，团队版卖批量应用、通知、修复 PR 和导出。",
        "安全平台竞争强，必须针对 AI 小应用和低代码部署平台，而不是泛安全扫描。",
        "爬取 100 个公开 AI demo 做匿名风险报告，用报告吸引开发者提交自己的应用扫描。",
      ),
    ],
    rejected: [
      "OpenAI CLI、OpenRouter HITL、实时语音模型都是重要能力，但今天缺少比 AI PR 审查更直接的付费痛点。",
      "广告素材生成继续有需求，但与 5/12 相比没有新鲜商业切口。",
      "模型本地推理和低价模型适合作为成本输入，不是最终用户愿意单独购买的产品。",
    ],
    sources: [
      source("AI HOT 全量", "GitHub：提升 Agentic Workflows 的 Token 使用效率", "https://github.blog/ai-and-ml/github-copilot/improving-token-efficiency-in-github-agentic-workflows"),
      source("AI HOT 全量", "GitHub：Agent PR 无处不在，如何审查", "https://github.blog/ai-and-ml/generative-ai/agent-pull-requests-are-everywhere-heres-how-to-review-them"),
      source("AI HOT 全量", "OpenAI 为 Codex 发布 Chrome 扩展", "https://x.com/dotey/status/2052492340892221800"),
      source("AI HOT 全量", "Replit 安全中心 2.0", "https://x.com/Replit/status/2052444908154433562"),
      source("BuilderPulse", "BuilderPulse 2026-05-08 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-08.md"),
    ],
  },
  {
    date: "2026-05-07",
    title: "Agent 钱包、算力扩容和移动端办公：今天最值得做的是 Agent 付费动作审批网关",
    summary:
      "AI HOT 全量池 330 条里，x402 自动付款、Claude Managed Agents、移动端 Agent 和 Cloudflare 购买部署都在出现；最有商业价值的是给 Agent 付费和基础设施动作加审批网关。",
    tags: ["Agent 支付", "审批流", "基础设施"],
    sourceTags: ["AI HOT 全量 330条", "BuilderPulse"],
    scores: { commercial: 90, traffic: 78, wedge: 84 },
    winner: {
      name: "Agent 付费动作审批网关",
      short:
        "拦截 Agent 的购买、部署、域名、API 调用和外部服务付款动作，按策略自动批准或进入人工审核。",
    },
    conclusion: [
      "关键变化是 Agent 开始接触钱和基础设施：Apify mcpc + x402、Cloudflare agents 可创建账户买域名部署、Claude Managed Agents 多代理和 Dreaming、移动端 Agent 随时下发任务。",
      "BuilderPulse 也把钱、账号、权限和文档称为 AI 周围的收据。这就是商业机会：当 Agent 能付款和部署，企业需要一个策略层。",
      "最值得做的是 Agent 付费动作审批网关。它不是钱包本身，而是把 402 付款、域名购买、云资源创建、CRM 写入、邮件发送等动作按金额、对象、环境和风险分级。",
    ],
    opportunities: [
      opportunity(
        "Agent 付费动作审批网关",
        "今日第一优先级",
        [90, 78, 84],
        "Agent 获得钱包、浏览器和部署权限后，团队需要控制哪些动作能自动花钱或改变生产环境。",
        "现在要么完全手动，要么在每个工具里写确认逻辑，策略分散、审计困难。",
        "做 HTTP/MCP 网关：付款、购买域名、部署、删除资源、发送邮件等动作按规则自动批准、限额或人工审核。",
        "通过开源 SDK 和 x402/MCP 示例获客，企业版卖策略、SSO、审计、预算和私有部署。",
        "支付协议和平台变化快，必须保持协议中立，聚焦审批与审计。",
        "做一个代理可调用的 paid API demo，模拟 20 个付款/部署动作，找 Agent 开发者接入测试。",
      ),
      opportunity(
        "移动端 Agent 任务调度器",
        "流量好，付费待验",
        [78, 76, 76],
        "TRAE SOLO Mobile、手机管理 Claude Agent 说明用户想随时下发任务，手机成为意图入口。",
        "现在任务散在聊天、IDE、桌面 App 和日历里，移动端只能发消息，缺少状态追踪和交接。",
        "做一个移动端任务面板：语音/文本下发、Agent 选择、进度卡片、失败重试和结果归档。",
        "面向重度 AI 工作者和团队管理者，通过移动端工作流模板传播，订阅高级并发和团队协作。",
        "平台会做原生移动端，独立产品需要跨 Claude/Codex/本地 Agent。",
        "找 20 个每天开多个 Agent 的用户，验证手机调度是否减少上下文切换。",
      ),
      opportunity(
        "Agent 设计规范生成器",
        "适合内容获客",
        [76, 82, 78],
        "DESIGN.md、Refero Styles、Open Slide 都说明 AI 前端生成需要结构化设计参考，独立开发者需求强。",
        "现在用户让 AI 模仿网站或凭感觉改 UI，结果风格不一致、组件混乱。",
        "输入品牌 URL 或截图，生成 DESIGN.md、组件规则、色板和 Agent 可执行的 UI 任务清单。",
        "靠免费设计审计和模板库 SEO 获客，付费点是批量品牌、团队规范、导出到 Cursor/Claude/Codex。",
        "设计工具和 AI IDE 会内置，必须做更好的参考库和跨工具格式。",
        "抓取 30 个高质量 SaaS 页面生成规范，让前端 Agent 用规范重做页面，对比设计一致性。",
      ),
    ],
    rejected: [
      "Anthropic/SpaceX 算力合作是重大行业信号，但普通 WebApp 很难从算力新闻本身切入。",
      "AI 营销提示词和开源 PPT 工具可做流量内容，但商业防御弱。",
      "主动式 Agent 大方向很大，但今天更清楚的付费点是动作审批和审计。",
    ],
    sources: [
      source("AI HOT 全量", "Apify mcpc 与 x402：给 AI Agent 装上自动付款的钱包", "https://x.com/shao__meng/status/2052397575446417822"),
      source("AI HOT 全量", "Cloudflare Agents 可创建账户、买域名并部署", "https://blog.cloudflare.com/agents-stripe-projects"),
      source("AI HOT 全量", "Claude Managed Agents 新增 Dreaming 与多代理协同", "https://the-decoder.com/claudes-new-dreaming-feature-is-designed-to-let-ai-agents-learn-from-their-mistakes"),
      source("AI HOT 全量", "GitHub：验证非确定性 Agent 行为", "https://github.blog/ai-and-ml/generative-ai/validating-agentic-behavior-when-correct-isnt-deterministic"),
      source("BuilderPulse", "BuilderPulse 2026-05-07 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-07.md"),
    ],
  },
  {
    date: "2026-05-06",
    title: "本地 AI 工作站、全模态视频和 4GB 浏览器模型：今天最值得做的是端侧 AI 资产与隐私扫描器",
    summary:
      "AI HOT 全量池 124 条里，本地 AI 工作站、浏览器静默模型、端侧 GUI Agent 和全模态视频处理同时出现；最适合做的是帮个人和团队扫描本机 AI 资产、隐私和成本。",
    tags: ["端侧 AI", "隐私", "本地 Agent"],
    sourceTags: ["AI HOT 全量 124条", "BuilderPulse"],
    scores: { commercial: 84, traffic: 82, wedge: 86 },
    winner: {
      name: "端侧 AI 资产与隐私扫描器",
      short:
        "扫描电脑上的本地模型、浏览器 AI 权限、Agent 配置、缓存和敏感数据访问，输出可执行清理与治理报告。",
    },
    conclusion: [
      "今天主题集中：Mac 本地 AI 工作站、Chrome 4GB 端侧模型、Downy 多 Agent、全模态豆包、个人 CLI 工具链和 Agent API 中转。",
      "BuilderPulse 同一天也强调 Chrome 静默安装 4GB AI 模型、DNSSEC 事故和 Computer Use 成本，说明 AI 落地开始进入磁盘、网络、默认设置和成本这些无聊但真实的层面。",
      "最靠谱的机会是端侧 AI 资产与隐私扫描器。它面向个人开发者、小团队和 IT 管理员，回答：我的机器上到底装了哪些模型、哪些插件能读什么、缓存占多少、有没有敏感文件暴露给 Agent。",
    ],
    opportunities: [
      opportunity(
        "端侧 AI 资产与隐私扫描器",
        "今日第一优先级",
        [84, 82, 86],
        "本地模型、浏览器 AI、Agent 插件和桌面自动化增多后，用户不知道本机有哪些 AI 资产和隐私暴露面。",
        "现在靠手动查 Chrome 设置、模型目录、插件权限和配置文件，普通用户几乎不会做。",
        "先做本地 CLI/桌面扫描：模型文件、浏览器 AI 开关、Agent 配置、API key、缓存大小、敏感目录访问建议。",
        "免费开源扫描器带来信任和流量，团队版卖策略基线、集中报告、设备清单和修复脚本。",
        "系统权限和误报风险高，必须透明、只读、可本地运行。",
        "发布 Windows/Mac 扫描器，收集 100 份匿名统计，验证用户是否愿意看并执行清理建议。",
      ),
      opportunity(
        "视频转图文技术博客 Agent",
        "内容生产明确",
        [78, 78, 80],
        "豆包全模态和视频转博客工作流说明技术视频、演示和课程可以被更好地转成文章。",
        "现有方案多靠 ASR + LLM，丢失代码、图表和屏幕上下文；人工整理耗时。",
        "输入 YouTube/B站/本地视频，按章节抽取截图、代码片段、图表说明和图文博客草稿。",
        "面向技术博主、课程作者和开发者关系团队，按视频时长、导出格式和团队知识库收费。",
        "版权和平台下载限制要处理，最好先支持用户上传和公开视频链接。",
        "找 10 个技术视频做样稿，让原作者评价是否能直接发布或只需少量修改。",
      ),
      opportunity(
        "AI API 成本路由记账本",
        "小团队刚需",
        [82, 72, 76],
        "API 中转站、Token Plan、模型价格内卷说明 Agent 成本管理正在成为真实问题。",
        "开发者在 OpenRouter、官方 API、中转站、云平台之间切换，账单分散且很难按项目归因。",
        "做统一用量代理和记账本，按项目、模型、Agent、任务记录成本，并推荐低成本替代。",
        "通过开源 SDK 和成本计算器获客，团队版按项目、预算告警、模型路由和报表收费。",
        "代理敏感请求会有信任障碍，需支持只读账单导入和本地部署。",
        "让 10 个 AI 工具开发者导入一周账单，看能否发现 20% 以上可节省成本。",
      ),
    ],
    rejected: [
      "Hy3、Doubao、SenseNova 等模型能力更新重要，但直接产品化需要更具体场景。",
      "AI API 中转站想象空间大，但监管、支付和信任门槛高，不适合做轻 WebApp 第一题。",
      "提示词合集和课程内容有流量，但商业价值弱于端侧隐私和成本问题。",
    ],
    sources: [
      source("AI HOT 全量", "Mininglamp-AI 开源 Cider 与 Mano-P，将 Mac 变为本地 AI 工作站", "https://x.com/xiaohu/status/2051975604355096926"),
      source("AI HOT 全量", "Chrome 可能静默下载 4GB 端侧 AI 模型", "https://www.ithome.com/0/947/544.htm"),
      source("AI HOT 全量", "豆包 Seed-2.0-lite 全模态理解", "https://www.ithome.com/0/947/010.htm"),
      source("AI HOT 全量", "AI API 中转站构建 Agent 时代底座", "https://x.com/AYi_AInotes/status/2051965264128798849"),
      source("BuilderPulse", "BuilderPulse 2026-05-06 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-06.md"),
    ],
  },
  {
    date: "2026-05-05",
    title: "企业部署、无密钥认证和敏感表单：今天最值得做的是 AI 工具密钥与数据泄露体检",
    summary:
      "AI HOT 这天只能追溯日报 25 条；结合 BuilderPulse 的医疗表单与密码内存信号，最值得做的是面向团队的 AI 工具密钥、脚本和敏感数据泄露体检。",
    tags: ["数据泄露", "密钥安全", "企业 AI"],
    sourceTags: ["AI HOT 日报 25条", "BuilderPulse"],
    scores: { commercial: 88, traffic: 74, wedge: 84 },
    winner: {
      name: "AI 工具密钥与数据泄露体检",
      short:
        "扫描网页表单、分析脚本、Agent 配置和 API key 使用方式，输出敏感数据外传与无密钥改造建议。",
    },
    conclusion: [
      "由于 AI HOT 全量接口只保留近 7 天，5/5 只能使用日报和 BuilderPulse 追溯，不把它伪装成全量。",
      "Claude 平台推出无密钥认证，OpenAI/PwC 和 Anthropic 企业服务公司都在推企业 AI 落地；BuilderPulse 点出医疗表单把敏感语境共享给广告技术公司的风险。",
      "最值得做的是 AI 工具密钥与数据泄露体检。它从一个网站或代码仓库开始，检查表单数据是否流向广告脚本、Agent 配置是否硬编码 key、哪些工作负载可以改用 OIDC。",
    ],
    opportunities: [
      opportunity(
        "AI 工具密钥与数据泄露体检",
        "今日第一优先级",
        [88, 74, 84],
        "企业接入 AI 工具和分析脚本后，敏感数据可能通过表单、日志、prompt 或硬编码 key 外泄。",
        "现在靠安全团队人工 review、DLP、代码扫描和偶尔渗透测试，AI 工具配置常被漏掉。",
        "输入网站 URL 或 GitHub 仓库，扫描表单字段、第三方脚本、API key、Agent 配置和 OIDC 可改造点。",
        "用免费单页泄露检查器获客，团队版卖深度报告、持续监控、修复 PR 和合规导出。",
        "误报和法律表述要谨慎，必须展示证据链并建议人工复核。",
        "挑 50 个公开网站做被动扫描样例，联系 10 个网站负责人验证报告是否足够具体。",
      ),
      opportunity(
        "无密钥认证迁移助手",
        "窄但高价值",
        [84, 62, 82],
        "Claude 无密钥认证说明企业客户担心 API key 管理，云身份/OIDC 会成为 AI 平台接入标配。",
        "团队现在把 key 放在环境变量、CI secrets、个人机器或代理服务里，轮换困难。",
        "先支持 Claude/OpenAI/云工作负载：识别 key 使用点，生成 OIDC 迁移清单和配置片段。",
        "面向 DevOps 和平台工程团队，通过 key 风险报告获客，按仓库数和迁移工单收费。",
        "不同云和平台差异大，第一版必须选 AWS/GCP/Azure 中的一两个路径。",
        "找 5 个使用 AI API 的团队，扫描其 CI 和服务配置，看是否能识别可迁移 key。",
      ),
      opportunity(
        "AI 语音克隆授权水印工具",
        "流量强但合规重",
        [76, 82, 68],
        "Grok Voice 克隆显示个性化声音会快速普及，创作者和企业需要证明授权与标记。",
        "现在主要靠平台政策、合同和人工说明，用户难判断声音是否授权。",
        "做上传音频后的授权清单、水印嵌入、使用记录和公开验证页。",
        "面向播客、品牌客服和配音工作室，按授权人数、验证次数和团队协作收费。",
        "音频取证技术难，平台也可能内置；早期应做授权工作流而非声纹鉴定。",
        "找 10 个播客/配音创作者测试授权页面是否能减少客户疑虑。",
      ),
    ],
    rejected: [
      "KroWork、Cursor 插件、OpenClaw 更新有工具价值，但当日更强的商业压力来自企业身份和数据泄露。",
      "GPU 性能和模型加速是基础设施信号，小团队更适合作为成本变量观察。",
      "医疗 AI 诊断研究不能轻易产品化，合规和临床验证门槛过高。",
    ],
    sources: [
      source("AI HOT 日报", "Claude 平台推出无密钥验证方案", "https://x.com/ClaudeDevs/status/2051393709619732758"),
      source("官方", "OpenAI 与 PwC 合作重塑 CFO 办公室", "https://openai.com/index/openai-pwc-finance-collaboration"),
      source("官方", "Anthropic 企业 AI 服务公司", "https://www.anthropic.com/news/enterprise-ai-services-company"),
      source("BuilderPulse", "BuilderPulse 2026-05-05 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-05.md"),
      source("BuilderPulse", "医疗市场追踪：敏感数据共享给广告技术公司", "https://techcrunch.com/2026/05/04/us-healthcare-marketplaces-shared-citizenship-and-race-data-with-ad-tech-giants/"),
    ],
  },
  {
    date: "2026-05-04",
    title: "Runway 角色、AI 创业压力测试和遥测退出：今天最值得做的是 AI 产品信任与遥测审计器",
    summary:
      "AI HOT 这天只能追溯日报 9 条；结合 BuilderPulse 对 VS Code Copilot 署名、DO_NOT_TRACK 和 TUI 可访问性的信号，最值得做的是产品信任与遥测审计器。",
    tags: ["产品信任", "遥测", "开发者工具"],
    sourceTags: ["AI HOT 日报 9条", "BuilderPulse"],
    scores: { commercial: 82, traffic: 78, wedge: 84 },
    winner: {
      name: "AI 产品信任与遥测审计器",
      short:
        "扫描 App、网站和仓库里的遥测、AI 署名、数据发送和退出机制，生成给开发者和用户都能看懂的信任报告。",
    },
    conclusion: [
      "5/4 的 AI HOT 追溯日报条目不多，但 BuilderPulse 给出了更强的构建信号：VS Code 自动插入 Copilot 共同作者、DO_NOT_TRACK、TUI 可访问性争议，都指向软件信任边界。",
      "Runway Characters、医疗 AI 诊断、Agent Skills 和创业压力测试说明 AI 继续扩大能力；但能力越强，用户越在意产品是否诚实说明自己记录了什么、改了什么、发了什么。",
      "最值得做的是 AI 产品信任与遥测审计器，帮助开发者在被社区质疑前，先生成一份事实报告。",
    ],
    opportunities: [
      opportunity(
        "AI 产品信任与遥测审计器",
        "今日第一优先级",
        [82, 78, 84],
        "开发者工具和 AI 产品默认插入署名、遥测、模型调用后，用户需要可验证的透明说明。",
        "现在靠隐私政策、README、设置页和开发者口头解释，普通用户很难核对。",
        "扫描仓库和站点：遥测 SDK、网络请求、AI 署名、默认开关、退出机制和隐私文案一致性。",
        "对开源项目免费生成 trust badge，商业版卖持续监控、变更提醒、合规报告和品牌页。",
        "隐私审计容易引战，必须事实化，不做道德裁判。",
        "选 30 个开发者工具跑报告，发给维护者看是否愿意加 badge 或修正文档。",
      ),
      opportunity(
        "AI 创业想法压力测试器",
        "流量强，付费中等",
        [76, 84, 80],
        "Codex startup pressure test skill 说明创业者愿意让 AI 帮自己暴露假设和寻找首批客户。",
        "现在创业想法验证多停留在聊天、Notion 模板和朋友反馈，缺少强制问题和行动清单。",
        "做 Web 版压力测试：问题真实性、替代方案、首批 10 客户、两周验证动作和落地页文案。",
        "靠免费测评和分享图获客，付费点是多轮追踪、客户名单生成、访谈脚本和进度督促。",
        "容易变成泛创业内容工具，必须逼用户做线下验证而非只生成漂亮报告。",
        "让 50 个用户提交想法，追踪两周内是否完成 5 次真实用户访谈。",
      ),
      opportunity(
        "实时 AI 视频角色客服",
        "视觉冲击强",
        [80, 82, 66],
        "Runway Characters 让单张图生成实时对话视频角色，品牌客服、教育和创作者会想尝试。",
        "现在客服头像多是静态图或预渲染视频，真人直播成本高。",
        "先做小品牌 FAQ 视频角色：上传形象、知识库和声音，嵌入官网回答问题。",
        "靠 demo 和行业模板传播，按嵌入量、知识库、品牌角色和转化分析收费。",
        "平台能力会快速商品化，且实时视频成本高；独立产品要做垂直场景和转化闭环。",
        "给 5 个小品牌做官网角色，看是否提升停留和咨询转化，而不是只看新鲜感。",
      ),
    ],
    rejected: [
      "医疗诊断准确率新闻非常重要，但临床产品门槛远高于普通商业 WebApp。",
      "GPU 冷启动和推理加速适合基础设施团队，不适合今天的独立 WebApp 切口。",
      "TUI 可访问性争议可做设计审计的一部分，但单独市场较窄。",
    ],
    sources: [
      source("AI HOT 日报", "Runway Characters 技术解析", "https://runwayml.com/news/building-runway-characters"),
      source("AI HOT 日报", "Codex 创业压力测试 Skill", "https://x.com/gdb/status/2050972114077843772"),
      source("AI HOT 日报", "Agent Skills 工程问题集合", "https://x.com/shao__meng/status/2050892004188692616"),
      source("BuilderPulse", "BuilderPulse 2026-05-04 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-04.md"),
      source("BuilderPulse", "DO_NOT_TRACK 退出机制清单", "https://donottrack.sh/"),
    ],
  },
];

const opportunitySourceRefs = {
  "2026-05-18": [[0, 1, 4, 5, 7, 8], [1, 2, 5, 7], [3, 7]],
  "2026-05-17": [[0, 1, 3, 4, 5, 6, 8], [0, 3, 7], [2, 8]],
  "2026-05-16": [[0, 1, 2, 3, 4, 7, 8], [5], [6]],
  "2026-05-15": [[0, 1, 2, 3, 7], [4, 5, 7], [6, 7]],
  "2026-05-14": [[3, 4, 5], [1, 2, 3], [0, 3]],
  "2026-05-13": [[0, 3, 4], [1, 4], [2, 4]],
  "2026-05-12": [[0, 1, 4], [2, 4], [3, 4]],
  "2026-05-11": [[0, 3, 4], [1, 4], [2, 4]],
  "2026-05-10": [[1, 2, 4], [0, 4], [3, 4]],
  "2026-05-09": [[1, 2, 3, 4], [0, 4], [2, 4]],
  "2026-05-08": [[0, 1, 4], [2, 4], [3, 4]],
  "2026-05-07": [[0, 1, 4], [2, 4], [3, 4]],
  "2026-05-06": [[0, 1, 4], [2, 4], [3, 4]],
  "2026-05-05": [[0, 3, 4], [0, 3], [3, 4]],
  "2026-05-04": [[3, 4], [1, 2, 3], [0, 3]],
};

const opportunityDeepDives = {
  "2026-05-18": {
    subtitle:
      "把企业真实问题同时丢给多款 AI 助手，输出质量、成本、隐私和预算路由建议。",
    thesis:
      "企业不会只买一个 AI 助手。最值得做的 WebApp 是一层评测与路由台：用 Slack/Teams 里的真实问题和账单数据，判断什么问题该交给 Perplexity、Claude、Grok、Codex 或内部知识库。",
    whyNow: [
      "今天的 AI HOT 全量池虽然只有 29 条，但信号非常集中：Perplexity 正在进入 Slack，Grok 走向个人任务自动化，Codex 可以跨设备常驻开发，Perplexity 又出现个人 CFO 方向。AI 助手正在从单点工具变成工作流入口。",
      "BuilderPulse 2026-05-17 的主线是可检查凭证、owner panel 和 AI 工具采用证据。企业买方不是只问“哪个模型强”，而是问“哪类问题给哪个助手、花了多少钱、是否泄露数据、出了错谁负责”。",
      "Daring Fireball 的判断也很关键：AI 是技术，不是单独产品。机会不在再做一个聊天框，而在做跨产品的评测、预算和治理层。这个层天然贴近采购、财务、安全和团队负责人。"
    ],
    mvp: [
      {
        stage: "第 1 周",
        title: "真实问题集导入",
        body:
          "先不做全自动路由，只做一批企业真实问题的离线评测。用户连接 Slack/Teams 或上传 CSV，选择 50-200 条可脱敏问题作为测试集。",
        features: [
          "按问题类型自动聚类：市场研究、代码问答、客户支持、财务分析、内部知识库查询和长文总结。",
          "支持脱敏规则，自动替换客户名、金额、邮箱、内部链接和专有名词。",
          "允许团队标记标准答案、重要来源和不可外发字段，形成可复用 benchmark。"
        ],
      },
      {
        stage: "第 2 周",
        title: "多助手对比报告",
        body:
          "对同一批问题并行调用不同助手或人工粘贴结果，输出负责人能读的质量和成本报告。",
        features: [
          "指标包括答案可用性、引用来源质量、幻觉风险、延迟、token/订阅成本和敏感数据暴露。",
          "每类问题给出推荐路由：适合外部研究助手、适合内部 RAG、适合代码 Agent、必须人工处理。",
          "生成采购简报：继续买什么、减少什么、哪些团队需要限制使用。"
        ],
      },
      {
        stage: "第 3-4 周",
        title: "预算路由与监控",
        body:
          "从一次性评测变成月度治理，让企业知道 AI 助手预算是否真的产生了工作产出。",
        features: [
          "按团队和问题类型追踪使用量、成功率、成本和被人工改写比例。",
          "设置路由策略：低风险研究走 Perplexity，内部数据走本地知识库，高风险财务和法务只输出草稿。",
          "提供 Slack 摘要和月度 owner panel，把异常成本和低质量场景推给负责人。"
        ],
      },
    ],
    technical: [
      {
        title: "采集边界",
        status: "脱敏优先",
        body:
          "MVP 不需要读取所有 Slack 历史。先让用户选择频道、时间段和线程，默认本地脱敏后再评测。敏感客户可以只上传 CSV。"
      },
      {
        title: "评测方法",
        status: "规则 + 人审",
        body:
          "质量判断不能全交给 LLM。应把引用是否存在、是否命中标准答案、是否违反敏感规则做成规则项，再让人审抽样校准。"
      },
      {
        title: "模型接入",
        status: "先半自动",
        body:
          "早期可以支持 API、浏览器粘贴和结果导入三种方式，避免被单个平台权限卡住。真正有付费验证后再做自动路由网关。"
      },
      {
        title: "数据安全",
        status: "本地/私有部署",
        body:
          "评测集本质上是企业问题资产。默认支持本地运行和私有部署，云端版本必须提供脱敏预览、删除策略和审计日志。"
      },
    ],
    goToMarket: [
      "第一批用户是已经同时购买 ChatGPT/Claude/Perplexity/Copilot/Codex 的 20-300 人团队，尤其是研究、客服、销售工程、产品和安全团队。他们已经有预算混乱，不需要教育市场。",
      "冷启动内容可以做“AI 助手预算浪费体检”：公开模板让团队上传 30 条脱敏问题，免费生成哪类问题最容易浪费 token 和订阅费。",
      "销售话术不要说替代某个助手，而是说帮你决定预算怎么分、哪些场景该禁止、哪些场景值得加钱。这更容易进入财务和部门负责人视角。"
    ],
    pricing: [
      {
        name: "免费评测",
        body:
          "最多 30 条问题、2 个助手、输出简版质量和成本报告，用来获取样本和证明价值。"
      },
      {
        name: "团队版 $99-399/月",
        body:
          "多团队问题集、月度评测、Slack/Teams 导入、预算看板和路由建议。"
      },
      {
        name: "企业版 $10k/年起",
        body:
          "私有部署、SSO、审计、脱敏策略、自定义评测指标和采购报告导出。"
      },
    ],
    validation: [
      {
        week: "第 1 周：手工评测",
        body:
          "找 5 个团队，每队收集 50 条真实问题，手工跑 2-3 个助手并做报告。成功标准是负责人能明确指出一个要增购、降级或禁用的场景。"
      },
      {
        week: "第 2 周：免费体检页",
        body:
          "上线 CSV 上传和脱敏预览，测试用户是否愿意提供真实问题。愿意上传比愿意看 demo 更能证明需求。"
      },
      {
        week: "第 3-4 周：预算试点",
        body:
          "对 2 个团队做连续两周追踪，比较推荐路由前后的成本、答案采纳率和人工返工。能省钱或减少返工才值得继续做。"
      },
    ],
    risks: [
      "如果只做模型榜单，很快会被平台和媒体淹没。必须基于企业自己的问题、自己的账单和自己的敏感规则。",
      "自动路由过早会引入安全和可靠性风险。第一版应先做评测报告，确认推荐有用后再接入工作流。",
      "不同助手的 API 能力和 ToS 不一致，早期需要支持结果导入和人工粘贴，降低集成依赖。",
      "买方可能把它当咨询项目。产品必须模板化评测集、报告和月度复盘，避免每个客户都重做一套。"
    ],
  },
  "2026-05-17": {
    subtitle:
      "把一次长时间 Agent 任务拆成计划、验证、成本、失败点和维护债，让负责人能复盘。",
    thesis:
      "开源模型、长任务 Agent 和百万美元级 token 消耗同时出现，说明团队真正缺的是长任务复盘与验证报告台，而不是又一个更会聊天的模型入口。",
    whyNow: [
      "AI HOT 全量池覆盖 219 条，开源模型密集发布和 Claude CLI、Ring-2.6-1T、Codex 技能都在强调更长、更复杂的 Agent 工作流。模型能力在扩张，任务长度也在扩张。",
      "宝玉关于长任务的判断很直接：关键不是让 AI 一直跑，而是规划与验证。Greg Brockman 提到复杂度分析技能，本质也是把 Agent 工作过程变成可检查结果。",
      "BuilderPulse 2026-05-17 把 UUID Collision Receipt、公开 CTF 被 AI 破坏、owner panel 放在一起，说明市场会越来越需要可复盘的证据，而不是事后聊天记录。"
    ],
    mvp: [
      {
        stage: "第 1 周",
        title: "任务日志导入",
        body:
          "先支持 Codex、Claude Code、OpenClaw、CI 日志和人工 Markdown 的导入，把一次长任务整理成时间线。",
        features: [
          "抽取目标、计划、关键动作、文件改动、命令执行、测试结果、失败重试和人工介入。",
          "标记缺失证据：没有测试、没有截图、没有引用、没有 owner、没有回滚方案。",
          "生成一页复盘报告，方便团队在 PR、周会或客户交付中使用。"
        ],
      },
      {
        stage: "第 2 周",
        title: "验证与成本评分",
        body:
          "把长任务从“跑完了”变成“是否可信、是否值得”。",
        features: [
          "计算验证覆盖：测试、lint、截图、人工检查、外链证据和回滚说明。",
          "估算 token 成本和上下文浪费，标记重复读取、无效循环和大段无产出步骤。",
          "输出维护债：哪些 TODO、风险、未验证假设需要进入下一轮。"
        ],
      },
      {
        stage: "第 3-4 周",
        title: "团队复盘库",
        body:
          "把单次报告沉淀成团队资产，帮助负责人改进提示词、流程和工具选择。",
        features: [
          "按项目、模型、任务类型统计成功率、失败原因和平均成本。",
          "沉淀可复用检查清单：代码改动、研究报告、数据清洗、幻灯片生成等任务各一套。",
          "对高风险任务要求人工签收，形成 owner panel。"
        ],
      },
    ],
    technical: [
      {
        title: "日志解析",
        status: "适配器模式",
        body:
          "不同 Agent 日志格式不同，MVP 应做轻量适配器，把输入统一成 event、artifact、validation、cost 四类对象。"
      },
      {
        title: "验证判断",
        status: "证据优先",
        body:
          "不要让 LLM 主观判断任务成功。优先读取退出码、测试结果、截图、diff、外链和人工勾选，再由 LLM 写摘要。"
      },
      {
        title: "成本估算",
        status: "先粗后细",
        body:
          "早期按模型、输入长度、日志 token 和调用次数估算即可。真正接入账单 API 后再做精确成本归因。"
      },
      {
        title: "部署形态",
        status: "本地优先",
        body:
          "任务日志可能包含源码和客户信息。第一版做本地 WebApp/CLI，团队版再提供私有部署和脱敏同步。"
      },
    ],
    goToMarket: [
      "首批用户是每天让 AI 跑长任务的工程团队、自动化工作室和 AI-heavy agency。他们已经感受到“跑完不等于可信”，也最容易拿出真实日志。",
      "内容入口可以是“你的 AI 长任务复盘模板”“130 万美元 token 消耗教会我们的事”“Agent 任务验收清单”。这些标题会吸引已经被成本和失败困扰的人。",
      "早期不要卖协作平台，卖复盘报告生成器。用户先愿意把报告贴进 PR、发给客户或发给老板，后面才会为团队库和持续监控付费。"
    ],
    pricing: [
      {
        name: "免费本地版",
        body:
          "单任务导入、生成 HTML 报告和验证清单，适合个人 builder 试用。"
      },
      {
        name: "团队版 $49-199/月",
        body:
          "项目库、多人 owner、月度成本统计、复盘模板和 Slack/GitHub 集成。"
      },
      {
        name: "Agency/企业版 $5k/年起",
        body:
          "客户交付报告、白标、私有部署、审计留存和自定义验证规则。"
      },
    ],
    validation: [
      {
        week: "第 1 周：收集真实日志",
        body:
          "找 10 个 Codex/Claude Code 重度用户，手工把他们最近一次长任务变成复盘报告。成功标准是报告能指出至少一个原本没发现的验证缺口或成本浪费。"
      },
      {
        week: "第 2 周：本地导入器",
        body:
          "做最小导入器，支持粘贴日志和上传文件，观察用户是否愿意在真实任务后立刻生成报告。"
      },
      {
        week: "第 3 周：团队付费",
        body:
          "让 2-3 个团队把复盘报告放入 PR 或周会流程，验证它是否成为管理习惯，而不是一次性玩具。"
      },
    ],
    risks: [
      "如果报告只是漂亮摘要，没有验证证据，就会被当作又一个 AI 文档工具。必须把测试、截图、diff、人工签收放在核心位置。",
      "日志格式会持续变化，适配器要轻量，避免为了追每个平台做成维护黑洞。",
      "用户可能不愿上传源码日志，所以本地优先和脱敏预览是获客前提。",
      "长任务类型太多，早期应聚焦代码任务和研究报告两类高频场景。"
    ],
  },
  "2026-05-16": {
    subtitle:
      "把每个 Agent 连接器的成本、权限和高风险动作做成负责人能读懂的一页收据。",
    thesis:
      "Agent 正在接入 IDE、浏览器、代码库、个人订阅和财务账户。最值得做的 WebApp 不是再造 Agent，而是做跨工具的连接器成本与权限报告台。",
    whyNow: [
      "AI HOT 全量接口显示，北京时间 2026-05-16 的 84 条里，Codex 常驻提交、OpenClaw 安全护栏、Claude Code 插件成本、Zed/ChatGPT 订阅和 Grok/Hermes 集成都在同一天出现。这不是孤立新闻，而是 Agent 接入面扩张。",
      "BuilderPulse 最新中文日报把买方痛点说得更直接：agent connectors 会带来 55,000 token 的隐藏上下文开销，也可能出现 $2,000 级别的编辑器账单。工程经理需要在财务追问前先拿到解释。",
      "当 Agent 能访问 GitHub、Notion、浏览器会话、API 文档和订阅账户时，团队的核心问题会变成：谁批准的、能碰什么、花多少钱、出了问题能不能复盘。",
    ],
    mvp: [
      {
        stage: "第 1 周",
        title: "只读连接器清单",
        body:
          "先不拦截动作，只读取团队已经配置的插件、MCP server、IDE agent 和 CLI 配置，生成统一资产清单。",
        features: [
          "导入 Claude Code 插件列表、MCP JSON、Codex/CLI 配置和 Zed/Hermes 说明。",
          "识别连接器类型：代码库、浏览器、文档、支付、财务、内部 API 和模型路由。",
          "输出每个连接器的账号范围、可触达数据、上下文开销线索和负责人。"
        ],
      },
      {
        stage: "第 2 周",
        title: "风险与成本评分",
        body:
          "把技术配置翻译成负责人语言，突出最该关闭、限额或审批的连接器。",
        features: [
          "按敏感数据、外部写入、生产部署、长期记忆和高上下文消耗评分。",
          "标记重复连接器、未知订阅来源、缺少 owner 的工具和高风险默认权限。",
          "生成一页 HTML/PDF 报告，包含建议关闭项和预计节省/风险降低。"
        ],
      },
      {
        stage: "第 3-4 周",
        title: "整改工作流",
        body:
          "从报告走向持续治理，但仍保持窄范围：只处理连接器、成本和权限。",
        features: [
          "提供关闭、限额、转为审批、转为只读四类建议动作。",
          "每月重扫配置漂移，提醒新增连接器和成本异常。",
          "支持 Slack/邮件发送负责人报告，留下整改历史。"
        ],
      },
    ],
    technical: [
      {
        title: "采集方式",
        status: "本地只读",
        body:
          "MVP 不需要接管执行链路。优先读取配置文件、插件 manifest、账单导出和会话摘要，降低安全阻力。",
      },
      {
        title: "成本估算",
        status: "规则加样本",
        body:
          "不同 Agent 的 token 统计口径不一致，早期应按连接器说明、上下文大小、调用频次和账单样本估算，而不是承诺精确记账。",
      },
      {
        title: "权限模型",
        status: "负责人语言",
        body:
          "把 OAuth scope、MCP tool、文件路径和命令权限映射成“能读什么、能写什么、能触发什么账单”。",
      },
      {
        title: "隐私边界",
        status: "默认不上传",
        body:
          "连接器配置可能暴露内部系统名和路径。默认本地生成报告，云端协作作为团队版可选项。",
      },
    ],
    goToMarket: [
      "第一批用户应是每周大量使用 Claude Code、Codex、Cursor、OpenClaw、Hermes 或 MCP 的 5-50 人工程团队。他们足够早遇到成本和权限问题，也没有完整平台团队。",
      "内容入口可以做成“Agent 连接器体检清单”“MCP 成本计算器”“Claude Code 插件风险报告”这类工具，直接承接搜索和社群传播。",
      "早期销售不要卖大平台，卖一次报告：扫描 30 分钟，交付一页负责人能转发给 CTO/财务/安全的收据。",
    ],
    pricing: [
      {
        name: "免费本地报告",
        body:
          "单人/单仓库扫描，最多 10 个连接器，输出 HTML 报告，用来制造采用和信任。",
      },
      {
        name: "团队版 $49-149/月",
        body:
          "多仓库、多成员、月度重扫、报告历史、Slack 提醒和基础整改任务。",
      },
      {
        name: "安全版 $5k/年起",
        body:
          "私有部署、SSO、审计留存、自定义策略、脱敏模板和管理层 PDF 导出。",
      },
    ],
    validation: [
      {
        week: "第 1 周：手工报告",
        body:
          "找 10 个 AI 重度工程团队，手工读取他们愿意分享的连接器配置和账单截图，交付一页报告。成功标准是 5 个团队发现至少一个要关闭或限额的连接器。",
      },
      {
        week: "第 2 周：本地扫描器",
        body:
          "把最常见的 3 类配置做成 CLI 扫描器，验证用户是否愿意在真实仓库运行，并是否会把报告转发给负责人。",
      },
      {
        week: "第 3 周：付费试点",
        body:
          "对愿意持续使用的团队收取小额月费，提供月度重扫和整改追踪，验证它是否从一次性好奇变成管理习惯。",
      },
    ],
    risks: [
      "平台可能快速补内置成本和权限面板，所以产品必须跨工具，并且输出负责人报告而不是单工具指标。",
      "成本估算如果过度承诺会失去信任，早期应明确区分估算、账单导入和已验证节省。",
      "读取配置本身有安全顾虑，必须默认本地运行、可脱敏预览，并支持完全离线导出。",
      "如果只面向开发者个人，付费意愿会弱；必须把报告设计成工程经理、安全和财务都能使用的交付物。",
    ],
  },
  "2026-05-15": {
    subtitle:
      "把 Agent 的高风险动作变成可审批、可追溯、可复盘的工作流，而不是等事故发生后再翻聊天记录。",
    thesis:
      "Codex Hooks、程序化令牌、Genkit 中间件和移动端审批说明 Agent 正在进入生产权限层。最靠谱的 WebApp 机会，是在工具调用前后加一层跨平台策略网关。",
    whyNow: [
      "今天的 AI HOT 全量池里，Codex 同时出现了 Hooks、程序化访问令牌、移动端远程审批和 Windows 沙箱；Google Genkit 也推出可拦截模型和工具调用的中间件。这些信号都指向同一个变化：Agent 不再只是聊天输出，而是在真实开发环境里读写、执行、部署、调用外部系统。",
      "一旦 Agent 进入 CI/CD、代码库、浏览器和企业工具，购买阻力就从“模型够不够强”变成“权限怎么给”。工程负责人希望低风险动作自动跑，高风险动作必须有人批准；安全团队希望每个策略都能解释；管理层希望看见成本、事故和改进趋势。",
      "现有方案碎片化：Codex 有自己的 hook，Genkit 有自己的中间件，Claude Code 有自己的配置，浏览器扩展另算一套。横向机会在于把这些工具调用统一成组织级策略、审批和证据链。",
    ],
    mvp: [
      {
        stage: "第 1 周",
        title: "Hook 模板与事件归一化",
        body:
          "先不做全量平台，只做一个轻量网关和 3 个 hook 模板，把不同 Agent 的工具调用转成统一事件。",
        features: [
          "事件 schema：actor、tool、action、target、repo、risk、evidence、costEstimate、decision。",
          "Codex Hook 模板：命令执行前、文件写入后、任务完成后，把事件发送到本地网关。",
          "Genkit 中间件模板：拦截工具调用，支持 allow、deny、needsApproval 三种返回。",
        ],
      },
      {
        stage: "第 2 周",
        title: "高风险策略和人工批准",
        body:
          "把价值集中在最容易触发团队担忧的动作上，先覆盖密钥、生产配置、部署和外部数据发送。",
        features: [
          "规则库：敏感路径、危险命令、外部域名、生产环境变量、部署工具、客户数据表。",
          "审批页：展示动作摘要、风险原因、原始证据、推荐决策和一次性批准按钮。",
          "移动友好：负责人离开电脑后仍能批准或拒绝长任务中的关键步骤。",
        ],
      },
      {
        stage: "第 3-4 周",
        title: "团队策略与报告",
        body:
          "当单次审批跑通后，再做团队层的策略模板、审计日志、成本统计和管理层报告。",
        features: [
          "策略模板：研发、生产发布、客户数据、开源贡献四类默认策略。",
          "审计导出：按任务、成员、仓库、风险级别导出 HTML/PDF。",
          "成本和阻塞分析：哪些策略拦截最多、哪些任务等待审批最久、哪些 Agent 最花钱。",
        ],
      },
    ],
    technical: [
      {
        title: "集成方式",
        status: "从旁路开始",
        body:
          "第一版用 CLI wrapper、Codex hooks 和 Genkit middleware 接入，不要求用户替换 Agent。旁路采集降低迁移成本，也更容易在团队里试点。",
      },
      {
        title: "策略引擎",
        status: "规则优先",
        body:
          "高风险判断必须可解释：路径、命令、域名、环境、数据类型和部署目标由规则层判定。LLM 只负责把原因翻译成审批人能看懂的摘要。",
      },
      {
        title: "数据安全",
        status: "本地优先",
        body:
          "事件可能包含仓库名、命令、路径和内部域名。MVP 应默认本地 SQLite 或客户私有环境运行，上传前支持脱敏预览。",
      },
      {
        title: "跨工具抽象",
        status: "保持窄接口",
        body:
          "不要一开始做完整 Agent 平台。只抽象工具调用事件和审批结果，让不同 Agent 继续负责执行，网关只负责策略和留痕。",
      },
    ],
    goToMarket: [
      "第一批用户应找已经把 Codex、Claude Code、Cursor、Genkit 或浏览器 Agent 用在真实仓库的人，而不是泛 AI 爱好者。他们已经遇到权限弹窗、长任务审批、日志难查和成本难解释的问题。",
      "获客内容可以做成开源策略包：例如“Codex 生产仓库 10 条默认禁令”“Genkit 工具调用审批模板”“Agent 访问密钥前该拦什么”。这些内容天然会被工程负责人和安全团队收藏。",
      "销售路径从免费 hook 模板开始：用户先在本地跑一次风险报告，再升级到团队策略、私有日志、SSO 和审批历史。能不能把一次 hook 报告转发给老板，是早期传播性的关键指标。",
    ],
    pricing: [
      {
        name: "免费版",
        body:
          "本地单仓库、3 条内置策略、最近 20 次任务日志。目标是让团队看到真实风险和审批价值。",
      },
      {
        name: "团队版 $29-99/席/月",
        body:
          "多仓库策略、审批历史、成本统计、Slack/邮件通知、报告导出和成员权限。",
      },
      {
        name: "私有部署 $5k-25k/年起",
        body:
          "给安全要求高的工程团队，卖日志不出域、SSO、审计留存、自定义策略和合规报告模板。",
      },
    ],
    validation: [
      {
        week: "第 1 周：验证是否愿意接 hook",
        body:
          "找 10 个真实使用代码 Agent 的团队，给他们一个只读 hook 模板，生成最近任务的风险报告。成功标准是至少 5 个团队愿意继续接入下一类高风险动作。",
      },
      {
        week: "第 2 周：验证审批是否有价值",
        body:
          "选择 3 类动作做人工批准：生产配置、密钥路径、部署命令。观察审批人是否觉得摘要足够可信，以及是否愿意把策略留在日常流程中。",
      },
      {
        week: "成功标准",
        body:
          "至少 2 个团队愿意为审批历史或私有日志付费，且负责人能明确说出“这让我们敢把 Agent 放进更高权限场景”。",
      },
    ],
    risks: [
      "平台会做自己的审批和日志，所以产品不能只绑定一个工具；跨工具统一和组织级策略才是护城河。",
      "审批太重会拖慢 Agent 价值，必须支持低风险自动放行、高风险才拦截，并持续报告误拦率。",
      "如果采集日志太敏感，安全团队会拒绝试点。默认本地运行、脱敏和最小事件 schema 是必要条件。",
      "规则过于泛化会误报，早期应从代码仓库和部署流程切入，不要同时覆盖所有企业工具。",
    ],
  },
  "2026-05-13": {
    subtitle:
      "把浏览器 Agent、代码 Agent 和法律/安全 Agent 的每一次动作变成可搜索、可审计、可汇报的证据链，而不是再做一个新的 Agent。",
    thesis:
      "最值得做的不是替团队自动完成更多动作，而是让团队能放心批准 Agent 做动作：看得见、追得回、算得清、能问责。",
    whyNow: [
      "今天的热点不是单个模型能力，而是 Agent 正在进入真实动作层。Computer Use 让 Codex 更接近桌面执行，Google ADK 强调可暂停恢复的长流程 Agent，Anthropic 法律行业插件和安全团队实践说明 Agent 已经开始触碰高风险业务语境。",
      "一旦 Agent 能登录网站、改代码、读文件、调用工具、处理法律文档，团队购买阻力就从“能不能做”变成“出了问题怎么证明”。这类证明需求天然属于负责人：工程负责人要看 PR 和终端动作，安全负责人要看敏感域名和文件访问，财务负责人要看 token/API 成本，法务负责人要看证据来源和人工批准点。",
      "现有日志是碎片化的：聊天记录在模型工具里，浏览器历史在本机，终端日志在 shell，代码 diff 在 GitHub，token 账单在 API 平台。真正可卖的产品，是把这些碎片统一成一份任务级报告，让负责人能在十分钟内判断一次 Agent 任务是否可接受。",
    ],
    mvp: [
      {
        stage: "第 1 周",
        title: "会话导入和任务时间线",
        body:
          "先不做实时拦截，只做导入和报告。用户上传 Claude Code/Codex 终端日志、浏览器导出的 HAR/历史记录、Git diff 或任务截图，系统生成一条按时间排序的 Agent 行动线。",
        features: [
          "任务摘要：目标、开始结束时间、使用工具、最终产出。",
          "动作时间线：访问过的域名、执行过的命令、改动过的文件、调用过的 API。",
          "证据链接：每个风险判断都能回到原始日志片段或 diff。",
        ],
      },
      {
        stage: "第 2 周",
        title: "风险和成本评分",
        body:
          "在时间线之上加可解释评分，不做黑箱安全结论，而是把高风险动作归类，方便负责人复核。",
        features: [
          "敏感动作识别：删除、写入生产配置、访问密钥文件、外发数据、提交代码、调用支付或部署接口。",
          "成本估算：按模型、token、工具调用、运行时长和失败重试估算任务成本。",
          "审批建议：哪些动作下次应自动允许、哪些应要求人工确认、哪些应禁止。",
        ],
      },
      {
        stage: "第 3-4 周",
        title: "团队报告和轻量网关",
        body:
          "等导入报告被验证后，再做团队工作流：私有项目、成员、任务归档、审批规则和导出。",
        features: [
          "团队仪表盘：按项目查看 Agent 任务、失败率、成本、风险动作趋势。",
          "审计报告导出：给老板、客户或安全评审看的 HTML/PDF。",
          "MCP/HTTP 轻量网关：高风险工具调用先进入人工批准队列。",
        ],
      },
    ],
    technical: [
      {
        title: "日志采集",
        status: "可从导入做起",
        body:
          "第一版不要碰浏览器插件和系统权限，先支持文件导入、CLI wrapper、GitHub diff 和 HAR。这样能绕开最难的权限问题，也能快速验证报告价值。",
      },
      {
        title: "动作归一化",
        status: "技术难度中等",
        body:
          "把不同来源统一成 event schema：actor、tool、action、target、timestamp、evidence、risk。难点不是解析，而是保留证据链，不能只输出模型总结。",
      },
      {
        title: "风险判断",
        status: "需要规则优先",
        body:
          "早期用规则和白名单比纯 LLM 更可靠：命令类型、域名类别、文件路径、环境变量、diff 范围、外发目标。LLM 只负责解释和生成报告文案。",
      },
      {
        title: "部署形态",
        status: "本地优先更容易卖给安全团队",
        body:
          "MVP 可以是本地 WebApp + SQLite，团队版再做私有云或单租户。涉及代码、日志、密钥和法律文档，纯 SaaS 会遇到信任阻力。",
      },
    ],
    goToMarket: [
      "第一批用户不应该找泛 AI 爱好者，而是找已经在团队里重度使用 Codex、Claude Code、Cursor、Browser Use、n8n/MCP 的人。他们最容易遇到“这个 Agent 刚才到底干了什么”的管理问题。",
      "冷启动内容可以围绕公开案例做：抓 10 个开源 AI PR 或 Agent demo，生成审计报告样例，标题直接打痛点，例如“一个浏览器 Agent 任务里有多少不可见风险动作”。这类内容比泛泛讲 Agent 治理更容易传播。",
      "运营上先做免费工具，而不是直接卖平台：免费生成一次任务报告，报告底部带团队版 CTA。用户愿意分享报告，才说明这个产品有传播性和组织购买可能。",
    ],
    pricing: [
      {
        name: "免费版",
        body:
          "单次导入、最多 3 个任务、报告公开水印。目标是获客和收集真实日志格式。",
      },
      {
        name: "团队版 $19-49/席/月",
        body:
          "私有项目、历史归档、成员权限、成本统计、审批建议、GitHub/CLI 集成。",
      },
      {
        name: "私有部署 $3k-15k/年起",
        body:
          "给安全、法律、金融、企业研发团队，卖日志不出域、SSO、审计留存和自定义规则。",
      },
    ],
    validation: [
      {
        week: "第 1 周：验证报告是否有用",
        body:
          "找 10 个真实使用 Agent 的团队，让他们提供最近 3-5 次任务日志。手工加半自动生成报告，观察他们是否愿意拿给同事或老板看。",
      },
      {
        week: "第 2 周：验证付费触发点",
        body:
          "把报告拆成三种版本：工程复盘、安全审计、成本账单。看哪一种最能触发“我们需要持续用”的反应，并尝试收取首批试点费。",
      },
      {
        week: "成功标准",
        body:
          "至少 5 个团队愿意继续导入下一批任务，2 个团队愿意为私有项目或报告留存付费，且用户能明确说出报告帮他们减少了哪类管理风险。",
      },
    ],
    risks: [
      "平台自带日志功能会出现，所以产品不能只做单个平台的漂亮日志页，必须跨 Codex、Claude、浏览器、GitHub 和内部工具。",
      "安全结论如果说得太满会失去信任，应坚持证据链和人工复核，把产品定位为审计辅助而不是自动合规判定。",
      "采集敏感日志会带来隐私压力，MVP 要支持本地运行、脱敏预览和只上传结构化事件。",
      "如果团队还没有大量 Agent 任务，需求会显得超前。因此首批用户必须来自已经把 Agent 放进真实工程或运营流程的团队。",
    ],
  },
  "2026-05-14": {
    subtitle:
      "不卖迁移本身，而是卖一张让老板能在 30 分钟内看懂的资产地图：谁拥有什么、离开要花多少、按什么顺序搬。",
    thesis:
      "今天最能触发付费的不是“AI 好不好用”，而是“工具到底归谁、退订后数据怎么交接、账单如何被解释”。最窄切口是把“想迁移/想自托管”变成一份可交付的体检报告与迁移路线图。",
    whyNow: [
      "BuilderPulse 今天的信号集中在数字主权与信任断裂：I moved my digital stack to Europe 详细记录了从 GitHub/Gmail/AWS 迁移到欧洲栈（Hetzner、Forgejo、Infomaniak）的完整过程；Leaving GitHub for Forgejo 直接演示了代码托管迁移的动机与阻力；Bambu Lab 远程锁定争议则说明硬件层也在发生“谁控制你的设备”的信任危机。迁移意愿已经存在，缺的是可执行计划。",
      "AIHOT 池子同时放大了成本与可控性焦虑：Claude Code 每周限额增加 50% 但用户仍在抱怨额度不够；Anthropic 为付费计划新增程序化调用专用额度，说明团队开始把 AI 工具当基础设施管理而非个人消费；Codex 在 Windows 上的安全沙箱讨论则指向“用了 Agent 之后边界在哪里”的组织级担忧。这些信号的交集不是模型能力，而是团队需要一张地图来回答“我们的数字资产在哪里、谁能控制、离开要多久”。",
      "现有解决方案是碎片化的：顾问按天收费且不可复现，运维同事靠经验拍板但缺少全景视图，博客文章只有个案没有模板。真正的产品机会是把采集、评分、报告和迁移计划模板化——一份可以发给 CTO 或安全评审的标准化交付物，而不是一次性的咨询项目。",
    ],
    mvp: [
      {
        stage: "第 1 周",
        title: "只读体检与资产清单",
        body:
          "先不做迁移执行，只做现状扫描。用户通过 OAuth 或上传配置导出，系统生成一张组织级资产地图。",
        features: [
          "资产发现：扫描 GitHub 组织仓库数、协作者、Webhook、CI/CD 绑定；扫描 IdP（Google Workspace/Entra ID）中的 SaaS 授权与 SAML 应用。",
          "退出难度评分：每个资产按数据导出能力、替代品成熟度、锁定期限、合规依赖打分（1-5），标红“离开成本最高”的项。",
          "依赖关系图：哪些资产互相绑定（例：GitHub Actions → AWS、Google IdP → 20+ SaaS），迁移顺序建议。",
        ],
      },
      {
        stage: "第 2 周",
        title: "替代选型与迁移 Runbook",
        body:
          "在资产清单之上生成可执行迁移计划，不是泛泛建议，而是针对每个高风险资产的具体替代方案与步骤。",
        features: [
          "替代选型矩阵：每个高风险资产列出 2-3 个替代品，按成本、数据主权、功能覆盖、迁移难度对比。",
          "30 天迁移 Runbook：按优先级排序的周计划，每周 3-5 个可验证里程碑，附带回滚条件。",
          "预算估算：迁移人力成本、新平台月费、过渡期双跑成本，输出一个可以发给财务的数字。",
        ],
      },
      {
        stage: "第 3-4 周",
        title: "团队协作与持续监控",
        body:
          "把一次性报告变成持续服务：团队成员可以标注进展、更新状态，系统监控迁移进度与新风险。",
        features: [
          "团队仪表盘：按系统/负责人查看迁移进度、阻塞项、到期日；支持导出 HTML/PDF 给管理层。",
          "变更监控：当被依赖的平台变更定价、条款或 API 时自动告警，更新退出难度评分。",
          "迁移日志：每一步执行记录、验证结果、回滚触发点，形成可审计的迁移证据链。",
        ],
      },
    ],
    technical: [
      {
        title: "资产采集",
        status: "OAuth + API 优先",
        body:
          "第一版通过 GitHub OAuth、Google Workspace API、云账单 API（AWS/Azure/GCP）采集结构化数据。不碰文件系统和网络扫描，只读取组织级元数据：仓库列表、协作者、Webhook、SaaS 授权、IAM 角色。这样能绕开最敏感的权限问题，也能在 30 分钟内完成首次扫描。",
      },
      {
        title: "退出难度评分模型",
        status: "规则 + LLM 解释",
        body:
          "评分引擎用规则层做核心判断：数据导出格式是否标准、是否有 API 可批量迁移、替代品是否已验证、合同是否有退出条款、合规是否有数据驻留要求。LLM 只负责生成人类可读的解释文案和迁移建议，不参与评分决策。这保证了可解释性和一致性。",
      },
      {
        title: "迁移 Runbook 生成",
        status: "模板 + 条件分支",
        body:
          "Runbook 不是 LLM 自由发挥，而是基于预定义模板生成：每个资产类型（代码托管、IdP、文档、CI/CD、数据库）有标准迁移步骤模板，系统根据资产属性填充具体参数。条件分支处理特殊情况（如私有仓库数量 > 100 需要分批迁移）。这避免了“AI 生成的计划不可执行”的问题。",
      },
      {
        title: "部署与数据安全",
        status: "本地优先，云端可选",
        body:
          "体检涉及组织最敏感的元数据（仓库列表、人员、权限、账单），MVP 必须支持本地运行。技术栈：Node.js/Python CLI + 本地 SQLite + 本地 Web 界面。团队版可选私有云部署，但扫描和评分逻辑必须能在断网环境下跑完。永远不把用户的 GitHub token 或 IdP 凭据上传到第三方服务器。",
      },
    ],
    goToMarket: [
      "第一批用户应该来自正在讨论数字主权的社群：Hacker News 上 Leaving GitHub 帖子的评论者、欧洲 SaaS/自托管社群（r/selfhosted、IndieHackers 欧洲标签）、以及刚遭遇平台涨价或条款变更的团队。他们已经有迁移意愿，缺的是一份能发给老板的正式计划。",
      "冷启动内容策略是做“主权体检公开案例”：抓 3-5 个公开迁移案例（如 monokai.com 的欧洲栈迁移、Forgejo 迁移帖），生成体检报告样例，标题直接打痛点——“你的 GitHub 组织离开需要 47 天还是 470 天？”。这类可量化的焦虑比泛泛讲主权理念更容易传播。",
      "转化路径是免费评分 → 付费报告 → 付费迁移支持。免费版输出一个主权评分和 Top 3 风险项；付费版输出完整资产清单、替代选型、30 天 Runbook 和预算估算。迁移支持按系统包月，卖的是“有人帮你盯着进度和处理意外”的安心感。",
    ],
    pricing: [
      {
        name: "免费体检",
        body:
          "单次扫描、最多 10 个资产、输出主权评分和 Top 3 风险项。目标是获客和验证“团队是否愿意看这份报告”。",
      },
      {
        name: "迁移规划 $49-149/次",
        body:
          "完整资产清单、退出难度评分、替代选型矩阵、30 天迁移 Runbook、预算估算。按组织规模定价，支持导出 PDF/HTML 给管理层。",
      },
      {
        name: "持续监控 $29-79/月",
        body:
          "资产变更监控、迁移进度追踪、团队协作、定期复检。适合正在执行迁移或需要持续管理数字主权的团队。",
      },
    ],
    validation: [
      {
        week: "第 1 周：验证报告是否有用",
        body:
          "找 10 个正在讨论自托管/离开 GitHub/迁移到欧洲栈的团队，手工做 1 版体检报告。观察他们是否愿意拿给同事或老板看，以及报告中的哪些信息最能触发“我们需要行动”的反应。",
      },
      {
        week: "第 2 周：验证付费触发点",
        body:
          "把报告拆成两个版本：免费评分（主权分数 + Top 3 风险）和付费规划（完整 Runbook + 预算）。看用户是否愿意为“可执行的迁移计划”付费，而不是只看免费评分就满足。",
      },
      {
        week: "成功标准",
        body:
          "至少 5 个团队愿意继续导入更多资产做完整扫描，2 个团队愿意为迁移规划付费，且用户能明确说出“这份报告帮我节省了多少评估时间”或“我拿这份报告说服了老板批准迁移”。",
      },
    ],
    risks: [
      "平台会推出自己的导出工具和迁移助手（GitHub 已有 Actions 迁移指南），所以产品不能只做单平台迁移，必须做跨平台全景——这是平台自己不会做的事。",
      "容易沦为咨询项目。如果每个客户都需要定制化分析，就无法规模化。必须把采集-评分-报告-Runbook 全链路模板化，用规则引擎替代人工判断。",
      "体检涉及组织最敏感的元数据，一次数据泄露就能毁掉信任。MVP 必须支持本地运行、token 不出域、扫描结果只存本地，永远不在安全上走捷径。",
      "迁移意愿存在但行动力不足——很多团队会说“想迁移”但一直拖。因此首批用户必须来自已经采取行动（如已经在跑 Forgejo 测试实例、已经在做欧洲栈 POC）的团队，而不是只是嘴上说想迁移的人。",
    ],
  },
};

window.AI_OPPORTUNITY_ARTICLES.forEach((article) => {
  const refs = opportunitySourceRefs[article.date] || [];
  article.opportunities.forEach((item, index) => {
    item.sourceRefs = refs[index] || [];
  });
  if (opportunityDeepDives[article.date]) {
    article.opportunities[0].deepDive = opportunityDeepDives[article.date];
  }
});
