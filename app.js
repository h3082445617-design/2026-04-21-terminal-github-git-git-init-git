const PRICES = {
  network: { "1_month": 20, "6_months": 60 },
  account: { gmail: 20, zero_card: 20 },
  ai_service: { gpt_plus_1m: 50, gemini_3m: 50, gemini_1y: 100 },
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

const BUNDLE_DISCOUNT = {
  amount: 10,
  name: "双引擎省心包立减",
};

const presets = [
  {
    title: "入门尝鲜包",
    tag: "预算最低",
    price: 90,
    audience: "刚接触 AI、课程作业较多、预算有限的新手。",
    ability: "适合改论文段落、润色邮件、整理笔记、解释代码报错。",
    scene: "先低成本跑通完整环境，体验一个月。",
    preset: {
      network: "1_month",
      gmail: true,
      zeroCard: false,
      aiServices: ["gpt_plus_1m"],
    },
  },
  {
    title: "科研进阶包",
    tag: "已有账号优先",
    price: 130,
    audience: "已有 Google / Gemini 账号的学生、研究生或课题组成员。",
    ability: "适合长文献梳理、实验方案拆解、英文摘要润色、组会提纲。",
    scene: "3 个月稳定学习 / 科研使用，覆盖一整个阶段任务。",
    preset: {
      network: "6_months",
      gmail: false,
      zeroCard: true,
      aiServices: ["gemini_3m"],
    },
  },
  {
    title: "论文冲刺省心包",
    tag: "最省心",
    price: 200,
    originalPrice: 210,
    audience: "快写毕业论文、开题 / 结题汇报，或者不想折腾配置的人。",
    ability: "GPT 负责快速改写答疑，Gemini 负责长文献和长期科研资料整理。",
    scene: "时间紧、任务重、想开箱即用；命中组合立减 10 元。",
    preset: {
      network: "6_months",
      gmail: false,
      zeroCard: false,
      aiServices: ["gpt_plus_1m", "gemini_1y"],
    },
  },
];

const networkOptions = [
  {
    key: "1_month",
    title: "尝鲜单月",
    badge: "新手试水",
    price: PRICES.network["1_month"],
    text: "第一次购买可以先低成本体验完整环境，适合先跑通 AI 套餐的新手。",
  },
  {
    key: "6_months",
    title: "半年稳定版",
    badge: "长期更推荐",
    price: PRICES.network["6_months"],
    text: "长期使用更划算，绑定本站专属网络后享受更完整的售后保障。",
  },
];

const accountOptions = [
  {
    key: "gmail",
    title: "纯净原生 Gmail",
    badge: "新手无账号先选",
    price: PRICES.account.gmail,
    text: "没有 Google 账号时优先补这一项，作为后续 GPT 或 Gemini 充值基础。",
  },
  {
    key: "zero_card",
    title: "零美元卡绑定服务",
    badge: "已有账号可加",
    price: PRICES.account.zero_card,
    text: "已有账号但缺支付能力时选择，可单买，也可以和会员一起买。",
  },
];

const rechargeOptions = [
  {
    key: "gpt_plus_1m",
    title: "ChatGPT Plus 1个月",
    badge: "可叠加购买",
    price: PRICES.ai_service.gpt_plus_1m,
    text: "已有 ChatGPT 账号可直接续会员，也可和 Gemini 一起买。",
  },
  {
    key: "gemini_3m",
    title: "Gemini Pro 3个月",
    badge: "已有账号首选",
    price: PRICES.ai_service.gemini_3m,
    text: "已有 Google 账号、只想续高级会员时选它；与 Gemini 1 年成品号二选一。",
  },
];

const finishedOptions = [
  {
    key: "gemini_1y",
    title: "Gemini Pro 1年成品号",
    badge: "开箱即用",
    price: PRICES.ai_service.gemini_1y,
    text: "没有账号、怕麻烦、想省心时选择。会自动关闭 Gmail / 绑卡，并和 Gemini 3 个月二选一。",
  },
];

const state = {
  network: null,
  gmail: false,
  zeroCard: false,
  aiServices: [],
};

function hasFinishedAccount() {
  return state.aiServices.includes("gemini_1y");
}

function hasRechargeService() {
  return state.aiServices.some((key) => key === "gpt_plus_1m" || key === "gemini_3m");
}

function selectedItems() {
  return [
    state.network && LABELS.network[state.network],
    state.gmail && LABELS.account.gmail,
    state.zeroCard && LABELS.account.zero_card,
    ...state.aiServices.map((service) => LABELS.ai_service[service]),
  ].filter(Boolean);
}

function totalAmount() {
  return (
    (state.network ? PRICES.network[state.network] : 0) +
    (state.gmail ? PRICES.account.gmail : 0) +
    (state.zeroCard ? PRICES.account.zero_card : 0) +
    state.aiServices.reduce((sum, service) => sum + PRICES.ai_service[service], 0)
  );
}

function discountAmount() {
  const hitBundle =
    state.network === "6_months" &&
    state.aiServices.includes("gpt_plus_1m") &&
    state.aiServices.includes("gemini_1y");
  return hitBundle ? BUNDLE_DISCOUNT.amount : 0;
}

function payableAmount() {
  return totalAmount() - discountAmount();
}

function createOptionCard(option, active, disabled, onClick, gold = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `option-card${active ? " active" : ""}${disabled ? " disabled" : ""}`;
  button.disabled = disabled;
  button.innerHTML = `
    <div class="option-badge${gold ? " gold" : ""}">${option.badge}</div>
    <h3>${option.title}</h3>
    <p>${option.text}</p>
    <div class="option-meta">
      <span class="option-price">¥${option.price}</span>
      <span>${active ? "已选中，再点一次可取消" : "点击选择"}</span>
    </div>
  `;
  button.addEventListener("click", onClick);
  return button;
}

function renderPresets() {
  const root = document.getElementById("preset-grid");
  root.innerHTML = "";
  presets.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "preset-card";
    card.innerHTML = `
      <span class="tag">${item.tag}</span>
      <h3>${item.title}</h3>
      <div class="price-row">
        <span class="price">¥${item.price}</span>
        ${item.originalPrice ? `<span class="old-price">¥${item.originalPrice}</span>` : ""}
      </div>
      <p><strong>适合人群：</strong>${item.audience}</p>
      <p><strong>能做什么：</strong>${item.ability}</p>
      <p><strong>推荐场景：</strong>${item.scene}</p>
    `;
    card.addEventListener("click", () => {
      state.network = item.preset.network;
      state.gmail = item.preset.gmail;
      state.zeroCard = item.preset.zeroCard;
      state.aiServices = [...item.preset.aiServices];
      renderAll();
      document.getElementById("builder").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    root.appendChild(card);
  });
}

function renderNetworks() {
  const root = document.getElementById("network-options");
  root.innerHTML = "";
  networkOptions.forEach((option) => {
    root.appendChild(
      createOptionCard(option, state.network === option.key, false, () => {
        state.network = state.network === option.key ? null : option.key;
        renderAll();
      }),
    );
  });

  const status = document.getElementById("network-status");
  if (state.network) {
    status.className = "status-box";
    status.textContent =
      "已激活网络保障：已绑定本站专属网络，可享受掉线指导、补会员等售后支持。";
  } else {
    status.className = "status-box warn";
    status.textContent =
      "风险提示：未选择本站网络。因自有网络波动导致的封号、掉会员等问题，通常不提供售后与退款。";
  }
}

function renderAccounts() {
  const root = document.getElementById("account-options");
  root.innerHTML = "";
  const finished = hasFinishedAccount();

  accountOptions.forEach((option) => {
    const active = option.key === "gmail" ? state.gmail : state.zeroCard;
    root.appendChild(
      createOptionCard(option, active, finished, () => {
        if (finished) return;
        if (option.key === "gmail") state.gmail = !state.gmail;
        if (option.key === "zero_card") state.zeroCard = !state.zeroCard;
        renderAll();
      }),
    );
  });

  const status = document.getElementById("account-status");
  status.textContent = finished
    ? "已选 Gemini 1 年成品号：这是开箱即用的完整账号，所以 Gmail 和绑卡服务会自动关闭。"
    : "判断口诀：没有账号选 Gmail；已有账号缺支付选绑卡；只想直接拿成品号就选 Gemini 1 年。";
}

function renderRecharge() {
  const root = document.getElementById("recharge-options");
  root.innerHTML = "";

  rechargeOptions.forEach((option) => {
    root.appendChild(
      createOptionCard(option, state.aiServices.includes(option.key), false, () => {
        if (state.aiServices.includes(option.key)) {
          state.aiServices = state.aiServices.filter((item) => item !== option.key);
        } else if (option.key === "gemini_3m") {
          state.aiServices = [...state.aiServices.filter((item) => item !== "gemini_1y"), option.key];
        } else {
          state.aiServices = [...state.aiServices, option.key];
        }
        renderAll();
      }),
    );
  });
}

function renderFinished() {
  const root = document.getElementById("finished-options");
  root.innerHTML = "";

  finishedOptions.forEach((option) => {
    root.appendChild(
      createOptionCard(option, state.aiServices.includes(option.key), false, () => {
        if (state.aiServices.includes(option.key)) {
          state.aiServices = state.aiServices.filter((item) => item !== option.key);
        } else {
          state.gmail = false;
          state.zeroCard = false;
          state.aiServices = [...state.aiServices.filter((item) => item !== "gemini_3m"), option.key];
        }
        renderAll();
      }, true),
    );
  });
}

function renderBottomBar() {
  const count = document.getElementById("selected-count");
  const payable = document.getElementById("payable-total");
  const discount = document.getElementById("discount-text");

  count.textContent = `已选 ${selectedItems().length} 项`;
  payable.textContent = `¥${payableAmount()}`;

  if (discountAmount() > 0) {
    discount.textContent = `原价 ¥${totalAmount()}，${BUNDLE_DISCOUNT.name} ¥${discountAmount()}`;
  } else {
    discount.textContent = "";
  }
}

function renderRechargeTip() {
  const tip = document.getElementById("recharge-tip");
  if (hasRechargeService() && !state.gmail) {
    tip.className = "tip-box";
    tip.textContent =
      "提醒：你选择了可充值会员。如果用户已有账号，可以不补 Gmail；如果是完全新手，加一个 Gmail 会更省心。";
  } else {
    tip.className = "tip-box hidden";
    tip.textContent = "";
  }
}

async function copyOrder() {
  const items = selectedItems();
  if (items.length === 0) {
    alert("请至少选择一个套餐项目，再复制订单。");
    return;
  }

  const discountText = discountAmount() > 0 ? `，已触发组合优惠立减${discountAmount()}元` : "";
  const text = `老板你好，我是新手，我要买【${items.join(" + ")}】，原价${totalAmount()}元${discountText}，显示总价${payableAmount()}元，请问怎么微信付款？`;

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  alert("订单已复制，请扫码添加微信客服“灿灿”，然后把订单粘贴发送。");
  document.getElementById("contact").scrollIntoView({ behavior: "smooth", block: "center" });
}

function renderAll() {
  renderNetworks();
  renderAccounts();
  renderRecharge();
  renderFinished();
  renderBottomBar();
  renderRechargeTip();
}

renderPresets();
renderAll();
document.getElementById("copy-order").addEventListener("click", copyOrder);
