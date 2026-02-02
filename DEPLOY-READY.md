# 🚀 Deployment Guide - Crypto-Calc

**Status:** Production Ready  
**Build Date:** February 1, 2026  
**Build Size:** 42.29 kB JS (12.86 kB gzipped) + 8.26 kB CSS

---

## ✅ Pre-Deployment Checklist

- [x] All features implemented and tested
- [x] Code passes linting (ESLint)
- [x] Production build successful
- [x] No console errors
- [x] Responsive design tested
- [x] Dark mode tested
- [x] PWA manifest configured
- [x] Service Worker configured
- [x] Analytics configured (GA_MEASUREMENT_ID)

---

## 🌐 Deploy to Netlify (Recommended)

### Option 1: Direct Git Push

1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Auto-deploy on every push
4. Build command: `npm run build`
5. Publish directory: `dist`

### Option 2: Manual Deploy

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Netlify Configuration (netlify.toml)
Already configured in repo!

---

## 🚀 Deploy to Vercel

### Via CLI

```bash
npm i -g vercel
vercel --prod
```

### Via Dashboard

1. Import GitHub repository
2. Set build command: `npm run build`
3. Set output: `dist`
4. Deploy

### Vercel Configuration (vercel.json)
Already configured in repo!

---

## 🐳 Deploy with Docker

### Build Docker Image

```bash
docker build -t crypto-calc:latest .
```

### Run Locally

```bash
docker run -p 5000:5000 crypto-calc:latest
```

### Push to Registry

```bash
docker tag crypto-calc:latest your-registry/crypto-calc:latest
docker push your-registry/crypto-calc:latest
```

### Docker Compose

```bash
docker-compose up -d
```

---

## ☁️ Deploy to GitHub Pages

```bash
npm run build
git add dist
git commit -m "Production build"
git push origin main
```

Configure in Settings → Pages → Deploy from branch

---

## 🔧 Post-Deployment Setup

### 1. Google Analytics
Update `GA_MEASUREMENT_ID` in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
```

### 2. Google AdSense (Optional)
Replace in `index.html`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID"
   crossorigin="anonymous"></script>
```

### 3. Custom Domain
- Netlify/Vercel: Add custom domain in dashboard
- GitHub Pages: Update CNAME file

### 4. SSL Certificate
- Netlify: Auto-provisioned
- Vercel: Auto-provisioned
- Docker: Use nginx reverse proxy

---

## 📊 Performance Metrics

### Bundle Size (Production)
- JavaScript: 42.29 kB (12.86 kB gzipped)
- CSS: 8.26 kB (2.32 kB gzipped)
- HTML: 33.29 kB (7.02 kB gzipped)
- **Total:** ~83 kB (22 kB gzipped)

### Lighthouse Targets
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Load Time
- First Contentful Paint: ~1s
- Largest Contentful Paint: ~2s
- Cumulative Layout Shift: <0.1

---

## 🔒 Security Headers

Add these headers in deployment:

### Netlify (_headers file)
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Content-Security-Policy: default-src 'self' https:; script-src 'self' https://www.googletagmanager.com https://pagead2.googlesyndication.com
```

### Vercel (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## 📝 Environment Variables

Create `.env.local`:
```
VITE_GA_ID=YOUR_GOOGLE_ANALYTICS_ID
VITE_ADSENSE_ID=YOUR_ADSENSE_ID
VITE_API_KEY=YOUR_API_KEY
```

---

## 🧪 Post-Deployment Testing

### Functionality Tests
- [ ] Buy Mode calculations
- [ ] Sell Mode with tax
- [ ] Portfolio FIFO/Average
- [ ] FY filtering
- [ ] Schedule FA export
- [ ] Withdrawal tracking
- [ ] Compliance tab loads
- [ ] Exchange dropdown

### Cross-Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Testing
- [ ] Lighthouse score
- [ ] Bundle size check
- [ ] API response time
- [ ] Search engine indexing

### PWA Testing
- [ ] Service worker registration
- [ ] Offline mode
- [ ] Add to home screen
- [ ] Manifest.json loads

---

## 🚨 Monitoring & Maintenance

### Track
- [ ] Error logs (Sentry/LogRocket)
- [ ] Analytics (Google Analytics)
- [ ] Performance (Web Vitals)
- [ ] User feedback

### Update Regularly
- [ ] Security patches
- [ ] Tax law changes
- [ ] Exchange fees
- [ ] Browser compatibility

### Backup
- [ ] Daily database backups
- [ ] Code repository backups
- [ ] User data exports

---

## 📞 Support & Contact

- Email: contact@cryptocalc.com
- GitHub: crypto-calc
- Issues: GitHub Issues
- Discussions: GitHub Discussions

---

## 📄 Documentation Links

- [Deployment](DEPLOYMENT.md)
- [Tech Stack](TECH-STACK.md)
- [Features Added](FEATURES-ADDED.md)
- [Quick Start](QUICK-START.md)
- [README](README.md)

---

**Last Updated:** Feb 1, 2026  
**Version:** 1.0.0  
**Status:** ✅ Ready for Production
