import React from 'react';
import { useMandi } from '../context/MandiContext';
import { 
  MapPin, 
  TrendingUp, 
  Sparkles, 
  User, 
  BarChart2, 
  Calculator, 
  Layers, 
  ShieldCheck, 
  Bell,
  Scale
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { 
    t, 
    language, 
    setLanguage, 
    location, 
    setIsLocationModalOpen, 
    currentUser, 
    setIsAuthModalOpen,
    alerts
  } = useMandi();

  const triggeredCount = alerts.filter(a => a.status === 'triggered').length;

  return (
    <header className="navbar">
      <div className="nav-inner">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => setActiveTab('landing')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon-box">
            <span style={{ fontSize: '1.4rem' }}>🌾</span>
          </div>
          <div className="brand-text-wrap">
            <div className="brand-title">
              {t.appName}
              <span className="brand-badge">BETA</span>
            </div>
            <span className="brand-tagline">{t.tagline}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            {t.navHome}
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'prices' ? 'active' : ''}`}
            onClick={() => setActiveTab('prices')}
          >
            <TrendingUp size={16} />
            {t.navPrices}
          </button>

          <button 
            className={`nav-item ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
            style={{ color: activeTab === 'calculator' ? undefined : '#15803d' }}
          >
            <Calculator size={16} />
            {t.navBestMarket}
          </button>

          <button 
            className={`nav-item ${activeTab === 'compare' ? 'active' : ''}`}
            onClick={() => setActiveTab('compare')}
          >
            <Scale size={16} />
            {t.navCompare}
          </button>

          <button 
            className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <Layers size={16} />
            {t.navNearbyMap}
          </button>

          <button 
            className={`nav-item ${activeTab === 'trends' ? 'active' : ''}`}
            onClick={() => setActiveTab('trends')}
          >
            <BarChart2 size={16} />
            {t.navTrends}
          </button>

          <button 
            className={`nav-item ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
            style={{ 
              background: activeTab === 'ai' ? 'var(--harvest-100)' : 'transparent',
              color: 'var(--harvest-700)',
              fontWeight: 700 
            }}
          >
            <Sparkles size={16} />
            {t.navAiSaathi}
          </button>

          {currentUser.role === 'admin' && (
            <button 
              className={`nav-item ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
              style={{ color: '#c2410c' }}
            >
              <ShieldCheck size={16} />
              Admin
            </button>
          )}
        </nav>

        {/* Actions: Location, Language, Profile */}
        <div className="nav-actions">
          {/* Location Chip */}
          <button 
            className="location-chip"
            onClick={() => setIsLocationModalOpen(true)}
            title="Change your district or mandis"
          >
            <MapPin size={15} color="#15803d" />
            <span>{location.name.split(',')[0]}</span>
          </button>

          {/* Language Switcher */}
          <div className="lang-selector">
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button 
              className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
              onClick={() => setLanguage('hi')}
            >
              हिं
            </button>
            <button 
              className={`lang-btn ${language === 'bn' ? 'active' : ''}`}
              onClick={() => setLanguage('bn')}
            >
              বাং
            </button>
          </div>

          {/* Alerts Counter */}
          <button 
            className="btn btn-outline btn-sm" 
            style={{ position: 'relative', padding: '6px 10px' }}
            onClick={() => setActiveTab('alerts')}
            title="Price Alerts"
          >
            <Bell size={18} />
            {triggeredCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -4,
                right: -4,
                background: '#dc2626',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 700,
                width: 16,
                height: 16,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {triggeredCount}
              </span>
            )}
          </button>

          {/* Farmer Profile / Login */}
          <button 
            className="user-profile-chip"
            onClick={() => setIsAuthModalOpen(true)}
          >
            <User size={16} />
            <span style={{ display: 'none', minWidth: 60 }} className="desktop-user-name">
              {currentUser.name.split(' ')[0]}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
