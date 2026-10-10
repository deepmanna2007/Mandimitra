import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './services/database.js';
import { marketPriceService, calculateDistance } from './services/marketPriceService.js';
import { geminiService } from './services/geminiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});

// 1. Health & Data Freshness Status
app.get('/api/status', (req, res) => {
  res.json({
    app: 'MandiMitra',
    tagline: 'Know the Price. Choose the Market. Earn Better.',
    status: 'ONLINE',
    ...marketPriceService.getStatus()
  });
});

// 2. Crops API
app.get('/api/crops', (req, res) => {
  const crops = db.getCrops();
  res.json({ success: true, count: crops.length, data: crops });
});

app.post('/api/crops', (req, res) => {
  try {
    const { name, category, unit, icon, basePrice, msp, hindiName, bengaliName } = req.body;
    if (!name) return res.status(400).json({ success: false, error: 'Crop name is required' });
    const crop = db.addCrop({ name, category, unit: unit || 'Quintal', icon: icon || '🌾', basePrice: Number(basePrice) || 2000, msp: msp ? Number(msp) : null, hindiName, bengaliName });
    res.status(201).json({ success: true, data: crop });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/crops/:id', (req, res) => {
  const updated = db.updateCrop(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Crop not found' });
  res.json({ success: true, data: updated });
});

app.delete('/api/crops/:id', (req, res) => {
  const success = db.deleteCrop(req.params.id);
  if (!success) return res.status(404).json({ success: false, error: 'Crop not found' });
  res.json({ success: true, message: 'Crop deleted successfully' });
});

// 3. Markets (Mandis) API
app.get('/api/markets', (req, res) => {
  const { userLat, userLng, search, district, state } = req.query;
  const lat = userLat ? parseFloat(userLat) : 23.5204;
  const lng = userLng ? parseFloat(userLng) : 87.3119;

  let markets = db.getMarkets().map(m => ({
    ...m,
    distanceKm: calculateDistance(lat, lng, m.latitude, m.longitude)
  }));

  if (district) {
    markets = markets.filter(m => m.district.toLowerCase() === district.toLowerCase());
  }

  if (state) {
    markets = markets.filter(m => m.state.toLowerCase() === state.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    markets = markets.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.district.toLowerCase().includes(q) ||
      m.address.toLowerCase().includes(q)
    );
  }

  // Sort by distance from farmer
  markets.sort((a, b) => a.distanceKm - b.distanceKm);

  res.json({ success: true, count: markets.length, data: markets });
});

app.post('/api/markets', (req, res) => {
  try {
    const { name, state, district, address, latitude, longitude, marketType, operatingHours, facilities } = req.body;
    if (!name || !latitude || !longitude) {
      return res.status(400).json({ success: false, error: 'Name, latitude, and longitude are required' });
    }
    const market = db.addMarket({ name, state, district, address, latitude, longitude, marketType, operatingHours, facilities });
    res.status(201).json({ success: true, data: market });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/markets/:id', (req, res) => {
  const updated = db.updateMarket(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Market not found' });
  res.json({ success: true, data: updated });
});

app.delete('/api/markets/:id', (req, res) => {
  const success = db.deleteMarket(req.params.id);
  if (!success) return res.status(404).json({ success: false, error: 'Market not found' });
  res.json({ success: true, message: 'Market deleted successfully' });
});

// 4. Prices API (with distance, ranking, highlights, comparison)
app.get('/api/prices', (req, res) => {
  const { cropId, marketId, userLat, userLng, radiusKm, search } = req.query;
  const result = marketPriceService.getPrices({ cropId, marketId, userLat, userLng, radiusKm, search });
  res.json({ success: true, ...result });
});

app.get('/api/prices/highlights', (req, res) => {
  const { userLat, userLng } = req.query;
  const highlights = marketPriceService.getTodayHighlights(userLat, userLng);
  res.json({ success: true, data: highlights, status: marketPriceService.getStatus() });
});

app.post('/api/prices/compare', (req, res) => {
  const { cropId, marketIds, userLat, userLng } = req.body;
  if (!cropId || !marketIds || !Array.isArray(marketIds)) {
    return res.status(400).json({ success: false, error: 'cropId and marketIds array required' });
  }
  const comparison = marketPriceService.compareMarkets(cropId, marketIds, userLat, userLng);
  res.json({ success: true, data: comparison });
});

app.post('/api/prices', (req, res) => {
  try {
    const { cropId, marketId, minimumPrice, maximumPrice, modalPrice, arrivals, source } = req.body;
    const result = db.addPrice({
      cropId,
      marketId,
      minimumPrice: Number(minimumPrice),
      maximumPrice: Number(maximumPrice),
      modalPrice: Number(modalPrice),
      arrivals: arrivals || 'Standard batch',
      source: source || 'Admin Entry'
    });
    res.status(201).json({ success: true, data: result.price, warnings: result.warnings });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.delete('/api/prices/:id', (req, res) => {
  const success = db.deletePrice(req.params.id);
  if (!success) return res.status(404).json({ success: false, error: 'Price record not found' });
  res.json({ success: true, message: 'Price record deleted' });
});

// 5. Price Trends API
app.get('/api/prices/trends/:cropId', (req, res) => {
  const { cropId } = req.params;
  const trends = db.getPriceTrends(cropId);
  const crop = db.getCropById(cropId);
  res.json({
    success: true,
    crop,
    data: trends,
    disclaimer: 'Historical mandi trends aggregated from market yard daily auction sheets.'
  });
});

// 6. Signature Feature: "Best Market For Me" Transport Profit Calculator
app.post('/api/calculator/best-market', (req, res) => {
  const { cropId, quantityQuintals, userLat, userLng, vehicleType } = req.body;
  const result = marketPriceService.calculateBestMarket({
    cropId: cropId || 'crop-potato',
    quantityQuintals: quantityQuintals || 100,
    userLat,
    userLng,
    vehicleType: vehicleType || 'pickup'
  });
  res.json(result);
});

// 7. Price Alerts API
app.get('/api/alerts', (req, res) => {
  const { userId } = req.query;
  const alerts = db.getAlerts(userId);
  res.json({ success: true, count: alerts.length, data: alerts });
});

app.post('/api/alerts', (req, res) => {
  try {
    const { userId, cropId, marketId, targetPrice, condition, cropName, marketName, currentPrice } = req.body;
    if (!cropId || !targetPrice) {
      return res.status(400).json({ success: false, error: 'Crop and target price are required' });
    }
    const newAlert = db.addAlert({
      userId: userId || 'user-rahul',
      cropId,
      cropName: cropName || 'Crop',
      marketId: marketId || null,
      marketName: marketName || 'All Nearby Mandis',
      targetPrice: Number(targetPrice),
      condition: condition || 'above',
      currentPrice: Number(currentPrice) || 0
    });
    res.status(201).json({ success: true, data: newAlert });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/alerts/:id', (req, res) => {
  const success = db.deleteAlert(req.params.id);
  if (!success) return res.status(404).json({ success: false, error: 'Alert not found' });
  res.json({ success: true, message: 'Alert deleted successfully' });
});

// 8. Auth & Farmer Onboarding
app.post('/api/auth/login', (req, res) => {
  const { phone, role } = req.body;
  
  if (role === 'admin' || phone === '9999999999') {
    const admin = db.getUserById('user-admin');
    return res.json({ success: true, user: admin, token: 'mock-jwt-admin-token' });
  }

  // Farmer login
  let user = db.getUserByPhone(phone);
  if (!user) {
    user = db.getUserById('user-rahul'); // Default demo account
  }
  res.json({ success: true, user, token: 'mock-jwt-farmer-token' });
});

app.post('/api/auth/register', (req, res) => {
  try {
    const { name, phone, email, state, district, village, preferredLanguage, mainCrops, approxQuantity, favoriteMarkets } = req.body;
    if (!name || !phone || !state || !district) {
      return res.status(400).json({ success: false, error: 'Name, phone, state, and district are mandatory for registration.' });
    }

    const newUser = db.addUser({
      name,
      phone,
      email: email || '',
      role: 'farmer',
      state,
      district,
      village: village || '',
      preferredLanguage: preferredLanguage || 'en',
      mainCrops: mainCrops || ['crop-potato'],
      approxQuantity: approxQuantity || '50 Quintals',
      favoriteMarkets: favoriteMarkets || ['mandi-durgapur'],
      latitude: 23.5204,
      longitude: 87.3119
    });

    res.status(201).json({ success: true, user: newUser, token: 'mock-jwt-farmer-token' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/auth/current', (req, res) => {
  const { userId } = req.query;
  const user = db.getUserById(userId || 'user-rahul');
  res.json({ success: true, user });
});

app.put('/api/auth/user/:id', (req, res) => {
  const updated = db.updateUser(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'User not found' });
  res.json({ success: true, user: updated });
});

// 9. Gemini AI Features
app.post('/api/ai/advisor', async (req, res) => {
  try {
    const { question, farmerContext, language } = req.body;
    if (!question) return res.status(400).json({ success: false, error: 'Question is required' });

    const advice = await geminiService.getAdvisorAdvice({
      question,
      farmerContext: farmerContext || {},
      language: language || 'en'
    });

    res.json({ success: true, ...advice });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/ai/voice-query', async (req, res) => {
  try {
    const { voiceText, userLocation, language } = req.body;
    if (!voiceText) return res.status(400).json({ success: false, error: 'Voice text is required' });

    const result = await geminiService.processVoiceQuery({
      voiceText,
      userLocation: userLocation || 'Durgapur, West Bengal',
      language: language || 'en'
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10. Admin & System Monitoring
app.get('/api/admin/monitoring', (req, res) => {
  const config = db.getDataSourceConfig();
  const logs = db.getSystemLogs();
  const crops = db.getCrops();
  const markets = db.getMarkets();
  const prices = db.getPrices();
  const alerts = db.getAlerts();
  const users = db.getUsers();

  res.json({
    success: true,
    data: {
      config,
      stats: {
        totalCrops: crops.length,
        totalMarkets: markets.length,
        totalPriceRecords: prices.length,
        totalAlerts: alerts.length,
        triggeredAlerts: alerts.filter(a => a.status === 'triggered').length,
        totalUsers: users.length
      },
      recentLogs: logs.slice(0, 30)
    }
  });
});

app.post('/api/admin/toggle-source', (req, res) => {
  const { mode } = req.body;
  if (!['demo', 'real'].includes(mode)) {
    return res.status(400).json({ success: false, error: 'Invalid mode. Must be "demo" or "real".' });
  }
  const updated = db.updateDataSourceConfig({ mode });
  res.json({ success: true, data: updated });
});

app.post('/api/admin/trigger-sync', async (req, res) => {
  const { apiKey } = req.body;
  const result = await marketPriceService.syncFromAgmarknet(apiKey);
  res.json(result);
});

// Fallback error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🌾 MandiMitra Backend Engine running on http://localhost:${PORT}`);
  console.log(`📡 Mode: ${db.getDataSourceConfig().mode.toUpperCase()}`);
});
