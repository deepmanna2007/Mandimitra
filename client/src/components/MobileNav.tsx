import React from 'react';
import { useMandi } from '../context/MandiContext';
import { Home, TrendingUp, Calculator, Map, Sparkles, Bell } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const { t, alerts } = useMandi();
  const triggeredCount = alerts.filter(a => a.status === 'triggered').length;

  return (
    <nav className="mobile-nav">
      <button 
        className={`mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
        onClick={() => setActiveTab('dashboard')}
      >
        <Home size={20} />
        <span>{t.navHome}</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'prices' ? 'active' : ''}`}
        onClick={() => setActiveTab('prices')}
      >
        <TrendingUp size={20} />
        <span>{t.navPrices}</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'calculator' ? 'active' : ''}`}
        onClick={() => setActiveTab('calculator')}
      >
        <Calculator size={20} />
        <span>{t.navBestMarket.split(' ')[0]}</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'map' ? 'active' : ''}`}
        onClick={() => setActiveTab('map')}
      >
        <Map size={20} />
        <span>{t.navNearbyMap.split(' ')[0]}</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'ai' ? 'active' : ''}`}
        onClick={() => setActiveTab('ai')}
      >
        <Sparkles size={20} />
        <span>{t.navAiSaathi}</span>
      </button>

      <button 
        className={`mobile-nav-item ${activeTab === 'alerts' ? 'active' : ''}`}
        onClick={() => setActiveTab('alerts')}
        style={{ position: 'relative' }}
      >
        <Bell size={20} />
        <span>{t.navAlerts.split(' ')[0]}</span>
        {triggeredCount > 0 && (
          <span style={{
            position: 'absolute',
            top: 2,
            right: 18,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#dc2626'
          }} />
        )}
      </button>
    </nav>
  );
};
