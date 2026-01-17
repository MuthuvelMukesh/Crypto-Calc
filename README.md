# Indian Crypto Tax & Investment Planner

A lightweight single-page web app for planning crypto investments and calculating taxes under Indian rules. Built with vanilla HTML, CSS, and JavaScript, and powered by live prices from CoinGecko.

## Features
- Buy Mode: investment planner with fee + GST breakdown and net units.
- Sell Mode: tax calculator with 30% VDA tax and 1% TDS.
- Live INR price display for BTC, ETH, SOL, and MATIC.
- Responsive, fintech-style UI.

## Tech Stack
- HTML, CSS, JavaScript
- Fetch API (CoinGecko)

## How to Run
1. Open index.html in your browser.
2. Choose a mode and enter values.

## Notes
- CoinGecko free API has rate limits.
- Tax rules used: 30% on profit (if positive) + 1% TDS on selling price.
