# 🌾 AgriConnect — Digital Agricultural Stewardship Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.2.2-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.18.2-CA4245?logo=react-router&logoColor=white)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

> **AgriConnect** is an integrated, next-generation digital stewardship platform connecting farmers, bulk buyers, agricultural authorities, and system administrators. It empowers farmers with fair market access, AI-driven crop intelligence, real-time weather alerts, government scheme discovery, and official certification workflows.

---

## 🚀 Key Portals & Features

### 👨‍🌾 1. Farmer Ecosystem
- **Executive Dashboard:** Live summaries of crop yields, sales analytics, market price trends, and urgent advisories.
- **Direct Marketplace & Selling:** List farm produce with high-res media, batch pricing, organic tags, and track buyer inquiries.
- **Crop Intelligence & Advisory:** AI-powered insights for pest management, soil health, weather forecasts, and harvest scheduling.
- **Government Schemes & Water Management:** Apply for state/national agricultural subsidy schemes and request water allocation quotas.
- **Certification Requests:** Request and track official organic/quality certifications verified by authorized agricultural officers.

### 🛒 2. Buyer Marketplace
- **Direct Sourcing:** Browse certified farm-fresh commodities directly from farmers with transparent pricing.
- **Order Tracking:** Track order fulfillment, dispatch timelines, quality metrics, and batch provenance.

### 🏛️ 3. Authority & Verification Portal
- **Certification Review Queue:** Inspect and approve/reject farmer organic and quality certification applications.
- **Advisory & Alert Publishing:** Broadcast critical pest warnings, drought advisories, and weather alerts to regional farmers.
- **Water Allocation Queue:** Review and allocate community canal/irrigation water requests with audit logs.
- **Scheme Administration:** Launch and monitor agricultural subsidy and support schemes.

### ⚙️ 4. Administration & Governance
- **System Monitoring & Audit Logs:** Real-time health metrics, uptime tracking, and immutable activity logs.
- **User Management & Moderation:** Manage farmer, buyer, and authority accounts with marketplace listing moderation.
- **Platform Configuration:** Fine-tune fee structures, regional settings, and notification channels.

---

## 🛠️ Tech Stack

- **Frontend Framework:** [React 19](https://react.dev/)
- **Bundler & Build Tool:** [Vite 8](https://vitejs.dev/) with Rolldown compilation
- **Routing:** [React Router 7](https://reactrouter.com/) (Browser Router with SPA dynamic layout)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Modular CSS Design Tokens & Glassmorphic UI
- **Deployment:** Optimized for [Vercel](https://vercel.com/) & [GitHub Pages](https://pages.github.com/)

---

## 📦 Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/agriconnect.git
   cd agriconnect
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## ⚡ Deployment to Vercel

AgriConnect includes production-ready configurations tailored for Vercel:
- **`vercel.json`**: Configured with SPA rewrite rules (`/(.*) -> /index.html`) so deep routing works seamlessly without 404s on page reload.
- **Asset Caching**: Configured 1-year immutable caching for static bundle chunks.
- **Vite Chunk Splitting**: Rollup manual chunks for `react`, `react-router`, and `lucide-react` for optimized CDN delivery.

### Option A: Deploy via Vercel Dashboard (Recommended)
1. Push your code to your GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your `agriconnect` GitHub repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **Deploy**.

### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login and deploy
vercel
```

---

## 🐙 Pushing to GitHub

To initialize git and push to a new GitHub repository:

```bash
# 1. Initialize git
git init

# 2. Add files and commit
git add .
git commit -m "feat: initial commit - AgriConnect platform optimized for Vercel & GitHub"

# 3. Rename branch to main
git branch -M main

# 4. Link your remote repository
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

# 5. Push to GitHub
git push -u origin main
```

---

## 📂 Project Structure

```
agriconnect/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI build & validation pipeline
├── public/
│   ├── favicon.svg            # Site favicon
│   └── icons.svg              # SVG sprite assets
├── src/
│   ├── assets/                # Images and static media
│   ├── components/            # Reusable UI components & layouts
│   ├── context/               # Global state contexts (User, Role, Notifications)
│   ├── data/                  # Mock datasets and schema definitions
│   ├── pages/                 # Route pages (Farmer, Buyer, Authority, Admin, Onboarding)
│   ├── styles/                # Design tokens, variables, global CSS
│   ├── App.jsx                # App wrapper
│   ├── main.jsx               # React entry point
│   └── router.jsx             # React Router 7 route definitions
├── index.html                 # HTML template with SEO & Open Graph meta
├── package.json               # Project manifest and scripts
├── vercel.json                # Vercel SPA rewrites & CDN cache configuration
└── vite.config.js             # Vite build & chunk-splitting optimizations
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
