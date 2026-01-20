# 🪙 Indian Crypto Tax & Investment Planner

A lightweight, single-page web application designed for planning cryptocurrency investments and calculating taxes under Indian tax regulations. Built with vanilla HTML, CSS, and JavaScript, powered by live cryptocurrency prices from the CoinGecko API.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://muthuvelmukesh.github.io/Crypto-Calc/)

## 🚀 Live Demo

**Visit the live application:** [https://muthuvelmukesh.github.io/Crypto-Calc/](https://muthuvelmukesh.github.io/Crypto-Calc/)

## ✨ Features

### Buy Mode (Investment Planner)
- 💰 Calculate investment breakdown with platform fees
- 📊 GST calculation (18% on platform fees)
- 💎 Net investment amount after deductions
- 🔢 Automatic unit calculation based on live prices
- 📈 Real-time price updates for accurate planning

### Sell Mode (Tax Calculator)
- 💵 Gross profit/loss calculation
- 🧾 30% VDA (Virtual Digital Asset) tax on profits
- 📉 1% TDS (Tax Deducted at Source) on selling price
- 💸 Net profit after all deductions

### General Features
- 🔴 Live INR price display for BTC, ETH, SOL, and MATIC
- 📱 Fully responsive, mobile-friendly design
- 🎨 Modern fintech-style UI with clean interface
- ⚡ Fast, lightweight, no backend required
- 🌐 Works entirely in the browser
- ✅ Input validation with helpful error messages
- 🔄 API error handling with retry functionality

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **API:** [CoinGecko API](https://www.coingecko.com/en/api) (Free tier)
- **Styling:** Custom CSS with CSS Variables
- **Icons/UI:** Modern fintech design patterns

## 🚀 Deployment

### Deploy to GitHub Pages

This app is ready to be deployed to GitHub Pages:

1. **Fork or clone this repository**
2. **Go to your repository Settings**
3. **Navigate to Pages section**
4. **Select the branch** (usually `main` or `master`)
5. **Select root folder** as the source
6. **Save and wait** for GitHub to deploy (usually 1-2 minutes)
7. **Access your app** at `https://yourusername.github.io/Crypto-Calc/`

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/MuthuvelMukesh/Crypto-Calc)

1. Click the "Deploy to Netlify" button above
2. Connect your GitHub account
3. Configure the repository
4. Click "Deploy site"

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### Other Hosting Options

Since this is a static site, you can deploy it to:
- **GitHub Pages** (recommended, free)
- **Netlify** (free tier available)
- **Vercel** (free tier available)
- **Firebase Hosting**
- **Cloudflare Pages**
- **AWS S3 + CloudFront**
- Any static web hosting service

## 💻 Local Development

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MuthuvelMukesh/Crypto-Calc.git
   cd Crypto-Calc
   ```

2. **Open in browser:**
   
   Option A - Direct open:
   ```bash
   # Simply open index.html in your browser
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

   Option B - Using Python server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then open http://localhost:8000 in your browser
   ```

   Option C - Using Node.js:
   ```bash
   npx http-server -p 8000
   
   # Then open http://localhost:8000 in your browser
   ```

3. **Start using the calculator:**
   - Select a cryptocurrency from the dropdown
   - Choose between Buy Mode or Sell Mode
   - Enter your investment or selling details
   - Click Calculate to see results

## 📖 How to Use

### Buy Mode
1. Select a cryptocurrency (BTC, ETH, SOL, or MATIC)
2. Wait for the live price to load
3. Enter your investment amount in INR
4. Click "Calculate Buy"
5. View the breakdown:
   - Platform fee (0.2%)
   - GST on fee (18%)
   - Net investment amount
   - Units you'll receive

### Sell Mode
1. Enter your buying price per unit
2. Enter your selling price per unit
3. Click "Calculate Sell"
4. View the breakdown:
   - Gross profit/loss
   - 30% tax on profit (if profitable)
   - 1% TDS on selling price
   - Net profit/loss after all deductions

## 🔌 API Information

This application uses the **CoinGecko API** for fetching live cryptocurrency prices:

- **Endpoint:** `https://api.coingecko.com/api/v3/simple/price`
- **Rate Limits:** CoinGecko free API has rate limits - please refer to their [official API documentation](https://www.coingecko.com/en/api) for current limits
- **Supported Coins:** Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Polygon (MATIC)
- **Currency:** Indian Rupee (INR)

**Note:** If you encounter rate limit errors, please wait a few moments before making another request.

## ⚠️ Input Validation & Error Handling

### Input Validation Messages
The calculator provides clear feedback when calculations cannot be performed:
- **Empty fields:** "Please enter a value"
- **Invalid inputs:** "Please enter a valid number"
- **Zero values:** "Amount must be greater than zero"
- **Negative values:** "Amount cannot be negative"

### API Error Handling
- **CoinGecko API failures:** Displays "Failed to fetch price. Please try again."
- **Retry functionality:** Use the retry button to attempt fetching prices again
- **Rate limit errors:** Clear message prompting users to wait before retrying
- **Network issues:** Proper error messages when connection fails

## 💡 Indian Tax Rules

This calculator implements the following Indian tax rules for cryptocurrencies:

- **VDA Tax:** 30% tax on profits from crypto transactions (as per Section 115BBH)
- **TDS:** 1% Tax Deducted at Source on the selling price (as per Section 194S)
- **GST on Fees:** 18% GST is applicable on platform/exchange fees

### ⚠️ Important: Crypto Losses in India

**Crypto losses cannot be offset in India under VDA rules.** According to Section 115BBH:
- Losses from cryptocurrency transactions cannot be set off against other income
- Losses cannot be carried forward to future years
- Each transaction is taxed independently
- Even if you have overall losses, profits from individual transactions are still taxable at 30%

**Disclaimer:** This calculator is for educational and planning purposes only. Tax rules may change over time. Please consult a tax professional for accurate and up-to-date tax advice.

## 📢 Important Disclaimer

**⚠️ EDUCATIONAL PURPOSE ONLY – NOT FINANCIAL ADVICE**

This tool is provided for educational and informational purposes only. It is NOT intended as:
- Financial advice
- Investment advice
- Tax advice
- Professional consultation

**Always:**
- Consult with a qualified tax professional for your specific situation
- Verify all calculations independently
- Check current tax laws and regulations
- Understand that tax rules may change

The developers assume no responsibility for any financial decisions made based on this calculator.

## 📁 Project Structure

```
Crypto-Calc/
│
├── index.html          # Main HTML file
├── style.css           # Styling and layout
├── script.js           # Application logic and API calls
└── README.md           # This file
```

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues & Limitations

- CoinGecko API rate limits may cause temporary unavailability
- Tax calculations are based on current Indian tax rules (as of 2024)
- No historical price data or portfolio tracking
- Requires internet connection for live price updates

## 🔮 Future Enhancements

- [ ] Add more cryptocurrencies
- [ ] Portfolio tracking feature
- [ ] Historical price charts
- [ ] Multiple exchange fee presets
- [ ] Export calculations to PDF
- [ ] Dark mode support
- [ ] Multi-language support

## 📄 License

This project is open source. Please check the repository for license details.

## 👨‍💻 Author

**Muthuvel Mukesh**

- GitHub: [@MuthuvelMukesh](https://github.com/MuthuvelMukesh)

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

## 📞 Contact & Support

For issues, questions, or suggestions:
- Open an issue on [GitHub Issues](https://github.com/MuthuvelMukesh/Crypto-Calc/issues)
- Contribute via Pull Requests

---

**Made with ❤️ for the Indian Crypto Community**
