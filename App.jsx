const { useMemo, useState } = React;
const { createRoot } = ReactDOM;
const {
  ArrowRight,
  BadgeCheck,
  Bot,
  Check,
  ClipboardCheck,
  Code2,
  Crown,
  CreditCard,
  Gem,
  ImagePlus,
  Mail,
  MessageCircle,
  Network,
  PackageCheck,
  QrCode,
  Rocket,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Wifi,
} = LucideReact;

const PRICES = {
  network: {
    "1_month": 20,
    "6_months": 60,
  },
  account: {
    gmail: 20,
    zero_card: 20,
  },
  ai_service: {
    gpt_plus_1m: 50,
    gemini_3m: 50,
    gemini_1y: 100,
  },
};

const LABELS = {
  network: {
    "1_month": "尝鲜单月网络",
    "6_months": "半年稳定版网络",
  },
  account: {
    gmail: "纯净原生 Gmail",
    zero_card: "零美元卡绑定服务",
  },
  ai_service: {
    gpt_plus_1m: "ChatGPT Plus 1个月充值",
    gemini_3m: "Gemini Pro 3个月可充值会员",
    gemini_1y: "Gemini Pro 1年成品号",
  },
};

const WECHAT_NAME = "灿灿";
const WECHAT_LOCATION = "四川 成都";
const WECHAT_QR = "./assets/wechat-qr.jpg";
const RECHARGE_SERVICES = ["gpt_plus_1m", "gemini_3m"];
const BUNDLE_DISCOUNTS = {
  dual_engine_finished: {
    amount: 10,
    name: "双引擎省心包立减",
  },
};

const GUIDE_CARDS = [
  {
    icon: ShieldCheck,
    badge: "01 基础保障",
    title: "网络是售后保障开关",
    text: "想要掉线指导、补会员售后，先选本站网络；网络可以搭配所有套餐。",
    accent: "from-teal-100 to-cyan-50",
  },
  {
    icon: Mail,
    badge: "02 账号工具",
    title: "先判断有没有账号",
    text: "没有账号看 Gmail；已有账号但缺支付能力看绑卡；成品号用户不用选这两项。",
    accent: "from-sky-100 to-indigo-50",
  },
  {
    icon: BadgeCheck,
    badge: "03 AI 服务",
    title: "已有账号充值，没账号成品号",
    text: "GPT 可叠加；Gemini 3个月适合已有账号；Gemini 1年成品号适合想开箱即用。",
    accent: "from-amber-100 to-lime-50",
  },
];

const SHOWCASES = [
  {
    icon: Code2,
    title: "论文与课程作业",
    text: "帮你把零散想法整理成提纲，润色摘要、邮件、实验报告，让表达更像认真打磨过。",
  },
  {
    icon: Gem,
    title: "生环科研辅助",
    text: "长文献梳理、实验设计拆解、图表说明、组会汇报提纲，都能更快进入状态。",
  },
  {
    icon: ImagePlus,
    title: "图文与视觉创作",
    text: "把静态图片转成动态短片，做展示图、课程汇报素材和课题展示时更有表现力。",
  },
];

const PRESETS = [
  {
    title: "入门尝鲜包",
    icon: Rocket,
    color: "cyan",
    preset: { network: "1_month", gmail: true, zeroCard: false, aiServices: ["gpt_plus_1m"] },
    audience: "刚接触 AI 的学生、课程作业较多但预算有限的新手。",
    ability: "用 GPT Plus 辅助改论文段落、润色邮件、整理课堂笔记、解释实验原理和代码报错。",
    scene: "先跑通环境，低成本体验一个月。",
  },
  {
    title: "科研进阶包",
    icon: Network,
    color: "sky",
    preset: { network: "6_months", gmail: false, zeroCard: true, aiServices: ["gemini_3m"] },
    audience: "已有 Google/Gemini 账号的学生、研究生、生环方向老师或课题组成员。",
    ability: "用 Gemini Pro 做长文献梳理、实验方案拆解、英文摘要润色、图表说明和组会汇报提纲。",
    scene: "3个月稳定学习/科研使用，适合一整个阶段任务。",
  },
  {
    title: "论文冲刺省心包",
    icon: Crown,
    color: "amber",
    preset: { network: "6_months", gmail: false, zeroCard: false, aiServices: ["gpt_plus_1m", "gemini_1y"] },
    audience: "马上要写结业论文、毕业论文、开题/结题汇报，或者不想折腾账号配置的人。",
    ability: "GPT 负责快速改写、润色和答辩问答；Gemini 年号负责长文献、实验背景、数据解读和长期科研资料整理。",
    scene: "时间紧、任务重、想开箱即用；命中组合立减 ￥10。",
  },
];

function Strong({ children, className = "text-slate-950" }) {
  return <span className={`font-black ${className}`}>{children}</span>;
}

function SectionTitle({ eyebrow, icon: Icon = Sparkles, title, children }) {
  const TitleIcon = Icon || Sparkles;

  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-teal-700 shadow-sm ring-1 ring-teal-100">
          {eyebrow}
        </p>
        <h2 className="cn-heading mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
          {title}
        </h2>
        {children && <p className="mt-3 max-w-2xl text-base font-bold leading-8 text-slate-500">{children}</p>}
      </div>
      {TitleIcon && (
        <div className="hidden h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-100 to-sky-100 text-teal-700 shadow-lg shadow-teal-100/70 sm:flex">
          <TitleIcon className="h-7 w-7" />
        </div>
      )}
    </div>
  );
}

function OptionCard({
  active,
  badge,
  badgeClass = "bg-teal-100 text-teal-700",
  children,
  disabled = false,
  gold = false,
  icon: Icon,
  onClick,
  price,
  title,
}) {
  const CardIcon = Icon || Sparkles;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "group relative w-full rounded-[1.5rem] border bg-white/95 p-5 text-left shadow-lg shadow-slate-200/60 transition duration-300",
        disabled ? "cursor-not-allowed border-slate-200 opacity-45" : "hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-100/70",
        active
          ? gold
            ? "border-amber-300 ring-4 ring-amber-100"
            : "border-teal-300 ring-4 ring-teal-100"
          : gold
            ? "border-amber-100 hover:border-amber-300"
            : "border-white hover:border-teal-200",
      ].join(" ")}
    >
      {badge && (
        <div className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-black ${badgeClass}`}>
          {badge}
        </div>
      )}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-sky-400 text-white shadow-lg shadow-teal-100 transition group-hover:rotate-3">
          <CardIcon className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="cn-heading text-lg font-black leading-snug text-slate-900">{title}</h3>
          <p className="mt-2 text-sm font-semibold leading-7 text-slate-500">{children}</p>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-3xl font-black text-slate-900">￥{price}</span>
        <span
          className={[
            "flex h-8 w-8 items-center justify-center rounded-full border transition",
            active
              ? gold
                ? "border-amber-400 bg-amber-300 text-slate-900"
                : "border-teal-500 bg-teal-500 text-white"
              : "border-slate-200 bg-white text-transparent",
          ].join(" ")}
        >
          <Check className="h-4 w-4" />
        </span>
      </div>
      {active && <p className="mt-3 text-xs font-black text-teal-700">已选中，再点一次可取消</p>}
    </button>
  );
}

function PresetCard({ item, onClick }) {
  const Icon = item.icon || Sparkles;
  const colorClass = {
    cyan: "from-cyan-100 to-teal-50 text-cyan-800",
    sky: "from-sky-100 to-indigo-50 text-sky-800",
    amber: "from-amber-100 to-lime-50 text-amber-800",
  }[item.color];

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full flex-col rounded-[1.75rem] border border-white bg-white/95 p-5 text-left shadow-xl shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-100/70"
    >
      <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${colorClass}`}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="cn-heading text-2xl font-black leading-tight text-slate-900">{item.title}</h3>
      <div className="mt-5 space-y-4 text-sm font-semibold leading-7 text-slate-500">
        <p><Strong>适合人群：</Strong>{item.audience}</p>
        <p><Strong>能做什么：</Strong>{item.ability}</p>
      </div>
      <p className={`mt-5 rounded-2xl bg-gradient-to-br ${colorClass} p-4 text-sm font-black leading-6`}>
        推荐场景：{item.scene}
      </p>
    </button>
  );
}

function ContactCard() {
  return (
    <div className="rounded-[2rem] border border-white bg-white/95 p-5 shadow-2xl shadow-teal-100/70 sm:p-6">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-xs font-black text-teal-700">
          <QrCode className="h-4 w-4" />
          扫码交付入口
        </div>
        <div className="mx-auto mt-5 max-w-[300px] rounded-[1.5rem] bg-gradient-to-br from-teal-200 to-sky-200 p-3 shadow-xl shadow-teal-100">
          <img src={WECHAT_QR} alt="客服微信二维码" className="w-full rounded-2xl bg-white object-contain" />
        </div>
        <h3 className="cn-heading mt-5 text-2xl font-black leading-tight text-slate-900">复制订单后扫码添加</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm font-bold leading-7 text-slate-500">
          微信昵称：<Strong>{WECHAT_NAME}</Strong>，地区：{WECHAT_LOCATION}。添加后把订单粘贴发送，客服会确认付款方式和交付时间。
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {["复制订单", "扫码添加", "确认付款"].map((item, index) => (
          <div key={item} className="rounded-2xl bg-slate-50 p-4 text-center ring-1 ring-slate-100">
            <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-sm font-black text-white">
              {index + 1}
            </span>
            <p className="cn-heading mt-3 text-sm font-black leading-5 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [network, setNetwork] = useState(null);
  const [gmail, setGmail] = useState(false);
  const [zeroCard, setZeroCard] = useState(false);
  const [aiServices, setAiServices] = useState([]);

  const hasFinishedAccount = aiServices.includes("gemini_1y");
  const hasRechargeService = aiServices.some((item) => RECHARGE_SERVICES.includes(item));

  const selectedItems = useMemo(
    () =>
      [
        network && LABELS.network[network],
        gmail && LABELS.account.gmail,
        zeroCard && LABELS.account.zero_card,
        ...aiServices.map((service) => LABELS.ai_service[service]),
      ].filter(Boolean),
    [network, gmail, zeroCard, aiServices],
  );

  const total = useMemo(
    () =>
      (network ? PRICES.network[network] : 0) +
      (gmail ? PRICES.account.gmail : 0) +
      (zeroCard ? PRICES.account.zero_card : 0) +
      aiServices.reduce((sum, service) => sum + PRICES.ai_service[service], 0),
    [network, gmail, zeroCard, aiServices],
  );

  const discount = useMemo(() => {
    const hasDualEngineFinishedBundle =
      network === "6_months" &&
      aiServices.includes("gpt_plus_1m") &&
      aiServices.includes("gemini_1y");

    return hasDualEngineFinishedBundle ? BUNDLE_DISCOUNTS.dual_engine_finished.amount : 0;
  }, [network, aiServices]);

  const payableTotal = total - discount;

  const chooseFinishedAccount = () => {
    setAiServices((current) => {
      if (current.includes("gemini_1y")) {
        return current.filter((item) => item !== "gemini_1y");
      }

      setGmail(false);
      setZeroCard(false);
      return [...current.filter((item) => item !== "gemini_3m"), "gemini_1y"];
    });
  };

  const toggleRechargeService = (service) => {
    setAiServices((current) => {
      if (current.includes(service)) {
        return current.filter((item) => item !== service);
      }

      if (service === "gemini_3m") {
        return [...current.filter((item) => item !== "gemini_1y"), service];
      }

      return [...current, service];
    });
  };

  const toggleGmail = () => {
    if (hasFinishedAccount) return;
    setGmail((current) => !current);
  };

  const toggleZeroCard = () => {
    if (hasFinishedAccount) return;
    setZeroCard((current) => !current);
  };

  const applyPreset = (preset) => {
    setNetwork(preset.network);
    setGmail(preset.gmail);
    setZeroCard(preset.zeroCard);
    setAiServices(preset.aiServices);
    document.getElementById("builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyOrder = async () => {
    if (selectedItems.length === 0) {
      alert("请至少选择一个套餐项目，再复制订单。");
      return;
    }

    const discountText = discount > 0 ? `，已触发组合优惠立减${discount}元` : "";
    const orderText = `老板你好，我是新手，我要买【${selectedItems.join(" + ")}】，原价${total}元${discountText}，显示总价${payableTotal}元，请问怎么微信付款？`;

    try {
      await navigator.clipboard.writeText(orderText);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = orderText;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    alert(`订单复制成功！请扫码添加客服微信【${WECHAT_NAME}】，并在聊天框粘贴发送。`);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6fbf8] pb-36 text-slate-900">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_8%_12%,rgba(167,243,208,0.75),transparent_34%),radial-gradient(circle_at_92%_18%,rgba(191,219,254,0.9),transparent_32%),linear-gradient(135deg,#f8fffb,#eef8ff_52%,#f7f1ff)]">
        <div className="absolute left-8 top-20 h-24 w-24 rounded-full bg-lime-200/50 blur-2xl" />
        <div className="absolute bottom-12 right-16 h-32 w-32 rounded-full bg-cyan-200/60 blur-3xl" />
        <div className="absolute right-[18%] top-16 hidden rotate-12 text-teal-300/50 sm:block">
          <Sparkles className="h-16 w-16" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[1fr_340px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white bg-white/75 px-4 py-2 text-sm font-black text-teal-700 shadow-lg shadow-teal-100/60 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              新手友好 · 已有账号/没有账号都能快速判断
            </div>
            <h1 className="cn-heading mt-7 max-w-4xl text-4xl font-black leading-[1.12] tracking-tight text-slate-900 sm:text-6xl">
              一站式解锁全球顶尖 AI 生产力
            </h1>
            <div className="mt-5 flex max-w-3xl flex-wrap gap-2 text-sm font-black text-slate-600 sm:text-base">
              {["专为新手设计", "已有账号优先充值", "没账号选成品号", "网络决定售后保障"].map((item) => (
                <span key={item} className="rounded-full border border-white bg-white/65 px-3 py-2 shadow-sm shadow-teal-100/50">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-teal-500 px-6 py-4 text-base font-black text-white shadow-xl shadow-teal-200 transition duration-300 hover:-translate-y-0.5 hover:bg-teal-600 sm:w-auto"
              >
                开始定制我的 AI 方案
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-teal-100 bg-white/80 px-6 py-4 text-base font-black text-slate-700 shadow-lg shadow-slate-200/60 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:w-auto"
              >
                查看微信交付方式
                <MessageCircle className="h-5 w-5 text-teal-600" />
              </button>
            </div>
          </div>

          <div className="hidden rounded-[2rem] border border-white bg-white/75 p-4 shadow-2xl shadow-teal-100/70 backdrop-blur lg:block">
            <img src={WECHAT_QR} alt="客服微信二维码" className="w-full rounded-[1.5rem] bg-white object-contain p-2" />
            <p className="cn-heading mt-4 text-center text-sm font-black text-teal-700">
              选好套餐后扫码添加客服
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <SectionTitle eyebrow="Easy Mode" icon={PackageCheck} title="一分钟看懂怎么买" />
        <div className="grid gap-4 md:grid-cols-3">
          {GUIDE_CARDS.map((card) => {
            const CardIcon = card.icon || Sparkles;

            return (
              <div key={card.title} className="rounded-[1.5rem] border border-white bg-white/95 p-5 shadow-xl shadow-slate-200/60">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent}`}>
                  <CardIcon className="h-6 w-6 text-teal-700" />
                </div>
                <div className="mb-3 inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">{card.badge}</div>
                <h3 className="cn-heading text-xl font-black leading-tight text-slate-900">{card.title}</h3>
                <p className="mt-3 text-sm font-bold leading-7 text-slate-500">{card.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <SectionTitle eyebrow="Showcase" icon={BadgeCheck} title="你能立刻打开的 AI 场景">
          内容更贴近学生、生环老师和课题组的真实使用：论文、实验、文献、组会都能用。
        </SectionTitle>
        <div className="flex snap-x gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {SHOWCASES.map((item) => {
            const ItemIcon = item.icon || Sparkles;

            return (
              <article
                key={item.title}
                className="min-w-[84%] snap-start rounded-[1.75rem] border border-white bg-white/95 p-6 shadow-xl shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-100/70 sm:min-w-0"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-100 to-cyan-100 text-teal-700">
                  <ItemIcon className="h-6 w-6" />
                </div>
                <h3 className="cn-heading text-xl font-black leading-tight text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm font-bold leading-7 text-slate-500">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <SectionTitle eyebrow="Presets" icon={Crown} title="按学习/科研强度选套餐">
          从日常体验、课程作业到论文冲刺，按自己的使用强度直接选；点一下自动带入，下方还能继续微调。
        </SectionTitle>
        <div className="grid gap-5 md:grid-cols-3">
          {PRESETS.map((item) => (
            <PresetCard key={item.title} item={item} onClick={() => applyPreset(item.preset)} />
          ))}
        </div>
      </section>

      <section id="builder" className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-[2rem] border border-white bg-white/65 p-5 shadow-2xl shadow-slate-200/70 backdrop-blur sm:p-8">
          <SectionTitle eyebrow="Step 01" icon={Wifi} title="打通基建：网络与账号能力">
            所有选项都支持再次点击取消选中，选错了不用担心。
          </SectionTitle>

          <div className="grid gap-8">
            <div>
              <div className="mb-4 flex items-center gap-2 font-black text-slate-800">
                <Wifi className="h-5 w-5 text-teal-600" />
                自建专线网络
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <OptionCard
                  active={network === "1_month"}
                  badge="新手试水"
                  icon={Rocket}
                  onClick={() => setNetwork(network === "1_month" ? null : "1_month")}
                  price={PRICES.network["1_month"]}
                  title="尝鲜单月"
                >
                  <Strong>第一次购买</Strong>可以先低成本体验完整环境，适合先跑通 AI 套餐的新手。
                </OptionCard>
                <OptionCard
                  active={network === "6_months"}
                  badge="立省60元 / 强烈推荐"
                  icon={ShieldCheck}
                  onClick={() => setNetwork(network === "6_months" ? null : "6_months")}
                  price={PRICES.network["6_months"]}
                  title="半年稳定版"
                >
                  <Strong>长期使用更推荐</Strong>，绑定本站专属网络后享受更完整售后保障。
                </OptionCard>
              </div>

              <div
                className={[
                  "mt-5 rounded-[1.5rem] border p-5 shadow-sm",
                  network
                    ? "border-emerald-100 bg-gradient-to-r from-emerald-50 to-lime-50 text-emerald-950"
                    : "border-rose-100 bg-rose-50 text-rose-950",
                ].join(" ")}
              >
                <div className="flex gap-3">
                  {network ? (
                    <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
                  ) : (
                    <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-rose-600" />
                  )}
                  <p className="text-sm font-bold leading-7">
                    {network
                      ? "已激活终身包赔：您已绑定本站专属网络，享受掉线指导、Plus 掉会员免费补全等 VIP 专属保障。"
                      : "风险提示：未选择本站自建网络。因客户自有网络波动导致的封号、掉会员，本站不提供售后及退款。建议勾选上方网络获取保障。"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2 font-black text-slate-800">
                <Mail className="h-5 w-5 text-sky-600" />
                Gmail 与绑卡能力
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <OptionCard
                  disabled={hasFinishedAccount}
                  active={gmail}
                  badge={hasFinishedAccount ? "成品号已包含账号" : "新手无账号先选"}
                  badgeClass={hasFinishedAccount ? "bg-slate-100 text-slate-500" : "bg-sky-100 text-sky-700"}
                  icon={Mail}
                  onClick={toggleGmail}
                  price={PRICES.account.gmail}
                  title="纯净原生 Gmail"
                >
                  ￥20。<Strong>没有 Google 账号的新手</Strong>优先选它，作为后续 GPT 或 Gemini 充值的身份基底。选择 Gemini 1年成品号后无需再选。
                </OptionCard>
                <OptionCard
                  disabled={hasFinishedAccount}
                  active={zeroCard}
                  badge={hasFinishedAccount ? "成品号已包含账号" : "已有账号可加"}
                  badgeClass={hasFinishedAccount ? "bg-slate-100 text-slate-500" : "bg-teal-100 text-teal-700"}
                  icon={CreditCard}
                  onClick={toggleZeroCard}
                  price={PRICES.account.zero_card}
                  title="零美元卡绑定服务"
                >
                  ￥20。<Strong>已有账号但需要绑定支付能力</Strong>时选它；可以单独选择，也可以和会员服务一起买。选择 Gemini 1年成品号后无需再选。
                </OptionCard>
              </div>
              <div
                className={[
                  "mt-4 rounded-[1.5rem] border p-4 text-sm font-bold leading-7",
                  hasFinishedAccount
                    ? "border-amber-100 bg-amber-50 text-amber-900"
                    : "border-sky-100 bg-white text-slate-500",
                ].join(" ")}
              >
                {hasFinishedAccount
                  ? "已选 Gemini 1年成品号：这是开箱即用的完整账号，所以 Gmail 和绑卡服务会自动关闭。"
                  : "判断口诀：没有账号选 Gmail；已有账号缺支付选绑卡；只想拿到成品号就直接选 Gemini 1年。"}
              </div>
            </div>
          </div>

          <div className="mb-7 mt-12">
            <p className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-teal-700 shadow-sm ring-1 ring-teal-100">Step 02</p>
            <h2 className="cn-heading mt-4 text-3xl font-black leading-tight text-slate-900">选择 AI 服务：GPT Plus 和 Gemini Pro 可同时选</h2>
            <p className="mt-3 text-sm font-bold leading-7 text-slate-500">ChatGPT Plus 1个月与 Gemini Pro 3个月可以一起下单；只有 Gemini Pro 3个月和 Gemini 1年成品号二选一，重复点击可取消。</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1.75rem] border border-sky-100 bg-sky-50/70 p-4">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-700">Recharge</p>
                  <h3 className="cn-heading mt-1 text-xl font-black text-slate-900">GPT Plus + Gemini Pro 充值区</h3>
                </div>
                <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-black text-sky-700 shadow-sm">两项可同时选</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <OptionCard
                  active={aiServices.includes("gpt_plus_1m")}
                  badge="可叠加购买"
                  icon={Bot}
                  onClick={() => toggleRechargeService("gpt_plus_1m")}
                  price={PRICES.ai_service.gpt_plus_1m}
                  title="ChatGPT Plus 1个月"
                >
                  ￥50。<Strong>已有 ChatGPT 账号</Strong>可直接续会员；也可以和 Gemini 3个月或1年成品号同时下单。
                </OptionCard>
                <OptionCard
                  active={aiServices.includes("gemini_3m")}
                  badge="已有账号首选"
                  badgeClass="bg-teal-100 text-teal-700"
                  icon={Gem}
                  onClick={() => toggleRechargeService("gemini_3m")}
                  price={PRICES.ai_service.gemini_3m}
                  title="Gemini Pro 3个月"
                >
                  ￥50。<Strong>已有 Gemini / Google 账号</Strong>、只想续高级会员时选它；和 Gemini 1年成品号二选一。
                </OptionCard>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-amber-100 bg-gradient-to-br from-amber-50 to-lime-50 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Ready Account</p>
                  <h3 className="cn-heading mt-1 text-xl font-black text-slate-900">成品号区</h3>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-amber-700 shadow-sm">省心首选</span>
              </div>
              <OptionCard
                active={hasFinishedAccount}
                badge="独立账号 / 开箱即用"
                badgeClass="bg-amber-100 text-amber-800"
                gold
                icon={Crown}
                onClick={chooseFinishedAccount}
                price={PRICES.ai_service.gemini_1y}
                title="Gemini Pro 1年成品号"
              >
                ￥100。<Strong className="text-amber-700">没有账号、怕麻烦、想开箱即用</Strong>时选它；会自动关闭 Gmail/绑卡，和 Gemini 3个月二选一，可同时加购 ChatGPT Plus。
              </OptionCard>
            </div>
          </div>

          {hasRechargeService && !gmail && (
            <div className="mt-4 rounded-[1.5rem] border border-amber-100 bg-amber-50 p-4 text-sm font-bold leading-7 text-amber-900">
              提醒：你选择了可充值会员。<Strong className="text-amber-900">如果客户已有账号，可以不用补 Gmail</Strong>；如果是完全新手，建议加一个 Gmail 更省心。
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="rounded-[2rem] bg-gradient-to-br from-teal-500 to-sky-500 p-6 text-white shadow-2xl shadow-teal-100 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/18 px-4 py-2 text-sm font-black text-white">
              <MessageCircle className="h-4 w-4" />
              最后一步：复制订单并交付
            </div>
            <h2 className="cn-heading mt-5 text-3xl font-black leading-tight">订单选好后，直接扫码加微信</h2>
            <p className="mt-4 max-w-2xl text-sm font-bold leading-8 text-white/90">
              复制订单会自动生成套餐、优惠和总价。扫码添加后直接粘贴发送，客服按订单内容确认付款和交付。
            </p>
            <div className="mt-6 rounded-2xl border border-white/20 bg-white/15 p-4">
              <p className="text-sm font-black text-white">新手不用组织话术，只需要复制订单并发送。</p>
              <p className="mt-2 text-xs font-bold leading-5 text-white/80">订单里会包含所选套餐、原价、优惠和最终总价。</p>
            </div>
          </div>
          <ContactCard />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/70 bg-white/88 px-3 py-3 shadow-2xl shadow-slate-300/50 backdrop-blur-xl sm:px-4 sm:py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-500">已选 {selectedItems.length} 项</p>
            <p className="mt-1 text-lg font-black text-slate-900 sm:text-2xl">
              总计：<span className="text-teal-600">￥{payableTotal}</span>
            </p>
            {discount > 0 && (
              <p className="mt-1 text-xs font-black text-amber-600 sm:text-sm">
                原价 ￥{total}，{BUNDLE_DISCOUNTS.dual_engine_finished.name} ￥{discount}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={copyOrder}
            className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-teal-500 px-4 py-3 text-sm font-black text-white shadow-xl shadow-teal-200 transition duration-300 hover:-translate-y-0.5 hover:bg-teal-600 sm:px-6 sm:text-base"
          >
            <ClipboardCheck className="h-5 w-5" />
            <span className="sm:hidden">复制订单</span>
            <span className="hidden sm:inline">一键复制订单并联系客服</span>
          </button>
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
