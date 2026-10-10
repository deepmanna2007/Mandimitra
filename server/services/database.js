import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialCrops, initialMarkets, initialPrices, initialPriceTrends, initialUsers, initialAlerts } from '../data/initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'store.json');

class DatabaseService {
  constructor() {
    this.data = {
      crops: [],
      markets: [],
      prices: [],
      priceTrends: {},
      users: [],
      alerts: [],
      systemLogs: [],
      dataSourceConfig: {
        mode: 'demo', // 'demo' | 'real'
        lastSync: '2026-10-06T10:45:00.000Z',
        syncStatus: 'HEALTHY',
        totalMarketsMonitored: 11,
        totalCropsMonitored: 11,
        realApiEndpoint: 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a005d007',
        realApiKeyConfigured: false
      }
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        this.data = JSON.parse(fileContent);
      } else {
        this.data.crops = [...initialCrops];
        this.data.markets = [...initialMarkets];
        this.data.prices = [...initialPrices];
        this.data.priceTrends = { ...initialPriceTrends };
        this.data.users = [...initialUsers];
        this.data.alerts = [...initialAlerts];
        this.addSystemLog('SYSTEM', 'Database initialized with initial agricultural benchmark seed data');
        this.save();
      }
    } catch (err) {
      console.error('Error loading database, resetting to default:', err);
      this.data.crops = [...initialCrops];
      this.data.markets = [...initialMarkets];
      this.data.prices = [...initialPrices];
      this.data.priceTrends = { ...initialPriceTrends };
      this.data.users = [...initialUsers];
      this.data.alerts = [...initialAlerts];
      this.save();
    }
  }

  save() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  // System Logging
  addSystemLog(level, message, metadata = {}) {
    const log = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      level, // 'INFO' | 'WARN' | 'ERROR' | 'SYSTEM'
      message,
      metadata
    };
    this.data.systemLogs.unshift(log);
    if (this.data.systemLogs.length > 200) {
      this.data.systemLogs.pop();
    }
    return log;
  }

  getSystemLogs() {
    return this.data.systemLogs || [];
  }

  getDataSourceConfig() {
    return this.data.dataSourceConfig;
  }

  updateDataSourceConfig(updates) {
    this.data.dataSourceConfig = { ...this.data.dataSourceConfig, ...updates };
    this.addSystemLog('INFO', `Data source configuration updated to ${this.data.dataSourceConfig.mode} mode`, updates);
    this.save();
    return this.data.dataSourceConfig;
  }

  // Crops
  getCrops() {
    return this.data.crops;
  }

  getCropById(id) {
    return this.data.crops.find(c => c.id === id);
  }

  addCrop(crop) {
    const newCrop = {
      id: crop.id || 'crop-' + crop.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      active: true,
      ...crop
    };
    this.data.crops.push(newCrop);
    this.addSystemLog('INFO', `Crop added: ${newCrop.name}`);
    this.save();
    return newCrop;
  }

  updateCrop(id, updates) {
    const index = this.data.crops.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.data.crops[index] = { ...this.data.crops[index], ...updates };
    this.addSystemLog('INFO', `Crop updated: ${this.data.crops[index].name}`);
    this.save();
    return this.data.crops[index];
  }

  deleteCrop(id) {
    const index = this.data.crops.findIndex(c => c.id === id);
    if (index === -1) return false;
    const removed = this.data.crops.splice(index, 1);
    this.addSystemLog('WARN', `Crop deleted: ${removed[0].name}`);
    this.save();
    return true;
  }

  // Markets
  getMarkets() {
    return this.data.markets;
  }

  getMarketById(id) {
    return this.data.markets.find(m => m.id === id);
  }

  addMarket(market) {
    const newMarket = {
      id: market.id || 'mandi-' + market.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      active: true,
      latitude: parseFloat(market.latitude),
      longitude: parseFloat(market.longitude),
      ...market
    };
    this.data.markets.push(newMarket);
    this.addSystemLog('INFO', `Market added: ${newMarket.name}`);
    this.save();
    return newMarket;
  }

  updateMarket(id, updates) {
    const index = this.data.markets.findIndex(m => m.id === id);
    if (index === -1) return null;
    this.data.markets[index] = { ...this.data.markets[index], ...updates };
    this.addSystemLog('INFO', `Market updated: ${this.data.markets[index].name}`);
    this.save();
    return this.data.markets[index];
  }

  deleteMarket(id) {
    const index = this.data.markets.findIndex(m => m.id === id);
    if (index === -1) return false;
    const removed = this.data.markets.splice(index, 1);
    this.addSystemLog('WARN', `Market deleted: ${removed[0].name}`);
    this.save();
    return true;
  }

  // Prices & Validation
  getPrices() {
    return this.data.prices;
  }

  validatePriceRecord(record) {
    const errors = [];
    const warnings = [];

    if (!record.cropId) errors.push('Missing crop ID');
    if (!record.marketId) errors.push('Missing market ID');
    if (record.modalPrice == null || isNaN(record.modalPrice)) errors.push('Invalid modal price');
    if (record.modalPrice <= 0) errors.push('Modal price must be strictly positive');
    if (record.minimumPrice && record.minimumPrice < 0) errors.push('Minimum price cannot be negative');
    if (record.maximumPrice && record.maximumPrice < 0) errors.push('Maximum price cannot be negative');
    if (record.minimumPrice && record.maximumPrice && record.minimumPrice > record.maximumPrice) {
      errors.push('Minimum price cannot exceed Maximum price');
    }

    // Historical Spike Validation (>40% sudden change check)
    const existingPrices = this.data.prices.filter(p => p.cropId === record.cropId && p.marketId === record.marketId);
    if (existingPrices.length > 0) {
      const lastPrice = existingPrices[0].modalPrice;
      const changePct = Math.abs((record.modalPrice - lastPrice) / lastPrice) * 100;
      if (changePct > 40) {
        warnings.push(`Extreme price shift detected: ${changePct.toFixed(1)}% change compared to previous record (₹${lastPrice}). Flagged for verification.`);
      }
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  addPrice(priceRecord) {
    const validation = this.validatePriceRecord(priceRecord);
    if (!validation.isValid) {
      this.addSystemLog('ERROR', `Price record rejected: ${validation.errors.join(', ')}`, priceRecord);
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    if (validation.warnings.length > 0) {
      this.addSystemLog('WARN', `Price record warning: ${validation.warnings.join(', ')}`, priceRecord);
    }

    const newPrice = {
      id: priceRecord.id || 'price-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      unit: 'Quintal',
      date: priceRecord.date || new Date().toISOString().split('T')[0],
      updatedAt: 'Today, ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      isDemo: this.data.dataSourceConfig.mode === 'demo',
      ...priceRecord
    };

    // Replace if exists for same crop and market on same date
    const existingIndex = this.data.prices.findIndex(p => p.cropId === newPrice.cropId && p.marketId === newPrice.marketId);
    if (existingIndex !== -1) {
      newPrice.previousModalPrice = this.data.prices[existingIndex].modalPrice;
      if (newPrice.modalPrice > newPrice.previousModalPrice) newPrice.trend = 'up';
      else if (newPrice.modalPrice < newPrice.previousModalPrice) newPrice.trend = 'down';
      else newPrice.trend = 'stable';

      this.data.prices[existingIndex] = newPrice;
    } else {
      newPrice.previousModalPrice = newPrice.modalPrice;
      newPrice.trend = 'stable';
      this.data.prices.push(newPrice);
    }

    this.checkAlertsForPrice(newPrice);
    this.addSystemLog('INFO', `Price updated for crop ${newPrice.cropId} at mandi ${newPrice.marketId}: ₹${newPrice.modalPrice}/q`);
    this.save();
    return { price: newPrice, warnings: validation.warnings };
  }

  updatePrice(id, updates) {
    const index = this.data.prices.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.data.prices[index] = { ...this.data.prices[index], ...updates };
    this.save();
    return this.data.prices[index];
  }

  deletePrice(id) {
    const index = this.data.prices.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.data.prices.splice(index, 1);
    this.save();
    return true;
  }

  // Price Trends
  getPriceTrends(cropId) {
    return this.data.priceTrends[cropId] || {};
  }

  // Alerts
  getAlerts(userId) {
    if (userId) {
      return this.data.alerts.filter(a => a.userId === userId);
    }
    return this.data.alerts;
  }

  addAlert(alertData) {
    const newAlert = {
      id: 'alert-' + Date.now(),
      status: 'active',
      createdAt: new Date().toISOString(),
      triggeredAt: null,
      ...alertData
    };
    this.data.alerts.unshift(newAlert);
    this.checkAlertsForPrice({ cropId: newAlert.cropId, marketId: newAlert.marketId, modalPrice: alertData.currentPrice });
    this.save();
    return newAlert;
  }

  deleteAlert(id) {
    const index = this.data.alerts.findIndex(a => a.id === id);
    if (index === -1) return false;
    this.data.alerts.splice(index, 1);
    this.save();
    return true;
  }

  checkAlertsForPrice(price) {
    const matchingAlerts = this.data.alerts.filter(a =>
      a.cropId === price.cropId &&
      (!a.marketId || a.marketId === price.marketId) &&
      a.status === 'active'
    );

    matchingAlerts.forEach(alert => {
      const crop = this.getCropById(alert.cropId);
      const market = this.getMarketById(alert.marketId);
      const cropName = crop ? crop.name : 'Crop';
      const marketName = market ? market.name : 'All Markets';

      if (alert.condition === 'above' && price.modalPrice >= alert.targetPrice) {
        alert.status = 'triggered';
        alert.triggeredAt = new Date().toISOString();
        alert.currentPrice = price.modalPrice;
        alert.message = `🎉 Target reached! ${cropName} price at ${marketName} rose to ₹${price.modalPrice}/q (target was ₹${alert.targetPrice}/q).`;
      } else if (alert.condition === 'below' && price.modalPrice <= alert.targetPrice) {
        alert.status = 'triggered';
        alert.triggeredAt = new Date().toISOString();
        alert.currentPrice = price.modalPrice;
        alert.message = `⚠️ Price alert: ${cropName} price at ${marketName} dropped to ₹${price.modalPrice}/q (target was ₹${alert.targetPrice}/q).`;
      }
    });
  }

  // Users
  getUsers() {
    return this.data.users;
  }

  getUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  getUserByPhone(phone) {
    return this.data.users.find(u => u.phone === phone);
  }

  addUser(userData) {
    const newUser = {
      id: 'user-' + Date.now(),
      createdAt: new Date().toISOString(),
      favoriteMarkets: [],
      mainCrops: [],
      ...userData
    };
    this.data.users.push(newUser);
    this.addSystemLog('INFO', `New user registered: ${newUser.name} (${newUser.phone})`);
    this.save();
    return newUser;
  }

  updateUser(id, updates) {
    const index = this.data.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    this.data.users[index] = { ...this.data.users[index], ...updates };
    this.save();
    return this.data.users[index];
  }
}

export const db = new DatabaseService();
