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

## Tech Stack
- HTML, CSS, JavaScript
- Fetch API (CoinGecko)

## How to Run
1. Open index.html in your browser.
2. Choose a mode and enter values.

## Usage Tips
- Exchange fee presets: pick an exchange, enter a fee %, click **Save**. Switching exchanges loads the saved fee.
- P2P / USDT premium: enable the toggle and enter your actual USDT rate (₹/USDT). Live price updates accordingly.
- Add any coin: search by name/symbol, then click **Add**.

## Notes
- CoinGecko free API has rate limits.
- This is a simplified calculator intended for learning and rough estimates; tax rules can change.
