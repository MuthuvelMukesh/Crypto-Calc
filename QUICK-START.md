# 🚀 Quick Reference Card

## Essential Commands

```bash
# Setup
npm install                 # Install dependencies once

# Development
npm run dev                # Start dev server (https://localhost:5173)
npm run lint               # Check code quality
npm run format             # Auto-format code

# Production
npm run build              # Build for production
npm run preview            # Preview production locally

# Deployment
netlify deploy --prod      # Deploy to Netlify
vercel --prod              # Deploy to Vercel
docker run -p 5000:5000 crypto-calc  # Run Docker container
```

---

## Project Structure

```
Crypto-Calc/
├── 📁 src/                 ← Source files
│   ├── script.js          ← App logic
│   ├── style.css          ← Styling
│   └── sw.js              ← Service Worker
├── 📁 public/              ← Static assets
│   ├── manifest.json
│   └── icons/
├── 📁 dist/                ← Build output (generated)
├── 📄 index.html           ← Entry point
├── 📄 vite.config.js       ← Build config
├── 📄 package.json         ← Dependencies
├── 🐳 Dockerfile           ← Container setup
└── ... config files
```

---

## File Locations

| What | Where |
|------|-------|
| Main app code | `src/script.js` |
| Styling | `src/style.css` |
| App icons | `public/icons/` |
| PWA manifest | `public/manifest.json` |
| Build config | `vite.config.js` |
| Deployment | `netlify.toml`, `vercel.json` |
| Code rules | `.eslintrc.json` |
| Format rules | `.prettierrc` |
| Environment vars | `.env.local` (from `.env.example`) |

---

## Keyboard Shortcuts (Dev Mode)

When running `npm run dev`:

| Key | Action |
|-----|--------|
| `r` | Restart dev server |
| `u` | Show network URL |
| `o` | Open in browser |
| `q` | Quit dev server |

---

## Development Tips

### 1. Work Directly in Source
Edit these files and changes appear instantly:
- `src/script.js` → logic changes
- `src/style.css` → style changes
- `index.html` → markup changes

### 2. Check Code Quality
```bash
npm run lint      # Find issues
npm run format    # Fix formatting
```

### 3. Build Size Check
```bash
npm run build     # Shows file sizes
```

Expected output:
```
✓ 1234 modules transformed.
dist/index.html                    51.23 kB
dist/assets/script.abc123.js      150.45 kB
dist/assets/style.def456.css       50.12 kB
```

### 4. Debug Issues
```bash
npm run build -- --debug    # Detailed build info
npm run dev -- --host       # Expose to network
```

---

## Deployment Checklist

- [ ] Run `npm run lint` - fix all errors
- [ ] Run `npm run format` - auto-format code
- [ ] Run `npm run build` - verify build succeeds
- [ ] Test `npm run preview` - check production
- [ ] Update `.env.example` if new variables added
- [ ] Commit to git: `git add . && git commit -m "message"`
- [ ] Push to GitHub: `git push origin main`
- [ ] Let CI/CD handle deployment (if enabled)

Or manually:
```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## Environment Variables

**Set in `.env.local` (create from `.env.example`):**

```env
# Analytics
VITE_GA_ID=G-XXXXXXXXXX

# Ads
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX

# Access in code
import.meta.env.VITE_GA_ID
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 5173 in use | `npm run dev -- --port 3000` |
| Build fails | `npm run build -- --debug` |
| Slow build | `rm -rf node_modules && npm install` |
| Git errors | Check `.gitignore` file |
| Docker build fails | `docker build --no-cache -t crypto-calc .` |

---

## First Time Setup

```bash
# 1. Navigate to project
cd d:\Crypto-Calc

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local
# Edit .env.local with your keys

# 4. Start developing
npm run dev

# 5. Open browser (auto-opens)
# https://localhost:5173
```

---

## Build Output Locations

| When | Files | Location |
|------|-------|----------|
| Development | Source files | `src/`, `index.html` |
| Production | Built & minified | `dist/` folder |
| Deployed | Hosted site | Your domain |

---

## File Size Budget

Target sizes after `npm run build`:

- Total HTML: ~50 KB
- Total JavaScript: ~150 KB  
- Total CSS: ~50 KB
- Icons: ~50 KB
- **Total: ~300 KB**

Check with: `npm run build`

---

## Useful npm Packages (Already Installed)

- `vite` - Build tool
- `eslint` - Code quality
- `prettier` - Code formatting
- `@vitejs/plugin-basic-ssl` - HTTPS support

---

## Documentation Files

- **README.md** - Project overview
- **TECH-STACK.md** - Complete setup guide
- **DEPLOYMENT.md** - Monetization & hosting
- **SETUP.md** - Getting started (this guide)

---

## Key Concepts

### Hot Module Replacement (HMR)
- Changes appear instantly in browser
- State preserved (doesn't reload)
- Enabled in `npm run dev`

### Tree Shaking
- Unused code removed from production
- Smaller bundle size
- Automatic in Vite

### Code Splitting
- JavaScript split into chunks
- Faster initial load
- Automatic in Vite

### Minification
- Code compressed (removes whitespace, renames vars)
- ~60% size reduction
- Automatic in production

---

## Get Help

- Check **TECH-STACK.md** for detailed guide
- Run `npm run lint` to find issues
- Check build output: `npm run build`
- See Vite docs: https://vitejs.dev/

---

**You're ready! Start with:** `npm install && npm run dev`

