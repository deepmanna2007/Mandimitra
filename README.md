# MandiMitra 🌾
### *Live Mandi Price Intelligence for Farmers*

> **"Know the Price. Choose the Market. Earn Better."**

MandiMitra is a mobile-first, bilingual agricultural intelligence web platform designed for small and marginal farmers across India (with primary focus on West Bengal). It solves one critical real-world problem: helping farmers decide which mandi (agricultural market) offers the best net profit for their produce after factoring in vehicle freight and travel distance.

---

## 🌟 Key Features

| Feature | Description |
|---|---|
| 🏷️ **Live Market Prices** | Today's modal, minimum, and maximum prices across 8+ mandis (Bankura, Burdwan, Durgapur, etc.) |
| 🧮 **Best Market Calculator** | Distance-calibrated net profit/loss calculator that factors in vehicle freight (₹8,000 base + ₹30/km) |
| 📊 **Market Comparison** | Side-by-side comparative table for all regional mandis for any crop |
| 🗺️ **Nearby Markets Map** | Interactive Leaflet & OpenStreetMap visualization with GPS geolocation |
| 📈 **Price Trends** | 7-day historical price movement charts powered by Recharts |
| 🔔 **Price Alerts** | Customizable price threshold notifications for target crops |
| 🤖 **MandiMitra AI Saathi** | Gemini AI agricultural advisor with voice input support in English, Hindi (हिन्दी), and Bengali (বাংলা) |
| 🛡️ **Admin Dashboard** | Manage crops, update mandi rates, and toggle live/demo data source feeds |
| 🌐 **Multilingual Support** | Instant UI localization across English, Hindi, and Bengali |

---

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript, Vite 8
- **Styling:** Vanilla CSS design system tailored for high legibility and field contrast
- **Charts:** Recharts
- **Maps:** Leaflet.js + OpenStreetMap (100% open-source)
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js + Express 5
- **Data Layer:** Pluggable JSON data store with Agmarknet / Data.gov.in adapter
- **AI Integration:** Google Gemini API (`gemini-3.5-flash-lite` / `gemini-3.8-flash`) with automatic local fallback

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/deepmanna2007/Mandimitra.git
cd Mandimitra
```

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and optionally configure your Google Gemini API key:
```env
PORT=5000
NODE_ENV=development
DATA_SOURCE_MODE=demo
GEMINI_API_KEY=your_gemini_api_key_here
```
> *Note: If no Gemini API key is provided, MandiMitra will seamlessly use its built-in rule-based agricultural advisory fallback engine.*

### 3. Install Dependencies
```bash
# Install root dependencies (concurrently, express, etc.)
npm install

# Install client dependencies
npm --prefix client install
```

### 4. Run Locally
Run both backend and frontend concurrently:
```bash
npm run dev
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## 📂 Project Structure

```
Mandimitra/
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore file (excludes secrets & builds)
├── README.md                    # Project documentation
├── SUBMISSION.md                # Hackathon submission details
├── package.json                 # Monorepo/Root package configuration
│
├── server/
│   ├── server.js                # Express REST API endpoints
│   ├── data/
│   │   ├── initialData.js       # Benchmark data for West Bengal mandis
│   │   └── store.json           # Runtime data store
│   └── services/
│       ├── database.js          # Flat-file database operations
│       ├── geminiService.js     # Gemini AI advisory & voice parsing
│       └── marketPriceService.js # Haversine distance & profit computation engine
│
└── client/
    ├── index.html
    ├── vite.config.ts
    └── src/
        ├── App.tsx              # Root app component & routing
        ├── context/
        │   └── MandiContext.tsx # Global state & API client
        ├── i18n/
        │   └── translations.ts  # EN / HI / BN translations
        ├── components/          # Reusable UI components
        └── pages/               # Views (Calculator, Map, AI Saathi, etc.)
```

---

## 🔒 Security & Environment Variables

Sensitive credentials, API keys, and environment variables are strictly managed via `.env` and kept out of version control:
- Never commit `.env` or production API keys to GitHub.
- Use `.env.example` as a template for environment configuration.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/deepmanna2007/Mandimitra/issues).

---

## 📄 License

This project is licensed under the MIT License.