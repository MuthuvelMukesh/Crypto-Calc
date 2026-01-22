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
const lastUpdatedEl = document.getElementById("lastUpdated");
const priceSourceSelect = document.getElementById("priceSource");
const manualPriceField = document.getElementById("manualPriceField");
const manualPriceInrInput = document.getElementById("manualPriceInr");
const applyManualPriceBtn = document.getElementById("applyManualPrice");
const usdInrRateInput = document.getElementById("usdInrRate");
const fetchFxBtn = document.getElementById("fetchFx");
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
const targetUnitsInput = document.getElementById("targetUnits");
const fillInvestForUnitsBtn = document.getElementById("fillInvestForUnits");
const buyFeeEl = document.getElementById("buyFee");
const buyGstEl = document.getElementById("buyGst");
const buyNetEl = document.getElementById("buyNet");
const buyUnitsEl = document.getElementById("buyUnits");
const effectiveBuyPriceEl = document.getElementById("effectiveBuyPrice");
const feePerUnitEl = document.getElementById("feePerUnit");
const calculateBuyBtn = document.getElementById("calculateBuy");
const buyMessageEl = document.getElementById("buyMessage");

const unitsBoughtInput = document.getElementById("unitsBought");
const buyPricePerUnitInput = document.getElementById("buyPricePerUnit");
const unitsToSellInput = document.getElementById("unitsToSell");
const sellPricePerUnitInput = document.getElementById("sellPricePerUnit");
const useLiveBuyPriceBtn = document.getElementById("useLiveBuyPrice");
const useLiveSellPriceBtn = document.getElementById("useLiveSellPrice");
const targetNetProfitInput = document.getElementById("targetNetProfit");
const calcBreakEvenBtn = document.getElementById("calcBreakEven");
const targetNetAfterTaxInput = document.getElementById("targetNetAfterTax");
const calcUnitsToSellBtn = document.getElementById("calcUnitsToSell");
const targetNetProceedsInput = document.getElementById("targetNetProceeds");
const calcSellPriceForProceedsBtn = document.getElementById("calcSellPriceForProceeds");

const surchargeRateSelect = document.getElementById("surchargeRate");
const tdsModeSelect = document.getElementById("tdsMode");
const tdsCategorySelect = document.getElementById("tdsCategory");
const annualConsiderationInput = document.getElementById("annualConsideration");
const tdsThresholdFieldsEl = document.getElementById("tdsThresholdFields");
const annualConsiderationFieldEl = document.getElementById("annualConsiderationField");
const costBasisEl = document.getElementById("costBasis");
const saleValueEl = document.getElementById("saleValue");
const grossProfitEl = document.getElementById("grossProfit");
const taxDeductedEl = document.getElementById("taxDeducted");
const cessDeductedEl = document.getElementById("cessDeducted");
const tdsDeductedEl = document.getElementById("tdsDeducted");
const surchargeDeductedEl = document.getElementById("surchargeDeducted");
const sellFeeEl = document.getElementById("sellFee");
const sellGstEl = document.getElementById("sellGst");
const netProfitEl = document.getElementById("netProfit");
const roiPercentEl = document.getElementById("roiPercent");
const chartBarEl = document.getElementById("chartBar");
const chartLegendEl = document.getElementById("chartLegend");
const calculateSellBtn = document.getElementById("calculateSell");
const sellMessageEl = document.getElementById("sellMessage");
const lossMessageEl = document.getElementById("lossMessage");

const resetBuyBtn = document.getElementById("resetBuy");
const resetSellBtn = document.getElementById("resetSell");
const copyBuyBtn = document.getElementById("copyBuy");
const copySellBtn = document.getElementById("copySell");
const toastEl = document.getElementById("toast");
const themeToggleBtn = document.getElementById("themeToggle");

const portfolioMethodSelect = document.getElementById("portfolioMethod");
const txDateInput = document.getElementById("txDate");
const txTypeSelect = document.getElementById("txType");
const txAssetInput = document.getElementById("txAsset");
const txUnitsInput = document.getElementById("txUnits");
const txPriceInput = document.getElementById("txPrice");
const txFeePercentInput = document.getElementById("txFeePercent");
const txGstEnabledInput = document.getElementById("txGstEnabled");
const txNotesInput = document.getElementById("txNotes");
const addTxBtn = document.getElementById("addTx");
const clearPortfolioBtn = document.getElementById("clearPortfolio");
const exportTxCsvBtn = document.getElementById("exportTxCsv");
const exportFyCsvBtn = document.getElementById("exportFyCsv");
const portfolioMessageEl = document.getElementById("portfolioMessage");
const txTbodyEl = document.getElementById("txTbody");
const fyTbodyEl = document.getElementById("fyTbody");
const portfolioSummaryEl = document.getElementById("portfolioSummary");

let currentPrice = 0;
let currentPriceUSD = 0;
let currentSymbol = "BTC";
let fxUsdToInr = 83;
let lastPriceUpdatedAt = 0;
let rateLimitUntil = 0;

const getSelectedPriceSource = () => {
  const v = priceSourceSelect?.value;
  if (v === "binance" || v === "manual") return v;
  return "coingecko";
};

const syncPriceSourceUI = () => {
  const source = getSelectedPriceSource();
  const isManual = source === "manual";
  if (manualPriceField) manualPriceField.hidden = !isManual;
  if (applyManualPriceBtn) applyManualPriceBtn.hidden = !isManual;
};

const getSurchargeRate = () => {
  const raw = surchargeRateSelect?.value ?? "0";
  const r = parseFloat(raw);
  return Number.isFinite(r) && r >= 0 ? r : 0;
};

const getTdsInfo = () => {
  const mode = tdsModeSelect?.value === "threshold" ? "threshold" : "always";
  if (mode === "always") return { mode, applies: true, rate: 0.01 };

  const category = tdsCategorySelect?.value === "other" ? "other" : "individual_huf";
  const threshold = category === "other" ? 10_000 : 50_000;
  const annual = parseFloat(annualConsiderationInput?.value ?? "0") || 0;
  const applies = annual >= threshold;
  return { mode, applies, rate: applies ? 0.01 : 0, threshold, category, annual };
};

const syncTdsUI = () => {
  const mode = tdsModeSelect?.value === "threshold";
  if (tdsThresholdFieldsEl) tdsThresholdFieldsEl.hidden = !mode;
  if (annualConsiderationFieldEl) annualConsiderationFieldEl.hidden = !mode;
};

const AUTO_REFRESH_MS = 60_000;
const PRICE_CACHE_TTL_MS = 25_000;
const FX_CACHE_TTL_MS = 12 * 60 * 60_000;

const EXCHANGE_FEE_KEY = "cryptoCalcExchangeFees";
const PREFS_KEY = "cryptoCalcPreferences";
const PRICE_CACHE_KEY = "cryptoCalcPriceCache";
const FX_CACHE_KEY = "cryptoCalcFxCache";
const PORTFOLIO_KEY = "cryptoCalcPortfolio";

let toastTimer = null;

const showToast = (message, type = "info") => {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.className = `toast toast-${type}`;
  toastEl.hidden = false;
  if (toastTimer) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastEl.hidden = true;
  }, 2400);
};

const getPrefs = () => {
  try {
    const stored = localStorage.getItem(PREFS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const savePrefs = (partial) => {
  const next = { ...getPrefs(), ...partial };
  localStorage.setItem(PREFS_KEY, JSON.stringify(next));
};

const formatTime = (ts) => {
  if (!ts) return "—";
  try {
    return new Date(ts).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  } catch {
    return "—";
  }
};

const setLastUpdated = (ts, note = "") => {
  lastPriceUpdatedAt = ts || 0;
  if (!lastUpdatedEl) return;
  const base = ts ? `Last updated: ${formatTime(ts)}` : "Last updated: —";
  lastUpdatedEl.textContent = note ? `${base} (${note})` : base;
};

const getPriceCache = () => {
  try {
    const stored = localStorage.getItem(PRICE_CACHE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const setPriceCache = (coinId, payload) => {
  const cache = getPriceCache();
  cache[coinId] = payload;
  localStorage.setItem(PRICE_CACHE_KEY, JSON.stringify(cache));
};

const getFxCache = () => {
  try {
    const stored = localStorage.getItem(FX_CACHE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const setFxCache = (payload) => {
  localStorage.setItem(FX_CACHE_KEY, JSON.stringify(payload));
};

const applyFxRate = (rate, source = "") => {
  if (!Number.isFinite(rate) || rate <= 0) return;
  fxUsdToInr = rate;
  if (usdInrRateInput) usdInrRateInput.value = rate.toFixed(2);
  savePrefs({ usdInrRate: rate });
  if (source) showToast(`USD/INR updated (${source}).`, "success");
  updateDisplayedPrice();
};

const fetchUsdInrRate = async ({ silent = false } = {}) => {
  const now = Date.now();
  const cached = getFxCache();
  if (cached?.rate && cached?.fetchedAt && now - cached.fetchedAt < FX_CACHE_TTL_MS) {
    applyFxRate(cached.rate, silent ? "" : "cached");
    return;
  }

  try {
    if (!silent) showToast("Fetching USD/INR...", "info");
    const res = await fetch("https://open.er-api.com/v6/latest/USD", { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error("FX API error");
    const data = await res.json();
    const rate = data?.rates?.INR;
    if (!Number.isFinite(rate) || rate <= 0) throw new Error("FX rate unavailable");
    setFxCache({ rate, fetchedAt: now, source: "open.er-api.com" });
    applyFxRate(rate, silent ? "" : "live");
  } catch {
    if (!silent) showToast("Could not fetch USD/INR. Using your saved/manual rate.", "error");
  }
};

const applyTheme = (theme) => {
  const t = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = t;
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
    themeToggleBtn.textContent = t === "dark" ? "Dark" : "Light";
  }
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", t === "dark" ? "#0b1220" : "#1e63ff");
  }
};

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

const applyPreferences = () => {
  const prefs = getPrefs();

  if (prefs?.theme) {
    applyTheme(prefs.theme);
  } else {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  if (prefs?.exchangeId && Array.from(exchangeSelect.options).some((o) => o.value === prefs.exchangeId)) {
    exchangeSelect.value = prefs.exchangeId;
  }
  loadFeeForExchange();
  if (typeof prefs?.feePercent === "number") {
    feePercentInput.value = prefs.feePercent.toString();
  }

  if (typeof prefs?.gstEnabled === "boolean") {
    gstToggle.checked = prefs.gstEnabled;
  }
  if (typeof prefs?.p2pEnabled === "boolean") {
    p2pToggle.checked = prefs.p2pEnabled;
    usdtRateField.hidden = !p2pToggle.checked;
  }
  if (typeof prefs?.usdtRate === "number" && Number.isFinite(prefs.usdtRate)) {
    usdtRateInput.value = prefs.usdtRate.toString();
  }

  if (typeof prefs?.usdInrRate === "number" && Number.isFinite(prefs.usdInrRate) && prefs.usdInrRate > 0) {
    fxUsdToInr = prefs.usdInrRate;
    if (usdInrRateInput) usdInrRateInput.value = prefs.usdInrRate.toFixed(2);
  } else {
    if (usdInrRateInput) usdInrRateInput.value = fxUsdToInr.toFixed(2);
  }

  if (prefs?.priceSource && priceSourceSelect) {
    const src = ["coingecko", "binance", "manual"].includes(prefs.priceSource) ? prefs.priceSource : "coingecko";
    priceSourceSelect.value = src;
  }
  if (typeof prefs?.manualPriceInr === "number" && Number.isFinite(prefs.manualPriceInr) && prefs.manualPriceInr > 0) {
    if (manualPriceInrInput) manualPriceInrInput.value = prefs.manualPriceInr.toFixed(2);
  }

  if (surchargeRateSelect && typeof prefs?.surchargeRate === "number") {
    const val = prefs.surchargeRate;
    const allowed = [0, 0.1, 0.15, 0.25, 0.37];
    surchargeRateSelect.value = allowed.includes(val) ? String(val) : "0";
  }
  if (tdsModeSelect && typeof prefs?.tdsMode === "string") {
    tdsModeSelect.value = prefs.tdsMode === "threshold" ? "threshold" : "always";
  }
  if (tdsCategorySelect && typeof prefs?.tdsCategory === "string") {
    tdsCategorySelect.value = prefs.tdsCategory === "other" ? "other" : "individual_huf";
  }
  if (annualConsiderationInput && typeof prefs?.annualConsideration === "number" && Number.isFinite(prefs.annualConsideration)) {
    annualConsiderationInput.value = prefs.annualConsideration.toFixed(2);
  }

  syncTdsUI();
  syncPriceSourceUI();

  if (prefs?.coinId && Array.from(buyCoinSelect.options).some((o) => o.value === prefs.coinId)) {
    buyCoinSelect.value = prefs.coinId;
  }

  if (prefs?.activeTab === "sell") {
    activateTab("sell");
  } else if (prefs?.activeTab === "portfolio") {
    activateTab("portfolio");
  } else {
    activateTab("buy");
  }
};

const loadPortfolio = () => {
  try {
    const stored = localStorage.getItem(PORTFOLIO_KEY);
    if (!stored) return { method: "fifo", transactions: [] };
    const parsed = JSON.parse(stored);
    const method = parsed?.method === "avg" ? "avg" : "fifo";
    const transactions = Array.isArray(parsed?.transactions) ? parsed.transactions : [];
    return { method, transactions };
  } catch {
    return { method: "fifo", transactions: [] };
  }
};

const savePortfolio = (portfolio) => {
  localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(portfolio));
};

const normalizeAsset = (raw) => {
  const v = (raw ?? "").toString().trim().toUpperCase();
  if (v) return v;
  return (currentSymbol || "BTC").toUpperCase();
};

const parseDateMs = (dateStr) => {
  if (!dateStr) return 0;
  const t = new Date(dateStr).getTime();
  return Number.isFinite(t) ? t : 0;
};

const getFiscalYearLabel = (dateStr) => {
  const d = new Date(dateStr);
  if (!(d instanceof Date) || !Number.isFinite(d.getTime())) return "Unknown";
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const startYear = m >= 4 ? y : y - 1;
  const endYearShort = String(startYear + 1).slice(-2);
  return `FY${startYear}-${endYearShort}`;
};

const downloadTextFile = (filename, text, mime = "text/plain") => {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const toCsv = (rows) =>
  rows
    .map((row) =>
      row
        .map((cell) => {
          const s = cell === null || cell === undefined ? "" : String(cell);
          const escaped = s.replaceAll('"', '""');
          return /[\n",]/.test(escaped) ? `"${escaped}"` : escaped;
        })
        .join(",")
    )
    .join("\n");

const computePortfolio = (portfolio) => {
  const method = portfolio?.method === "avg" ? "avg" : "fifo";
  const txs = Array.isArray(portfolio?.transactions) ? portfolio.transactions : [];
  const sorted = [...txs].sort((a, b) => {
    const da = parseDateMs(a.date);
    const db = parseDateMs(b.date);
    if (da !== db) return da - db;
    return String(a.id || "").localeCompare(String(b.id || ""));
  });

  const surchargeRate = getSurchargeRate();
  const tdsMode = tdsModeSelect?.value === "threshold" ? "threshold" : "always";
  const category = tdsCategorySelect?.value === "other" ? "other" : "individual_huf";
  const threshold = category === "other" ? 10_000 : 50_000;

  const lotsByAsset = new Map(); // asset -> [{ units, totalCost }]
  const poolsByAsset = new Map(); // asset -> { units, totalCost }
  const holdingsByAsset = new Map(); // asset -> { units, totalCost }

  const fyAgg = new Map(); // fyLabel -> aggregates
  let currentFy = null;
  let fyConsideration = 0;

  const ensureFy = (fy) => {
    if (!fyAgg.has(fy)) {
      fyAgg.set(fy, {
        fy,
        sellValue: 0,
        costBasis: 0,
        grossPL: 0,
        tax: 0,
        surcharge: 0,
        cess: 0,
        tds: 0,
        feesGst: 0,
        netPL: 0,
        warnings: 0
      });
    }
    return fyAgg.get(fy);
  };

  const takeCostFifo = (asset, unitsToSell) => {
    const lots = lotsByAsset.get(asset) || [];
    let remaining = unitsToSell;
    let cost = 0;
    let missing = 0;

    while (remaining > 0 && lots.length) {
      const lot = lots[0];
      const take = Math.min(lot.units, remaining);
      const costPerUnit = lot.units > 0 ? lot.totalCost / lot.units : 0;
      cost += take * costPerUnit;
      lot.units -= take;
      lot.totalCost -= take * costPerUnit;
      remaining -= take;
      if (lot.units <= 1e-12) lots.shift();
    }

    if (remaining > 1e-12) missing = remaining;
    lotsByAsset.set(asset, lots);
    return { cost, missingUnits: missing };
  };

  const takeCostAvg = (asset, unitsToSell) => {
    const pool = poolsByAsset.get(asset) || { units: 0, totalCost: 0 };
    const avgCostPerUnit = pool.units > 0 ? pool.totalCost / pool.units : 0;
    const available = Math.min(pool.units, unitsToSell);
    const cost = available * avgCostPerUnit;
    pool.units -= available;
    pool.totalCost -= cost;
    poolsByAsset.set(asset, pool);
    const missing = unitsToSell - available;
    return { cost, missingUnits: missing > 1e-12 ? missing : 0 };
  };

  sorted.forEach((tx) => {
    const fy = getFiscalYearLabel(tx.date);
    if (fy !== currentFy) {
      currentFy = fy;
      fyConsideration = 0;
    }

    const agg = ensureFy(fy);

    const type = tx.type === "sell" ? "sell" : "buy";
    const asset = normalizeAsset(tx.asset);
    const units = parseFloat(tx.units);
    const price = parseFloat(tx.price);
    const feePercent = parseFloat(tx.feePercent);
    const gstEnabled = !!tx.gstEnabled;
    const feeRate = Number.isFinite(feePercent) && feePercent >= 0 ? feePercent / 100 : 0;
    if (!(units > 0) || !(price > 0)) {
      agg.warnings += 1;
      return;
    }

    const value = units * price;
    const fee = value * feeRate;
    const gst = gstEnabled ? fee * 0.18 : 0;

    if (type === "buy") {
      const totalCost = value + fee + gst;
      if (method === "fifo") {
        const lots = lotsByAsset.get(asset) || [];
        lots.push({ units, totalCost });
        lotsByAsset.set(asset, lots);
      } else {
        const pool = poolsByAsset.get(asset) || { units: 0, totalCost: 0 };
        pool.units += units;
        pool.totalCost += totalCost;
        poolsByAsset.set(asset, pool);
      }

      const h = holdingsByAsset.get(asset) || { units: 0, totalCost: 0 };
      h.units += units;
      h.totalCost += totalCost;
      holdingsByAsset.set(asset, h);
      return;
    }

    // Sell
    let costBasis = 0;
    let missingUnits = 0;
    if (method === "fifo") {
      const res = takeCostFifo(asset, units);
      costBasis = res.cost;
      missingUnits = res.missingUnits;
    } else {
      const res = takeCostAvg(asset, units);
      costBasis = res.cost;
      missingUnits = res.missingUnits;
    }

    const h = holdingsByAsset.get(asset) || { units: 0, totalCost: 0 };
    const avgCostPerUnit = h.units > 0 ? h.totalCost / h.units : 0;
    const available = Math.min(h.units, units);
    h.units -= available;
    h.totalCost -= available * avgCostPerUnit;
    holdingsByAsset.set(asset, h);

    const grossProfit = value - costBasis;
    const baseTax = grossProfit > 0 ? grossProfit * 0.3 : 0;
    const surcharge = baseTax * surchargeRate;
    const cess = (baseTax + surcharge) * 0.04;

    const tdsRate =
      tdsMode === "always"
        ? 0.01
        : fyConsideration + value >= threshold
          ? 0.01
          : 0;
    const tds = value * tdsRate;
    fyConsideration += value;

    const netProfit = grossProfit - baseTax - surcharge - cess - tds - fee - gst;

    agg.sellValue += value;
    agg.costBasis += costBasis;
    agg.grossPL += grossProfit;
    agg.tax += baseTax;
    agg.surcharge += surcharge;
    agg.cess += cess;
    agg.tds += tds;
    agg.feesGst += fee + gst;
    agg.netPL += netProfit;
    if (missingUnits > 0) agg.warnings += 1;
  });

  return {
    sorted,
    holdingsByAsset,
    fy: Array.from(fyAgg.values()).sort((a, b) => a.fy.localeCompare(b.fy))
  };
};

const renderPortfolio = () => {
  if (!txTbodyEl || !fyTbodyEl || !portfolioSummaryEl) return;
  const portfolio = loadPortfolio();
  const { sorted, holdingsByAsset, fy } = computePortfolio(portfolio);

  txTbodyEl.innerHTML = "";
  sorted.forEach((tx) => {
    const tr = document.createElement("tr");
    const date = tx.date || "";
    const type = tx.type === "sell" ? "sell" : "buy";
    const asset = normalizeAsset(tx.asset);
    const units = parseFloat(tx.units);
    const price = parseFloat(tx.price);
    const feePercent = parseFloat(tx.feePercent);
    const gstEnabled = !!tx.gstEnabled;
    const notes = (tx.notes ?? "").toString();

    const cells = [
      date,
      type,
      asset,
      Number.isFinite(units) ? formatUnits(units) : "—",
      Number.isFinite(price) ? formatINR(price) : "—",
      Number.isFinite(feePercent) ? `${feePercent}` : "",
      gstEnabled ? "Yes" : "No",
      notes
    ];

    cells.forEach((c) => {
      const td = document.createElement("td");
      td.textContent = c;
      tr.appendChild(td);
    });

    const tdBtn = document.createElement("td");
    const del = document.createElement("button");
    del.type = "button";
    del.className = "secondary-btn";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      const p = loadPortfolio();
      p.transactions = (p.transactions || []).filter((t) => t.id !== tx.id);
      savePortfolio(p);
      renderPortfolio();
      showToast("Transaction deleted.", "success");
    });
    tdBtn.appendChild(del);
    tr.appendChild(tdBtn);

    txTbodyEl.appendChild(tr);
  });

  // Holdings summary
  const holdingRows = Array.from(holdingsByAsset.entries())
    .filter(([, h]) => h.units > 1e-12)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([asset, h]) => {
      const avgCost = h.units > 0 ? h.totalCost / h.units : 0;
      return { asset, units: h.units, avgCost };
    });

  const totals = fy.reduce(
    (acc, row) => {
      acc.sellValue += row.sellValue;
      acc.costBasis += row.costBasis;
      acc.grossPL += row.grossPL;
      acc.tax += row.tax;
      acc.surcharge += row.surcharge;
      acc.cess += row.cess;
      acc.tds += row.tds;
      acc.feesGst += row.feesGst;
      acc.netPL += row.netPL;
      acc.warnings += row.warnings;
      return acc;
    },
    { sellValue: 0, costBasis: 0, grossPL: 0, tax: 0, surcharge: 0, cess: 0, tds: 0, feesGst: 0, netPL: 0, warnings: 0 }
  );

  portfolioSummaryEl.innerHTML = "";
  const mk = (label, value, highlight = false) => {
    const div = document.createElement("div");
    div.className = highlight ? "result-item highlight" : "result-item";
    const s = document.createElement("span");
    s.textContent = label;
    const b = document.createElement("strong");
    b.textContent = value;
    div.appendChild(s);
    div.appendChild(b);
    return div;
  };

  portfolioSummaryEl.appendChild(mk("Holdings", holdingRows.length ? holdingRows.map((r) => `${r.asset}: ${formatUnits(r.units)}`).join(" | ") : "—"));
  portfolioSummaryEl.appendChild(mk("Realized Net P/L", formatINR(totals.netPL), true));
  portfolioSummaryEl.appendChild(mk("Total Tax", formatINR(totals.tax + totals.surcharge + totals.cess)));
  portfolioSummaryEl.appendChild(mk("Total TDS", formatINR(totals.tds)));
  portfolioSummaryEl.appendChild(mk("Fees + GST", formatINR(totals.feesGst)));
  if (totals.warnings) portfolioSummaryEl.appendChild(mk("Warnings", `${totals.warnings} (check sells vs holdings)`));

  fyTbodyEl.innerHTML = "";
  fy.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.warnings) tr.classList.add("row-warn");

    const cells = [
      row.fy,
      formatINR(row.sellValue),
      formatINR(row.costBasis),
      formatINR(row.grossPL),
      formatINR(row.tax),
      formatINR(row.surcharge),
      formatINR(row.cess),
      formatINR(row.tds),
      formatINR(row.feesGst),
      formatINR(row.netPL)
    ];
    cells.forEach((c) => {
      const td = document.createElement("td");
      td.textContent = c;
      tr.appendChild(td);
    });
    fyTbodyEl.appendChild(tr);
  });
};

const addPortfolioTx = () => {
  if (!txDateInput || !txTypeSelect || !txUnitsInput || !txPriceInput) return;

  const date = txDateInput.value;
  const type = txTypeSelect.value === "sell" ? "sell" : "buy";
  const asset = normalizeAsset(txAssetInput?.value || currentSymbol);
  const units = parseFloat(txUnitsInput.value);
  const price = parseFloat(txPriceInput.value);
  const feePercent = parseFloat(txFeePercentInput?.value ?? "");
  const gstEnabled = !!txGstEnabledInput?.checked;
  const notes = (txNotesInput?.value ?? "").toString().trim();

  if (!date) {
    if (portfolioMessageEl) portfolioMessageEl.textContent = "Please choose a date.";
    showToast("Choose a date.", "error");
    return;
  }
  if (!(units > 0) || !(price > 0)) {
    if (portfolioMessageEl) portfolioMessageEl.textContent = "Enter valid units and price.";
    showToast("Enter valid units and price.", "error");
    return;
  }

  const feeFallback = parseFloat(feePercentInput.value);
  const finalFeePercent = Number.isFinite(feePercent) && feePercent >= 0 ? feePercent : Number.isFinite(feeFallback) && feeFallback >= 0 ? feeFallback : 0;

  const p = loadPortfolio();
  const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  p.transactions = Array.isArray(p.transactions) ? p.transactions : [];
  p.transactions.push({
    id,
    date,
    type,
    asset,
    units,
    price,
    feePercent: finalFeePercent,
    gstEnabled,
    notes
  });
  savePortfolio(p);
  if (portfolioMessageEl) portfolioMessageEl.textContent = "";
  renderPortfolio();
  showToast("Transaction added.", "success");
};

const exportPortfolioTxCsv = () => {
  const p = loadPortfolio();
  const rows = [
    ["date", "type", "asset", "units", "price_inr", "fee_percent", "gst_on_fee", "notes"]
  ];
  (p.transactions || [])
    .slice()
    .sort((a, b) => parseDateMs(a.date) - parseDateMs(b.date))
    .forEach((tx) => {
      rows.push([
        tx.date || "",
        tx.type || "",
        normalizeAsset(tx.asset),
        tx.units,
        tx.price,
        tx.feePercent,
        tx.gstEnabled ? "yes" : "no",
        tx.notes || ""
      ]);
    });
  downloadTextFile("portfolio-transactions.csv", toCsv(rows), "text/csv");
  showToast("Transactions CSV downloaded.", "success");
};

const exportPortfolioFyCsv = () => {
  const p = loadPortfolio();
  const { fy } = computePortfolio(p);
  const rows = [
    ["fy", "sell_value", "cost_basis", "gross_pl", "tax", "surcharge", "cess", "tds", "fees_gst", "net_pl", "warnings"]
  ];
  fy.forEach((r) => {
    rows.push([
      r.fy,
      r.sellValue,
      r.costBasis,
      r.grossPL,
      r.tax,
      r.surcharge,
      r.cess,
      r.tds,
      r.feesGst,
      r.netPL,
      r.warnings
    ]);
  });
  downloadTextFile("portfolio-fy-summary.csv", toCsv(rows), "text/csv");
  showToast("FY summary CSV downloaded.", "success");
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

const getFeeRate = () => {
  const feePercentRaw = feePercentInput.value.trim();
  const feePercent = parseFloat(feePercentRaw);
  if (feePercentRaw === "") return null;
  if (!Number.isFinite(feePercent) || feePercent < 0) return null;
  return feePercent / 100;
};

const solveSellPriceForTargetNetProfit = ({
  unitsToSell,
  buyPricePerUnit,
  targetNetProfit,
  feeRate,
  gstEnabled,
  tdsRate,
  surchargeRate
}) => {
  const u = unitsToSell;
  const b = buyPricePerUnit;
  const t = targetNetProfit;
  const g = gstEnabled ? 0.18 : 0;
  const tds = Number.isFinite(tdsRate) && tdsRate >= 0 ? tdsRate : 0.01;
  const s = Number.isFinite(surchargeRate) && surchargeRate >= 0 ? surchargeRate : 0;

  if (!(u > 0) || !(b > 0) || !Number.isFinite(t)) return null;

  // Region 1: grossProfit <= 0 => no tax/surcharge/cess
  // net = sale*(1 - tds - feeRate*(1+g)) - cost
  const d = tds + feeRate * (1 + g);
  const k2 = 1 - d;
  if (k2 <= 0) return null;
  const p2 = (t + u * b) / (u * k2);
  if (p2 <= b) return p2;

  // Region 2: grossProfit > 0
  // baseTax = 30% of profit
  // surcharge = baseTax*s
  // cess = 4% of (baseTax+surcharge)
  // total tax-related deduction = 0.3*(1+s)*1.04 of profit => 0.312*(1+s) of profit
  const tFactor = 0.312 * (1 + s);
  const r = 1 - tFactor; // fraction of (sale - cost) kept
  const k = r - d;
  if (k <= 0) return null;
  return (t + u * b * r) / (u * k);
};

const solveUnitsToSellForTargetNetProfit = ({
  buyPricePerUnit,
  sellPricePerUnit,
  targetNetProfit,
  feeRate,
  gstEnabled,
  tdsRate,
  surchargeRate
}) => {
  const b = buyPricePerUnit;
  const p = sellPricePerUnit;
  const t = targetNetProfit;
  const g = gstEnabled ? 0.18 : 0;
  const tds = Number.isFinite(tdsRate) && tdsRate >= 0 ? tdsRate : 0.01;
  const s = Number.isFinite(surchargeRate) && surchargeRate >= 0 ? surchargeRate : 0;
  if (!(b > 0) || !(p > 0) || !Number.isFinite(t)) return null;

  const d = tds + feeRate * (1 + g);

  // Decide region based on whether profit exists (p > b).
  if (p <= b) {
    const k2 = 1 - d;
    const denom = p * k2 - b;
    if (!Number.isFinite(denom) || denom === 0) return null;
    return t / denom;
  }

  const tFactor = 0.312 * (1 + s);
  const r = 1 - tFactor;
  const k = r - d;
  const denom = p * k - b * r;
  if (!Number.isFinite(denom) || denom === 0) return null;
  return t / denom;
};

const solveSellPriceForTargetNetProceeds = ({
  unitsToSell,
  buyPricePerUnit,
  targetNetProceeds,
  feeRate,
  gstEnabled,
  tdsRate,
  surchargeRate
}) => {
  const u = unitsToSell;
  const b = buyPricePerUnit;
  const target = targetNetProceeds;
  const g = gstEnabled ? 0.18 : 0;
  const tds = Number.isFinite(tdsRate) && tdsRate >= 0 ? tdsRate : 0.01;
  const s = Number.isFinite(surchargeRate) && surchargeRate >= 0 ? surchargeRate : 0;
  if (!(u > 0) || !(b > 0) || !Number.isFinite(target) || target < 0) return null;

  const d = tds + feeRate * (1 + g);

  // Loss/no-tax region: proceeds = sale*(1 - d)
  const k2 = 1 - d;
  if (k2 <= 0) return null;
  const p2 = target / (u * k2);
  if (p2 <= b) return p2;

  // Profit region:
  // proceeds = sale*(1-d) - 0.312*(1+s)*(sale-cost)
  const tFactor = 0.312 * (1 + s);
  const k = 1 - d - tFactor;
  if (k <= 0) return null;
  return target / (u * k) - (b * tFactor) / k;
};

const fillAmountForTargetUnits = () => {
  const unitsRaw = targetUnitsInput?.value?.trim() ?? "";
  const units = parseFloat(unitsRaw);
  if (!unitsRaw || !Number.isFinite(units) || units <= 0) {
    showToast("Enter a valid target units value.", "error");
    return;
  }
  if (currentPrice <= 0) {
    showToast("Live price unavailable. Please fetch live price.", "error");
    return;
  }

  const feeRate = getFeeRate();
  if (feeRate === null) {
    showToast("Enter a valid exchange fee % first.", "error");
    return;
  }

  const g = gstToggle.checked ? 0.18 : 0;
  const denom = 1 - feeRate * (1 + g);
  if (!(denom > 0)) {
    showToast("Fee/GST too high to compute amount.", "error");
    return;
  }

  const netNeeded = units * currentPrice;
  const amount = netNeeded / denom;
  investAmountInput.value = amount.toFixed(2);
  calculateBuy();
  showToast("Investment amount filled from target units.", "success");
};

const fetchLivePrice = async (coinId, { allowCache = true } = {}) => {
  const source = getSelectedPriceSource();
  const now = Date.now();
  const safeCoinId = coinId || buyCoinSelect.value;

  const symbol = COINS[safeCoinId]?.symbol || buyCoinSelect.selectedOptions[0]?.dataset?.symbol;
  currentSymbol = symbol || safeCoinId.slice(0, 6).toUpperCase();
  liveSymbolEl.textContent = `${currentSymbol} / INR`;

  if (source === "manual") {
    const manual = parseFloat(manualPriceInrInput?.value ?? "0");
    if (!Number.isFinite(manual) || manual <= 0) {
      livePriceEl.textContent = "Set manual";
      priceMessageEl.textContent = "Manual mode: enter a price and press Set.";
      currentPrice = 0;
      currentPriceUSD = 0;
      setLastUpdated(0);
      return;
    }
    currentPriceUSD = 0;
    currentPrice = manual;
    livePriceEl.textContent = formatINR(currentPrice);
    priceMessageEl.textContent = "Manual price applied.";
    setLastUpdated(Date.now(), "manual");
    return;
  }

  if (source === "binance") {
    const binanceSymbol = `${currentSymbol}USDT`;
    const cacheKey = `binance:${binanceSymbol}`;
    const cache = getPriceCache();
    const cached = cache?.[cacheKey];

    if (allowCache && cached?.fetchedAt && now - cached.fetchedAt < PRICE_CACHE_TTL_MS && cached?.usd) {
      currentPriceUSD = cached.usd;
      updateDisplayedPrice(undefined);
      priceMessageEl.textContent = "Using cached Binance price (recent).";
      setLastUpdated(cached.fetchedAt, "cached");
      return;
    }

    try {
      livePriceEl.textContent = "Fetching...";
      priceMessageEl.textContent = "Fetching from Binance...";
      const url = `https://api.binance.com/api/v3/ticker/price?symbol=${encodeURIComponent(binanceSymbol)}`;
      const res = await fetch(url, { headers: { accept: "application/json" } });
      if (res.status === 429) {
        rateLimitUntil = Date.now() + 60_000;
        priceMessageEl.textContent = "Rate limited by Binance. Using cached price if available.";
        showToast("Binance rate limit. Retrying later.", "error");
        if (cached?.usd) {
          currentPriceUSD = cached.usd;
          updateDisplayedPrice(undefined);
          setLastUpdated(cached.fetchedAt, "cached");
        } else {
          livePriceEl.textContent = "Temporarily limited";
        }
        return;
      }
      if (!res.ok) throw new Error("Binance API error");
      const data = await res.json();
      const usdtPrice = parseFloat(data?.price);
      if (!Number.isFinite(usdtPrice) || usdtPrice <= 0) throw new Error("Binance price unavailable");

      currentPriceUSD = usdtPrice;
      updateDisplayedPrice(undefined);
      setPriceCache(cacheKey, { usd: usdtPrice, fetchedAt: now });
      setLastUpdated(now, "binance");
      priceMessageEl.textContent = "Price updated from Binance (USDT).";
      return;
    } catch {
      priceMessageEl.textContent = "Binance unavailable for this coin. Try CoinGecko.";
      showToast("Binance fetch failed. Switch source to CoinGecko.", "error");
      const fallback = getPriceCache()?.[cacheKey];
      if (fallback?.usd) {
        currentPriceUSD = fallback.usd;
        updateDisplayedPrice(undefined);
        setLastUpdated(fallback.fetchedAt, "cached");
      }
      return;
    }
  }

  if (now < rateLimitUntil) {
    const seconds = Math.ceil((rateLimitUntil - now) / 1000);
    priceMessageEl.textContent = `Rate limited by CoinGecko. Try again in ${seconds}s.`;

    const cached = getPriceCache()?.[safeCoinId];
    if (cached?.inr && cached?.usd) {
      currentPriceUSD = cached.usd;
      updateDisplayedPrice(cached.inr);
      setLastUpdated(cached.fetchedAt, "cached");
    }
    return;
  }

  if (allowCache) {
    const cached = getPriceCache()?.[`coingecko:${safeCoinId}`];
    if (cached?.fetchedAt && now - cached.fetchedAt < PRICE_CACHE_TTL_MS && cached?.inr && cached?.usd) {
      currentPriceUSD = cached.usd;
      updateDisplayedPrice(cached.inr);
      priceMessageEl.textContent = "Using cached price (recent).";
      setLastUpdated(cached.fetchedAt, "cached");
      return;
    }
  }

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${safeCoinId}&vs_currencies=inr,usd`;
  try {
    livePriceEl.textContent = "Fetching...";
    priceMessageEl.textContent = "Fetching latest price...";
    const response = await fetch(url, { headers: { accept: "application/json" } });

    if (response.status === 429) {
      rateLimitUntil = Date.now() + 60_000;
      priceMessageEl.textContent = "Rate limit hit. Using cached price if available. Try again in ~60s.";
      showToast("CoinGecko rate limit. Retrying in 60s.", "error");
      const cached = getPriceCache()?.[`coingecko:${safeCoinId}`];
      if (cached?.inr && cached?.usd) {
        currentPriceUSD = cached.usd;
        updateDisplayedPrice(cached.inr);
        setLastUpdated(cached.fetchedAt, "cached");
      } else {
        livePriceEl.textContent = "Temporarily limited";
      }
      return;
    }

    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    const priceInr = data?.[safeCoinId]?.inr;
    const priceUsd = data?.[safeCoinId]?.usd;
    if (!Number.isFinite(priceInr) || !Number.isFinite(priceUsd) || priceInr <= 0 || priceUsd <= 0) {
      throw new Error("Price unavailable");
    }

    currentPriceUSD = priceUsd;
    updateDisplayedPrice(priceInr);

    setPriceCache(`coingecko:${safeCoinId}`, { inr: priceInr, usd: priceUsd, fetchedAt: now });
    setLastUpdated(now);
    priceMessageEl.textContent = "Price updated from CoinGecko.";
  } catch {
    livePriceEl.textContent = "Unable to fetch";
    liveSymbolEl.textContent = "CoinGecko error";
    priceMessageEl.textContent = "CoinGecko is unavailable. Using cached price if available.";

    const cached = getPriceCache()?.[`coingecko:${safeCoinId}`];
    if (cached?.inr && cached?.usd) {
      currentPriceUSD = cached.usd;
      updateDisplayedPrice(cached.inr);
      setLastUpdated(cached.fetchedAt, "cached");
    } else {
      currentPrice = 0;
      currentPriceUSD = 0;
      setLastUpdated(0);
    }
  }
};

const updateDisplayedPrice = (baseInrPrice) => {
  if (p2pToggle.checked && currentPriceUSD > 0) {
    const parsedUsdtRate = parseFloat(usdtRateInput.value);
    const fallbackRate = parseFloat(usdInrRateInput?.value) || fxUsdToInr;
    const usdtRate = Number.isFinite(parsedUsdtRate) && parsedUsdtRate > 0 ? parsedUsdtRate : fallbackRate;
    currentPrice = currentPriceUSD * usdtRate;
    livePriceEl.textContent = formatINR(currentPrice);
    priceMessageEl.textContent = `P2P price @ ₹${usdtRate.toFixed(2)}/USDT`;
  } else {
    const fallbackRate = parseFloat(usdInrRateInput?.value) || fxUsdToInr;
    currentPrice = baseInrPrice || (currentPriceUSD * fallbackRate);
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
  if (effectiveBuyPriceEl) effectiveBuyPriceEl.textContent = "—";
  if (feePerUnitEl) feePerUnitEl.textContent = "—";
};

const resetSellOutput = () => {
  costBasisEl.textContent = "—";
  saleValueEl.textContent = "—";
  grossProfitEl.textContent = "—";
  taxDeductedEl.textContent = "—";
  cessDeductedEl.textContent = "—";
  tdsDeductedEl.textContent = "—";
  if (surchargeDeductedEl) surchargeDeductedEl.textContent = "—";
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
  surcharge: "#fb7185",
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

  const effectivePrice = units > 0 ? amount / units : 0;
  const feePerUnit = units > 0 ? (fee + gst) / units : 0;

  buyFeeEl.textContent = formatINR(fee);
  buyGstEl.textContent = formatINR(gst);
  buyNetEl.textContent = formatINR(netInvestment);
  buyUnitsEl.textContent = `${formatUnits(units)} ${currentSymbol}`;
  if (effectiveBuyPriceEl) effectiveBuyPriceEl.textContent = formatINR(effectivePrice);
  if (feePerUnitEl) feePerUnitEl.textContent = formatINR(feePerUnit);
  setMessage(buyMessageEl, "");
};

const resetBuyForm = () => {
  investAmountInput.value = "";
  coinSearchInput.value = "";
  coinResultsEl.innerHTML = "";
  coinSearchMessageEl.textContent = "";
  resetBuyOutput();
  setMessage(buyMessageEl, "");
  showToast("Buy mode cleared.", "success");
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
  const surchargeRate = getSurchargeRate();
  const baseTax = grossProfit > 0 ? grossProfit * 0.3 : 0;
  const surcharge = baseTax * surchargeRate;
  const cess = (baseTax + surcharge) * 0.04;

  const tdsInfo = getTdsInfo();
  const tds = saleValue * (tdsInfo.rate || 0);
  const fee = saleValue * (feePercent / 100);
  const gst = gstToggle.checked ? fee * 0.18 : 0;
  const netProfit = grossProfit - baseTax - surcharge - cess - tds - fee - gst;

  costBasisEl.textContent = formatINR(costBasis);
  saleValueEl.textContent = formatINR(saleValue);
  grossProfitEl.textContent = formatINR(grossProfit);
  taxDeductedEl.textContent = formatINR(baseTax);
  if (surchargeDeductedEl) surchargeDeductedEl.textContent = formatINR(surcharge);
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
    { label: "Tax (30%)", value: baseTax, color: CHART_COLORS.tax },
    { label: "Surcharge", value: surcharge, color: CHART_COLORS.surcharge },
    { label: "Cess (4%)", value: cess, color: CHART_COLORS.cess },
    { label: "TDS", value: tds, color: CHART_COLORS.tds },
    { label: "Exchange Fee", value: fee, color: CHART_COLORS.fee },
    { label: "GST", value: gst, color: CHART_COLORS.gst }
  ];
  if (netProfit < 0) {
    chartSegments[0] = { label: "Loss", value: Math.abs(netProfit), color: CHART_COLORS.loss };
  }
  renderBreakdownChart(chartSegments, saleValue);

  if (grossProfit < 0) {
    lossMessageEl.textContent = tdsInfo.rate > 0
      ? "This is a capital loss. No tax applies on losses, but TDS/fees can still apply and the net figure may remain negative."
      : "This is a capital loss. No tax applies on losses; only fees may apply.";
  } else if (grossProfit === 0) {
    lossMessageEl.textContent = tdsInfo.rate > 0
      ? "No profit or loss recorded. Only TDS/fees may apply on the selling value."
      : "No profit or loss recorded. Only fees may apply.";
  } else {
    lossMessageEl.textContent = "";
  }
};

const resetSellForm = () => {
  unitsBoughtInput.value = "";
  buyPricePerUnitInput.value = "";
  unitsToSellInput.value = "";
  sellPricePerUnitInput.value = "";
  resetSellOutput();
  setMessage(sellMessageEl, "");
  showToast("Sell mode cleared.", "success");
};

const copyToClipboard = async (text) => {
  if (!text) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallthrough
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
};

const buildBuyCopyText = () => {
  const lines = [];
  lines.push("Crypto Calc — Buy Mode");
  lines.push(`Coin: ${currentSymbol}`);
  lines.push(`Invest Amount: ${investAmountInput.value || ""}`);
  lines.push(`Exchange: ${exchangeSelect.selectedOptions[0]?.textContent || exchangeSelect.value}`);
  lines.push(`Fee %: ${feePercentInput.value || ""}`);
  lines.push(`GST on fee: ${gstToggle.checked ? "Yes" : "No"}`);
  lines.push(`P2P: ${p2pToggle.checked ? "Yes" : "No"}`);
  if (p2pToggle.checked) lines.push(`USDT Rate: ${usdtRateInput.value || ""}`);
  lines.push(`Live Price: ${livePriceEl.textContent}`);
  lines.push("");
  lines.push(`Exchange Fee: ${buyFeeEl.textContent}`);
  lines.push(`GST: ${buyGstEl.textContent}`);
  lines.push(`Net Invested: ${buyNetEl.textContent}`);
  lines.push(`Units Received: ${buyUnitsEl.textContent}`);
  return lines.join("\n");
};

const buildSellCopyText = () => {
  const lines = [];
  lines.push("Crypto Calc — Sell Mode");
  lines.push(`Units Bought: ${unitsBoughtInput.value || ""}`);
  lines.push(`Buy Price/Unit: ${buyPricePerUnitInput.value || ""}`);
  lines.push(`Units To Sell: ${unitsToSellInput.value || ""}`);
  lines.push(`Sell Price/Unit: ${sellPricePerUnitInput.value || ""}`);
  lines.push(`Fee %: ${feePercentInput.value || ""}`);
  lines.push(`GST on fee: ${gstToggle.checked ? "Yes" : "No"}`);
  if (surchargeRateSelect) lines.push(`Surcharge: ${(parseFloat(surchargeRateSelect.value) * 100).toFixed(0)}%`);
  if (tdsModeSelect) {
    lines.push(`TDS mode: ${tdsModeSelect.value}`);
    if (tdsModeSelect.value === "threshold") {
      lines.push(`TDS category: ${tdsCategorySelect?.value || ""}`);
      lines.push(`Annual consideration: ${annualConsiderationInput?.value || ""}`);
    }
  }
  lines.push("");
  lines.push(`Cost Basis: ${costBasisEl.textContent}`);
  lines.push(`Sale Value: ${saleValueEl.textContent}`);
  lines.push(`Gross Profit: ${grossProfitEl.textContent}`);
  lines.push(`Tax: ${taxDeductedEl.textContent}`);
  if (surchargeDeductedEl) lines.push(`Surcharge: ${surchargeDeductedEl.textContent}`);
  lines.push(`Cess: ${cessDeductedEl.textContent}`);
  lines.push(`TDS: ${tdsDeductedEl.textContent}`);
  lines.push(`Exchange Fee: ${sellFeeEl.textContent}`);
  lines.push(`GST: ${sellGstEl.textContent}`);
  lines.push(`Net Profit: ${netProfitEl.textContent}`);
  lines.push(`ROI: ${roiPercentEl.textContent}`);
  return lines.join("\n");
};

const activateTab = (tabId) => {
  const buttons = Array.from(document.querySelectorAll(".tab-btn"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));

  buttons.forEach((btn) => {
    const isActive = btn.dataset.tab === tabId;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
    btn.setAttribute("tabindex", isActive ? "0" : "-1");
  });

  panels.forEach((panel) => {
    const isActive = panel.id === tabId;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });

  savePrefs({ activeTab: tabId });
};

const setupTabs = () => {
  const buttons = Array.from(document.querySelectorAll(".tab-btn"));
  if (!buttons.length) return;

  buttons.forEach((btn, idx) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
    btn.addEventListener("keydown", (e) => {
      const key = e.key;
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;
      e.preventDefault();
      let nextIdx = idx;
      if (key === "ArrowLeft") nextIdx = (idx - 1 + buttons.length) % buttons.length;
      if (key === "ArrowRight") nextIdx = (idx + 1) % buttons.length;
      if (key === "Home") nextIdx = 0;
      if (key === "End") nextIdx = buttons.length - 1;
      const nextBtn = buttons[nextIdx];
      nextBtn.focus();
      activateTab(nextBtn.dataset.tab);
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
  savePrefs({ coinId });
  fetchLivePrice(coinId);
});

priceSourceSelect?.addEventListener("change", () => {
  const src = getSelectedPriceSource();
  savePrefs({ priceSource: src });
  syncPriceSourceUI();
  fetchLivePrice(buyCoinSelect.value, { allowCache: false });
});

manualPriceInrInput?.addEventListener("input", () => {
  const v = parseFloat(manualPriceInrInput.value);
  if (Number.isFinite(v) && v > 0) savePrefs({ manualPriceInr: v });
});

applyManualPriceBtn?.addEventListener("click", () => {
  const v = parseFloat(manualPriceInrInput?.value ?? "0");
  if (!Number.isFinite(v) || v <= 0) {
    showToast("Enter a valid manual INR price.", "error");
    return;
  }
  savePrefs({ manualPriceInr: v });
  fetchLivePrice(buyCoinSelect.value, { allowCache: false });
  showToast("Manual price applied.", "success");
});

searchCoinsBtn.addEventListener("click", searchCoins);
coinSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchCoins();
  }
});

p2pToggle.addEventListener("change", () => {
  usdtRateField.hidden = !p2pToggle.checked;
  savePrefs({ p2pEnabled: p2pToggle.checked });
  updateDisplayedPrice();
});

usdtRateInput.addEventListener("input", () => {
  const val = parseFloat(usdtRateInput.value);
  if (Number.isFinite(val) && val > 0) {
    savePrefs({ usdtRate: val });
  }
  updateDisplayedPrice();
});

usdInrRateInput.addEventListener("input", () => {
  const val = parseFloat(usdInrRateInput.value);
  if (Number.isFinite(val) && val > 0) {
    fxUsdToInr = val;
    savePrefs({ usdInrRate: val });
    updateDisplayedPrice();
  }
});

fetchFxBtn.addEventListener("click", () => {
  fetchUsdInrRate({ silent: false });
});

exchangeSelect.addEventListener("change", () => {
  savePrefs({ exchangeId: exchangeSelect.value });
  loadFeeForExchange();
});

feePercentInput.addEventListener("input", () => {
  const val = parseFloat(feePercentInput.value);
  if (Number.isFinite(val) && val >= 0) {
    savePrefs({ feePercent: val });
  }
});

gstToggle.addEventListener("change", () => {
  savePrefs({ gstEnabled: gstToggle.checked });
});

surchargeRateSelect?.addEventListener("change", () => {
  savePrefs({ surchargeRate: parseFloat(surchargeRateSelect.value) || 0 });
  if (sellPricePerUnitInput.value && buyPricePerUnitInput.value && unitsToSellInput.value && unitsBoughtInput.value) calculateSell();
});

tdsModeSelect?.addEventListener("change", () => {
  const v = tdsModeSelect.value === "threshold" ? "threshold" : "always";
  savePrefs({ tdsMode: v });
  syncTdsUI();
  if (sellPricePerUnitInput.value && buyPricePerUnitInput.value && unitsToSellInput.value && unitsBoughtInput.value) calculateSell();
});

tdsCategorySelect?.addEventListener("change", () => {
  savePrefs({ tdsCategory: tdsCategorySelect.value === "other" ? "other" : "individual_huf" });
  if (sellPricePerUnitInput.value && buyPricePerUnitInput.value && unitsToSellInput.value && unitsBoughtInput.value) calculateSell();
});

annualConsiderationInput?.addEventListener("input", () => {
  const v = parseFloat(annualConsiderationInput.value);
  if (Number.isFinite(v) && v >= 0) savePrefs({ annualConsideration: v });
  if (sellPricePerUnitInput.value && buyPricePerUnitInput.value && unitsToSellInput.value && unitsBoughtInput.value) calculateSell();
});

saveFeeBtn.addEventListener("click", () => {
  const exchangeId = exchangeSelect.value;
  const feeVal = parseFloat(feePercentInput.value);
  if (Number.isFinite(feeVal) && feeVal >= 0) {
    saveExchangeFee(exchangeId, feeVal);
    const label = exchangeSelect.selectedOptions[0]?.textContent || exchangeId;
    showToast(`Saved fee ${feeVal}% for ${label}.`, "success");
  } else {
    showToast("Enter a valid fee percentage to save.", "error");
  }
});

retryPriceBtn.addEventListener("click", () => {
  fetchLivePrice(buyCoinSelect.value, { allowCache: false });
});

calculateBuyBtn.addEventListener("click", calculateBuy);
calculateSellBtn.addEventListener("click", calculateSell);

fillInvestForUnitsBtn?.addEventListener("click", fillAmountForTargetUnits);

useLiveBuyPriceBtn?.addEventListener("click", () => {
  if (currentPrice <= 0) {
    showToast("Live price unavailable.", "error");
    return;
  }
  buyPricePerUnitInput.value = currentPrice.toFixed(2);
  showToast("Buy price filled from live price.", "success");
});

useLiveSellPriceBtn?.addEventListener("click", () => {
  if (currentPrice <= 0) {
    showToast("Live price unavailable.", "error");
    return;
  }
  sellPricePerUnitInput.value = currentPrice.toFixed(2);
  showToast("Sell price filled from live price.", "success");
});

calcBreakEvenBtn?.addEventListener("click", () => {
  const unitsToSell = parseFloat(unitsToSellInput.value);
  const buyPricePerUnit = parseFloat(buyPricePerUnitInput.value);
  const targetNetProfit = parseFloat(targetNetProfitInput.value);
  const feeRate = getFeeRate();
  const tdsInfo = getTdsInfo();
  const surchargeRate = getSurchargeRate();

  if (!(unitsToSell > 0) || !(buyPricePerUnit > 0) || !Number.isFinite(targetNetProfit)) {
    showToast("Fill Units to Sell, Buy Price, and Target Net Profit.", "error");
    return;
  }
  if (feeRate === null) {
    showToast("Enter a valid exchange fee % first.", "error");
    return;
  }

  const sellPrice = solveSellPriceForTargetNetProfit({
    unitsToSell,
    buyPricePerUnit,
    targetNetProfit,
    feeRate,
    gstEnabled: gstToggle.checked,
    tdsRate: tdsInfo.rate,
    surchargeRate
  });

  if (!Number.isFinite(sellPrice) || sellPrice <= 0) {
    showToast("Could not compute required sell price.", "error");
    return;
  }

  sellPricePerUnitInput.value = sellPrice.toFixed(2);
  calculateSell();
  showToast("Required sell price calculated.", "success");
});

calcUnitsToSellBtn?.addEventListener("click", () => {
  const unitsBought = parseFloat(unitsBoughtInput.value);
  const buyPricePerUnit = parseFloat(buyPricePerUnitInput.value);
  const sellPricePerUnit = parseFloat(sellPricePerUnitInput.value);
  const targetNetProfit = parseFloat(targetNetAfterTaxInput.value);
  const feeRate = getFeeRate();
  const tdsInfo = getTdsInfo();
  const surchargeRate = getSurchargeRate();

  if (!(unitsBought > 0) || !(buyPricePerUnit > 0) || !(sellPricePerUnit > 0) || !Number.isFinite(targetNetProfit)) {
    showToast("Fill Units Bought, Buy Price, Sell Price, and Target Net After Tax.", "error");
    return;
  }
  if (feeRate === null) {
    showToast("Enter a valid exchange fee % first.", "error");
    return;
  }

  const unitsNeeded = solveUnitsToSellForTargetNetProfit({
    buyPricePerUnit,
    sellPricePerUnit,
    targetNetProfit,
    feeRate,
    gstEnabled: gstToggle.checked,
    tdsRate: tdsInfo.rate,
    surchargeRate
  });

  if (!Number.isFinite(unitsNeeded) || unitsNeeded <= 0) {
    showToast("Target not reachable with given prices/fees.", "error");
    return;
  }

  if (unitsNeeded > unitsBought) {
    unitsToSellInput.value = unitsBought.toString();
    calculateSell();
    showToast("Not enough units to reach that target.", "error");
    return;
  }

  unitsToSellInput.value = unitsNeeded.toFixed(8);
  calculateSell();
  showToast("Units to sell calculated.", "success");
});

calcSellPriceForProceedsBtn?.addEventListener("click", () => {
  const unitsToSell = parseFloat(unitsToSellInput.value);
  const buyPricePerUnit = parseFloat(buyPricePerUnitInput.value);
  const targetNetProceeds = parseFloat(targetNetProceedsInput.value);
  const feeRate = getFeeRate();
  const tdsInfo = getTdsInfo();
  const surchargeRate = getSurchargeRate();

  if (!(unitsToSell > 0) || !(buyPricePerUnit > 0) || !Number.isFinite(targetNetProceeds) || targetNetProceeds < 0) {
    showToast("Fill Units to Sell, Buy Price, and Target Net Proceeds.", "error");
    return;
  }
  if (feeRate === null) {
    showToast("Enter a valid exchange fee % first.", "error");
    return;
  }

  const sellPrice = solveSellPriceForTargetNetProceeds({
    unitsToSell,
    buyPricePerUnit,
    targetNetProceeds,
    feeRate,
    gstEnabled: gstToggle.checked,
    tdsRate: tdsInfo.rate,
    surchargeRate
  });

  if (!Number.isFinite(sellPrice) || sellPrice <= 0) {
    showToast("Could not compute required sell price.", "error");
    return;
  }

  sellPricePerUnitInput.value = sellPrice.toFixed(2);
  calculateSell();
  showToast("Required sell price calculated.", "success");
});

resetBuyBtn.addEventListener("click", resetBuyForm);
resetSellBtn.addEventListener("click", resetSellForm);

copyBuyBtn.addEventListener("click", async () => {
  const ok = await copyToClipboard(buildBuyCopyText());
  showToast(ok ? "Buy results copied." : "Copy failed. Your browser blocked clipboard.", ok ? "success" : "error");
});

copySellBtn.addEventListener("click", async () => {
  const ok = await copyToClipboard(buildSellCopyText());
  showToast(ok ? "Sell results copied." : "Copy failed. Your browser blocked clipboard.", ok ? "success" : "error");
});

themeToggleBtn.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  savePrefs({ theme: next });
  showToast(`Theme: ${next}`, "success");
});

portfolioMethodSelect?.addEventListener("change", () => {
  const p = loadPortfolio();
  p.method = portfolioMethodSelect.value === "avg" ? "avg" : "fifo";
  savePortfolio(p);
  renderPortfolio();
  showToast("Portfolio method updated.", "success");
});

addTxBtn?.addEventListener("click", addPortfolioTx);

clearPortfolioBtn?.addEventListener("click", () => {
  const ok = window.confirm("Clear all portfolio transactions?");
  if (!ok) return;
  savePortfolio({ method: loadPortfolio().method, transactions: [] });
  renderPortfolio();
  showToast("Portfolio cleared.", "success");
});

exportTxCsvBtn?.addEventListener("click", exportPortfolioTxCsv);
exportFyCsvBtn?.addEventListener("click", exportPortfolioFyCsv);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("sw.js");
    } catch {
      // ignore
    }
  });
}

setupTabs();
applyPreferences();

// Portfolio
const portfolio = loadPortfolio();
if (portfolioMethodSelect) portfolioMethodSelect.value = portfolio.method;
if (txFeePercentInput) {
  const val = parseFloat(feePercentInput.value);
  if (Number.isFinite(val) && val >= 0) txFeePercentInput.value = String(val);
}
if (txGstEnabledInput) txGstEnabledInput.checked = gstToggle.checked;
if (txDateInput) {
  const today = new Date();
  txDateInput.value = today.toISOString().slice(0, 10);
}
renderPortfolio();
fetchUsdInrRate({ silent: true });
fetchLivePrice(buyCoinSelect.value);

// Auto-refresh live price (skips while hidden; respects CoinGecko rate limit).
window.setInterval(() => {
  if (document.hidden) return;
  fetchLivePrice(buyCoinSelect.value);
}, AUTO_REFRESH_MS);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    const now = Date.now();
    if (!lastPriceUpdatedAt || now - lastPriceUpdatedAt > AUTO_REFRESH_MS) {
      fetchLivePrice(buyCoinSelect.value);
    }
  }
});
