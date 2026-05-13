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
