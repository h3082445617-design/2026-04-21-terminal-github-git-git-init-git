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
  Globe2,
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
  XCircle,
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

function Strong({ children, className = "text-slate-950" }) {
  return <span className={`font-black ${className}`}>{children}</span>;
}

function SectionTitle({ eyebrow, icon: Icon, title, children }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">{title}</h2>
        {children && <p className="mt-2 text-sm font-bold leading-6 text-slate-500">{children}</p>}
      </div>
      {Icon && <Icon className="hidden h-10 w-10 text-cyan-600 sm:block" />}
    </div>
  );
}

function OptionCard({
  active,
  badge,
  badgeClass = "bg-cyan-100 text-cyan-700",
  children,
  disabled = false,
  gold = false,
  icon: Icon,
  onClick,
  price,
  title,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "group relative w-full rounded-xl border bg-white p-5 text-left shadow-sm transition duration-300",
        disabled
          ? "cursor-not-allowed border-slate-200 opacity-45"
          : "hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl",
        active
          ? gold
            ? "border-amber-400 ring-4 ring-amber-100"
            : "border-cyan-400 ring-4 ring-cyan-100"
          : gold
            ? "border-amber-200 hover:border-amber-400"
            : "border-slate-200 hover:border-cyan-300",
      ].join(" ")}
    >
      {badge && (
        <div className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-black ${badgeClass}`}>
          {badge}
        </div>
      )}
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg shadow-slate-200 transition group-hover:rotate-3">
        <Icon className="h-5 w-5" />
      </div>
      <div className="pr-20">
        <h3 className="text-base font-extrabold text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">{children}</p>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-2xl font-black text-slate-950">￥{price}</span>
        <span
          className={[
            "flex h-7 w-7 items-center justify-center rounded-full border transition",
            active
              ? gold
                ? "border-amber-500 bg-amber-400 text-slate-950"
                : "border-cyan-500 bg-cyan-500 text-white"
              : "border-slate-200 bg-white text-transparent",
          ].join(" ")}
        >
          <Check className="h-4 w-4" />
        </span>
      </div>
      {active && <p className="mt-3 text-xs font-black text-cyan-700">已选中，再点一次可取消</p>}
    </button>
  );
}

function PresetCard({ description, icon: Icon, onClick, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-white/70 bg-white/90 p-5 text-left shadow-lg shadow-indigo-950/5 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-cyan-300 hover:shadow-2xl"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-black text-slate-950">{title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-6 text-slate-500">{description}</div>
    </button>
  );
}

function ContactCard({ compact = false }) {
  return (
    <div
      className={[
        "rounded-[1.75rem] border border-cyan-100 bg-white shadow-2xl shadow-cyan-950/10",
        compact ? "p-4" : "p-5 sm:p-6",
      ].join(" ")}
    >
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-xs font-black text-cyan-800">
          <QrCode className="h-4 w-4" />
          扫码交付入口
        </div>
        <div className="mx-auto mt-5 max-w-[300px] rounded-[1.5rem] bg-slate-950 p-3 shadow-xl shadow-slate-300">
          <img src={WECHAT_QR} alt="客服微信二维码" className="w-full rounded-2xl bg-white object-contain" />
        </div>
        <h3 className="mt-5 text-2xl font-black leading-tight text-slate-950">
          复制订单后扫码添加
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm font-bold leading-7 text-slate-500">
          微信昵称：<Strong>{WECHAT_NAME}</Strong>，地区：{WECHAT_LOCATION}。添加后把订单粘贴发送，客服会确认付款方式和交付时间。
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {["点底部复制订单", "扫码添加客服", "粘贴订单确认"].map((item, index) => (
          <div key={item} className="rounded-2xl bg-slate-50 p-4 text-center">
            <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
              {index + 1}
            </span>
            <p className="mt-3 text-sm font-black leading-5 text-slate-700">{item}</p>
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
    <main className="min-h-screen bg-[#eef7ff] pb-36 text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.35),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.45),transparent_28%),linear-gradient(135deg,#06142f,#111827_58%,#312e81)]" />
        <div className="absolute -right-20 top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-violet-500/25 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:py-24 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              新手友好 · 已有账号/没有账号都能快速判断
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
              一站式解锁全球顶尖 AI 生产力
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50/85 sm:text-xl">
              专为新手设计 | 已有账号优先充值 | 没账号选成品号 | 网络决定售后保障
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-base font-black text-slate-950 shadow-2xl shadow-cyan-950/40 transition duration-300 hover:scale-105 hover:bg-cyan-50"
              >
                开始定制我的 AI 方案
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-base font-black text-white backdrop-blur transition duration-300 hover:scale-105 hover:bg-white/15"
              >
                查看微信交付方式
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="hidden rounded-[2rem] border border-white/15 bg-white/10 p-4 backdrop-blur lg:block">
            <img src={WECHAT_QR} alt="客服微信二维码" className="w-full rounded-3xl bg-white object-contain p-2" />
            <p className="mt-4 text-center text-sm font-black text-cyan-50">
              选好套餐后扫码添加客服
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <SectionTitle eyebrow="Easy Mode" icon={PackageCheck} title="一分钟看懂怎么买" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-cyan-100 bg-white p-5 shadow-lg shadow-cyan-950/5">
            <div className="mb-3 inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-black text-cyan-800">01 基础保障</div>
            <h3 className="text-lg font-black text-slate-950">网络是售后保障开关</h3>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
              <Strong>想要掉线指导、补会员售后</Strong>，先选本站网络；网络可以搭配所有套餐。
            </p>
          </div>
          <div className="rounded-xl border border-indigo-100 bg-white p-5 shadow-lg shadow-indigo-950/5">
            <div className="mb-3 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-800">02 账号工具</div>
            <h3 className="text-lg font-black text-slate-950">先判断有没有账号</h3>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
              <Strong>没有账号</Strong>看 Gmail；<Strong>已有账号但缺支付能力</Strong>看绑卡；成品号用户不用选这两项。
            </p>
          </div>
          <div className="rounded-xl border border-amber-100 bg-white p-5 shadow-lg shadow-amber-950/5">
            <div className="mb-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">03 AI 服务</div>
            <h3 className="text-lg font-black text-slate-950">已有账号充值，没账号成品号</h3>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
              <Strong>GPT 可叠加</Strong>；<Strong>Gemini 3个月适合已有账号</Strong>；Gemini 1年成品号适合想开箱即用。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <SectionTitle eyebrow="Showcase" icon={BadgeCheck} title="你能立刻打开的 AI 场景" />
        <div className="flex snap-x gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {[
            {
              icon: Code2,
              title: "全能办公助手",
              text: "润色邮件、梳理文案、极速代码 Debug，让小白也能像有一个 24 小时在线的效率团队。",
            },
            {
              icon: ImagePlus,
              title: "前沿视觉创作",
              text: "利用顶尖模型体验流畅的图像到视频生成，轻松将静态图片转化为连贯、极具美感的动态短片。",
            },
            {
              icon: Globe2,
              title: "海外极客通行证",
              text: "原生干净的数字身份，畅享海外软件首月白嫖特权，把复杂门槛变成开箱即用。",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="min-w-[82%] snap-start rounded-xl border border-white bg-white p-6 shadow-xl shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] sm:min-w-0"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-cyan-300">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8">
        <SectionTitle eyebrow="Presets" title="按学习/科研强度选套餐">
          从日常体验、课程作业到论文冲刺，按自己的使用强度直接选；点一下自动带入，下方还能继续微调。
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
          <PresetCard
            title="入门尝鲜包"
            description={
              <>
                <p><Strong>适合人群：</Strong>刚接触 AI 的学生、课程作业较多但预算有限的新手。</p>
                <p><Strong>能做什么：</Strong>用 GPT Plus 辅助改论文段落、润色邮件、整理课堂笔记、解释实验原理和代码报错。</p>
                <p className="rounded-xl bg-cyan-50 p-3 font-black text-cyan-800">推荐场景：先跑通环境，低成本体验一个月。</p>
              </>
            }
            icon={Rocket}
            onClick={() => applyPreset({ network: "1_month", gmail: true, zeroCard: false, aiServices: ["gpt_plus_1m"] })}
          />
          <PresetCard
            title="科研进阶包"
            description={
              <>
                <p><Strong>适合人群：</Strong>已有 Google/Gemini 账号的学生、研究生、生环方向老师或课题组成员。</p>
                <p><Strong>能做什么：</Strong>用 Gemini Pro 做长文献梳理、实验方案拆解、英文摘要润色、图表说明和组会汇报提纲。</p>
                <p className="rounded-xl bg-indigo-50 p-3 font-black text-indigo-800">推荐场景：3个月稳定学习/科研使用，适合一整个阶段任务。</p>
              </>
            }
            icon={Network}
            onClick={() => applyPreset({ network: "6_months", gmail: false, zeroCard: true, aiServices: ["gemini_3m"] })}
          />
          <PresetCard
            title="论文冲刺省心包"
            description={
              <>
                <p><Strong>适合人群：</Strong>马上要写结业论文、毕业论文、开题/结题汇报，或者不想折腾账号配置的人。</p>
                <p><Strong>能做什么：</Strong>GPT 负责快速改写、润色和答辩问答；Gemini 年号负责长文献、实验背景、数据解读和长期科研资料整理。</p>
                <p className="rounded-xl bg-amber-50 p-3 font-black text-amber-800">推荐场景：时间紧、任务重、想开箱即用；命中组合立减 ￥10。</p>
              </>
            }
            icon={Crown}
            onClick={() => applyPreset({ network: "6_months", gmail: false, zeroCard: false, aiServices: ["gpt_plus_1m", "gemini_1y"] })}
          />
        </div>
      </section>

      <section id="builder" className="mx-auto max-w-6xl px-5 py-8">
        <div className="rounded-[2rem] bg-white/65 p-4 shadow-2xl shadow-indigo-950/10 ring-1 ring-white backdrop-blur sm:p-8">
          <SectionTitle eyebrow="Step 01" title="打通基建：网络与账号能力">
            所有选项都支持再次点击取消选中。
          </SectionTitle>

          <div className="grid gap-8">
            <div>
              <div className="mb-4 flex items-center gap-2 font-black">
                <Wifi className="h-5 w-5 text-cyan-600" />
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
                  badge="🔥 立省60元 / 强烈推荐"
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
                  "mt-5 rounded-xl border p-5 shadow-sm",
                  network
                    ? "border-emerald-200 bg-gradient-to-r from-emerald-50 to-amber-50 text-emerald-950"
                    : "border-red-200 bg-red-50 text-red-950",
                ].join(" ")}
              >
                <div className="flex gap-3">
                  {network ? (
                    <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
                  ) : (
                    <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
                  )}
                  <p className="text-sm font-bold leading-7">
                    {network
                      ? "🛡️ 已激活终身包赔：您已绑定本站专属网络，享受掉线指导、Plus 掉会员免费补全等 VIP 专属保障！"
                      : "⚠️ 风险提示：未选择本站自建网络。因客户自有网络波动导致的封号、掉会员，本站不提供售后及退款。建议勾选上方网络获取保障。"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2 font-black">
                <Mail className="h-5 w-5 text-indigo-600" />
                Gmail 与绑卡能力
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <OptionCard
                  disabled={hasFinishedAccount}
                  active={gmail}
                  badge={hasFinishedAccount ? "成品号已包含账号" : "新手无账号先选"}
                  badgeClass={hasFinishedAccount ? "bg-slate-100 text-slate-500" : "bg-indigo-100 text-indigo-800"}
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
                  badgeClass={hasFinishedAccount ? "bg-slate-100 text-slate-500" : "bg-cyan-100 text-cyan-800"}
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
                  "mt-4 rounded-xl border p-4 text-sm font-bold leading-6",
                  hasFinishedAccount
                    ? "border-amber-200 bg-amber-50 text-amber-950"
                    : "border-indigo-100 bg-white text-slate-600",
                ].join(" ")}
              >
                {hasFinishedAccount
                  ? "已选 Gemini 1年成品号：这是开箱即用的完整账号，所以 Gmail 和绑卡服务会自动关闭。"
                  : "判断口诀：没有账号选 Gmail；已有账号缺支付选绑卡；只想拿到成品号就直接选 Gemini 1年。"}
              </div>
            </div>
          </div>

          <div className="mb-8 mt-12">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-700">Step 02</p>
            <h2 className="mt-2 text-3xl font-black">选择 AI 服务：GPT Plus 和 Gemini Pro 可同时选</h2>
            <p className="mt-2 text-sm font-bold text-slate-500">
              ChatGPT Plus 1个月与 Gemini Pro 3个月可以一起下单；只有 Gemini Pro 3个月和 Gemini 1年成品号二选一，重复点击可取消。
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50/60 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Recharge</p>
                  <h3 className="mt-1 text-xl font-black text-slate-950">GPT Plus + Gemini Pro 充值区</h3>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-cyan-800 shadow-sm">两项可同时选</span>
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
                  badgeClass="bg-cyan-100 text-cyan-800"
                  icon={Gem}
                  onClick={() => toggleRechargeService("gemini_3m")}
                  price={PRICES.ai_service.gemini_3m}
                  title="Gemini Pro 3个月"
                >
                  ￥50。<Strong>已有 Gemini / Google 账号</Strong>、只想续高级会员时选它；和 Gemini 1年成品号二选一。
                </OptionCard>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Ready Account</p>
                  <h3 className="mt-1 text-xl font-black text-slate-950">成品号区</h3>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">省心首选</span>
              </div>
              <OptionCard
                active={hasFinishedAccount}
                badge="👑 独立账号 / 开箱即用"
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
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-950">
              提醒：你选择了可充值会员。<Strong className="text-amber-950">如果客户已有账号，可以不用补 Gmail</Strong>；如果是完全新手，建议加一个 Gmail 更省心。
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/15 px-4 py-2 text-sm font-black text-cyan-100">
              <MessageCircle className="h-4 w-4" />
              最后一步：复制订单并交付
            </div>
            <h2 className="mt-5 text-3xl font-black">订单选好后，直接扫码加微信</h2>
            <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-cyan-50/80">
              复制订单会自动生成套餐、优惠和总价。扫码添加后直接粘贴发送，客服按订单内容确认付款和交付。
            </p>
            <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
              <p className="text-sm font-black text-cyan-50">新手不用组织话术，只需要复制订单并发送。</p>
              <p className="mt-2 text-xs font-bold leading-5 text-cyan-50/70">订单里会包含所选套餐、原价、优惠和最终总价。</p>
            </div>
          </div>
          <ContactCard />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/50 bg-white/85 px-4 py-4 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-slate-500">已选 {selectedItems.length} 项</p>
            <p className="mt-1 text-lg font-black text-slate-950 sm:text-2xl">
              总计：<span className="text-cyan-600">￥{payableTotal}</span>
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
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-slate-950 to-indigo-900 px-4 py-3 text-sm font-black text-white shadow-xl shadow-indigo-950/30 transition duration-300 hover:scale-105 hover:from-indigo-900 hover:to-cyan-700 sm:px-6 sm:text-base"
          >
            <ClipboardCheck className="h-5 w-5" />
            一键复制订单并联系客服
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
