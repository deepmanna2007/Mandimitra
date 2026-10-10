import React, { useState } from 'react';
import { useMandi } from '../context/MandiContext';
import { 
  MapPin, 
  Search, 
  TrendingUp, 
  Calculator, 
  Scale, 
  Layers, 
  Sparkles, 
  Bell, 
  ArrowRight,
  Info
} from 'lucide-react';

interface FarmerDashboardProps {
  setActiveTab: (tab: string) => void;
  setSelectedCropId: (id: string) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ setActiveTab, setSelectedCropId }) => {
  const { 
    t, 
    location, 
    setIsLocationModalOpen, 
    currentUser, 
    highlights, 
    crops,
    dataSourceStatus 
  } = useMandi();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCrops = crops.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.hindiName && c.hindiName.includes(searchTerm)) ||
    (c.bengaliName && c.bengaliName.includes(searchTerm))
  );

  const handleSelectCrop = (cropId: string) => {
    setSelectedCropId(cropId);
    setActiveTab('prices');
  };

  return (
    <div>
      {/* Top Bar Greeting & Location */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 20
      }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--slate-900)' }}>
            👋 {t.greetingFarmer}
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)' }}>
            Welcome back to your daily agricultural price intelligence desk.
          </p>
        </div>

        {/* Current Location Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--white)',
          padding: '8px 16px',
          borderRadius: 'var(--radius-full)',
          border: '1.5px solid var(--primary-200)',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={18} color="#15803d" />
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', lineHeight: 1 }}>
                {t.yourLocation}
              </span>
              <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>
                {location.name}
              </strong>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(true)}
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#15803d',
              padding: '4px 10px',
              background: '#f0fdf4',
              borderRadius: 'var(--radius-full)',
              border: '1px solid #86efac'
            }}
          >
            {t.changeLocation}
          </button>
        </div>
      </div>

      {/* Freshness Banner */}
      <div className="freshness-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="freshness-badge">
            {dataSourceStatus.isDemo ? 'DEMO DATA' : 'LIVE AGMARKNET'}
          </span>
          <span>{dataSourceStatus.disclaimer}</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
          {dataSourceStatus.freshnessLabel}
        </div>
      </div>

      {/* SIGNATURE CARD: "Best Market Near You" (Section 33) */}
      <section className="best-market-hero-card">
        <div className="best-market-badge">
          🌟 {t.bestMarketNearYou}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: '2rem' }}>🥔</span>
              <h2 className="best-market-title" style={{ margin: 0 }}>
                Potato (আলু / आलू)
              </h2>
            </div>

            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#166534', marginBottom: 4 }}>
              🟢 Bankura Mandi
            </div>

            <div className="best-market-price-tag">
              ₹2,780
              <span className="best-market-price-unit">/ quintal</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.9rem', color: '#475569' }}>
                <MapPin size={15} color="#15803d" />
                52 km away from {location.name.split(',')[0]}
              </span>
            </div>

            <div className="best-market-delta">
              ✨ ₹380 more per quintal than your nearest market (Durgapur Mandi)!
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'var(--radius-lg)',
            padding: 20,
            border: '1.5px solid #86efac'
          }}>
            <h3 style={{ fontSize: '1rem', color: '#14532d', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calculator size={18} />
              Estimated Earning Potential (100 Quintals)
            </h3>

            <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: 12 }}>
              <div>Gross Revenue: <strong>100 × ₹2,780 = ₹2,78,000</strong></div>
              <div>Est. Freight (52 km): <strong>-₹8,000</strong></div>
              <div style={{ fontSize: '1.1rem', color: '#15803d', fontWeight: 800, marginTop: 4 }}>
                Net Take-Home: ₹2,70,000
              </div>
              <div style={{ fontSize: '0.85rem', color: '#ca8a04', fontWeight: 700 }}>
                Gain over selling locally: +₹34,000 extra profit!
              </div>
            </div>

            <button 
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                setSelectedCropId('crop-potato');
                setActiveTab('calculator');
              }}
            >
              Open Transport Profit Calculator ➔
            </button>
          </div>
        </div>
      </section>

      {/* Prominent Crop Search Bar (Section 8) */}
      <section style={{ marginBottom: 28 }}>
        <div className="search-bar-wrap">
          <Search size={22} className="search-icon-inside" />
          <input
            type="text"
            className="search-input"
            placeholder={t.searchCropPlaceholder}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Quick Crop Chips */}
        <div style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          padding: '12px 0 4px 0',
          scrollbarWidth: 'none'
        }}>
          {filteredCrops.map(c => (
            <button
              key={c.id}
              onClick={() => handleSelectCrop(c.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#334155',
                whiteSpace: 'nowrap',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Today's Highlights (Section 7) */}
      <section style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: '1.35rem' }}>{t.todaysHighlights}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
              Live market intelligence across Paschim & Purba Bardhaman, Bankura
            </p>
          </div>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => setActiveTab('prices')}
          >
            All Prices ➔
          </button>
        </div>

        <div className="grid-3">
          {highlights.map(item => (
            <div 
              key={item.cropId} 
              className="highlight-card"
              onClick={() => handleSelectCrop(item.cropId)}
              style={{ cursor: 'pointer' }}
            >
              <div className="highlight-header">
                <div className="highlight-crop-title">
                  <span className="highlight-crop-icon">{item.cropIcon}</span>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{item.cropName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Best rate discovered</div>
                  </div>
                </div>
                <span className={`trend-badge trend-${item.trend}`}>
                  {item.trend === 'up' ? '↑ Rising' : item.trend === 'down' ? '↓ Falling' : '● Stable'}
                </span>
              </div>

              <div className="highlight-price-box">
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                  BEST NEARBY PRICE
                </div>
                <div className="highlight-price">
                  ₹{item.bestPrice.toLocaleString('en-IN')}
                  <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
                    /{item.unit.toLowerCase()}
                  </span>
                </div>
                <div className="highlight-market">
                  <MapPin size={15} color="#15803d" />
                  <strong>{item.bestMarketName}</strong>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 2 }}>
                  📍 {item.bestDistanceKm} km from {location.name.split(',')[0]}
                </div>
              </div>

              {item.priceDifference > 0 && (
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#15803d',
                  background: '#f0fdf4',
                  padding: '6px 10px',
                  borderRadius: 8,
                  marginBottom: 10
                }}>
                  +₹{item.priceDifference}/q higher than {item.nearestMarketName.split(' ')[0]}
                </div>
              )}

              <div className="highlight-footer">
                <span>{item.updatedAt}</span>
                <span style={{ color: '#15803d', fontWeight: 700 }}>
                  Compare Mandis ➔
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Action Hub */}
      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 14 }}>
          Farmer Decision Tools
        </h2>

        <div className="grid-4">
          <div 
            className="card" 
            onClick={() => setActiveTab('calculator')}
            style={{ cursor: 'pointer', borderLeft: '4px solid #16a34a' }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <Calculator size={20} color="#15803d" />
            </div>
            <h3 style={{ fontSize: '1rem', marginBottom: 4 }}>Best Market For Me</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Calculate transport cost vs mandi price to find your net profit winner.
            </p>
          </div>

          <div 
            className="card" 
            onClick={() => setActiveTab('compare')}
            style={{ cursor: 'pointer', borderLeft: '4px solid #ca8a04' }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fef9c3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <Scale size={20} color="#ca8a04" />
            </div>
            <h3 style={{ fontSize: '1rem', marginBottom: 4 }}>Compare 4 Mandis</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Side-by-side comparison of Bankura, Burdwan, Durgapur and Asansol.
            </p>
          </div>

          <div 
            className="card" 
            onClick={() => setActiveTab('map')}
            style={{ cursor: 'pointer', borderLeft: '4px solid #0284c7' }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <Layers size={20} color="#0284c7" />
            </div>
            <h3 style={{ fontSize: '1rem', marginBottom: 4 }}>Nearby Mandi Map</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Interactive OpenStreetMap showing mandis, distances & rates.
            </p>
          </div>

          <div 
            className="card" 
            onClick={() => setActiveTab('ai')}
            style={{ cursor: 'pointer', borderLeft: '4px solid #9333ea' }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <Sparkles size={20} color="#9333ea" />
            </div>
            <h3 style={{ fontSize: '1rem', marginBottom: 4 }}>MandiMitra AI Saathi</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Powered by Gemini. Voice query & intelligent selling advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
