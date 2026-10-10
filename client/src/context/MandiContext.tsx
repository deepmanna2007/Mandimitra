import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';
import type { Language, Translations } from '../i18n/translations';

export interface LocationInfo {
  name: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface Crop {
  id: string;
  name: string;
  hindiName?: string;
  bengaliName?: string;
  category: string;
  unit: string;
  icon: string;
  basePrice: number;
  msp?: number | null;
  perishability?: string;
  season?: string;
  active: boolean;
}

export interface Market {
  id: string;
  name: string;
  state: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  distanceKm?: number;
  marketType: string;
  operatingHours: string;
  facilities: string[];
  contactPhone: string;
  active: boolean;
}

export interface PriceRecord {
  id: string;
  cropId: string;
  cropName?: string;
  cropIcon?: string;
  cropCategory?: string;
  marketId: string;
  marketName?: string;
  district?: string;
  state?: string;
  minimumPrice: number;
  maximumPrice: number;
  modalPrice: number;
  unit: string;
  arrivals: string;
  trend: 'up' | 'down' | 'stable';
  previousModalPrice: number;
  date: string;
  updatedAt: string;
  source: string;
  distanceKm?: number;
  isBestPrice?: boolean;
}

export interface HighlightItem {
  cropId: string;
  cropName: string;
  cropIcon: string;
  bestPrice: number;
  bestMarketName: string;
  bestMarketId: string;
  bestDistanceKm: number;
  trend: 'up' | 'down' | 'stable';
  nearestMarketName: string;
  nearestPrice: number;
  priceDifference: number;
  unit: string;
  updatedAt: string;
}

export interface UserAlert {
  id: string;
  userId: string;
  cropId: string;
  cropName: string;
  marketId: string | null;
  marketName: string;
  targetPrice: number;
  condition: 'above' | 'below';
  status: 'active' | 'triggered';
  currentPrice: number;
  message?: string;
  createdAt: string;
  triggeredAt: string | null;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'farmer' | 'admin';
  state: string;
  district: string;
  village: string;
  latitude: number;
  longitude: number;
  preferredLanguage: Language;
  mainCrops: string[];
  approxQuantity: string;
  favoriteMarkets: string[];
}

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warn' | 'error';
  message: string;
}

interface MandiContextType {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
  location: LocationInfo;
  setLocation: (loc: LocationInfo) => void;
  crops: Crop[];
  markets: Market[];
  highlights: HighlightItem[];
  alerts: UserAlert[];
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  createAlert: (alertData: Partial<UserAlert>) => Promise<boolean>;
  deleteAlert: (alertId: string) => Promise<boolean>;
  toggleFavoriteCrop: (cropId: string) => void;
  toggleFavoriteMarket: (marketId: string) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  dataSourceStatus: {
    mode: string;
    isDemo: boolean;
    disclaimer: string;
    freshnessLabel: string;
  };
}

const defaultLocation: LocationInfo = {
  name: 'Durgapur, West Bengal',
  district: 'Paschim Bardhaman',
  state: 'West Bengal',
  latitude: 23.5204,
  longitude: 87.3119
};

const defaultFarmer: UserProfile = {
  id: 'user-rahul',
  name: 'Rahul Mondal',
  phone: '9876543210',
  email: 'rahul.farmer@gmail.com',
  role: 'farmer',
  state: 'West Bengal',
  district: 'Paschim Bardhaman',
  village: 'Gopalpur, Durgapur',
  latitude: 23.5204,
  longitude: 87.3119,
  preferredLanguage: 'en',
  mainCrops: ['crop-potato', 'crop-rice', 'crop-onion'],
  approxQuantity: '100 Quintals',
  favoriteMarkets: ['mandi-bankura', 'mandi-burdwan', 'mandi-durgapur']
};

const MandiContext = createContext<MandiContextType | undefined>(undefined);

export const MandiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [location, setLocationState] = useState<LocationInfo>(defaultLocation);
  const [currentUser, setCurrentUser] = useState<UserProfile>(defaultFarmer);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [alerts, setAlerts] = useState<UserAlert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [dataSourceStatus, setDataSourceStatus] = useState({
    mode: 'demo',
    isDemo: true,
    disclaimer: 'Demo data — not for real trading decisions.',
    freshnessLabel: 'Updated today, 10:30 AM'
  });

  const t = translations[language] || translations.en;

  const showToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4500);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (currentUser) {
      setCurrentUser(prev => ({ ...prev, preferredLanguage: lang }));
    }
  };

  const setLocation = (loc: LocationInfo) => {
    setLocationState(loc);
    showToast(`📍 Location updated to ${loc.name}`, 'success');
  };

  const refreshData = async () => {
    try {
      setIsLoading(true);
      const [cropsRes, marketsRes, highlightsRes, alertsRes, statusRes] = await Promise.all([
        fetch('/api/crops').then(r => r.json()).catch(() => null),
        fetch(`/api/markets?userLat=${location.latitude}&userLng=${location.longitude}`).then(r => r.json()).catch(() => null),
        fetch(`/api/prices/highlights?userLat=${location.latitude}&userLng=${location.longitude}`).then(r => r.json()).catch(() => null),
        fetch(`/api/alerts?userId=${currentUser.id}`).then(r => r.json()).catch(() => null),
        fetch('/api/status').then(r => r.json()).catch(() => null)
      ]);

      if (cropsRes && cropsRes.data) setCrops(cropsRes.data);
      if (marketsRes && marketsRes.data) setMarkets(marketsRes.data);
      if (highlightsRes && highlightsRes.data) setHighlights(highlightsRes.data);
      if (alertsRes && alertsRes.data) setAlerts(alertsRes.data);
      if (statusRes) {
        setDataSourceStatus({
          mode: statusRes.mode || 'demo',
          isDemo: statusRes.isDemo ?? true,
          disclaimer: statusRes.disclaimer || 'Demo data — not for real trading decisions.',
          freshnessLabel: statusRes.freshnessLabel || 'Updated today, 10:30 AM'
        });
      }
    } catch (err) {
      console.error('Error fetching mandi data:', err);
      showToast('⚠️ Could not connect to MandiMitra server. Displaying cached records.', 'warn');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [location.latitude, location.longitude, currentUser.id]);

  const createAlert = async (alertData: Partial<UserAlert>): Promise<boolean> => {
    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...alertData,
          userId: currentUser.id
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAlerts(prev => [data.data, ...prev]);
        showToast('🔔 Price alert created successfully!', 'success');
        return true;
      }
      return false;
    } catch {
      showToast('Failed to create alert.', 'error');
      return false;
    }
  };

  const deleteAlert = async (alertId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/alerts/${alertId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setAlerts(prev => prev.filter(a => a.id !== alertId));
        showToast('Alert removed.', 'info');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const toggleFavoriteCrop = (cropId: string) => {
    setCurrentUser(prev => {
      const exists = prev.mainCrops.includes(cropId);
      const updated = exists ? prev.mainCrops.filter(id => id !== cropId) : [...prev.mainCrops, cropId];
      showToast(exists ? 'Removed crop from My Crops' : 'Added crop to My Crops', 'info');
      return { ...prev, mainCrops: updated };
    });
  };

  const toggleFavoriteMarket = (marketId: string) => {
    setCurrentUser(prev => {
      const exists = prev.favoriteMarkets.includes(marketId);
      const updated = exists ? prev.favoriteMarkets.filter(id => id !== marketId) : [...prev.favoriteMarkets, marketId];
      showToast(exists ? 'Removed mandi from Saved Markets' : 'Saved mandi to My Markets ⭐', 'info');
      return { ...prev, favoriteMarkets: updated };
    });
  };

  return (
    <MandiContext.Provider
      value={{
        language,
        t,
        setLanguage,
        location,
        setLocation,
        crops,
        markets,
        highlights,
        alerts,
        currentUser,
        setCurrentUser,
        isLoading,
        refreshData,
        createAlert,
        deleteAlert,
        toggleFavoriteCrop,
        toggleFavoriteMarket,
        toasts,
        showToast,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        dataSourceStatus
      }}
    >
      {children}
    </MandiContext.Provider>
  );
};

export const useMandi = () => {
  const context = useContext(MandiContext);
  if (!context) {
    throw new Error('useMandi must be used within a MandiProvider');
  }
  return context;
};
