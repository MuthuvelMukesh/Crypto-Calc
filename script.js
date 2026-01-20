const COINS = {
  bitcoin: { id: "bitcoin", symbol: "BTC" },
  ethereum: { id: "ethereum", symbol: "ETH" },
  solana: { id: "solana", symbol: "SOL" },
  "matic-network": { id: "matic-network", symbol: "MATIC" }
};

const livePriceEl = document.getElementById("livePrice");
const liveSymbolEl = document.getElementById("liveSymbol");
const priceMessageEl = document.getElementById("priceMessage");
const retryPriceBtn = document.getElementById("retryPrice");
const buyCoinSelect = document.getElementById("buyCoin");
const exchangeSelect = document.getElementById("exchangeSelect");
const feePercentInput = document.getElementById("feePercent");
const saveFeeBtn = document.getElementById("saveFee");
const gstToggle = document.getElementById("gstToggle");
const p2pToggle = document.getElementById("p2pToggle");
const usdtRateField = document.getElementById("usdtRateField");
const usdtRateInput = document.getElementById("usdtRate");
const coinSearchInput = document.getElementById("coinSearch");
const searchCoinsBtn = document.getElementById("searchCoins");
const coinSearchMessageEl = document.getElementById("coinSearchMessage");
const coinResultsEl = document.getElementById("coinResults");
const investAmountInput = document.getElementById("investAmount");
const buyFeeEl = document.getElementById("buyFee");
const buyGstEl = document.getElementById("buyGst");
const buyNetEl = document.getElementById("buyNet");
const buyUnitsEl = document.getElementById("buyUnits");
const calculateBuyBtn = document.getElementById("calculateBuy");
const buyMessageEl = document.getElementById("buyMessage");

const unitsBoughtInput = document.getElementById("unitsBought");
const buyPricePerUnitInput = document.getElementById("buyPricePerUnit");
const unitsToSellInput = document.getElementById("unitsToSell");
const sellPricePerUnitInput = document.getElementById("sellPricePerUnit");
const costBasisEl = document.getElementById("costBasis");
const saleValueEl = document.getElementById("saleValue");
const grossProfitEl = document.getElementById("grossProfit");
const taxDeductedEl = document.getElementById("taxDeducted");
const cessDeductedEl = document.getElementById("cessDeducted");
const tdsDeductedEl = document.getElementById("tdsDeducted");
const sellFeeEl = document.getElementById("sellFee");
const sellGstEl = document.getElementById("sellGst");
const netProfitEl = document.getElementById("netProfit");
const roiPercentEl = document.getElementById("roiPercent");
const chartBarEl = document.getElementById("chartBar");
const chartLegendEl = document.getElementById("chartLegend");
const calculateSellBtn = document.getElementById("calculateSell");
const sellMessageEl = document.getElementById("sellMessage");
const lossMessageEl = document.getElementById("lossMessage");

let currentPrice = 0;
let currentPriceUSD = 0;
let currentSymbol = "BTC";
let globalUsdToInr = 83;

const EXCHANGE_FEE_KEY = "cryptoCalcExchangeFees";

const getExchangeFees = () => {
  try {
    const stored = localStorage.getItem(EXCHANGE_FEE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveExchangeFee = (exchangeId, feePercent) => {
  const fees = getExchangeFees();
  fees[exchangeId] = feePercent;
  localStorage.setItem(EXCHANGE_FEE_KEY, JSON.stringify(fees));
};

const loadFeeForExchange = () => {
  const exchangeId = exchangeSelect.value;
  const fees = getExchangeFees();
  const savedFee = fees[exchangeId];
  if (savedFee !== undefined) {
    feePercentInput.value = savedFee.toString();
  } else {
    feePercentInput.value = "";
  }
};

const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(value);

const formatUnits = (value) => {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-IN", {
    maximumFractionDigits: 8
  });
};

const fetchLivePrice = async (coinId) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=inr,usd`;
  try {
    livePriceEl.textContent = "Fetching...";
    priceMessageEl.textContent = "Fetching latest price...";
    const response = await fetch(url, { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    const priceInr = data?.[coinId]?.inr;
    const priceUsd = data?.[coinId]?.usd;
    if (!priceInr || !priceUsd) throw new Error("Price unavailable");
    currentPriceUSD = priceUsd;
    globalUsdToInr = priceInr / priceUsd;
    updateDisplayedPrice(priceInr);
    const symbol = COINS[coinId]?.symbol || buyCoinSelect.selectedOptions[0]?.dataset?.symbol;
    currentSymbol = symbol || coinId.slice(0, 6).toUpperCase();
    liveSymbolEl.textContent = `${currentSymbol} / INR`;
    priceMessageEl.textContent = "Price updated from CoinGecko.";
  } catch (error) {
    livePriceEl.textContent = "Unable to fetch";
    liveSymbolEl.textContent = "CoinGecko error";
    priceMessageEl.textContent = "CoinGecko is unavailable. Please retry.";
    currentPrice = 0;
    currentPriceUSD = 0;
  }
};

const updateDisplayedPrice = (baseInrPrice) => {
  if (p2pToggle.checked && currentPriceUSD > 0) {
    const usdtRate = parseFloat(usdtRateInput.value) || globalUsdToInr;
    currentPrice = currentPriceUSD * usdtRate;
    livePriceEl.textContent = formatINR(currentPrice);
    priceMessageEl.textContent = `P2P price @ ₹${usdtRate.toFixed(2)}/USDT`;
  } else {
    currentPrice = baseInrPrice || (currentPriceUSD * globalUsdToInr);
    livePriceEl.textContent = formatINR(currentPrice);
  }
};

const setMessage = (element, message) => {
  element.textContent = message;
};

const resetBuyOutput = () => {
  buyFeeEl.textContent = "—";
  buyGstEl.textContent = "—";
  buyNetEl.textContent = "—";
  buyUnitsEl.textContent = "—";
};

const resetSellOutput = () => {
  costBasisEl.textContent = "—";
  saleValueEl.textContent = "—";
  grossProfitEl.textContent = "—";
  taxDeductedEl.textContent = "—";
  cessDeductedEl.textContent = "—";
  tdsDeductedEl.textContent = "—";
  sellFeeEl.textContent = "—";
  sellGstEl.textContent = "—";
  netProfitEl.textContent = "—";
  roiPercentEl.textContent = "—";
  lossMessageEl.textContent = "";
  chartBarEl.innerHTML = "";
  chartLegendEl.innerHTML = "";
};

const CHART_COLORS = {
  netProfit: "#22c55e",
  costBasis: "#3b82f6",
  tax: "#ef4444",
  cess: "#f97316",
  tds: "#a855f7",
  fee: "#eab308",
  gst: "#06b6d4",
  loss: "#dc2626"
};

const renderBreakdownChart = (segments, total) => {
  chartBarEl.innerHTML = "";
  chartLegendEl.innerHTML = "";

  if (total <= 0) return;

  segments.forEach((seg) => {
    if (seg.value <= 0) return;
    const pct = (seg.value / total) * 100;
    const div = document.createElement("div");
    div.className = "chart-segment";
    div.style.width = `${pct}%`;
    div.style.background = seg.color;
    if (pct > 8) div.textContent = `${pct.toFixed(0)}%`;
    chartBarEl.appendChild(div);
  });

  segments.forEach((seg) => {
    if (seg.value <= 0) return;
    const item = document.createElement("div");
    item.className = "legend-item";
    const colorBox = document.createElement("span");
    colorBox.className = "legend-color";
    colorBox.style.background = seg.color;
    const label = document.createElement("span");
    label.textContent = `${seg.label}: ${formatINR(seg.value)}`;
    item.appendChild(colorBox);
    item.appendChild(label);
    chartLegendEl.appendChild(item);
  });
};

const calculateBuy = () => {
  const rawAmount = investAmountInput.value.trim();
  const amount = parseFloat(rawAmount);
  const feePercentRaw = feePercentInput.value.trim();
  const feePercent = parseFloat(feePercentRaw);
  if (rawAmount === "") {
    resetBuyOutput();
    setMessage(buyMessageEl, "Please enter an investment amount.");
    return;
  }
  if (!Number.isFinite(amount)) {
    resetBuyOutput();
    setMessage(buyMessageEl, "Investment amount is invalid.");
    return;
  }
  if (amount <= 0) {
    resetBuyOutput();
    setMessage(buyMessageEl, "Investment amount must be greater than zero.");
    return;
  }
  if (feePercentRaw === "") {
    resetBuyOutput();
    setMessage(buyMessageEl, "Please enter the exchange fee percentage.");
    return;
  }
  if (!Number.isFinite(feePercent) || feePercent < 0) {
    resetBuyOutput();
    setMessage(buyMessageEl, "Exchange fee percentage is invalid.");
    return;
  }
  if (currentPrice <= 0) {
    resetBuyOutput();
    setMessage(buyMessageEl, "Live price unavailable. Please retry fetching the price.");
    return;
  }

  const feeRate = feePercent / 100;
  const fee = amount * feeRate;
  const gst = gstToggle.checked ? fee * 0.18 : 0;
  const netInvestment = amount - (fee + gst);
  const units = netInvestment / currentPrice;

  buyFeeEl.textContent = formatINR(fee);
  buyGstEl.textContent = formatINR(gst);
  buyNetEl.textContent = formatINR(netInvestment);
  buyUnitsEl.textContent = `${formatUnits(units)} ${currentSymbol}`;
  setMessage(buyMessageEl, "");
};

const calculateSell = () => {
  const unitsBoughtRaw = unitsBoughtInput.value.trim();
  const buyPriceRaw = buyPricePerUnitInput.value.trim();
  const unitsToSellRaw = unitsToSellInput.value.trim();
  const sellPriceRaw = sellPricePerUnitInput.value.trim();
  const feePercentRaw = feePercentInput.value.trim();

  const unitsBought = parseFloat(unitsBoughtRaw);
  const buyPricePerUnit = parseFloat(buyPriceRaw);
  const unitsToSell = parseFloat(unitsToSellRaw);
  const sellPricePerUnit = parseFloat(sellPriceRaw);
  const feePercent = parseFloat(feePercentRaw);

  if (unitsBoughtRaw === "" || buyPriceRaw === "" || unitsToSellRaw === "" || sellPriceRaw === "") {
    resetSellOutput();
    setMessage(sellMessageEl, "Please fill in all fields.");
    return;
  }
  if (!Number.isFinite(unitsBought) || !Number.isFinite(buyPricePerUnit) ||
      !Number.isFinite(unitsToSell) || !Number.isFinite(sellPricePerUnit)) {
    resetSellOutput();
    setMessage(sellMessageEl, "One or more values are invalid.");
    return;
  }
  if (unitsBought <= 0 || buyPricePerUnit <= 0 || unitsToSell <= 0 || sellPricePerUnit <= 0) {
    resetSellOutput();
    setMessage(sellMessageEl, "All values must be greater than zero.");
    return;
  }
  if (unitsToSell > unitsBought) {
    resetSellOutput();
    setMessage(sellMessageEl, "Units to sell cannot exceed units bought.");
    return;
  }
  if (feePercentRaw === "") {
    resetSellOutput();
    setMessage(sellMessageEl, "Please enter the exchange fee percentage.");
    return;
  }
  if (!Number.isFinite(feePercent) || feePercent < 0) {
    resetSellOutput();
    setMessage(sellMessageEl, "Exchange fee percentage is invalid.");
    return;
  }

  const costBasis = unitsToSell * buyPricePerUnit;
  const saleValue = unitsToSell * sellPricePerUnit;
  const grossProfit = saleValue - costBasis;
  const tax = grossProfit > 0 ? grossProfit * 0.3 : 0;
  const cess = tax * 0.04;
  const tds = saleValue * 0.01;
  const fee = saleValue * (feePercent / 100);
  const gst = gstToggle.checked ? fee * 0.18 : 0;
  const netProfit = grossProfit - tax - cess - tds - fee - gst;

  costBasisEl.textContent = formatINR(costBasis);
  saleValueEl.textContent = formatINR(saleValue);
  grossProfitEl.textContent = formatINR(grossProfit);
  taxDeductedEl.textContent = formatINR(tax);
  cessDeductedEl.textContent = formatINR(cess);
  tdsDeductedEl.textContent = formatINR(tds);
  sellFeeEl.textContent = formatINR(fee);
  sellGstEl.textContent = formatINR(gst);
  netProfitEl.textContent = formatINR(netProfit);

  const roi = costBasis > 0 ? (netProfit / costBasis) * 100 : 0;
  const roiSign = roi >= 0 ? "+" : "";
  roiPercentEl.textContent = `${roiSign}${roi.toFixed(2)}%`;
  roiPercentEl.style.color = roi >= 0 ? "#0f5132" : "#b42318";

  setMessage(sellMessageEl, "");

  const chartSegments = [
    { label: "Net Profit", value: Math.max(netProfit, 0), color: CHART_COLORS.netProfit },
    { label: "Cost Basis", value: costBasis, color: CHART_COLORS.costBasis },
    { label: "Tax (30%)", value: tax, color: CHART_COLORS.tax },
    { label: "Cess (4%)", value: cess, color: CHART_COLORS.cess },
    { label: "TDS (1%)", value: tds, color: CHART_COLORS.tds },
    { label: "Exchange Fee", value: fee, color: CHART_COLORS.fee },
    { label: "GST", value: gst, color: CHART_COLORS.gst }
  ];
  if (netProfit < 0) {
    chartSegments[0] = { label: "Loss", value: Math.abs(netProfit), color: CHART_COLORS.loss };
  }
  renderBreakdownChart(chartSegments, saleValue);

  if (grossProfit < 0) {
    lossMessageEl.textContent = "This is a capital loss. No tax applies on losses, and the net figure remains negative after 1% TDS.";
  } else if (grossProfit === 0) {
    lossMessageEl.textContent = "No profit or loss recorded. Only 1% TDS applies on the selling value.";
  } else {
    lossMessageEl.textContent = "";
  }
};

const setupTabs = () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.tab;
      document.getElementById(target).classList.add("active");
    });
  });
};

const renderCoinResults = (coins) => {
  coinResultsEl.innerHTML = "";
  if (!coins.length) {
    setMessage(coinSearchMessageEl, "No coins found.");
    return;
  }

  setMessage(coinSearchMessageEl, "");
  coins.forEach((coin) => {
    const item = document.createElement("div");
    item.className = "search-result-item";
    const label = document.createElement("span");
    label.textContent = `${coin.name} (${coin.symbol.toUpperCase()})`;
    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "secondary-btn";
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", () => addCoinToSelect(coin));
    item.appendChild(label);
    item.appendChild(addBtn);
    coinResultsEl.appendChild(item);
  });
};

const addCoinToSelect = (coin) => {
  if (!coin?.id) return;
  if (!COINS[coin.id]) {
    COINS[coin.id] = { id: coin.id, symbol: coin.symbol.toUpperCase() };
  }
  const existing = Array.from(buyCoinSelect.options).find((opt) => opt.value === coin.id);
  if (!existing) {
    const option = document.createElement("option");
    option.value = coin.id;
    option.dataset.symbol = coin.symbol.toUpperCase();
    option.textContent = `${coin.symbol.toUpperCase()} (${coin.name})`;
    buyCoinSelect.appendChild(option);
  }
  buyCoinSelect.value = coin.id;
  fetchLivePrice(coin.id);
};

const searchCoins = async () => {
  const query = coinSearchInput.value.trim();
  if (!query) {
    setMessage(coinSearchMessageEl, "Enter a coin name or symbol to search.");
    coinResultsEl.innerHTML = "";
    return;
  }

  try {
    setMessage(coinSearchMessageEl, "Searching CoinGecko...");
    coinResultsEl.innerHTML = "";
    const url = `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`;
    const response = await fetch(url, { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error("Search failed");
    const data = await response.json();
    const coins = (data?.coins || []).slice(0, 6).map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol
    }));
    renderCoinResults(coins);
  } catch (error) {
    setMessage(coinSearchMessageEl, "CoinGecko search failed. Please retry.");
    coinResultsEl.innerHTML = "";
  }
};

buyCoinSelect.addEventListener("change", (event) => {
  const coinId = event.target.value;
  fetchLivePrice(coinId);
});

searchCoinsBtn.addEventListener("click", searchCoins);
coinSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchCoins();
  }
});

p2pToggle.addEventListener("change", () => {
  usdtRateField.style.display = p2pToggle.checked ? "block" : "none";
  updateDisplayedPrice();
});

usdtRateInput.addEventListener("input", () => {
  updateDisplayedPrice();
});

exchangeSelect.addEventListener("change", () => {
  loadFeeForExchange();
});

saveFeeBtn.addEventListener("click", () => {
  const exchangeId = exchangeSelect.value;
  const feeVal = parseFloat(feePercentInput.value);
  if (Number.isFinite(feeVal) && feeVal >= 0) {
    saveExchangeFee(exchangeId, feeVal);
    const label = exchangeSelect.selectedOptions[0]?.textContent || exchangeId;
    alert(`Fee ${feeVal}% saved for ${label}`);
  } else {
    alert("Enter a valid fee percentage to save.");
  }
});

retryPriceBtn.addEventListener("click", () => {
  fetchLivePrice(buyCoinSelect.value);
});

calculateBuyBtn.addEventListener("click", calculateBuy);
calculateSellBtn.addEventListener("click", calculateSell);

setupTabs();
loadFeeForExchange();
fetchLivePrice(buyCoinSelect.value);
