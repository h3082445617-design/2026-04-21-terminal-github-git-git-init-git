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
  network: { "1_month": 20, "6_months": 60 },
  account: { gmail: 15, zero_card: 30 },
  ai_service: { gpt_plus_1m: 150, gemini_3m: 100, gemini_1y: 350 },
};

const copy = {
  heroEyebrow: "\u65b0\u624b\u53cb\u597d · \u57fa\u5efa\u5230\u7b97\u529b\u4e00\u6b21\u914d\u9f50",
  heroTitle: "\u4e00\u7ad9\u5f0f\u89e3\u9501\u5168\u7403\u9876\u5c16 AI \u751f\u4ea7\u529b",
  heroSub:
    "\u4e13\u4e3a\u65b0\u624b\u8bbe\u8ba1 | \u7eaf\u51c0\u539f\u751f\u73af\u5883 | \u8282\u70b9\u5168\u5305\u552e\u540e | \u544a\u522b\u5c01\u53f7\u7126\u8651",
  heroButton: "\u5f00\u59cb\u5b9a\u5236\u6211\u7684 AI \u65b9\u6848",
  showcaseTitle: "\u4f60\u80fd\u7acb\u523b\u6253\u5f00\u7684 AI \u573a\u666f",
  stepOne: "\u6253\u901a\u57fa\u5efa\uff1a\u7f51\u7edc\u4e0e\u8d26\u53f7",
  networkTitle: "\u81ea\u5efa\u4e13\u7ebf\u7f51\u7edc",
  accountTitle: "Google \u8eab\u4efd\u57fa\u5e95",
  stepTwo: "\u6838\u5fc3\u7b97\u529b\u5f15\u64ce",
  presetsTitle: "\u6781\u901f\u901a\u9053\uff1a\u61d2\u4eba\u9884\u8bbe\u5305",
  selected: "\u5df2\u9009",
  total: "\u603b\u8ba1\uff1a",
  copyOrder: "\u4e00\u952e\u590d\u5236\u8ba2\u5355\u5e76\u8054\u7cfb\u5ba2\u670d",
};

const LABELS = {
  network: {
    "1_month": "\u5c1d\u9c9c\u5355\u6708\u7f51\u7edc",
    "6_months": "\u534a\u5e74\u7a33\u5b9a\u7248\u7f51\u7edc",
  },
  account: {
    gmail: "\u7eaf\u51c0\u539f\u751f Gmail",
    zero_card: "\u96f6\u7f8e\u5143\u5361\u7ed1\u5b9a\u670d\u52a1",
  },
  ai_service: {
    gpt_plus_1m: "ChatGPT Plus \u7eaf\u51c0\u4ee3\u5145 1\u4e2a\u6708",
    gemini_3m: "Gemini Pro \u9ad8\u7ea7\u7248 3\u4e2a\u6708",
    gemini_1y: "Gemini Pro 1\u5e74\u7eaf\u624b\u5de5\u6210\u54c1\u53f7",
  },
};

const WECHAT_ID = "\u4f60\u7684\u5fae\u4fe1\u53f7";

const showcase = [
  {
    icon: Code2,
    title: "\u5168\u80fd\u529e\u516c\u52a9\u624b",
    text: "\u6da6\u8272\u90ae\u4ef6\u3001\u68b3\u7406\u6587\u6848\u3001\u6781\u901f\u4ee3\u7801 Debug\uff0c\u8ba9\u5c0f\u767d\u4e5f\u80fd\u50cf\u6709\u4e00\u4e2a 24 \u5c0f\u65f6\u5728\u7ebf\u7684\u6548\u7387\u56e2\u961f\u3002",
  },
  {
    icon: ImagePlus,
    title: "\u524d\u6cbf\u89c6\u89c9\u521b\u4f5c",
    text: "\u5229\u7528\u9876\u5c16\u6a21\u578b\u4f53\u9a8c\u6d41\u7545\u7684\u56fe\u50cf\u5230\u89c6\u9891\u751f\u6210\uff0c\u8f7b\u677e\u5c06\u9759\u6001\u56fe\u7247\u8f6c\u5316\u4e3a\u8fde\u8d2f\u3001\u6781\u5177\u7f8e\u611f\u7684\u52a8\u6001\u77ed\u7247\u3002",
  },
  {
    icon: Globe2,
    title: "\u6d77\u5916\u6781\u5ba2\u901a\u884c\u8bc1",
    text: "\u539f\u751f\u5e72\u51c0\u7684\u6570\u5b57\u8eab\u4efd\uff0c\u7545\u4eab\u6d77\u5916\u8f6f\u4ef6\u9996\u6708\u767d\u5ad6\u7279\u6743\uff0c\u628a\u590d\u6742\u95e8\u69db\u53d8\u6210\u5f00\u7bb1\u5373\u7528\u3002",
  },
];

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
        <div className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${badgeClass}`}>
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
        <span className="text-2xl font-black text-slate-950">{"\uFFE5"}{price}</span>
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

  const total = useMemo(
    () =>
      (network ? PRICES.network[network] : 0) +
      (account ? PRICES.account[account] : 0) +
      (aiService ? PRICES.ai_service[aiService] : 0),
    [network, account, aiService],
  );

  const applyPreset = (preset) => {
    setNetwork(preset.network);
    setAccount(preset.account);
    setAiService(preset.aiService);
    document.getElementById("builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyOrder = async () => {
    if (selectedItems.length === 0) {
      alert("\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a\u5957\u9910\u9879\u76ee\uff0c\u518d\u590d\u5236\u8ba2\u5355\u3002");
      return;
    }

    const orderText = `\u8001\u677f\u4f60\u597d\uff0c\u6211\u662f\u65b0\u624b\uff0c\u6211\u8981\u4e70\u3010${selectedItems.join(
      " + ",
    )}\u3011\uff0c\u663e\u793a\u603b\u4ef7${total}\u5143\uff0c\u8bf7\u95ee\u600e\u4e48\u5fae\u4fe1\u4ed8\u6b3e\uff1f`;

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

    alert(`\u8ba2\u5355\u590d\u5236\u6210\u529f\uff01\u8bf7\u6dfb\u52a0\u5ba2\u670d\u5fae\u4fe1\uff1a${WECHAT_ID} \u5e76\u5728\u804a\u5929\u6846\u7c98\u8d34\u53d1\u9001\u3002`);
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
            {copy.heroEyebrow}
          </div>
          <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">{copy.heroTitle}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50/85 sm:text-xl">{copy.heroSub}</p>
          <button
            type="button"
            onClick={() => document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-base font-black text-slate-950 shadow-2xl shadow-cyan-950/40 transition duration-300 hover:scale-105 hover:bg-cyan-50"
          >
            {copy.heroButton}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">Showcase</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">{copy.showcaseTitle}</h2>
          </div>
          <BadgeCheck className="hidden h-10 w-10 text-cyan-600 sm:block" />
        </div>
        <div className="flex snap-x gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {showcase.map((item) => (
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

      <section id="builder" className="mx-auto max-w-6xl px-5 py-8">
        <div className="rounded-[2rem] bg-white/65 p-4 shadow-2xl shadow-indigo-950/10 ring-1 ring-white backdrop-blur sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-700">Step 01</p>
            <h2 className="mt-2 text-3xl font-black">{copy.stepOne}</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-2 font-black">
                <Wifi className="h-5 w-5 text-cyan-600" />
                {copy.networkTitle}
              </div>
              <div className="grid gap-4">
                <OptionCard
                  active={network === "1_month"}
                  icon={Rocket}
                  onClick={() => setNetwork("1_month")}
                  price={PRICES.network["1_month"]}
                  title={"\u5c1d\u9c9c\u5355\u6708"}
                >
                  {"\u5148\u4f53\u9a8c\u5b8c\u6574\u73af\u5883\uff0c\u9002\u5408\u7b2c\u4e00\u6b21\u5c1d\u8bd5 AI \u5957\u9910\u7684\u65b0\u624b\u3002"}
                </OptionCard>
                <OptionCard
                  active={network === "6_months"}
                  badge={"\uD83D\uDD25 \u7acb\u770160\u5143 / \u5f3a\u70c8\u63a8\u8350"}
                  icon={ShieldCheck}
                  onClick={() => setNetwork("6_months")}
                  price={PRICES.network["6_months"]}
                  title={"\u534a\u5e74\u7a33\u5b9a\u7248"}
                >
                  {"\u957f\u671f\u4f7f\u7528\u66f4\u5b89\u5fc3\uff0c\u7ed1\u5b9a\u672c\u7ad9\u4e13\u5c5e\u7f51\u7edc\u540e\u4eab\u53d7\u66f4\u5b8c\u6574\u552e\u540e\u4fdd\u969c\u3002"}
                </OptionCard>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2 font-black">
                <Mail className="h-5 w-5 text-indigo-600" />
                {copy.accountTitle}
              </div>
              <div className="grid gap-4">
                <OptionCard
                  active={account === "gmail"}
                  icon={Mail}
                  onClick={() => setAccount("gmail")}
                  price={PRICES.account.gmail}
                  title={"\u7eaf\u51c0\u539f\u751f Gmail"}
                >
                  {"\u65b0\u624b\u6700\u5bb9\u6613\u7406\u89e3\u7684\u5165\u95e8\u8eab\u4efd\uff0c\u9002\u5408\u7ed1\u5b9a\u5e38\u7528 AI \u670d\u52a1\u3002"}
                </OptionCard>
                <OptionCard
                  active={account === "zero_card"}
                  icon={CreditCard}
                  onClick={() => setAccount("zero_card")}
                  price={PRICES.account.zero_card}
                  title={"\u96f6\u7f8e\u5143\u5361\u7ed1\u5b9a\u670d\u52a1"}
                >
                  {"\u5e2e\u4f60\u5904\u7406\u6d77\u5916\u670d\u52a1\u5e38\u89c1\u7ed1\u5361\u95e8\u69db\uff0c\u51cf\u5c11\u6ce8\u518c\u548c\u8ba2\u9605\u963b\u529b\u3002"}
                </OptionCard>
              </div>
            </div>
          </div>

          <div className="mb-8 mt-12">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-700">Step 02</p>
            <h2 className="mt-2 text-3xl font-black">{copy.stepTwo}</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <OptionCard
              active={aiService === "gpt_plus_1m"}
              icon={Bot}
              onClick={() => setAiService("gpt_plus_1m")}
              price={PRICES.ai_service.gpt_plus_1m}
              title={"ChatGPT Plus \u7eaf\u51c0\u4ee3\u5145"}
            >
              {"1 \u4e2a\u6708\u9ad8\u9891\u529e\u516c\u3001\u5199\u4f5c\u3001\u5b66\u4e60\u4e0e\u81ea\u52a8\u5316\u8f85\u52a9\u5165\u53e3\u3002"}
            </OptionCard>
            <OptionCard
              active={aiService === "gemini_3m"}
              icon={Gem}
              onClick={() => setAiService("gemini_3m")}
              price={PRICES.ai_service.gemini_3m}
              title={"Gemini Pro \u9ad8\u7ea7\u7248"}
            >
              {"3 \u4e2a\u6708\u8fdb\u9636\u4f53\u9a8c\uff0c\u9002\u5408\u6587\u6863\u3001\u641c\u7d22\u3001\u5185\u5bb9\u521b\u4f5c\u591a\u573a\u666f\u4f7f\u7528\u3002"}
            </OptionCard>
            <OptionCard
              active={aiService === "gemini_1y"}
              badge={"\uD83D\uDC51 \u65d7\u8230\u7701\u5fc3\u9996\u9009 / \u5f00\u7bb1\u5373\u7528"}
              badgeClass="bg-amber-100 text-amber-800"
              highlight
              icon={Crown}
              onClick={() => setAiService("gemini_1y")}
              price={PRICES.ai_service.gemini_1y}
              title={"Gemini Pro 1\u5e74\u7eaf\u624b\u5de5\u6210\u54c1\u53f7"}
            >
              {"\u6ee1\u8840\u957f\u671f\u65b9\u6848\uff0c\u4e0d\u6298\u817e\u6ce8\u518c\u6d41\u7a0b\uff0c\u62ff\u5230\u5c31\u80fd\u76f4\u63a5\u5f00\u59cb\u7528\u3002"}
            </OptionCard>
          </div>

          <div className={[
            "mt-6 rounded-xl border p-5 shadow-sm",
            network
              ? "border-emerald-200 bg-gradient-to-r from-emerald-50 to-amber-50 text-emerald-950"
              : "border-red-200 bg-red-50 text-red-950",
          ].join(" ")}>
            <div className="flex gap-3">
              {network ? (
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
              ) : (
                <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
              )}
              <p className="text-sm font-bold leading-7 sm:text-base">
                {network
                  ? "\uD83D\uDEE1\uFE0F \u5df2\u6fc0\u6d3b\u7ec8\u8eab\u5305\u8d54\uff1a\u60a8\u5df2\u7ed1\u5b9a\u672c\u7ad9\u4e13\u5c5e\u7f51\u7edc\uff0c\u4eab\u53d7\u6389\u7ebf\u6307\u5bfc\u3001Plus \u6389\u4f1a\u5458\u514d\u8d39\u8865\u5168\u7b49 VIP \u4e13\u5c5e\u4fdd\u969c\uff01"
                  : "\u26A0\uFE0F \u98ce\u9669\u63d0\u793a\uff1a\u672a\u9009\u62e9\u672c\u7ad9\u81ea\u5efa\u7f51\u7edc\u3002\u56e0\u5ba2\u6237\u81ea\u6709\u7f51\u7edc\u6ce2\u52a8\u5bfc\u81f4\u7684\u5c01\u53f7\u3001\u6389\u4f1a\u5458\uff0c\u672c\u7ad9\u4e0d\u63d0\u4f9b\u552e\u540e\u53ca\u9000\u6b3e\u3002\u5efa\u8bae\u52fe\u9009\u4e0a\u65b9\u7f51\u7edc\u83b7\u53d6\u4fdd\u969c\u3002"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">Presets</p>
          <h2 className="mt-2 text-3xl font-black">{copy.presetsTitle}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <PresetCard
            title={"\u5c1d\u9c9c\u4f53\u9a8c\u5305"}
            description={"1\u4e2a\u6708\u7f51\u7edc + Gmail + GPT Plus 1\u4e2a\u6708\uff0c\u9002\u5408\u4f4e\u6210\u672c\u5148\u8dd1\u901a\u5b8c\u6574\u4f53\u9a8c\u3002"}
            icon={Rocket}
            onClick={() => applyPreset({ network: "1_month", account: "gmail", aiService: "gpt_plus_1m" })}
          />
          <PresetCard
            title={"\u957f\u6548\u8fdb\u9636\u5305"}
            description={"\u534a\u5e74\u7f51\u7edc + \u96f6\u7f8e\u5143\u5361 + Gemini 3\u4e2a\u6708\uff0c\u9002\u5408\u7a33\u5b9a\u8fdb\u9636\u4f7f\u7528\u3002"}
            icon={BadgeCheck}
            onClick={() => applyPreset({ network: "6_months", account: "zero_card", aiService: "gemini_3m" })}
          />
          <PresetCard
            title={"\u6ee1\u8840\u5168\u81ea\u52a8\u5305"}
            description={"\u534a\u5e74\u7f51\u7edc + Gemini 1\u5e74\u6210\u54c1\u53f7\uff0c\u9002\u5408\u5b8c\u5168\u4e0d\u60f3\u6298\u817e\u7684\u6ee1\u8840\u65b9\u6848\u3002"}
            icon={Crown}
            onClick={() => applyPreset({ network: "6_months", account: null, aiService: "gemini_1y" })}
          />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/50 bg-white/80 px-4 py-4 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-slate-500">{copy.selected} {selectedItems.length} {"\u9879"}</p>
            <p className="mt-1 text-lg font-black text-slate-950 sm:text-2xl">
              {copy.total}
              <span className="text-cyan-600">{"\uFFE5"}{total}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={copyOrder}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-slate-950 to-indigo-900 px-4 py-3 text-sm font-black text-white shadow-xl shadow-indigo-950/30 transition duration-300 hover:scale-105 hover:from-indigo-900 hover:to-cyan-700 sm:px-6 sm:text-base"
          >
            <ClipboardCheck className="h-5 w-5" />
            {copy.copyOrder}
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
