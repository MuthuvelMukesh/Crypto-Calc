# Indian Crypto Tax & Investment Planner

A lightweight single-page web app for planning crypto investments and calculating taxes under Indian rules. Built with vanilla HTML, CSS, and JavaScript, and powered by live prices from CoinGecko.

## Features
- Live pricing (CoinGecko) with clear API error messages + retry.
- Buy Mode: investment planner with exchange fee + optional GST, net invested, and units received.
- Sell Mode: unit-based tax calculator (sell a partial quantity) with full breakdown.
- Exchange selector with per-exchange fee presets (save/load) + editable fee %.
- GST toggle (on/off) applied to fees.
- P2P / USDT premium mode: optional manual USDT rate override for more realistic India pricing.
- Add any coin: search CoinGecko and add the coin to the selector.
- Tax logic: 30% VDA tax on profit + 4% Health & Education Cess on the tax + 1% TDS on sale value.
- ROI (%) display.
- Sale value breakdown visualization (stacked bar + legend).
- Loss explanation + note: “Crypto losses cannot be offset in India (VDA rule)”.
- Disclaimer: “Educational purpose only – not financial advice”.
- Remembers preferences: last tab, coin, toggles, USDT rate, exchange + fee, and theme.
- Reset buttons per mode + Copy Results buttons.
- Keyboard-friendly tabs + visible focus states.
- Dark mode toggle.
- PWA-ready (manifest + service worker for basic offline support).
- Auto-refreshes live price (every ~60s) and shows last updated time.
- Separate USD/INR rate (manual input or fetch) to make P2P/USDT pricing more realistic.
- Caches recent CoinGecko results and shows a friendly message when rate-limited (e.g., “try again in 60s”).
- Sell Mode helpers: “Use Live” price buttons to auto-fill buy/sell prices from the live ticker.
- Break-even: calculate the sell price needed to hit a target net profit after tax + fees + TDS.
- Target planners: “I want X units → fill required INR to invest” and “I want ₹X net after tax → calculate units to sell”.

## Tech Stack
- HTML, CSS, JavaScript
- Fetch API (CoinGecko)

## How to Run
1. Open index.html in your browser.
2. Choose a mode and enter values.

### PWA install (optional)
For “Install App” to appear, serve the folder over HTTP/HTTPS (service workers do not run on `file://`).
Example: use VS Code Live Server or any simple local web server.

## Usage Tips
- Exchange fee presets: pick an exchange, enter a fee %, click **Save**. Switching exchanges loads the saved fee.
- P2P / USDT premium: enable the toggle and enter your actual USDT rate (₹/USDT). Live price updates accordingly.
- Add any coin: search by name/symbol, then click **Add**.

## Notes
- CoinGecko free API has rate limits.
- This is a simplified calculator intended for learning and rough estimates; tax rules can change.
