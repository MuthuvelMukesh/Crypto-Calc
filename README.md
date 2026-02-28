# Indian Crypto Tax & Investment Planner

A feature-rich, privacy-first single-page web app for planning crypto investments and calculating taxes under Indian tax rules. Built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no tracking, no server. Powered by live prices from CoinGecko and Binance.

> ⚠️ **Educational purpose only — not financial or tax advice.** Always consult a qualified Chartered Accountant before filing.

---

## Features

### 📊 Buy Mode — Investment Planner
- Live INR price (CoinGecko / Binance / Manual)
- Exchange fee + optional 18% GST on fee
- P2P / USDT premium mode (manual USDT rate override)
- Units received, net invested, effective price per unit, fees per unit
- **Fill Amount for Target Units** — enter how many units you want → get the INR to invest
- Add any coin via CoinGecko search

### 💸 Sell Mode — Tax Calculator
- 30% VDA tax (Section 115BBH) on gross profit
- Surcharge brackets: 0%, 10%, 15%, 25%, 37%
- 4% Health & Education Cess on (tax + surcharge)
- 1% TDS (Section 194S) — always or threshold-based (₹50k Individual/HUF, ₹10k others)
- Exchange fee + GST on fee deducted from net
- ROI (%) with sale-value breakdown bar chart
- **Break-even price** — required sell price for a target net profit
- **Units to Sell** — how many units to sell for a target net-after-tax amount
- **Required Sell Price** — compute required sell price for target net proceeds
- "Use Live" buttons to auto-fill buy/sell prices from live ticker
- Loss message: "Crypto losses cannot be set off in India (VDA rule)"

### 🗂️ Portfolio — Ledger & Analytics
- **Multi-User Profiles** — separate local portfolios (family members, strategies)
- FIFO or Average Cost basis costing methods
- Add buy/sell transactions with date, asset, units, price, fee, GST, notes
- **Crypto-to-Crypto Swap** — records as Sell + Buy with proper cost basis
- **Bulk CSV Import** — auto-detect WazirX, CoinDCX, Binance, or generic format; append or replace mode
- **Exchange API Import (Beta)** — fetch trades directly from WazirX / CoinDCX with API key/secret
- FY-wise summary table: Sell Value, Cost Basis, Gross P/L, Tax, Surcharge, Cess, TDS, Fees+GST, Net P/L
- Holdings & average cost per asset
- **Tax Loss Harvesting Planner** — unrealized P/L with live price overlay per asset
- **Advanced Analytics** — FY Net P/L bar chart, Monthly Capital Gains bar chart
- **Historical Price Lookup** — fetch any coin's INR price on any past date via CoinGecko
- **Export Transaction CSV** / **Export FY Summary CSV**
- **Export Schedule VDA (ITR)** — capital gains in CA-ready CSV format
- **Export CA Report** — full JSON + plain-text summary for your accountant
- **Export CA Report (Encrypted)** — AES-256-GCM password-protected CA report
- **CA Collaboration** — open CA JSON reports locally for review (no server upload)
- **Bank Withdrawal Tracker** — log NEFT/RTGS/IMPS withdrawals with fees; CSV export

### 🌾 Staking & Income
- Track staking, yield farming, liquidity pool, lending, airdrop, mining, interest
- FY-aggregated total (taxed as "Income from Other Sources")
- CSV export

### 📈 Derivatives
- Futures & Options PnL calculator
- Long / Short positions, leverage, contract size, funding fees
- Gross PnL, Net PnL, ROI

### 📋 Compliance & Info Guide
- Form 26QE & Section 194S (effective July 1, 2022) explained
- VDA Tax (Section 115BBH) — 30% flat, no deductions
- Cost of Acquisition rules, FIFO vs Average, common pitfalls
- 6-year record-keeping checklist
- Links to official Income Tax India resources

### ⚙️ General
- Dark / Light theme with system preference detection
- All preferences persisted in `localStorage` — last tab, coin, exchange, fee, toggles, theme
- Per-exchange fee presets with save/load
- Auto-refreshes live price every 60s (pauses when tab is hidden)
- Price & FX caching with TTL to respect API rate limits
- Graceful CoinGecko 429 rate-limit handling with cached fallback
- Manual USD/INR or fetch from open.er-api.com
- PWA installable (Service Worker + Web App Manifest)
- Keyboard-accessible tabs (Arrow / Home / End)
- ARIA labels and `role="status"` live regions throughout
- Copy Results buttons (Buy / Sell modes)
- Toast notification system

---

## Tech Stack

| Layer | Technology |
|---|---|
| Build | Vite 5 |
| Language | Vanilla JavaScript (ES2021+) |
| Markup | HTML5 |
| Styling | CSS3 + CSS Custom Properties |
| PWA | Service Worker + Web App Manifest |
| Encryption | Web Crypto API (AES-256-GCM) |
| Linting | ESLint (recommended ruleset) |
| Formatting | Prettier |
| Deployment | Netlify / Vercel / Docker |

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (hot-reload)
npm run dev
# Opens at https://localhost:5173

# Lint
npm run lint

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

### Netlify (Recommended — free tier)
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```
`netlify.toml` is already configured.

### Vercel
```bash
npm install -g vercel
vercel --prod
```
`vercel.json` is already configured.

### GitHub Pages
```bash
git init && git add . && git commit -m "Initial"
git remote add origin https://github.com/yourusername/crypto-calc.git
git push -u origin main
# Enable Pages → Branch: main → Folder: /dist
```

### Docker
```bash
docker build -t crypto-calc .
docker run -p 5000:5000 crypto-calc

# Or with Docker Compose
docker-compose up
```

---

## Monetization Setup

| Feature | Action Required |
|---|---|
| Google Analytics | Replace `GA_MEASUREMENT_ID` in `index.html` |
| Google AdSense | Replace `ca-pub-XXXXXXXXXXXXXXXX` and `data-ad-slot` in `index.html` |
| Donation button | Update UPI / wallet / Buy Me a Coffee URL in `src/script.js` (search `donateBtn`) |
| Affiliate links | Add exchange referral links in the Compliance tab or footer |

---

## Tax Rules Reference

### VDA Tax (Section 115BBH)
- **30% flat tax** on profit — no deductions allowed
- **4% Cess** on (tax + surcharge)
- **Surcharge** — 0% / 10% / 15% / 25% / 37% based on total income
- **No loss set-off** — crypto losses cannot offset any other income or carry forward
- Each transaction computed independently

### TDS (Section 194S) — effective July 1, 2022
- **1% TDS** on sale consideration
- Filed via **Form 26QE** by exchanges; credits appear in **Form 26AS / AIS**
- Threshold per FY: ₹50,000 (Individual/HUF) · ₹10,000 (Others)

### Costing Methods
- **FIFO** — First-in, First-out (most commonly accepted)
- **Average Cost** — Weighted average per unit

---

## Project Structure

```
Crypto-Calc/
├── src/
│   ├── script.js          # Main application (3,300+ lines — all features)
│   ├── style.css          # Styling, themes, dark mode
│   └── sw.js              # Service Worker source
├── public/                # Static assets served as-is by Vite
│   ├── manifest.json      # PWA manifest
│   ├── sw.js              # Service Worker (served at root for correct scope)
│   ├── icons/             # SVG app icons (192 x 512 x favicon)
│   ├── privacy.html       # Privacy Policy
│   ├── terms.html         # Terms of Service
│   ├── netlify.toml       # Netlify headers / redirects
│   └── vercel.json        # Vercel routing
├── index.html             # App entry point
├── privacy.html           # Privacy Policy (root copy for dev server)
├── terms.html             # Terms of Service (root copy for dev server)
├── vite.config.js         # Vite build config
├── package.json           # Dependencies & npm scripts
├── docker-compose.yml     # Docker Compose
├── Dockerfile             # Docker container
├── .eslintrc.json         # ESLint rules
├── netlify.toml           # Netlify config
├── vercel.json            # Vercel config
└── README.md              # This file
```

---

## Running Locally (Alternative Methods)

### VS Code Live Server
1. Install the **Live Server** extension
2. Right-click `index.html` → **Open with Live Server**

### Python HTTP Server
```bash
python -m http.server 8000
# Visit http://localhost:8000
```
> Service worker requires HTTPS or `localhost`. Use `npm run dev` for full PWA support.

---

## Usage Tips

- **Exchange fee:** Select exchange → enter fee % → **Save**. Switching exchanges auto-loads the saved fee.
- **P2P mode:** Enable toggle → enter your actual ₹/USDT rate. Live INR price recalculates instantly.
- **Add any coin:** Type in the search box → **Search** → **Add** to the selector.
- **Historical prices:** Portfolio tab → Historical Price Lookup → enter CoinGecko coin ID + date → **Fetch Price**.
- **Multi-profile:** Create separate profiles for family members or strategies — all data is profile-scoped.
- **CSV import:** Use WazirX / CoinDCX export CSV directly; format is auto-detected.
- **CA report:** Export encrypted JSON for your CA — they decrypt with the password you set.
- **Offline:** Install the PWA ("Add to Home Screen") for offline access.

---

## Privacy & Legal

- ✅ All data stored in browser `localStorage` only — nothing sent to any server
- ✅ API calls only to CoinGecko, Binance, open.er-api.com (price / FX data)
- ✅ Privacy Policy included (`privacy.html`)
- ✅ Terms of Service included (`terms.html`)
- ✅ No personal data collected or transmitted
- ✅ GDPR-friendly by design

---

## Roadmap

### Completed ✅
- [x] Live price — CoinGecko / Binance / Manual
- [x] Buy Mode — investment planner with fee & GST
- [x] Sell Mode — full tax breakdown (surcharge, cess, TDS)
- [x] Portfolio tracker — FIFO / Average cost
- [x] Multi-user profiles
- [x] Crypto-to-crypto swap recording
- [x] Bulk CSV import (WazirX, CoinDCX, Binance, generic)
- [x] Exchange API import (WazirX, CoinDCX)
- [x] Tax loss harvesting planner
- [x] Historical price lookup
- [x] Schedule VDA (ITR) export
- [x] CA report export (JSON, plain-text, AES-256 encrypted)
- [x] Bank withdrawal tracker
- [x] Staking / income tracker
- [x] Derivatives (F&O) PnL calculator
- [x] Compliance & Info guide (Section 194S / Form 26QE)
- [x] Analytics charts (FY P/L, monthly capital gains)
- [x] PWA offline support
- [x] Dark mode

### Planned 🛠️
- [ ] PDF report generation
- [ ] ITR form field-mapping helper
- [ ] Multi-asset price refresh in Tax Loss Harvesting
- [ ] Binance API import
- [ ] Mobile app (React Native / Flutter)
- [ ] Optional cloud sync (premium tier)

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes (`git commit -m "feat: add something useful"`)
4. Push and open a Pull Request

Run `npm run lint` before submitting.

---

## Support

- 📧 Email: contact@cryptocalc.com
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

## License

MIT — free to use, modify, and distribute.

---

**Made with ❤️ for the Indian Crypto Community**

⭐ Star this repo if it saves you tax-filing headaches!
