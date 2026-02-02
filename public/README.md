# Indian Crypto Tax & Investment Planner

A lightweight single-page web app for planning crypto investments and calculating taxes under Indian rules. Built with vanilla HTML, CSS, and JavaScript, and powered by live prices from CoinGecko.

**🚀 [View Deployment & Monetization Guide](DEPLOYMENT.md)**

## Features
- Live pricing (CoinGecko/Binance) with clear API error messages + retry
- Buy Mode: investment planner with exchange fee + optional GST, net invested, and units received
- Sell Mode: unit-based tax calculator (sell a partial quantity) with full breakdown
- Portfolio Tracker: Multi-transaction support with FIFO/Average cost basis methods
- Exchange selector with per-exchange fee presets (save/load) + editable fee %
- GST toggle (on/off) applied to fees
- P2P / USDT premium mode: optional manual USDT rate override for more realistic India pricing
- Add any coin: search CoinGecko and add the coin to the selector
- Tax logic: 30% VDA tax on profit + 4% Health & Education Cess + Surcharge + 1% TDS on sale value
- ROI (%) display with visual breakdown charts
- Sale value breakdown visualization (stacked bar + legend)
- Loss explanation + note: "Crypto losses cannot be set off in India (VDA rule)"
- Disclaimer: "Educational purpose only – not financial advice"
- Remembers preferences: last tab, coin, toggles, USDT rate, exchange + fee, and theme
- Reset buttons per mode + Copy Results buttons
- Keyboard-friendly tabs + visible focus states
- Dark mode toggle
- PWA-ready (manifest + service worker for basic offline support)
- Auto-refreshes live price (every ~60s) and shows last updated time
- Separate USD/INR rate (manual input or fetch) to make P2P/USDT pricing more realistic
- Caches recent CoinGecko results and shows a friendly message when rate-limited
- Sell Mode helpers: "Use Live" price buttons to auto-fill buy/sell prices from the live ticker
- Break-even: calculate the sell price needed to hit a target net profit after tax + fees + TDS
- Target planners: "I want X units → fill required INR to invest" and "I want ₹X net after tax → calculate units to sell"
- CSV export for portfolio transactions and FY summary

## Tech Stack
- Pure Vanilla JavaScript (no frameworks)
- HTML5 + CSS3 with CSS Variables for theming
- Progressive Web App (PWA) with Service Worker
- LocalStorage for data persistence
- Fetch API (CoinGecko, Binance, Exchange Rate API)

## 🚀 Deployment Options

### Quick Deploy (Free Hosting)

**Option 1: Netlify (Recommended)**
```bash
# Drag and drop the folder at netlify.com/drop
# Or use CLI:
npm install -g netlify-cli
netlify deploy --prod
```

**Option 2: Vercel**
```bash
npm install -g vercel
vercel --prod
```

**Option 3: GitHub Pages**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/crypto-calc.git
git push -u origin main
# Enable Pages in repository settings
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions and more hosting options.

## 💰 Monetization

This project includes built-in monetization features:
- ✅ Google Analytics integration (track users)
- ✅ Google AdSense placeholders (display ads)
- ✅ Donation button (UPI/Crypto/PayPal support)
- ✅ Affiliate-ready structure
- ✅ Legal pages (Privacy Policy, Terms of Service)

**Setup Instructions:**
1. Replace `GA_MEASUREMENT_ID` in `index.html` with your Google Analytics ID
2. Replace `ca-pub-XXXXXXXXXXXXXXXX` with your AdSense publisher ID
3. Update donation information in `script.js` (search for "donateBtn")
4. Add affiliate links for crypto exchanges

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete monetization strategies and revenue projections.

## How to Run Locally

### Option 1: VS Code Live Server
1. Open folder in VS Code
2. Install "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"

### Option 2: Python HTTP Server
```bash
cd Crypto-Calc
python -m http.server 8000
# Visit http://localhost:8000
```

### Option 3: Node.js HTTP Server
```bash
npx http-server -p 8000
# Visit http://localhost:8000
```

## PWA Installation
For "Install App" to appear, serve the folder over HTTP/HTTPS (service workers do not run on `file://`).

## Usage Tips
- **Exchange fee presets:** Pick an exchange, enter a fee %, click **Save**. Switching exchanges loads the saved fee.
- **P2P / USDT premium:** Enable the toggle and enter your actual USDT rate (₹/USDT). Live price updates accordingly.
- **Add any coin:** Search by name/symbol, then click **Add**.
- **Portfolio tracking:** Add buy/sell transactions to track your portfolio with automatic FIFO/Average cost basis.
- **Tax optimization:** Use surcharge settings for higher income brackets, TDS threshold mode for accurate calculations.

## Tax Calculations

### VDA Tax Rules (Section 115BBH)
- 30% tax on profit from crypto sales
- 4% Health & Education Cess on the tax amount
- Surcharge based on income bracket (0%, 10%, 15%, 25%, 37%)
- 1% TDS deducted at source (for transactions above threshold)
- **No loss offset:** Crypto losses cannot be set off against other income

### Supported Scenarios
- Short-term holdings (any duration)
- Multiple transactions with FIFO or Average cost basis
- Exchange fees and GST on fees
- P2P premium pricing
- Break-even analysis
- Target-based selling

## Files Structure
```
Crypto-Calc/
├── index.html          # Main application
├── style.css           # Styling and themes
├── script.js           # Core logic
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── netlify.toml        # Netlify config
├── vercel.json         # Vercel config
├── .gitignore          # Git ignore rules
├── README.md           # This file
├── DEPLOYMENT.md       # Deployment guide
└── icons/             # App icons
```

## Legal & Compliance
- ✅ Privacy Policy included
- ✅ Terms of Service included
- ✅ Educational purpose disclaimer
- ✅ GDPR-friendly (local storage only)
- ✅ No personal data collection

## Roadmap

### Planned Features
- [ ] Advanced charts (Capital gains over time)
- [ ] Multi-year tax comparison
- [ ] ITR form pre-filling helpers
- [ ] Historical price data
- [ ] Premium tier with PDF reports
- [ ] Bulk import from exchange CSVs
- [ ] Tax loss harvesting suggestions
- [ ] Mobile app (React Native/Flutter)

## Contributing
Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support
- Email: contact@cryptocalc.com
- Issues: GitHub Issues
- Discussions: GitHub Discussions

## License
MIT License - Feel free to use this for your own projects!

## Disclaimer
⚠️ **IMPORTANT:** This calculator is for educational purposes only and does not constitute financial, tax, or legal advice. Tax laws are complex and subject to change. Always consult with a qualified Chartered Accountant (CA) or tax professional before filing your taxes or making investment decisions.

## Notes
- CoinGecko free API has rate limits (handled gracefully with caching)
- Binance API available as alternative price source
- This is a simplified calculator intended for learning and rough estimates
- Tax rules can change - verify current regulations
- Always backup your transaction data

---

**Made with ❤️ for the Indian Crypto Community**

Star ⭐ this repo if you find it useful!
