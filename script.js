const COINS = {
  bitcoin: { id: "bitcoin", symbol: "BTC" },
  ethereum: { id: "ethereum", symbol: "ETH" },
  solana: { id: "solana", symbol: "SOL" },
  "matic-network": { id: "matic-network", symbol: "MATIC" }
};

// DOM elements
const livePriceEl = document.getElementById("livePrice");
const liveSymbolEl = document.getElementById("liveSymbol");
const buyCoinSelect = document.getElementById("buyCoin");
const investAmountInput = document.getElementById("investAmount");
const buyFeeEl = document.getElementById("buyFee");
const buyGstEl = document.getElementById("buyGst");
const buyNetEl = document.getElementById("buyNet");
const buyUnitsEl = document.getElementById("buyUnits");
const calculateBuyBtn = document.getElementById("calculateBuy");
const buyErrorEl = document.getElementById("buyError");

const buyingPriceInput = document.getElementById("buyingPrice");
const sellingPriceInput = document.getElementById("sellingPrice");
const grossProfitEl = document.getElementById("grossProfit");
const taxDeductedEl = document.getElementById("taxDeducted");
const tdsDeductedEl = document.getElementById("tdsDeducted");
const netProfitEl = document.getElementById("netProfit");
const calculateSellBtn = document.getElementById("calculateSell");
const sellErrorEl = document.getElementById("sellError");

let currentPrice = 0;
let currentSymbol = "BTC";
let isLoadingPrice = false;

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

// Show error message
const showError = (element, message) => {
  element.textContent = message;
  element.style.display = 'block';
  setTimeout(() => {
    element.style.display = 'none';
  }, 5000);
};

// Validate input
const validateInput = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return `Please enter ${fieldName}`;
  }
  
  const num = parseFloat(value);
  if (isNaN(num)) {
    return `Please enter a valid number for ${fieldName}`;
  }
  
  if (num < 0) {
    return `${fieldName} cannot be negative`;
  }
  
  if (num === 0) {
    return `${fieldName} must be greater than zero`;
  }
  
  return null;
};

const fetchLivePrice = async (coinId) => {
  if (isLoadingPrice) return;
  
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=inr`;
  
  try {
    isLoadingPrice = true;
    livePriceEl.textContent = "Fetching...";
    livePriceEl.classList.add("loading");
    
    const response = await fetch(url, { 
      headers: { accept: "application/json" },
      cache: "no-cache"
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const price = data?.[coinId]?.inr;
    
    if (!price) {
      throw new Error("Price data unavailable");
    }
    
    currentPrice = price;
    currentSymbol = COINS[coinId].symbol;
    livePriceEl.textContent = formatINR(price);
    liveSymbolEl.textContent = `${currentSymbol} / INR`;
    livePriceEl.classList.remove("loading");
    
  } catch (error) {
    console.error("Error fetching price:", error);
    livePriceEl.textContent = "Failed to fetch";
    liveSymbolEl.textContent = "Please retry";
    livePriceEl.classList.remove("loading");
    
    // Show retry option
    const retryBtn = document.createElement('button');
    retryBtn.textContent = '🔄 Retry';
    retryBtn.className = 'retry-btn';
    retryBtn.style.cssText = 'margin-top: 8px; padding: 6px 12px; background: var(--primary); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;';
    retryBtn.onclick = () => {
      retryBtn.remove();
      fetchLivePrice(coinId);
    };
    
    if (!document.querySelector('.retry-btn')) {
      document.querySelector('.live-price-card').appendChild(retryBtn);
    }
  } finally {
    isLoadingPrice = false;
  }
};

const calculateBuy = () => {
  const amount = investAmountInput.value;
  
  // Validate input
  const error = validateInput(amount, 'investment amount');
  if (error) {
    showError(buyErrorEl, error);
    buyFeeEl.textContent = "—";
    buyGstEl.textContent = "—";
    buyNetEl.textContent = "—";
    buyUnitsEl.textContent = "—";
    return;
  }
  
  const amountNum = parseFloat(amount);
  
  if (currentPrice <= 0) {
    showError(buyErrorEl, 'Price not available. Please wait for price to load or retry.');
    return;
  }

  const fee = amountNum * 0.002;
  const gst = fee * 0.18;
  const netInvestment = amountNum - (fee + gst);
  const units = netInvestment / currentPrice;

  // Animate results
  buyFeeEl.textContent = formatINR(fee);
  buyGstEl.textContent = formatINR(gst);
  buyNetEl.textContent = formatINR(netInvestment);
  buyUnitsEl.textContent = `${formatUnits(units)} ${currentSymbol}`;
  
  // Add success animation
  document.getElementById('buyResult').style.animation = 'fadeInUp 0.4s ease';
};

const calculateSell = () => {
  const buying = buyingPriceInput.value;
  const selling = sellingPriceInput.value;

  // Validate inputs
  const buyError = validateInput(buying, 'buying price');
  if (buyError) {
    showError(sellErrorEl, buyError);
    resetSellResults();
    return;
  }
  
  const sellError = validateInput(selling, 'selling price');
  if (sellError) {
    showError(sellErrorEl, sellError);
    resetSellResults();
    return;
  }

  const buyingNum = parseFloat(buying);
  const sellingNum = parseFloat(selling);
  
  const grossProfit = sellingNum - buyingNum;
  const tax = grossProfit > 0 ? grossProfit * 0.3 : 0;
  const tds = sellingNum * 0.01;
  const netProfit = grossProfit - tax - tds;

  grossProfitEl.textContent = formatINR(grossProfit);
  taxDeductedEl.textContent = formatINR(tax);
  tdsDeductedEl.textContent = formatINR(tds);
  netProfitEl.textContent = formatINR(netProfit);
  
  // Show loss warning if applicable
  if (grossProfit < 0) {
    const warningMsg = document.createElement('div');
    warningMsg.className = 'error-message';
    warningMsg.style.cssText = 'background: #fff3cd; color: #856404; border-left-color: #ffc107; margin-top: 16px;';
    warningMsg.textContent = '⚠️ Note: Crypto losses cannot be offset in India under VDA rules.';
    warningMsg.setAttribute('role', 'status');
    
    const existingWarning = document.querySelector('.loss-warning');
    if (existingWarning) {
      existingWarning.remove();
    }
    
    warningMsg.classList.add('loss-warning');
    document.getElementById('sellResult').appendChild(warningMsg);
  } else {
    const existingWarning = document.querySelector('.loss-warning');
    if (existingWarning) {
      existingWarning.remove();
    }
  }
  
  // Add success animation
  document.getElementById('sellResult').style.animation = 'fadeInUp 0.4s ease';
};

const resetSellResults = () => {
  grossProfitEl.textContent = "—";
  taxDeductedEl.textContent = "—";
  tdsDeductedEl.textContent = "—";
  netProfitEl.textContent = "—";
};

const setupTabs = () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update ARIA attributes
      buttons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute('aria-selected', 'false');
      });
      panels.forEach((panel) => panel.classList.remove("active"));
      
      btn.classList.add("active");
      btn.setAttribute('aria-selected', 'true');
      
      const target = btn.dataset.tab;
      document.getElementById(target).classList.add("active");
    });
  });
};

// Add enter key support for calculations
investAmountInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    calculateBuy();
  }
});

buyingPriceInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sellingPriceInput.focus();
  }
});

sellingPriceInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    calculateSell();
  }
});

// Event listeners
buyCoinSelect.addEventListener("change", (event) => {
  const coinId = event.target.value;
  fetchLivePrice(coinId);
});

calculateBuyBtn.addEventListener("click", calculateBuy);
calculateSellBtn.addEventListener("click", calculateSell);

// Initialize
setupTabs();
fetchLivePrice(buyCoinSelect.value);
