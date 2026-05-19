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

const buildOpportunityDeepDive = (article, item, index) => ({
  subtitle: `${item.wedge} 这不是泛泛的趋势解读，而是把第 ${index + 1} 个候选机会拆成可验证产品。`,
  thesis: `${item.name} 的核心判断是：${item.demand} 最窄切口应从可交付、可复查、可收费的小报告或工作流开始，而不是一开始做平台。`,
  whyNow: [
    `当天文章的主线是“${article.title}”。${item.name} 能进入 Top 3，是因为它背后的需求已经从尝鲜进入真实工作流。`,
    item.demand,
    `现有替代方案仍然不够好：${item.statusQuo}`,
  ],
  mvp: [
    {
      stage: "第 1 周",
      title: "手工交付一份样板报告",
      body:
        "先不要急着搭完整系统。用 5-10 个真实样本手工交付结果，确认客户是否认可这个问题值得单独解决。",
      features: [
        "整理用户当前流程、输入材料、决策人和交付格式。",
        "把机会对应的痛点压成一页报告或一个可执行 checklist。",
        "记录用户最愿意保留、转发或付费的部分。",
      ],
    },
    {
      stage: "第 2 周",
      title: "做最窄自动化原型",
      body: item.wedge,
      features: [
        "只自动化最耗时或最难复查的一段，不覆盖完整平台。",
        "每条结论都保留证据来源、人工确认点和下一步动作。",
        "支持导出 HTML/PDF 或 PR/comment 形式，方便团队内部传播。",
      ],
    },
    {
      stage: "第 3-4 周",
      title: "转成团队工作流",
      body:
        "当样板报告被认可后，再加入历史留存、提醒、团队成员、权限和月度趋势，形成订阅理由。",
      features: [
        "团队空间：项目、成员、历史报告和负责人标注。",
        "重复执行：按周/月重新生成报告，发现变化和异常。",
        "管理层视图：把技术细节翻译成成本、风险、效率或收入影响。",
      ],
    },
  ],
  technical: [
    {
      title: "输入边界",
      status: "先窄后宽",
      body:
        "第一版只支持最常见的 1-2 种输入，避免因为集成太多而迟迟不能验证。",
    },
    {
      title: "判断方式",
      status: "规则优先",
      body:
        "核心评分和风险判断尽量用规则、结构化数据和可复查证据。LLM 负责总结和解释，不负责做不可追溯的最终判断。",
    },
    {
      title: "交付形态",
      status: "报告先行",
      body:
        "早期最容易卖的是负责人能转发的一页报告，而不是复杂仪表盘。报告跑通后再做持续监控。",
    },
    {
      title: "数据安全",
      status: "默认保守",
      body:
        "如果涉及代码、账单、账户、素材或客户数据，默认本地处理或私有部署，并提供脱敏预览。",
    },
  ],
  goToMarket: [
    item.distribution,
    "第一批用户应选择已经在手工处理这个问题的人，而不是只觉得概念有趣的人。判断标准是他们是否已经花时间、花预算或承担风险。",
    "早期销售话术要避免“AI 自动解决一切”，改成“帮你把这件事变成可复查、可交付、可追责的流程”。",
  ],
  pricing: [
    {
      name: "免费样板",
      body:
        "免费生成一个轻量报告或 checklist，用来验证用户是否愿意提供真实输入。",
    },
    {
      name: "团队版 $49-299/月",
      body:
        "按项目、成员、报告次数、历史留存、提醒和导出收费，适合小团队持续使用。",
    },
    {
      name: "企业/私有版 $5k/年起",
      body:
        "当数据敏感、需要 SSO、审计留存、自定义规则或私有部署时，进入年度合同。",
    },
  ],
  validation: [
    {
      week: "第 1 周：手工验证",
      body: item.validation,
    },
    {
      week: "第 2 周：原型验证",
      body:
        "把手工流程中最稳定的部分做成可点击原型或 CLI，观察用户是否愿意用真实数据重复跑第二次。",
    },
    {
      week: "成功标准",
      body:
        "至少 5 个目标用户认为报告可以转发给负责人，2 个用户愿意付费继续使用，且能说清它替代了哪段现有流程。",
    },
  ],
  risks: [
    item.risk,
    "如果买方只是个人好奇心，付费会很弱；必须尽快找到团队预算或明确收入/风险责任。",
    "如果产品只停留在摘要层，很容易被大平台内置能力替代；必须沉淀跨工具证据、历史和工作流。",
    "早期不要过度承诺自动化效果，先把可复查、可解释和可交付做好。",
  ],
});

window.AI_OPPORTUNITY_ARTICLES = [
  {
    date: "2026-05-18",
    title: "Agent 搜索、AI 设计稿与 Grok 图像爆量：今天最值得做的是智能体代码搜索收据",
    summary:
      "今天的 AI 商业信号集中在 Agent 代码搜索、跨 Agent 协作、AI 设计稿到代码、生成媒体爆量、重复 bug 报告和 GPU 供给压力。最值得做的不是再造一个 Agent，而是把 Agent 搜索和生成式工作流变成可复查的证据：它找到了什么、漏了什么、花了多少 token、是否触碰敏感文件，负责人能不能据此决定是否信任结果。",
    tags: ["Agent 治理", "代码搜索", "开发者工具"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-18"],
    scores: { commercial: 96, traffic: 88, wedge: 90 },
    winner: {
      name: "智能体代码搜索收据",
      short:
        "接在 Codex、Claude Code、Hermes、OpenClaw 或自研 Agent 的代码搜索步骤后，输出命中证据、遗漏风险、token 成本、敏感文件触达和可复跑查询包。",
    },
    conclusion: [
      "当天最密集的关键词不是“新模型”，而是 Agent 搜索、Agent 协作、AI 设计稿、AI 生成媒体、重复 bug 报告、GPU 供给、模型路由和行为追溯。这些词背后的共同需求，是团队开始需要证明 AI 产出链路是否可信。",
      "逐项判断以后，最有商业味的机会不是“做一个更酷的 Agent”，而是帮团队回答一个非常朴素的问题：AI 刚才找了什么、改了什么、漏了什么、花了多少钱、能不能把证据交给负责人看。这个需求比单个工具新闻更长期，因为 Agent 越能干活，组织越需要收据。",
      "Top 3 推荐分别是：智能体代码搜索收据、AI 设计稿到代码交付质检台、AI 生成媒体发布前风险收据。第一名胜出原因是买方最清楚、场景最窄、替代方案最笨、付费主体更像团队预算，而不是个人好奇心。",
    ],
    signalPool: [
      {
        keyword: "Agent 代码搜索 / Semble",
        signal: "Semble 强调面向 Agent 的代码搜索，并把 token 节省作为核心价值。",
        opportunity: "为代码 Agent 的搜索过程生成可复查收据：查询、命中、遗漏、敏感路径、token 成本和复跑命令。",
        read: "高商业价值。真实场景发生在 PR 修改、重构、bug 修复和安全排查里，买方是工程团队。",
        status: "进入 Top 3",
        sourceRefs: [0],
      },
      {
        keyword: "BuilderPulse 智能体搜索收据",
        signal: "BuilderPulse 2026-05-18 把 Semble 相关讨论归纳为 coding-agent search receipt。",
        opportunity: "把“搜索是否可信”产品化为团队报告，而不是只做搜索引擎。",
        read: "强化了买方语言：收据、证据、复查，比“更快搜索”更容易卖给负责人。",
        status: "进入 Top 3",
        sourceRefs: [1],
      },
      {
        keyword: "飞书机器人互相 @ / Agent 协作",
        signal: "飞书机器人可互相 @，跨 OpenClaw 和 Hermes 讨论任务。",
        opportunity: "Agent 群聊工作流、会议纪要、任务分派、跨 Agent 冲突调解。",
        read: "有流量，但需求容易被协作平台内置；更适合作为 Agent 行动留痕和审批的信号。",
        status: "待观察",
        sourceRefs: [2],
      },
      {
        keyword: "Hermes 多模型配置",
        signal: "Agent 用户开始把多个模型、工具和订阅配置在同一工作流里。",
        opportunity: "模型路由成本账本、Agent 配置审计、连接器权限体检。",
        read: "长期存在，但与 5 月 16 日连接器成本报告重合；今天不单独推荐。",
        status: "合并到治理类",
        sourceRefs: [2],
      },
      {
        keyword: "Ardot 文生 UI / 图片转设计稿",
        signal: "腾讯 Ardot 公测，强调文生 UI、图片转设计稿、权限中心和行为追溯。",
        opportunity: "AI 设计稿到代码交付质检：组件库匹配、设计 token 偏差、响应式和无障碍审查。",
        read: "产设研团队场景清楚，替代方案目前是人工验收和设计走查，进入 Top 3。",
        status: "进入 Top 3",
        sourceRefs: [3, 8],
      },
      {
        keyword: "Kimi 网站设计教程 / AI 生成页面",
        signal: "AI 直接生成网站、落地页和界面方案的教程扩散。",
        opportunity: "生成页面质量审查、SEO/可访问性/转化率验收、品牌一致性检测。",
        read: "需求会长期存在，但单独做“再生成一次”价值低；应绑定交付验收。",
        status: "合并到设计质检",
        sourceRefs: [3, 8],
      },
      {
        keyword: "Grok Imagine 开放",
        signal: "Grok Imagine 向 X Premium+ 开放，生成媒体进入更大规模消费分发。",
        opportunity: "AI 生成媒体发布前风险收据：标注建议、平台规则、素材来源和投诉风险。",
        read: "流量极强，但消费端付费弱；要卖给品牌、MCN、小团队和平台运营。",
        status: "进入 Top 3",
        sourceRefs: [4],
      },
      {
        keyword: "Grok Imagine 1.5 亿网页访问量",
        signal: "网页端访问量被称突破 1.5 亿次。",
        opportunity: "生成媒体资产管理、爆款素材复盘、品牌安全审查。",
        read: "证明需求热度，但不等于直接做生成工具；平台级竞争太强。",
        status: "进入 Top 3",
        sourceRefs: [5],
      },
      {
        keyword: "AI 伪造张家界玻璃桥视频",
        signal: "AI 伪造景区视频引发执法处理。",
        opportunity: "面向景区、媒体号、品牌方的发布前真实性和免责声明工作流。",
        read: "短期供需失衡明显，长期会变成内容合规基础设施。",
        status: "进入 Top 3",
        sourceRefs: [4, 5],
      },
      {
        keyword: "Linus 批评 AI 重复 Bug 报告",
        signal: "AI 生成大量重复或低质量 bug 报告，增加维护者负担。",
        opportunity: "开源项目 AI issue 去重、复现证据、报告质量评分。",
        read: "需求真实但买方付费弱，除非卖给大型开源基金会、企业开源办公室或安全团队。",
        status: "待观察",
        sourceRefs: [6],
      },
      {
        keyword: "GPU 短缺 / H100 供给",
        signal: "GPU 供应压力继续成为大模型训练和推理瓶颈。",
        opportunity: "GPU 资源采购雷达、推理成本预测、排队/预留容量市场。",
        read: "商业价值高但更偏基础设施和采购，独立 WebApp 起步门槛高。",
        status: "淘汰",
        sourceRefs: [7],
      },
      {
        keyword: "AI 工具行为追溯",
        signal: "Ardot 等工具开始显式提到权限中心和行为追溯。",
        opportunity: "跨 AI 工具行为审计、团队级操作留痕、交付证据包。",
        read: "这是长期底层需求，可作为代码搜索收据和设计质检的共同能力。",
        status: "合并到证据层",
        sourceRefs: [3, 8],
      },
    ],
    scoringDimensions: [
      { name: "需求强度", description: "用户今天是否已经在花时间、花钱或承担风险解决这个问题。" },
      { name: "场景具体度", description: "能否说清楚是谁、在什么工作流、遇到什么阻塞。" },
      { name: "替代方案缺口", description: "现有方案是否笨、慢、贵、不可信，或无法跨工具复查。" },
      { name: "解决方案清晰度", description: "能否在一周内做出很窄的 WebApp/报告/插件来验证。" },
      { name: "长期性", description: "需求是否会随着 Agent 和生成式工具普及而持续存在。" },
      { name: "供需失衡", description: "如果不是长期刚需，当前是否处在用户急需但供给不足的窗口。" },
      { name: "付费意愿", description: "目标客户是否有明确预算，愿意为省时间、降风险或增收入付费。" },
    ],
    opportunities: [
      opportunity(
        "智能体代码搜索收据",
        "今日第一优先级",
        [96, 88, 90],
        "代码 Agent 已经在真实仓库里搜索、读文件、改 PR；团队需求不是再多一个搜索框，而是证明 Agent 搜索是否覆盖了关键路径、是否误读上下文、是否浪费 token、是否碰到密钥和客户代码。",
        "现在靠终端日志、聊天记录、grep 输出、PR diff 和 reviewer 记忆。Agent 如果漏掉一个同名函数、读取了错误目录或用 10 倍 token 绕路，负责人很难在事后复盘。",
        "第一版只做本地 CLI/GitHub Action：包装 rg、Semble、grep、代码 Agent 日志和文件读取记录，生成一份 HTML 收据，列出查询、命中、未覆盖目录、敏感路径、token 估算、复跑命令和人工复核 checkbox。",
        "用开源“agent search receipt”GitHub Action 获客；团队版按仓库、成员、历史留存、CI 阻断、敏感路径策略、SSO 和月度搜索质量报告收费。",
        "Semble、IDE 和 Agent 平台会继续优化搜索本身；独立产品必须站在跨工具证据、团队策略和审计留存上，而不是只卖更快搜索。",
        "找 10 个每周用代码 Agent 改 PR 的团队，抽最近 20 次 Agent 搜索日志，手工生成收据，验证是否能发现一个漏搜、误搜或 token 浪费案例。",
      ),
      opportunity(
        "AI 设计稿到代码交付质检台",
        "垂直强，适合产设研团队",
        [90, 85, 84],
        "Ardot、Kimi 网站设计教程和多款文生 UI 工具同时出现，说明设计到代码链路正在被 AI 压缩；真实买方关心生成稿是否符合组件库、响应式规则、品牌规范和可维护代码。",
        "现在靠设计师、前端和产品经理反复人工验收；Figma、Ardot、Cursor、Claude Code 各自有局部能力，但缺少跨工具的交付质量报告。",
        "先做上传 Figma/Ardot 导出和代码 PR 的审查器，输出组件匹配率、设计 token 偏差、响应式断点、无障碍问题、重复样式和可直接改的 checklist。",
        "通过“AI 生成 UI 质检”模板、Figma 插件和 GitHub Action 获客；团队版按项目、组件库、审查次数、批注导出和 CI 集成收费。",
        "设计工具会内置更多检查；独立机会在跨工具、绑定团队组件库、面向交付负责人和保留审查证据。",
        "找 5 个已经用 AI 生成界面稿的团队，手工审 20 个页面，验证是否能减少设计还原返工或 code review 时间。",
      ),
      opportunity(
        "AI 生成媒体水印与虚假内容风险收据",
        "流量强，付费需绑定平台责任",
        [86, 91, 78],
        "Grok Imagine 开放给 X Premium+ 且网页端访问量被称已过 1.5 亿，AI 伪造张家界玻璃桥视频又引发执法处理；创作者、平台和品牌都需要知道素材是否可发布、是否需要标注、是否有投诉风险。",
        "现在靠平台自带水印、人工审核、内容政策和事后下架；小团队很难在发布前形成一张可给客户或平台看的风险说明。",
        "先做上传图片/视频的发布前收据：检测来源线索、生成痕迹、平台规则、免责声明建议、敏感场景分类和保留审查记录。",
        "通过 AI 图像/视频爆款模板、品牌安全和平台合规关键词获客；按审查次数、团队成员、批量处理、白标报告和 API 收费。",
        "检测技术会被平台内置且误判风险高；产品必须定位为发布流程和证据管理，不承诺绝对鉴伪。",
        "找 20 个使用 AI 生成短视频或广告素材的小团队，测试发布前收据是否能改变他们的标注、素材选择或客户交付流程。",
      ),
    ],
    rejected: [
      "Hermes 多模型配置和飞书机器人互相 @ 很有开发者流量，但直接做群聊 Agent 平台容易变成玩具；更好的独立位置是围绕 Agent 搜索、权限和行动生成可复查收据。",
      "Grok Imagine 的消费级流量很强，但再做图像/视频生成会正面撞 xAI、Midjourney 和 PixVerse；发布前风险收据更像小团队会付费的工作流。",
      "GPU 短缺和大型实验室锁定供应是重要基础设施信号，但商业 WebApp 切口偏重采购和云资源市场，今天不如 Agent 搜索收据验证更快。",
    ],
    sources: [
      source("官方或原始信号", "MinishLab/semble：面向 Agent 的代码搜索，号称比 grep+read 少约 98% token", "https://github.com/MinishLab/semble"),
      source("BuilderPulse", "BuilderPulse 2026-05-18 中文摘要：Semble 引发讨论，智能体搜索该不该被信任", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-18.md"),
      source("AI HOT 全量", "向阳乔木：飞书机器人互相 @，可跨 OpenClaw 和 Hermes 讨论", "https://x.com/vista8/status/2056216662391836848"),
      source("官方或原始信号", "腾讯 Ardot：文生 UI、图片转设计稿、权限中心与行为追溯", "https://ardot.tencent.com/"),
      source("AI HOT 全量", "Elon Musk：Grok Imagine 向 X Premium+ 开放", "https://x.com/elonmusk/status/2056209019065229420"),
      source("AI HOT 全量", "DogeDesigner：Grok Imagine 网页端访问量突破 1.5 亿次", "https://x.com/cb_doge/status/2056204334032138720"),
      source("AI HOT 全量", "IT之家：Linus 批评 AI 提交大量重复 Bug 报告", "https://www.ithome.com/0/951/704.htm"),
      source("AI HOT 全量", "Yuchen Jin：GPU 短缺与 H100 供应压力", "https://x.com/Yuchenj_UW/status/2056218132598067457"),
      source("AI HOT 全量", "IT之家：腾讯 AI 设计智能体 Ardot 公测", "https://www.ithome.com/0/951/677.htm"),
    ],
  },
  {
    date: "2026-05-17",
    title: "开源模型潮、长任务验证与百万级 token 燃烧：今天最值得做的是 AI 长任务复盘与验证报告台",
    summary:
      "开源模型密集发布、Agent 长任务规划验证、幻灯片 Agent 真实榜单、Codex 技能、在线记忆、AI 安全证明和高额 token 消耗共同指向一个更可付费的机会：团队不是缺更强模型，而是缺一套把长任务过程、验证结果、上下文成本和后续维护债自动沉淀成负责人能读的复盘报告。",
    tags: ["Agent 治理", "AI 成本", "开发者工具"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-17"],
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
      "Codex 常驻提交、Agent 订阅接入、插件上下文成本、个人财务连接和可访问性 Agent 同时出现；BuilderPulse 把 agent connectors、55,000 token 开销与 $2,000 编辑器账单列为主线。两边共同指向一个更接近付费的机会：团队不是缺一个 Agent，而是缺一张能说清连接器权限、上下文成本、订阅来源和高风险动作的负责人报告。",
    tags: ["Agent 治理", "AI 成本", "开发者工具"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 最新 2026-05-15"],
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
      "Codex Hooks、Genkit 中间件、移动审批和 Windows 沙箱共同指向一个更成熟的团队需求：Agent 已经能远程跑任务、接入 CI/CD、调用浏览器和工具，但企业还缺少跨工具的审批、限权、留痕与成本控制层。",
    tags: ["Agent 治理", "开发者工具", "企业安全"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 最新 2026-05-14"],
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
      "数字主权、退订锁定和 AI 编程账单同时指向一个更接近付费的焦虑：工具到底归谁、退订后数据怎么交接、AI 编程账单如何被控制。最靠谱的切口是把“想迁移/想自托管”变成一份可执行的资产清单与迁移计划。",
    tags: ["数字主权", "开发者工具", "AI 成本治理"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
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
      "浏览器、桌面、长流程、法律和安全 Agent 同时升温；真正能卖给团队的是把 Agent 的动作、权限、花费和审批做成可审计报告。",
    tags: ["Agent 治理", "企业工具", "安全审计"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
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
      "安全事故和 Agent 化开发同时升温；结合 BuilderPulse 对 TanStack/npm 事故的强调，最值得做的是事故发生后 24 小时内可交付的供应链安全响应工具。",
    tags: ["AI 安全", "开发者工具", "B2B SaaS"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
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
      "企业 AI 从模型试用进入行业模板、数据连接器、席位套餐和客服转化；最可卖的 WebApp 是帮团队盘点可落地工作流、数据权限和 ROI 的资产报告。",
    tags: ["企业 AI", "数据连接器", "运营效率"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
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
      "AI Agent 能操作桌面、访问健康数据、甚至被研究用于入侵复制；今天最值得做的是让企业用安全靶场测试 Agent 权限边界。",
    tags: ["Agent 安全", "桌面自动化", "企业防御"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
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
      "ClickUp Brain2、HTML 输出、人工审核工具和 Agent 版本控制都指向同一个需求：团队需要把 AI 产出链路变成可读、可审、可复用的证据。",
    tags: ["团队协作", "AI 报告", "Agent 工作流"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
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
      "浏览器 Agent、GitHub Token 效率、Agent PR 审查、Bugbot 计费和安全中心同时出现；最值得做的是面向研发团队的 Agent PR 审查与成本优化器。",
    tags: ["AI 编程", "代码审查", "成本优化"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
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
        "抽样检查 100 个公开 AI demo 做匿名风险报告，用报告吸引开发者提交自己的应用扫描。",
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
      "x402 自动付款、Claude Managed Agents、移动端 Agent 和 Cloudflare 购买部署同时出现；最有商业价值的是给 Agent 付费和基础设施动作加审批网关。",
    tags: ["Agent 支付", "审批流", "基础设施"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
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
      "本地 AI 工作站、浏览器静默模型、端侧 GUI Agent 和全模态视频处理同时出现；最适合做的是帮个人和团队扫描本机 AI 资产、隐私和成本。",
    tags: ["端侧 AI", "隐私", "本地 Agent"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
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
      "企业部署、无密钥认证、医疗表单和密码内存信号共同指向一个清晰需求：面向团队的 AI 工具密钥、脚本和敏感数据泄露体检。",
    tags: ["数据泄露", "密钥安全", "企业 AI"],
    sourceTags: ["AI HOT 日报", "BuilderPulse"],
    scores: { commercial: 88, traffic: 74, wedge: 84 },
    winner: {
      name: "AI 工具密钥与数据泄露体检",
      short:
        "扫描网页表单、分析脚本、Agent 配置和 API key 使用方式，输出敏感数据外传与无密钥改造建议。",
    },
    conclusion: [
      "企业 AI 落地正在从“能不能接入”转向“接入后敏感数据和密钥会不会外泄”。",
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
      "Runway 角色、AI 创业压力测试、VS Code Copilot 署名、DO_NOT_TRACK 和 TUI 可访问性信号共同指向一个机会：产品信任与遥测审计器。",
    tags: ["产品信任", "遥测", "开发者工具"],
    sourceTags: ["AI HOT 日报", "BuilderPulse"],
    scores: { commercial: 82, traffic: 78, wedge: 84 },
    winner: {
      name: "AI 产品信任与遥测审计器",
      short:
        "扫描 App、网站和仓库里的遥测、AI 署名、数据发送和退出机制，生成给开发者和用户都能看懂的信任报告。",
    },
    conclusion: [
      "VS Code 自动插入 Copilot 共同作者、DO_NOT_TRACK、TUI 可访问性争议，都指向软件信任边界。",
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
  "2026-05-18": [[0, 1, 2, 6, 7], [3, 8], [4, 5]],
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

const opportunityFrameworks = {
  "2026-05-18": [
    {
      scores: [
        { label: "需求强度", value: 9 },
        { label: "场景具体度", value: 10 },
        { label: "替代缺口", value: 9 },
        { label: "方案清晰", value: 9 },
        { label: "长期性", value: 9 },
        { label: "供需失衡", value: 8 },
        { label: "付费意愿", value: 9 },
      ],
      demand:
        "真实需求是工程团队让 Agent 改代码之后，需要知道它到底基于哪些搜索和文件阅读做判断。否则 reviewer 只能重新搜一遍，Agent 省下的时间又被复核吃掉。",
      scenario:
        "场景是工程经理或 senior engineer 审一个 Agent 生成的 PR：Agent 声称修好了登录 bug，但仓库里有三套 auth 逻辑、两个同名 helper、一个 legacy 目录。reviewer 想知道它有没有搜全、有没有漏掉测试和敏感路径。",
      alternatives:
        "现在的替代方案是看聊天记录、终端日志、grep 输出和 PR diff。团队确实在用，但不好用：日志散、不可复跑、没有遗漏清单，也没有 token 成本和敏感文件触达说明。",
      solution:
        "做一个本地 CLI/GitHub Action，包装 rg、Semble、grep 和 Agent 文件读取日志，任务结束后生成 HTML 收据。第一版不阻止 Agent，只回答“它搜了什么、没搜什么、证据在哪”。",
      durability:
        "这是长期需求。Agent 越能独立改代码，组织越需要可复查证据；短期还处在供需失衡期，因为工具先把 Agent 执行能力放出来，审计和复核层明显落后。",
      pricing:
        "个人开发者大概愿意为本地报告付 $0-9/月；小团队如果能接 GitHub Action 和保留历史，$49-199/月合理；安全要求高的企业可为私有部署和审计留存付 $5k-25k/年。",
    },
    {
      scores: [
        { label: "需求强度", value: 8 },
        { label: "场景具体度", value: 9 },
        { label: "替代缺口", value: 8 },
        { label: "方案清晰", value: 8 },
        { label: "长期性", value: 8 },
        { label: "供需失衡", value: 8 },
        { label: "付费意愿", value: 8 },
      ],
      demand:
        "真实需求不是“生成一个更漂亮页面”，而是产设研团队需要把 AI 生成的设计稿和代码交付给真实产品时，确认它是否符合组件库、品牌、响应式和可维护性要求。",
      scenario:
        "场景是产品经理用 Ardot/Kimi/Figma AI 生成了一个活动页，前端要接入现有 React 组件库，设计师要保证品牌一致，增长团队还希望页面能上线测试。问题是生成结果看起来能用，但落地时返工很多。",
      alternatives:
        "现在靠人工 design review、code review、截图对比、Figma 标注和 Lighthouse/axe。团队会用这些方法，但它们分散，而且无法直接解释“AI 生成稿哪里不适合进入代码库”。",
      solution:
        "做上传设计导出和 PR 的质检台：检查组件匹配率、设计 token 偏差、断点、无障碍、重复样式和可维护性，输出逐项 checklist 和可导出的交付报告。",
      durability:
        "长期存在。只要 AI 继续降低设计稿生产成本，交付质量和团队规范就会成为新瓶颈；当前也处在供需失衡期，因为生成工具多，验收工具少。",
      pricing:
        "自由设计师或独立开发者可能付 $9-19/月；小团队为项目审查和组件库绑定可付 $49-299/月；中大型团队如果接 CI 和设计系统，可付 $3k-15k/年。",
    },
    {
      scores: [
        { label: "需求强度", value: 8 },
        { label: "场景具体度", value: 8 },
        { label: "替代缺口", value: 7 },
        { label: "方案清晰", value: 8 },
        { label: "长期性", value: 7 },
        { label: "供需失衡", value: 9 },
        { label: "付费意愿", value: 7 },
      ],
      demand:
        "真实需求是创作者、品牌和 MCN 用 AI 图像/视频发内容前，需要降低虚假内容、未标注、侵权、平台下架和客户投诉风险。",
      scenario:
        "场景是运营团队用 Grok Imagine 或其他工具批量生成短视频和广告图，准备发到 X、抖音、小红书或客户账号。素材看起来能爆，但团队不确定是否要标注 AI、是否像真实灾害/景区事件、是否会被平台或监管处罚。",
      alternatives:
        "现在靠平台自带水印、人工审核、内容政策搜索和事后下架。有人会用，但很粗糙：政策分散、素材批量多、客户交付时缺少一份说明自己做过审核的证据。",
      solution:
        "做发布前风险收据：上传图片/视频，生成平台规则提醒、AI 标注建议、敏感场景分类、免责声明、来源留存和客户可读报告。它不是绝对鉴伪，而是发布流程和责任证据。",
      durability:
        "中长期会存在，但规则会被平台部分吸收。短期供需失衡非常明显：生成能力爆发、分发速度极快，而品牌安全和监管解释跟不上。",
      pricing:
        "个人创作者可能只愿意付 $5-15/月；MCN/品牌小团队如果支持批量审查和白标报告，可付 $49-199/月；平台/代理商 API 形态可到 $5k+/年。",
    },
  ],
};

const opportunityDeepDives = {
  "2026-05-18": [
    {
      subtitle:
        "把 Agent 的代码搜索过程变成可复查、可复跑、可交给负责人的证据收据。",
      thesis:
        "代码 Agent 越能独立改 PR，团队越需要知道它到底搜过什么、读过什么、漏掉什么。这个机会不卖“更快搜索”，而是卖搜索可信度、复核效率和审计证据。",
      whyNow: [
        "Semble 把 Agent 代码搜索的 token 成本和准确性推到台前，BuilderPulse 又把它总结成 coding-agent search receipt。这个词本身就说明买方语言正在从“搜索工具”转向“可交付证据”。",
        "Linus 批评 AI 重复提交 bug 报告、团队开始大量用 Codex/Claude Code 改 PR，这两个信号合在一起说明：AI 不是不会产出，而是产出的证据链不够可信。负责人需要低成本判断一次 Agent 修改有没有漏看关键上下文。",
        "现有替代方案散在终端日志、聊天记录、grep 输出、PR diff 和 reviewer 记忆里。越是大型仓库，越难回答“它有没有搜到真正相关的地方”。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "本地搜索收据生成器",
          body:
            "先不接管 Agent，只包装搜索命令和文件读取记录，生成一份可打开的 HTML 收据。",
          features: [
            "记录查询词、命中路径、读取文件、未覆盖目录、敏感路径触达和复跑命令。",
            "支持 rg、grep、Semble 输出和常见 Agent 会话日志导入。",
            "每次 PR 生成一个 search-receipt.html，作为 reviewer 的辅助材料。",
          ],
        },
        {
          stage: "第 2 周",
          title: "遗漏与浪费提示",
          body:
            "把收据从记录层推进到判断层，但保持可解释，不做黑箱安全结论。",
          features: [
            "标记同名函数、未读取测试目录、未覆盖 legacy 目录和大段 token 绕路。",
            "按文件类型和目录策略提示可能遗漏的上下文。",
            "输出 reviewer checklist：必须人工确认的 3-5 个点。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "GitHub Action 与团队报告",
          body:
            "把一次性本地报告接进团队工作流，开始形成付费理由。",
          features: [
            "PR comment 自动附收据摘要：覆盖范围、风险点、复跑命令。",
            "团队策略：哪些目录必须搜、哪些路径不能读、哪些漏项阻断合并。",
            "月度报告：Agent 搜索质量、token 浪费、常见漏搜路径。",
          ],
        },
      ],
      technical: [
        {
          title: "采集层",
          status: "可从旁路做起",
          body:
            "第一版只包装命令输出和读取日志，不要求用户换 Agent。这样接入阻力低，也能快速验证报告价值。",
        },
        {
          title: "覆盖判断",
          status: "规则优先",
          body:
            "用仓库目录、语言索引、测试路径、最近 diff 和调用图做覆盖提示。LLM 只负责解释，不负责决定是否安全。",
        },
        {
          title: "证据留存",
          status: "必须可复跑",
          body:
            "每条结论都要能回到原始命令、输出片段和文件路径。不能只生成摘要，否则 reviewer 不会信。",
        },
        {
          title: "数据边界",
          status: "默认本地",
          body:
            "代码和搜索日志很敏感，MVP 应本地生成报告；团队版再支持私有部署和脱敏上传。",
        },
      ],
      goToMarket: [
        "第一批用户找每周用代码 Agent 改 PR 的 5-50 人工程团队，尤其是 reviewer 已经抱怨“AI 改的东西还得我重查一遍”的团队。",
        "获客内容可以做“Agent PR 搜索收据模板”“Claude Code/Codex 搜索复核清单”“grep vs Semble 成本对比报告”，让工程经理直接试一次。",
        "销售话术不要说提升搜索速度，要说减少 reviewer 复核时间、减少漏搜事故、给安全和管理层留证据。",
      ],
      pricing: [
        {
          name: "免费 CLI",
          body:
            "单仓库、本地 HTML 收据、基础覆盖提示，用来进入开发者工作流。",
        },
        {
          name: "团队版 $49-199/月",
          body:
            "多仓库策略、GitHub Action、PR 评论、报告历史、敏感路径规则和月度质量报告。",
        },
        {
          name: "企业版 $8k/年起",
          body:
            "私有部署、SSO、审计留存、自定义仓库策略、合规导出和安全团队报表。",
        },
      ],
      validation: [
        {
          week: "第 1 周：手工收据",
          body:
            "找 10 个真实 Agent PR，让团队提供搜索日志或会话记录，手工生成收据。成功标准是至少 5 次发现 reviewer 认为有价值的漏项或复核点。",
        },
        {
          week: "第 2 周：CLI 原型",
          body:
            "做 rg/grep/日志导入的本地原型，验证开发者是否愿意在真实 PR 上运行并把报告发给 reviewer。",
        },
        {
          week: "第 3 周：团队试点",
          body:
            "接 GitHub Action，对 2-3 个团队连续跑一周，看是否进入 PR review 流程并产生阻断或整改动作。",
        },
      ],
      risks: [
        "Semble、IDE 和 Agent 平台会继续增强搜索，所以产品必须占据跨工具证据和团队策略，而不是单纯更快搜索。",
        "如果收据太长，reviewer 反而不看。默认摘要必须压到一屏，并把详细证据折叠。",
        "误报会降低信任。早期只提示“建议复核”，不要自动判定 PR 不可信。",
        "本地数据安全是进入门槛，任何云端模式都要支持脱敏和私有部署。",
      ],
    },
    {
      subtitle:
        "把 AI 生成的设计稿、组件代码和交付 PR 变成可验收的质量报告。",
      thesis:
        "AI 设计到代码的瓶颈不是“能不能生成”，而是生成结果能不能进入团队组件库、品牌规范和工程交付流程。质检台卖的是少返工、可验收和跨角色对齐。",
      whyNow: [
        "Ardot、Kimi 网站设计教程和图片转设计稿信号说明 AI 正在压缩产设研链路，但真实团队不会因为页面看起来像样就直接上线。",
        "设计师关心品牌和设计 token，前端关心组件复用和响应式，产品/增长关心上线速度。现有工具各管一段，缺少面向交付负责人的统一验收报告。",
        "AI 生成页面越多，人工验收越容易成为瓶颈。谁能把“看起来不错”翻译成“可以进 PR/不能进 PR”的证据，谁就有团队付费空间。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "设计稿与 PR 对照报告",
          body:
            "先支持上传 Figma/Ardot 导出和 GitHub PR diff，输出一份交付质量报告。",
          features: [
            "检查组件匹配率、设计 token 偏差、颜色/字体/间距异常。",
            "标记硬编码样式、重复 CSS、未复用组件和响应式断点缺失。",
            "输出设计师和前端分别要看的 checklist。",
          ],
        },
        {
          stage: "第 2 周",
          title: "组件库规则接入",
          body:
            "让报告绑定团队自己的设计系统，而不是用通用审美打分。",
          features: [
            "导入组件清单、token JSON、Tailwind/shadcn 配置和品牌色板。",
            "把偏差分成必须修、建议修、可接受三类。",
            "为每个问题生成可复制的修复建议或 PR comment。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "交付验收工作流",
          body:
            "把一次审查变成团队持续交付流程，形成 SaaS 收费点。",
          features: [
            "GitHub Action 在 UI PR 上自动跑质检。",
            "报告导出给设计、前端、PM 三种视图。",
            "统计 AI 页面返工率、组件复用率和常见生成问题。",
          ],
        },
      ],
      technical: [
        {
          title: "输入格式",
          status: "先窄后宽",
          body:
            "第一版只支持 Figma/Ardot 导出、截图和 GitHub diff。不要一开始适配所有设计工具。",
        },
        {
          title: "视觉差异",
          status: "规则 + 截图",
          body:
            "用 Playwright 截图、DOM/CSS 分析和 token 对比做基础判断，避免纯 LLM 看图导致不可复现。",
        },
        {
          title: "组件匹配",
          status: "可半自动",
          body:
            "通过组件名称、class、import 路径和结构相似度判断是否复用团队组件，早期允许人工确认。",
        },
        {
          title: "报告可信度",
          status: "证据优先",
          body:
            "每个问题都要附截图、代码位置或 token 差异，不要只给模糊建议。",
        },
      ],
      goToMarket: [
        "先找已经用 AI 生成 landing page、活动页或后台模块的产设研团队，他们最容易感到“生成快，但验收慢”。",
        "获客工具可以是免费“AI UI 交付质检报告”：上传截图和 PR，立刻给组件复用率和 Top 10 返工点。",
        "渠道优先 Figma 社群、前端工程师社群、shadcn/Tailwind 用户和增长团队，而不是泛 AI 设计工具用户。",
      ],
      pricing: [
        {
          name: "免费单页检查",
          body:
            "每次检查一个页面，输出基础报告和截图差异，用来建立信任。",
        },
        {
          name: "团队版 $79-249/月",
          body:
            "项目规则、组件库接入、GitHub Action、批注导出、历史趋势和多角色视图。",
        },
        {
          name: "设计系统版 $10k/年起",
          body:
            "私有组件库适配、自定义验收规则、SSO、审计留存和专属报告模板。",
        },
      ],
      validation: [
        {
          week: "第 1 周：人工审 20 个页面",
          body:
            "找 5 个团队提供 AI 生成页面，人工按组件/响应式/token/可维护性出报告，看是否命中他们真实返工点。",
        },
        {
          week: "第 2 周：半自动报告",
          body:
            "实现截图、CSS、token 和 PR diff 的半自动检查，让用户自己上传并验证报告准确率。",
        },
        {
          week: "第 3 周：接入 PR",
          body:
            "给 2 个团队接 GitHub Action，观察是否减少设计验收和 code review 往返。",
        },
      ],
      risks: [
        "设计工具会内置更多检查，所以独立产品必须跨工具并绑定团队组件库。",
        "视觉判断容易主观，必须把报告重点放在可验证的 token、组件、响应式和代码证据。",
        "如果只做设计师工具，付费可能弱；买方应定位为产设研交付负责人。",
        "适配不同前端栈会变复杂，MVP 先选 React + Tailwind/shadcn 或一个明确生态。",
      ],
    },
    {
      subtitle:
        "在 AI 图像和视频发布前，给创作者、品牌和平台运营一份可留档的风险收据。",
      thesis:
        "生成媒体的流量正在爆，但商业团队真正害怕的是下架、误导、侵权、客户投诉和监管风险。机会不在再做生成器，而在发布前的证据、标注和责任管理。",
      whyNow: [
        "Grok Imagine 向 X Premium+ 开放和网页端访问量信号说明 AI 生成媒体正在进入大规模消费场景，发布量会快速上升。",
        "AI 伪造景区/灾害类视频被执法处理，说明风险不是抽象政策，而是会落到具体账号、品牌和客户项目上。",
        "小团队和 MCN 没有专门法务/信任安全团队，发布前只能靠经验判断。可留档的风险收据能把“我觉得可以发”变成“我按流程检查过”。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "素材上传与风险分类",
          body:
            "先做图片/短视频上传，不做内容分发，只输出发布前风险收据。",
          features: [
            "识别人物、灾害、公共事件、品牌商标、医疗金融等敏感场景。",
            "提示是否需要 AI 标注、免责声明或客户确认。",
            "输出可下载的一页 HTML/PDF 审查记录。",
          ],
        },
        {
          stage: "第 2 周",
          title: "平台规则与客户交付",
          body:
            "把风险判断绑定具体发布平台和客户场景，避免泛泛合规建议。",
          features: [
            "按 X、抖音、小红书、YouTube、广告客户交付等场景给不同建议。",
            "生成发布文案里的 AI 标注句、素材备注和客户确认清单。",
            "批量处理一组 campaign 素材，输出项目级风险摘要。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "团队留档与 API",
          body:
            "从单次检查走向团队流程，围绕留档、审批和批量处理收费。",
          features: [
            "团队素材库：保留审查记录、版本、审批人和发布时间。",
            "白标报告：给客户或平台申诉时使用。",
            "API/批处理：接入内容生产流水线和 DAM 工具。",
          ],
        },
      ],
      technical: [
        {
          title: "检测边界",
          status: "不承诺鉴伪",
          body:
            "产品应明确是风险与流程工具，不承诺 100% 判断真假。重点是场景分类、标注建议和证据留存。",
        },
        {
          title: "模型组合",
          status: "多信号",
          body:
            "结合视觉模型、元数据、OCR、相似图搜索线索和平台规则库，给出可解释风险点。",
        },
        {
          title: "规则库",
          status: "要可维护",
          body:
            "平台政策会变，规则库需要按平台、地区、行业和客户模板维护，不能写死在提示词里。",
        },
        {
          title: "隐私与版权",
          status: "默认短期留存",
          body:
            "素材可能是未发布广告和客户资产。默认短期留存、可本地处理、可删除审查记录，是销售前提。",
        },
      ],
      goToMarket: [
        "第一批用户是短视频运营团队、MCN、广告素材工作室和品牌社媒团队，他们每天发布大量 AI 辅助素材且承担客户责任。",
        "获客可以围绕“AI 视频发布前检查清单”“Grok Imagine 素材能不能发”“品牌 AI 素材风险收据”这类搜索和社群内容。",
        "不要卖给普通玩图用户，先卖给有客户交付、账号风险和批量素材流程的小团队。",
      ],
      pricing: [
        {
          name: "按次检查",
          body:
            "$9-19 买一组 campaign 的发布前风险收据，适合创作者和小工作室试用。",
        },
        {
          name: "团队版 $99-399/月",
          body:
            "批量处理、团队审批、素材留档、平台规则、白标报告和客户确认流程。",
        },
        {
          name: "API/企业版",
          body:
            "按调用量或年费收费，面向内容平台、MCN 和品牌代理商的生产流水线。",
        },
      ],
      validation: [
        {
          week: "第 1 周：人工风险报告",
          body:
            "收集 50 条 AI 生成广告图/短视频，人工做风险收据，观察创作者是否会改标注、换素材或要求客户确认。",
        },
        {
          week: "第 2 周：上传原型",
          body:
            "做素材上传和平台规则建议，测试用户是否愿意在发布前多花 2 分钟跑检查。",
        },
        {
          week: "第 3 周：团队留档",
          body:
            "找 2 个内容团队连续一周使用，验证它是否进入发布流程，而不是只作为一次性好奇工具。",
        },
      ],
      risks: [
        "平台会内置水印和检测，所以产品必须站在团队流程、客户交付和证据留档上。",
        "误判会导致用户不信任，必须解释每个风险原因并允许人工覆盖。",
        "不同地区政策差异大，早期应限定平台和市场，不要承诺全球合规。",
        "消费级用户付费弱，必须绑定批量发布、客户责任和团队审批。",
      ],
    },
  ],
  "2026-05-16": [
    {
    subtitle:
      "把每个 Agent 连接器的成本、权限和高风险动作做成负责人能读懂的一页收据。",
    thesis:
      "Agent 正在接入 IDE、浏览器、代码库、个人订阅和财务账户。最值得做的 WebApp 不是再造 Agent，而是做跨工具的连接器成本与权限报告台。",
    whyNow: [
      "Codex 常驻提交、OpenClaw 安全护栏、Claude Code 插件成本、Zed/ChatGPT 订阅和 Grok/Hermes 集成同时出现。这不是孤立新闻，而是 Agent 接入面扩张。",
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
    {
      subtitle:
        "在用户把银行账户交给 AI 前，先给他一张能看懂、能撤销、能留存的隐私与订阅风险收据。",
      thesis:
        "个人财务 AI 的最大摩擦不是功能，而是信任。用户愿意让 AI 看交易数据之前，需要知道暴露了什么、能撤销什么、会不会进入记忆和订阅分析。最窄产品不是理财助手，而是授权前后的隐私与订阅审计器。",
      whyNow: [
        "ChatGPT Pro 通过 Plaid 连接金融账户，说明 AI 正在进入高敏感个人数据场景。只要入口打开，用户就会搜索“安全吗、能看到什么、怎么撤销”。",
        "真实买方不是要另一个预算 App，而是在点击连接前想降低不确定性：哪些账户会暴露，历史交易范围多长，AI 记忆会不会保留，第三方连接能不能停。",
        "现有解释分散在 OpenAI、Plaid、银行授权页和隐私政策里。普通用户不读长政策，需要一页白话风险收据和撤销提醒。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "授权前风险问卷",
          body:
            "不接银行凭证，先让用户选择准备连接的账户类型和使用场景，生成一页授权前风险说明。",
          features: [
            "账户类型：信用卡、Checking、Savings、投资账户、贷款账户。",
            "风险提示：可见交易类别、历史范围、商户信息、订阅模式、收入支出画像。",
            "连接前 checklist：关闭哪些记忆、确认哪些范围、保存撤销入口。",
          ],
        },
        {
          stage: "第 2 周",
          title: "本地账单导入与订阅审计",
          body:
            "用 CSV/账单截图导入替代真实银行连接，先验证用户是否愿意为隐私和订阅洞察付费。",
          features: [
            "识别重复订阅、涨价订阅、长期未用服务和可取消项目。",
            "把每个洞察标注为本地计算，不上传银行凭据。",
            "生成撤销授权、关闭记忆、删除导入数据的操作清单。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "授权追踪与撤销提醒",
          body:
            "当用户愿意持续使用，再做授权台账和提醒，而不是直接做完整个人理财平台。",
          features: [
            "记录哪些 AI 工具/金融工具获得过账户访问。",
            "定期提醒复查授权、撤销不用的连接、导出隐私收据。",
            "按家庭/个人分开管理，不做投资建议。",
          ],
        },
      ],
      technical: [
        {
          title: "合规边界",
          status: "必须窄",
          body:
            "定位为隐私、授权和订阅管理，不做投资建议、信贷建议或银行凭证代理，降低监管压力。",
        },
        {
          title: "数据输入",
          status: "先本地",
          body:
            "MVP 用用户上传 CSV/截图或手动输入，不直接接 Plaid。验证价值后再考虑只读连接。",
        },
        {
          title: "风险解释",
          status: "模板优先",
          body:
            "隐私风险应基于固定模板和授权范围映射，LLM 只负责改写成白话，避免生成错误政策解释。",
        },
        {
          title: "删除与撤销",
          status: "核心能力",
          body:
            "每份报告都要带数据删除、授权撤销和记忆关闭步骤。用户买的是控制感，不只是分析图表。",
        },
      ],
      goToMarket: [
        "第一批用户来自愿意试 AI 财务功能但担心隐私的美国 ChatGPT Pro/Plus 用户，以及经常订阅 SaaS、外卖、流媒体的高消费用户。",
        "获客内容可以围绕“连接银行账户给 AI 前要检查什么”“Plaid 授权能看到哪些数据”“如何撤销 AI 财务连接”。",
        "不要一开始跟 Mint、YNAB 或 Rocket Money 正面竞争；先占“AI 财务授权前隐私收据”这个新入口。",
      ],
      pricing: [
        {
          name: "免费授权前收据",
          body:
            "用户选择账户类型和使用场景，免费生成风险说明，用来获取搜索流量和信任。",
        },
        {
          name: "个人版 $5-12/月",
          body:
            "订阅审计、本地导入、撤销提醒、授权台账和月度隐私检查。",
        },
        {
          name: "家庭版 $29-49/年",
          body:
            "多成员授权清单、共享订阅提醒、家庭账单导入和隐私报告导出。",
        },
      ],
      validation: [
        {
          week: "第 1 周：访谈和假门",
          body:
            "访谈 30 个愿意试 AI 财务功能的用户，展示授权前收据样稿，看他们最在意交易范围、记忆、撤销还是第三方共享。",
        },
        {
          week: "第 2 周：本地订阅报告",
          body:
            "让 20 个用户上传账单 CSV 或截图，生成订阅和隐私报告，验证他们是否愿意为持续提醒付费。",
        },
        {
          week: "第 3 周：撤销提醒",
          body:
            "做一个手动授权台账，观察用户是否愿意记录 AI/金融连接并按提醒撤销不用的授权。",
        },
      ],
      risks: [
        "金融合规边界敏感，产品必须避免理财建议和投资推荐。",
        "平台可能把说明做清楚，所以独立产品要跨 AI 工具和金融连接，而不是只解释 ChatGPT。",
        "个人用户付费低，早期要控制产品范围，先验证订阅审计和撤销提醒是否有留存。",
        "任何真实银行连接都会提高信任门槛，MVP 应先本地导入和手动台账。",
      ],
    },
    {
      subtitle:
        "把 AI 修复无障碍问题后的结果，变成产品、工程、QA 和合规都能验收的证据包。",
      thesis:
        "AI 可以发现和修复 accessibility 问题，但企业真正购买的是可证明、可回归、可交付的修复证据。这个机会应从前端仓库的证据包切入，而不是泛泛做无障碍扫描器。",
      whyNow: [
        "GitHub 试点通用无障碍 Agent，说明平台级玩家已经认为 AI 能参与 accessibility 修复；这会带来更多 AI 生成 PR，也会带来更多验收问题。",
        "企业并不缺 Lighthouse 或 axe 的单次问题列表，缺的是从问题、修复、截图、键盘导航到人工确认的完整链路。",
        "无障碍需求长期存在，且有合规、客户采购和品牌责任驱动。AI 介入后，证据链比建议本身更可卖。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "关键页面证据包",
          body:
            "先支持 3-5 个关键页面，不做全站平台。输出 issue、修复建议、截图和人工验收清单。",
          features: [
            "运行 axe/Lighthouse，归类 WCAG 问题和影响用户场景。",
            "生成修复 PR 草案或代码建议，但默认要求人工确认。",
            "保存修复前后截图、DOM 片段和键盘导航记录。",
          ],
        },
        {
          stage: "第 2 周",
          title: "回归测试与 PR 集成",
          body:
            "把证据包接到前端 PR 流程，让团队在合并前看到无障碍风险。",
          features: [
            "GitHub Action 自动检查改动页面。",
            "PR comment 展示新增/已修复/仍需人工验收的问题。",
            "支持设计系统规则：按钮、表单、弹窗、焦点态、颜色对比。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "合规交付与审计留存",
          body:
            "当单个 PR 跑通后，做团队报告和客户交付物。",
          features: [
            "按页面、组件和 WCAG 条款导出 HTML/PDF 报告。",
            "记录人工验收人、验收时间、失败原因和复测结果。",
            "提供发布前无障碍 gate，阻断高风险页面上线。",
          ],
        },
      ],
      technical: [
        {
          title: "检测引擎",
          status: "用成熟工具",
          body:
            "底层检测应依赖 axe、Lighthouse、Playwright 和规则库，不要从零写无障碍判断。",
        },
        {
          title: "AI 修复",
          status: "辅助而非自动合并",
          body:
            "AI 可以生成修复建议和 PR，但必须保留人工确认，因为视觉、语义和业务意图需要人判断。",
        },
        {
          title: "证据采集",
          status: "浏览器自动化",
          body:
            "用 Playwright 记录截图、焦点顺序、键盘路径和 ARIA 树，形成比文字建议更可信的证据。",
        },
        {
          title: "范围控制",
          status: "前端仓库优先",
          body:
            "先支持 React/Next.js 常见页面和组件库，不要一开始覆盖所有技术栈和移动端。",
        },
      ],
      goToMarket: [
        "第一批客户是有 WCAG、Section 508 或企业采购压力的 SaaS 团队，尤其是前端团队小但客户要求多的公司。",
        "获客入口可以是免费 GitHub Action：每个 PR 给一份无障碍证据包摘要，再引导团队版报告和审计留存。",
        "内容上不要讲“AI 自动修无障碍”，而是讲“给客户/采购/QA 的无障碍修复证据”。",
      ],
      pricing: [
        {
          name: "免费 PR 检查",
          body:
            "单仓库、有限页面、基础报告，推动开发者采用。",
        },
        {
          name: "团队版 $99-299/月",
          body:
            "多页面、设计系统规则、报告历史、CI gate、人工验收和导出。",
        },
        {
          name: "合规版 $8k/年起",
          body:
            "私有部署、自定义 WCAG 模板、审计留存、客户报告和采购支持材料。",
        },
      ],
      validation: [
        {
          week: "第 1 周：人工证据包",
          body:
            "找 5 个 SaaS 团队，各选 3 个关键页面，手工生成修复证据包，验证 QA/PM 是否愿意用它替代零散截图和评论。",
        },
        {
          week: "第 2 周：GitHub Action",
          body:
            "接入 2 个真实前端仓库，在 PR 上输出新增无障碍风险和截图证据，看是否影响合并决策。",
        },
        {
          week: "第 3 周：付费报告",
          body:
            "给有客户采购或合规压力的团队导出 PDF 报告，验证是否愿意为留档和持续监控付费。",
        },
      ],
      risks: [
        "GitHub/Copilot 可能内置修复建议，所以独立产品必须聚焦证据包、合规交付和跨工具留存。",
        "自动修复可能破坏 UI 或业务语义，必须保留人工验收和回滚路径。",
        "无障碍判断有灰区，报告要区分机器可判定和需要人工确认的问题。",
        "如果只卖给开发者个人，付费弱；买方应是团队、合规负责人或客户交付负责人。",
      ],
    },
  ],
  "2026-05-15": {
    subtitle:
      "把 Agent 的高风险动作变成可审批、可追溯、可复盘的工作流，而不是等事故发生后再翻聊天记录。",
    thesis:
      "Codex Hooks、程序化令牌、Genkit 中间件和移动端审批说明 Agent 正在进入生产权限层。最靠谱的 WebApp 机会，是在工具调用前后加一层跨平台策略网关。",
    whyNow: [
      "Codex 同时出现了 Hooks、程序化访问令牌、移动端远程审批和 Windows 沙箱；Google Genkit 也推出可拦截模型和工具调用的中间件。这些信号都指向同一个变化：Agent 不再只是聊天输出，而是在真实开发环境里读写、执行、部署、调用外部系统。",
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
    item.framework = opportunityFrameworks[article.date]?.[index];
  });
  const deepDives = opportunityDeepDives[article.date];
  if (Array.isArray(deepDives)) {
    article.opportunities.forEach((item, index) => {
      if (deepDives[index]) item.deepDive = deepDives[index];
    });
  } else if (deepDives) {
    article.opportunities[0].deepDive = deepDives;
  }
  article.opportunities.forEach((item, index) => {
    if (!item.deepDive) item.deepDive = buildOpportunityDeepDive(article, item, index);
  });
});
