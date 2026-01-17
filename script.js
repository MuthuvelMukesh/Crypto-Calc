const COINS = {
  bitcoin: { id: "bitcoin", symbol: "BTC" },
  ethereum: { id: "ethereum", symbol: "ETH" },
  solana: { id: "solana", symbol: "SOL" },
  "matic-network": { id: "matic-network", symbol: "MATIC" }
};

const livePriceEl = document.getElementById("livePrice");
const liveSymbolEl = document.getElementById("liveSymbol");
const buyCoinSelect = document.getElementById("buyCoin");
const investAmountInput = document.getElementById("investAmount");
const buyFeeEl = document.getElementById("buyFee");
const buyGstEl = document.getElementById("buyGst");
const buyNetEl = document.getElementById("buyNet");
const buyUnitsEl = document.getElementById("buyUnits");
const calculateBuyBtn = document.getElementById("calculateBuy");

const buyingPriceInput = document.getElementById("buyingPrice");
const sellingPriceInput = document.getElementById("sellingPrice");
const grossProfitEl = document.getElementById("grossProfit");
const taxDeductedEl = document.getElementById("taxDeducted");
const tdsDeductedEl = document.getElementById("tdsDeducted");
const netProfitEl = document.getElementById("netProfit");
const calculateSellBtn = document.getElementById("calculateSell");

let currentPrice = 0;
let currentSymbol = "BTC";

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
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=inr`;
  try {
    livePriceEl.textContent = "Fetching...";
    const response = await fetch(url, { headers: { accept: "application/json" } });
    const data = await response.json();
    const price = data?.[coinId]?.inr;
    if (!price) throw new Error("Price unavailable");
    currentPrice = price;
    currentSymbol = COINS[coinId].symbol;
    livePriceEl.textContent = formatINR(price);
    liveSymbolEl.textContent = `${currentSymbol} / INR`;
  } catch (error) {
    livePriceEl.textContent = "Unable to fetch";
    liveSymbolEl.textContent = "Check connection";
  }
};

const calculateBuy = () => {
  const amount = parseFloat(investAmountInput.value);
  if (!Number.isFinite(amount) || amount <= 0 || currentPrice <= 0) {
    buyFeeEl.textContent = "—";
    buyGstEl.textContent = "—";
    buyNetEl.textContent = "—";
    buyUnitsEl.textContent = "—";
    return;
  }

  const fee = amount * 0.002;
  const gst = fee * 0.18;
  const netInvestment = amount - (fee + gst);
  const units = netInvestment / currentPrice;

  buyFeeEl.textContent = formatINR(fee);
  buyGstEl.textContent = formatINR(gst);
  buyNetEl.textContent = formatINR(netInvestment);
  buyUnitsEl.textContent = `${formatUnits(units)} ${currentSymbol}`;
};

const calculateSell = () => {
  const buying = parseFloat(buyingPriceInput.value);
  const selling = parseFloat(sellingPriceInput.value);

  if (!Number.isFinite(buying) || !Number.isFinite(selling)) {
    grossProfitEl.textContent = "—";
    taxDeductedEl.textContent = "—";
    tdsDeductedEl.textContent = "—";
    netProfitEl.textContent = "—";
    return;
  }

  const grossProfit = selling - buying;
  const tax = grossProfit > 0 ? grossProfit * 0.3 : 0;
  const tds = selling * 0.01;
  const netProfit = grossProfit - tax - tds;

  grossProfitEl.textContent = formatINR(grossProfit);
  taxDeductedEl.textContent = formatINR(tax);
  tdsDeductedEl.textContent = formatINR(tds);
  netProfitEl.textContent = formatINR(netProfit);
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

buyCoinSelect.addEventListener("change", (event) => {
  const coinId = event.target.value;
  fetchLivePrice(coinId);
});

calculateBuyBtn.addEventListener("click", calculateBuy);
calculateSellBtn.addEventListener("click", calculateSell);

setupTabs();
fetchLivePrice(buyCoinSelect.value);
