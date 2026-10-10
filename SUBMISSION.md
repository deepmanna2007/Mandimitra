# MandiMitra — Live Mandi Price Intelligence for Farmers 🌾

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)*

---

## What I Built

**MandiMitra** ("Mandi Friend" in Hindi/Bengali) is a mobile-first agricultural market intelligence platform built specifically for Indian farmers.

**Tagline: "Know the Price. Choose the Market. Earn Better."**

### The Real Problem It Solves

Every day, millions of small-scale farmers in India load their produce onto a cart, spend money on transport, and travel to the nearest mandi (agricultural market) — often not knowing that a market 20 km away is offering ₹300–₹500 more per quintal for the same crop. That difference can mean ₹30,000–₹50,000 more income per harvest.

MandiMitra gets farmers **off the screen and into the right market** by answering one simple question before they leave home:

> *"Which mandi near me is paying the best price for my potato today — and is it worth the trip?"*

### Who It's For

- **Small and marginal farmers** in rural India with basic smartphone access
- Primary focus: **West Bengal** (potato, rice, jute, onion, tomato, brinjal)
- Designed for users with limited technical literacy — everything is in plain language, with Hindi and Bengali support

### How It Gets People "Off the Screen"

The entire UX is built around a single **actionable decision** — not data dashboards, not endless charts. A farmer opens the app for 60 seconds, sees **"Go to Bankura Mandi — earn ₹34,000 more today"**, and heads out the door. The platform is a **decision tool**, not a content platform. It pushes people into the physical world.

### Key Features

| Feature | Description |
|---|---|
| 🏷️ **Live Market Prices** | Today's modal/min/max prices across 8+ West Bengal mandis |
| 📊 **Market Comparison** | Side-by-side price table across all markets for any crop |
| 🧮 **Best Market Calculator** | Profit/loss calc that factors in transport cost, distance, and freight |
| 🗺️ **Nearby Markets Map** | OpenStreetMap-powered interactive map of mandis with GPS detection |
| 📈 **Price Trends** | 7-day historical trend charts powered by Recharts |
| 🔔 **Price Alerts** | Set a target price; get notified when the market hits it |
| 🤖 **MandiMitra AI Saathi** | Gemini-powered agricultural advisor with voice input in Hindi or Bengali |
| 🛡️ **Admin Dashboard** | Admins can post price updates and manage mandi data |
| 🌐 **Multilingual** | English, हिंदी, বাংলা UI via i18n translations system |

---

## Demo

> **Local Development:**
> ```bash
> git clone https://github.com/deepmanna2007/Mandimitra.git
> cd Mandimitra
> npm install
> npm run dev
> ```
> App runs at **http://localhost:3000** | API at **http://localhost:5000**

### Walkthrough

**Farmer Dashboard** — Clean, distraction-free entry point showing crop cards, today's highlights, and the "Best Market For Me" feature card.

**Best Market Calculator** — Enter your crop, quantity (in quintals), and your location. MandiMitra calculates:
- Transport cost using calibrated per-km freight rates (₹8,000 base + ₹30/km)
- Net profit/loss of travelling to each market vs. selling locally
- Presents a clear winner: *"Go to Bankura Mandi — extra profit ₹34,200"*

**MandiMitra AI Saathi** — Voice-enabled Gemini AI chat that understands:
- *"आलू का भाव क्या है आज?"* (What's the potato price today?)
- *"My tomato harvest is 20 quintals. Which market should I go to?"*
- *"সার কতটা দেব এই মাটিতে?"* (How much fertilizer for this soil?)

---

## Code

**GitHub Repository:** https://github.com/deepmanna2007/Mandimitra

### Project Structure

```
Mandimitra/
├── server/
│   ├── server.js                    # Express REST API (12+ endpoints)
│   └── services/
│       ├── database.js              # JSON-store with seed mandi data (West Bengal)
│       ├── marketPriceService.js    # Haversine distance + profit calculator engine
│       └── geminiService.js         # Gemini AI integration (advisor + voice parsing)
│
└── client/
    └── src/
        ├── context/MandiContext.tsx # Central state + API layer (React Context)
        ├── i18n/translations.ts    # EN / HI / BN string translations
        ├── pages/
        │   ├── LandingPage.tsx
        │   ├── FarmerDashboard.tsx
        │   ├── MarketPricesPage.tsx
        │   ├── CompareMarketsPage.tsx
        │   ├── BestMarketCalculatorPage.tsx
        │   ├── NearbyMarketsMapPage.tsx
        │   ├── PriceTrendsPage.tsx
        │   ├── PriceAlertsPage.tsx
        │   ├── AiSaathiPage.tsx
        │   └── AdminDashboardPage.tsx
        └── components/
            ├── Navbar.tsx / MobileNav.tsx
            ├── LocationModal.tsx
            ├── AuthModal.tsx
            └── ToastContainer.tsx
```

### Core Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript, Vite 8 |
| Styling | Vanilla CSS with a custom agricultural design system |
| Charts | Recharts |
| Maps | Leaflet.js + OpenStreetMap (fully open-source) |
| Backend | Node.js + Express 5 |
| AI | Google Gemini API (`gemini-3.5-flash-lite`) |
| Data | JSON flat-file store (Agmarknet-ready adapter pattern) |
| Icons | Lucide React |

---

## How I Built It

### The AI Layer — Gemini as a "Farmer's Advisor"

The heart of MandiMitra's AI feature is the **"AI Saathi"** (AI companion). It's built on **Google Gemini** (`gemini-3.5-flash-lite` / `gemini-3.8-flash` with automatic fallback) via the Generative Language REST API.

```js
// server/services/geminiService.js (simplified)
async callGemini(prompt, systemInstruction) {
  for (const model of ['gemini-3.5-flash-lite', 'gemini-3.8-flash']) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      { method: 'POST', body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] }) }
    );
    if (response.ok) return response.json();
  }
}
```

The system instruction is carefully crafted to keep the AI grounded in agricultural context — it knows about the mandis in the database, refuses to give financial advice beyond its data, and speaks in the farmer's preferred language.

**Voice Input** is handled by the Web Speech API (`SpeechRecognition`). Voice queries are transcribed and sent to Gemini for intent parsing — extracting structured fields like `cropName`, `quantity`, and `marketName` from spoken Hindi/Bengali sentences.

### The Distance-Profit Engine

The "Best Market Calculator" uses the **Haversine formula** to compute real great-circle distances between a farmer's GPS location and every mandi:

```js
// Calibrated freight cost model
const transportCost = Math.round(8000 + (distanceKm * 30));
const netProfit = (pricePerQ - basePrice) * quantity - transportCost;
```

This gives farmers a concrete rupee figure for "is the trip worth it?" — not just a price comparison.

### Architecture Decision: Open Adapter Pattern

The `marketPriceService.js` is built with a **pluggable adapter** pattern. In `demo` mode it serves realistic West Bengal benchmark prices. When switched to `live` mode, it's ready to consume the **Agmarknet / Data.gov.in government open data API** — no code changes needed, just a config flag:

```js
// database.js — toggle this one field
{ mode: 'demo' }   // ← current state (benchmark data)
{ mode: 'live' }   // ← production with real Agmarknet feeds
```

---

## Why Does Open Innovation Matter?

MandiMitra could not exist without open-source and open-data infrastructure. Here's what it depends on — and why closed alternatives wouldn't work:

### 1. OpenStreetMap + Leaflet.js — The Mandi Map
Google Maps API costs money at scale and has proprietary terms. The farmer-facing mandi map uses **Leaflet.js** (open-source) + **OpenStreetMap tiles** (community-maintained, free forever). This means a farmer in rural West Bengal can view a map of nearby mandis with **zero API cost** to the operator — making the tool sustainable without VC funding.

### 2. Agmarknet / Data.gov.in — The Real Price Data
India's **National Informatics Centre** and **Directorate of Marketing & Inspection** publish agricultural market prices as open data under the **Government Open Data License (GODL)**. MandiMitra is built around this open data layer. A closed API (like a private price aggregator) would charge per-query fees that make a free farmer tool economically impossible.

### 3. Open-Weight AI Philosophy
The `geminiService.js` is abstracted behind a single `getAdvice(prompt)` call specifically to enable a future swap to a **locally-run open-weight model** (Llama, Mistral via Ollama) — critical for rural users who may distrust cloud AI with their farm data. Open-source AI makes data sovereignty possible.

### 4. Open-Source Makes It Auditable
When an AI tells a farmer *"sell at Bankura Mandi"*, that farmer needs to **trust** the recommendation. Open-source code means any agricultural NGO, journalist, or government official can audit exactly how the recommendation was generated. A black-box closed SaaS simply cannot offer that trust to a vulnerable population.

> **Open innovation didn't just make this *easier* to build — it made it *possible* to build responsibly, affordably, and sustainably for the farmers who need it most.**

---

## My Agent Session

Built end-to-end using **Google Antigravity (AGY)** — an AI coding agent — in a single extended pair-programming session. The agent:
- Designed the entire system architecture from the brief
- Scaffolded the Express backend, React/TypeScript frontend, and all service layers
- Implemented the Haversine distance engine and profit calculator
- Integrated Gemini AI with automatic model fallback
- Built 10 full-featured pages with responsive mobile-first CSS
- Debugged Vite ESM module errors in real time
- Wrote this submission

---

## Prize Categories

- ✅ **General Hacktoberfest** — Open-source project with real-world impact
- ✅ **Google Gemini** — Built around Gemini AI for agricultural advice and voice query parsing
- ✅ **Farming / AgriTech** — Direct application for smallholder farmers in India
- ✅ **Social Good / Accessibility** — Multilingual (EN/HI/BN), designed for low-literacy users

---

*MandiMitra is open source and free to use. Contributions, especially real Agmarknet data integrations and regional language additions, are very welcome!*
