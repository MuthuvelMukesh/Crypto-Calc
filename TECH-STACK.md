# Tech Stack Setup Guide

This project uses a modern, professional tech stack with industry best practices.

## 📦 Tech Stack

### Frontend
- **Vite** - Ultra-fast build tool and dev server
- **Vanilla JavaScript (ES6+)** - No framework dependencies
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with variables and media queries
- **PWA** - Progressive Web App with Service Worker

### Development Tools
- **ESLint** - Code quality and style checking
- **Prettier** - Code formatting
- **Node.js** - Runtime environment

### Deployment
- **Netlify** - Primary hosting (with CLI)
- **Vercel** - Alternative hosting (auto-built)
- **Docker** - Containerized deployment
- **GitHub Actions** - CI/CD pipeline

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16+ ([download](https://nodejs.org/))
- **npm** 8+ (comes with Node.js)
- **Git** (optional, for version control)

### Installation

1. **Clone or extract the project**
```bash
cd Crypto-Calc
```

2. **Install dependencies**
```bash
npm install
```

This will install:
- `vite` - Build tool
- `@vitejs/plugin-basic-ssl` - SSL support for local development
- `eslint` - Code linter
- `prettier` - Code formatter

3. **Create environment file**
```bash
# Copy the example env file
cp .env.example .env.local
```

Edit `.env.local` and add your keys:
```env
VITE_GA_ID=G-XXXXXXXXXX
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

## 💻 Development

### Start Development Server
```bash
npm run dev
```

Opens automatically at `https://localhost:5173`

Features:
- Hot Module Replacement (HMR) - changes reflect instantly
- HTTPS enabled for testing PWA features
- Fast refresh without full page reload

### Code Quality

**Lint your code:**
```bash
npm run lint
```

**Auto-format your code:**
```bash
npm run format
```

## 🏗️ Building for Production

### Build the app
```bash
npm run build
```

Outputs optimized files to `dist/` folder:
- Minified JavaScript
- Optimized CSS
- Compressed assets
- Hash-based cache busting

### Preview production build locally
```bash
npm run preview
```

Serves `dist/` at `http://localhost:5000`

## 📁 Project Structure

```
Crypto-Calc/
├── src/                    # Source files
│   ├── script.js          # Main application logic
│   ├── style.css          # Styling
│   └── sw.js              # Service Worker (PWA)
├── public/                # Static assets (copied as-is)
│   ├── manifest.json      # PWA manifest
│   └── icons/             # App icons
├── dist/                  # Build output (generated)
├── index.html             # Main HTML (root level)
├── privacy.html           # Privacy Policy
├── terms.html             # Terms of Service
├── package.json           # Project config & dependencies
├── vite.config.js         # Vite configuration
├── netlify.toml           # Netlify deploy config
├── vercel.json            # Vercel deploy config
├── Dockerfile             # Docker container config
├── docker-compose.yml     # Docker Compose for local testing
├── .eslintrc.json         # ESLint configuration
├── .prettierrc             # Prettier configuration
├── .env.example           # Environment variables template
└── .github/workflows/     # GitHub Actions CI/CD
```

## 🐳 Docker Deployment

### Build Docker image
```bash
docker build -t crypto-calc .
```

### Run with Docker
```bash
docker run -p 5000:5000 crypto-calc
```

### Run with Docker Compose
```bash
docker-compose up
```

Access at `http://localhost:5000`

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

**Automatic deployment from Git:**
1. Connect your GitHub repository to [Netlify](https://netlify.com)
2. Netlify automatically runs `npm run build` on each push
3. Built files are deployed from `dist/` folder

**Manual deployment:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**Benefits:**
- Free SSL certificate
- Automatic HTTPS
- Edge caching
- Preview deployments
- Zero-downtime deployments

### Option 2: Vercel

**Automatic deployment:**
1. Import GitHub repo at [Vercel](https://vercel.com)
2. Auto-builds and deploys on push

**Manual deployment:**
```bash
npm install -g vercel
vercel --prod
```

**Benefits:**
- Fastest global CDN
- Serverless functions ready
- Analytics included
- Automatic image optimization

### Option 3: GitHub Pages

```bash
# Configure to deploy from gh-pages branch
git checkout -b gh-pages
git push origin gh-pages
```

Then enable Pages in repository settings.

### Option 4: Self-hosted (VPS/Server)

```bash
# Build
npm run build

# Upload dist/ folder to your server
scp -r dist/* user@yourserver.com:/var/www/html/

# Or use with Node.js server
npm install -g serve
serve -s dist -l 5000
```

### Option 5: Docker (VPS, Kubernetes, Cloud)

```bash
# Build image
docker build -t crypto-calc:latest .

# Push to Docker Hub
docker tag crypto-calc:latest yourusername/crypto-calc:latest
docker push yourusername/crypto-calc:latest

# Pull and run on server
docker pull yourusername/crypto-calc:latest
docker run -d -p 80:5000 yourusername/crypto-calc:latest
```

## 🔍 Code Quality

### ESLint Rules
- No unused variables
- Require semicolons
- Prefer const/let over var
- Use strict equality (===)
- Proper indentation (2 spaces)

### Prettier Formatting
- 2-space indentation
- Single trailing comma
- 100 character line width
- Double quotes for strings

### Check both:
```bash
npm run lint
npm run format
```

## 📊 Performance Optimization

### Built-in optimizations:
- **Tree shaking** - Unused code removed
- **Code splitting** - Lazy load modules
- **Asset hashing** - Cache busting for CDN
- **Minification** - Smallest file sizes
- **Source maps** - Removed in production

### Build output:
```
dist/
├── index.html              (~50KB)
├── assets/
│   ├── script.HASH.js      (~150KB minified)
│   ├── style.HASH.css      (~50KB minified)
│   └── sw.HASH.js          (~30KB)
└── manifest.json
```

## 🔐 Environment Variables

Available variables (accessed via `import.meta.env.*`):

```javascript
// In JavaScript:
const gaId = import.meta.env.VITE_GA_ID
const adsenseId = import.meta.env.VITE_ADSENSE_CLIENT
const appEnv = import.meta.env.VITE_APP_ENV
```

## 📝 Useful npm Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npm run format` | Auto-format code |

## 🚨 Troubleshooting

### Port already in use
```bash
npm run dev -- --port 3000
```

### Clear cache and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails
```bash
npm run build -- --debug
```

### Docker image build fails
```bash
docker build --no-cache -t crypto-calc .
```

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Docker Guide](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)

## 🎯 Next Steps

1. **Install dependencies:** `npm install`
2. **Start development:** `npm run dev`
3. **Make changes:** Edit `src/script.js`, `src/style.css`, or `index.html`
4. **Check quality:** `npm run lint && npm run format`
5. **Build:** `npm run build`
6. **Deploy:** Choose your platform above

## 💡 Tips

- Use `npm run lint` before committing code
- Use `npm run format` to auto-fix formatting
- Test PWA features on HTTPS (dev server supports this)
- Keep dependencies updated: `npm update`
- Monitor bundle size with `npm run build`

---

**Ready to build? Start with `npm install` then `npm run dev`! 🚀**
