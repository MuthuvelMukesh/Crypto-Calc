# What Can Be Implemented — Crypto-Calc

A prioritized list of features and improvements that can be added to the Indian Crypto Tax & Investment Planner.

---

## 🔴 High Priority

### 1. DCA (Dollar-Cost Averaging) Calculator
- Enter a fixed INR amount and frequency (daily / weekly / monthly)
- Calculate total units accumulated, average cost, and current P&L over a date range
- Compare DCA vs lump-sum investment outcome

### 2. Price Alerts & Push Notifications
- Set target buy/sell price for any coin
- Browser push notification (via Service Worker) when the price crosses the target
- Persistent alerts saved in `localStorage`

### 3. Advance Tax Liability Estimator
- Estimate quarterly advance tax due (15 Jun / 15 Sep / 15 Dec / 15 Mar)
- Based on realized gains in the portfolio for the current FY
- Show installment amounts and due dates with countdown

### 4. WebSocket Real-Time Prices
- Replace 60-second polling with Binance WebSocket stream
- Instant price updates without API rate-limit concerns
- Graceful fallback to REST API if WebSocket disconnects

### 5. More Coins Support
- Currently limited to BTC, ETH, SOL, MATIC
- Load top-100 coins from CoinGecko on startup (cached)
- Quick-switch coin selector with search and favorites

---

## 🟠 Medium Priority

### 6. NFT Tax Calculator
- NFTs are VDAs under Section 115BBH
- Calculate 30% tax on NFT sale profit
- Track mint cost, platform fee (OpenSea, Blur, etc.), royalty paid
- Export NFT gains in Schedule VDA format

### 7. Crypto Gift & Inheritance Tax Module
- Gifts of crypto > ₹50,000 in a year taxable under Section 56(2)(x)
- Calculate gift tax on received crypto
- Document gifted/inherited cost basis for future sale calculations

### 8. ITR-2 / ITR-3 Filing Walkthrough
- Step-by-step guidance for entering VDA details in ITR-2 / ITR-3
- Which schedule to fill (Schedule VDA), which fields map to what
- Checklist to verify before submission on the Income Tax portal

### 9. TDS Reconciliation (Form 26AS)
- Upload / paste Form 26AS TDS data (CSV or manual entry)
- Auto-match exchange TDS to Form 26AS entries
- Highlight mismatches or missing credits

### 10. GST Input Credit Tracker (for GST-registered traders)
- Track GST paid on exchange fees as potential input tax credit
- Monthly GSTR summary of crypto-related GST paid
- Export for CA review

### 11. Transaction Batch Edit & Delete
- Select multiple portfolio transactions via checkboxes
- Bulk delete, bulk update asset/fee/date
- Undo last bulk action (single-step undo via `localStorage` snapshot)

### 12. Candlestick / Price History Chart
- Show 7-day / 30-day / 1-year price chart for the selected coin
- Overlay the user's average buy price as a horizontal line
- Use CoinGecko `/market_chart` endpoint; render with Canvas API (no external lib)

---

## 🟡 Low Priority / Nice-to-Have

### 13. Multi-Currency Display
- Toggle display currency between INR, USD, EUR, GBP
- All portfolio values and tax outputs re-denominated on the fly
- FX rates cached from open.er-api.com

### 14. P&L Share Card (Image Export)
- Generate a shareable PNG card of current P&L summary (Canvas API)
- Includes coin, units, buy price, sale price, net profit, and app branding
- One-click download or share via Web Share API

### 15. Crypto Lending / Borrowing Module
- Track loans taken against crypto collateral (e.g., Nexo, Ledn)
- Calculate effective interest cost and liquidation price
- Flag taxable events if collateral is sold/liquidated

### 16. Recurring Investment (SIP) Tracker
- Log a recurring buy schedule (e.g., ₹5,000 every Monday in BTC)
- Auto-generate projected transactions for the next N weeks/months
- Show projected average cost and units at end of period

### 17. Portfolio Rebalancing Planner
- Set target allocation percentages per coin (e.g., 50% BTC, 30% ETH, 20% SOL)
- Compare to current holdings
- Show how many units to buy/sell to rebalance, with estimated tax impact

### 18. Tax Loss Harvesting Assistant (Automated Suggestions)
- Scan all holdings for unrealized losses
- Suggest which assets to sell before FY end to offset current-year gains (note: VDA losses cannot offset other income, but unrealized losses reduce overall liability)
- Show estimated tax saving per suggested action

### 19. Hindi / Regional Language Support
- UI translation toggle (English ↔ हिन्दी)
- All labels, messages, and tooltips in Hindi
- Use a lightweight JSON-based i18n approach (no external library)

### 20. Multi-Device Sync via Encrypted Cloud Backup
- Export encrypted portfolio JSON (already partially done with AES-256-GCM)
- Add one-click import from a self-hosted URL or GitHub Gist
- No central server — user controls the storage location

### 21. Tax Calendar & Reminder
- Display a calendar widget with key Indian tax due dates
- Advance tax instalments, TDS payment deadlines (7th of next month), ITR filing
- Browser notification reminders (via Service Worker)

### 22. Exchange API Expansion
- Add API import support for: Coinbase, Kraken, KuCoin, Bybit, OKX
- Standardize trade import into a universal internal format
- Detect and deduplicate trades when re-importing

### 23. Audit Trail / IT Scrutiny Report
- Generate a complete transaction-level audit trail PDF/CSV
- Includes timestamps, data sources (manual / exchange / API), and computed values
- Signed with SHA-256 hash for integrity verification

### 24. Budget / Tax Rule Update Alerts
- Hardcode a "last rule update" date and version in the app
- Show a banner when the user's browser date is past a known budget announcement date
- Link to official Income Tax India changelog

---

## 🔵 Technical / Infrastructure

### 25. Unit Tests (Vitest)
- Set up Vitest for the Vite project
- Write tests for core tax calculation functions (`computeTax`, `computeFIFO`, `computePortfolio`)
- Cover edge cases: zero profit, surcharge brackets, TDS thresholds, loss scenario

### 26. ESLint + Prettier CI Pipeline
- Add GitHub Actions workflow to lint and format-check on every PR
- Block merge if lint errors exist

### 27. Lighthouse / Performance Budget
- Add automated Lighthouse CI check in GitHub Actions
- Enforce Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90

### 28. Offline-First PWA Improvements
- Precache all static assets (HTML, CSS, JS, icons) in Service Worker install
- Cache CoinGecko responses with a 5-minute TTL for offline use
- Show "You are offline — using cached prices" banner when network is unavailable

### 29. Content Security Policy (CSP) Header
- Add strict CSP header in `netlify.toml` / `vercel.json`
- Prevents XSS by whitelisting only CoinGecko, Binance, open.er-api.com and self

### 30. Subresource Integrity (SRI) for External Scripts
- If any CDN scripts are added in future, include `integrity` + `crossorigin` attributes
- Automate SRI hash generation in the build process

---

## Implementation Notes

- All features should remain **client-side only** — no backend server, no user accounts on a central server.
- Maintain the **privacy-first** principle: no tracking, no analytics by default.
- New modules should follow the existing **tab-panel pattern** in `index.html` / `script.js`.
- Persist all new user settings in `localStorage` under namespaced keys (e.g., `cryptocalc_dca_*`).
- Any new API call should respect the existing **rate-limit + TTL cache** pattern in `script.js`.
