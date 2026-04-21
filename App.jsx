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
    gmail: 15,
    zero_card: 30,
  },
  ai_service: {
    gpt_plus_1m: 150,
    gemini_3m: 100,
    gemini_1y: 350,
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
    gpt_plus_1m: "ChatGPT Plus 纯净代充 1个月",
    gemini_3m: "Gemini Pro 高级版 3个月",
    gemini_1y: "Gemini Pro 1年纯手工成品号",
  },
};

const WECHAT_ID = "你的微信号";

function OptionCard({
  active,
  badge,
  badgeClass = "bg-sky-100 text-sky-700",
  children,
  highlight = false,
  icon: Icon,
  onClick,
  price,
  title,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative w-full rounded-xl border bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl",
        active
          ? highlight
            ? "border-amber-400 ring-4 ring-amber-100"
            : "border-cyan-400 ring-4 ring-cyan-100"
          : highlight
            ? "border-amber-200 hover:border-amber-400"
            : "border-slate-200 hover:border-cyan-300",
      ].join(" ")}
    >
      {badge && (
        <div
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${badgeClass}`}
        >
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
              ? highlight
                ? "border-amber-500 bg-amber-400 text-slate-950"
                : "border-cyan-500 bg-cyan-500 text-white"
              : "border-slate-200 bg-white text-transparent",
          ].join(" ")}
        >
          <Check className="h-4 w-4" />
        </span>
      </div>
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
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </button>
  );
}

function App() {
  const [network, setNetwork] = useState(null);
  const [account, setAccount] = useState(null);
  const [aiService, setAiService] = useState(null);

  const selectedItems = useMemo(
    () =>
      [
        network && LABELS.network[network],
        account && LABELS.account[account],
        aiService && LABELS.ai_service[aiService],
      ].filter(Boolean),
    [network, account, aiService],
  );

  const total = useMemo(() => {
    return (
      (network ? PRICES.network[network] : 0) +
      (account ? PRICES.account[account] : 0) +
      (aiService ? PRICES.ai_service[aiService] : 0)
    );
  }, [network, account, aiService]);

  const applyPreset = (preset) => {
    setNetwork(preset.network);
    setAccount(preset.account);
    setAiService(preset.aiService);
    document
      .getElementById("builder")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyOrder = async () => {
    if (selectedItems.length === 0) {
      alert("请至少选择一个套餐项目，再复制订单。");
      return;
    }

    const orderText = `老板你好，我是新手，我要买【${selectedItems.join(
      " + ",
    )}】，显示总价${total}元，请问怎么微信付款？`;

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

    alert(`订单复制成功！请添加客服微信：${WECHAT_ID} 并在聊天框粘贴发送。`);
  };

  return (
    <main className="min-h-screen bg-[#eef7ff] pb-32 text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.35),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.45),transparent_28%),linear-gradient(135deg,#06142f,#111827_58%,#312e81)]" />
        <div className="absolute -right-20 top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-violet-500/25 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            新手友好 · 基建到算力一次配齐
          </div>

          <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            一站式解锁全球顶尖 AI 生产力
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50/85 sm:text-xl">
            专为新手设计 | 纯净原生环境 | 节点全包售后 | 告别封号焦虑
          </p>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("builder")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-base font-black text-slate-950 shadow-2xl shadow-cyan-950/40 transition duration-300 hover:scale-105 hover:bg-cyan-50"
          >
            开始定制我的 AI 方案
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
              Showcase
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">
              你能立刻打开的 AI 场景
            </h2>
          </div>
          <BadgeCheck className="hidden h-10 w-10 text-cyan-600 sm:block" />
        </div>

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
              <p className="mt-3 text-sm leading-7 text-slate-500">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="builder" className="mx-auto max-w-6xl px-5 py-8">
        <div className="rounded-[2rem] bg-white/65 p-4 shadow-2xl shadow-indigo-950/10 ring-1 ring-white backdrop-blur sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-700">
              Step 01
            </p>
            <h2 className="mt-2 text-3xl font-black">打通基建：网络与账号</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-2 font-black">
                <Wifi className="h-5 w-5 text-cyan-600" />
                自建专线网络
              </div>
              <div className="grid gap-4">
                <OptionCard
                  active={network === "1_month"}
                  icon={Rocket}
                  onClick={() => setNetwork("1_month")}
                  price={PRICES.network["1_month"]}
                  title="尝鲜单月"
                >
                  先体验完整环境，适合第一次尝试 AI 套餐的新手。
                </OptionCard>
                <OptionCard
                  active={network === "6_months"}
                  badge="🔥 立省60元 / 强烈推荐"
                  icon={ShieldCheck}
                  onClick={() => setNetwork("6_months")}
                  price={PRICES.network["6_months"]}
                  title="半年稳定版"
                >
                  长期使用更安心，绑定本站专属网络后享受更完整售后保障。
                </OptionCard>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2 font-black">
                <Mail className="h-5 w-5 text-indigo-600" />
                Google 身份基底
              </div>
              <div className="grid gap-4">
                <OptionCard
                  active={account === "gmail"}
                  icon={Mail}
                  onClick={() => setAccount("gmail")}
                  price={PRICES.account.gmail}
                  title="纯净原生 Gmail"
                >
                  新手最容易理解的入门身份，适合绑定常用 AI 服务。
                </OptionCard>
                <OptionCard
                  active={account === "zero_card"}
                  icon={CreditCard}
                  onClick={() => setAccount("zero_card")}
                  price={PRICES.account.zero_card}
                  title="零美元卡绑定服务"
                >
                  帮你处理海外服务常见绑卡门槛，减少注册和订阅阻力。
                </OptionCard>
              </div>
            </div>
          </div>

          <div className="mb-8 mt-12">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-700">
              Step 02
            </p>
            <h2 className="mt-2 text-3xl font-black">核心算力引擎</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <OptionCard
              active={aiService === "gpt_plus_1m"}
              icon={Bot}
              onClick={() => setAiService("gpt_plus_1m")}
              price={PRICES.ai_service.gpt_plus_1m}
              title="ChatGPT Plus 纯净代充"
            >
              1 个月高频办公、写作、学习与自动化辅助入口。
            </OptionCard>
            <OptionCard
              active={aiService === "gemini_3m"}
              icon={Gem}
              onClick={() => setAiService("gemini_3m")}
              price={PRICES.ai_service.gemini_3m}
              title="Gemini Pro 高级版"
            >
              3 个月进阶体验，适合文档、搜索、内容创作多场景使用。
            </OptionCard>
            <OptionCard
              active={aiService === "gemini_1y"}
              badge="👑 旗舰省心首选 / 开箱即用"
              badgeClass="bg-amber-100 text-amber-800"
              highlight
              icon={Crown}
              onClick={() => setAiService("gemini_1y")}
              price={PRICES.ai_service.gemini_1y}
              title="Gemini Pro 1年纯手工成品号"
            >
              满血长期方案，不折腾注册流程，拿到就能直接开始用。
            </OptionCard>
          </div>

          <div
            className={[
              "mt-6 rounded-xl border p-5 shadow-sm",
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
              <p className="text-sm font-bold leading-7 sm:text-base">
                {network
                  ? "🛡️ 已激活终身包赔：您已绑定本站专属网络，享受掉线指导、Plus 掉会员免费补全等 VIP 专属保障！"
                  : "⚠️ 风险提示：未选择本站自建网络。因客户自有网络波动导致的封号、掉会员，本站不提供售后及退款。建议勾选上方网络获取保障。"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
            Presets
          </p>
          <h2 className="mt-2 text-3xl font-black">极速通道：懒人预设包</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <PresetCard
            description="1个月网络 + Gmail + GPT Plus 1个月，适合低成本先跑通完整体验。"
            icon={Rocket}
            onClick={() =>
              applyPreset({
                network: "1_month",
                account: "gmail",
                aiService: "gpt_plus_1m",
              })
            }
            title="尝鲜体验包"
          />
          <PresetCard
            description="半年网络 + 零美元卡 + Gemini 3个月，适合稳定进阶使用。"
            icon={BadgeCheck}
            onClick={() =>
              applyPreset({
                network: "6_months",
                account: "zero_card",
                aiService: "gemini_3m",
              })
            }
            title="长效进阶包"
          />
          <PresetCard
            description="半年网络 + Gemini 1年成品号，适合完全不想折腾的满血方案。"
            icon={Crown}
            onClick={() =>
              applyPreset({
                network: "6_months",
                account: null,
                aiService: "gemini_1y",
              })
            }
            title="满血全自动包"
          />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/50 bg-white/80 px-4 py-4 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-slate-500">
              已选 {selectedItems.length} 项
            </p>
            <p className="mt-1 text-lg font-black text-slate-950 sm:text-2xl">
              总计：
              <span className="text-cyan-600">￥{total}</span>
            </p>
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
