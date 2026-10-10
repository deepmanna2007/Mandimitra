import React from 'react';
import { useMandi } from '../context/MandiContext';
import { 
  TrendingUp, 
  MapPin, 
  Calculator, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  Coins, 
  Scale
} from 'lucide-react';

interface LandingPageProps {
  setActiveTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab }) => {
  const { t, highlights, dataSourceStatus } = useMandi();

  return (
    <div>
      {/* Freshness Disclaimer */}
      <div className="freshness-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="freshness-badge">
            {dataSourceStatus.isDemo ? 'DEMO DATA' : 'LIVE API'}
          </span>
          <span>{dataSourceStatus.disclaimer}</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
          {dataSourceStatus.freshnessLabel}
        </div>
      </div>

      {/* Hero Section */}
      <section style={{
        padding: '36px 0 48px 0',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: 840 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--primary-100)',
            color: 'var(--primary-800)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: 16
          }}>
            <Sparkles size={16} />
            India's First Farmer-Centric Mandi Net-Profit Intelligence
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            marginBottom: 16,
            color: 'var(--slate-900)'
          }}>
            {t.heroHeadline}
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
            color: 'var(--slate-600)',
            lineHeight: 1.6,
            marginBottom: 28,
            maxWidth: 680
          }}>
            {t.heroSubheadline}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => setActiveTab('prices')}
            >
              <TrendingUp size={20} />
              {t.btnCheckPrices}
            </button>

            <button 
              className="btn btn-harvest btn-lg"
              onClick={() => setActiveTab('calculator')}
            >
              <Calculator size={20} />
              {t.navBestMarket}
            </button>

            <button 
              className="btn btn-outline btn-lg"
              onClick={() => setActiveTab('map')}
            >
              <MapPin size={20} />
              {t.btnExploreMandis}
            </button>
          </div>
        </div>

        {/* Visual Workflow Diagram */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
          border: '1.5px solid var(--primary-200)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary-800)' }}>
              How MandiMitra Powers Your Selling Decision
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 12,
            alignItems: 'center'
          }}>
            <div style={{ background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>👨‍🌾</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>1. You & Crop</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>e.g. 100q Potato</div>
            </div>

            <div style={{ textAlign: 'center', color: '#16a34a' }}>➔</div>

            <div style={{ background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>📍</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>2. Nearby Mandis</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Durgapur, Bankura...</div>
            </div>

            <div style={{ textAlign: 'center', color: '#16a34a' }}>➔</div>

            <div style={{ background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>🚚</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>3. Transport Math</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Fuel & Freight cost</div>
            </div>

            <div style={{ textAlign: 'center', color: '#16a34a' }}>➔</div>

            <div style={{ background: '#dcfce7', padding: 14, borderRadius: 12, border: '2px solid #16a34a', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>💰</div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#14532d' }}>4. Net Profit Winner</div>
              <div style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 700 }}>+₹34,000 Earning!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Real Bengal Mandi Rates Ticker */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: '1.4rem' }}>{t.todaysHighlights}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
              Top prices discovered around Durgapur, Burdwan & Bankura
            </p>
          </div>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => setActiveTab('prices')}
          >
            View All Mandis <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid-4">
          {highlights.map(item => (
            <div key={item.cropId} className="highlight-card">
              <div className="highlight-header">
                <div className="highlight-crop-title">
                  <span className="highlight-crop-icon">{item.cropIcon}</span>
                  <span>{item.cropName}</span>
                </div>
                <span className={`trend-badge trend-${item.trend}`}>
                  {item.trend === 'up' ? '↑ Rising' : item.trend === 'down' ? '↓ Falling' : '● Stable'}
                </span>
              </div>

              <div className="highlight-price-box">
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                  BEST NEARBY PRICE
                </div>
                <div className="highlight-price">
                  ₹{item.bestPrice.toLocaleString('en-IN')}
                  <span style={{ fontSize: '0.9rem', color: 'var(--slate-500)', fontWeight: 500 }}>
                    /{item.unit.toLowerCase()}
                  </span>
                </div>
                <div className="highlight-market">
                  <MapPin size={14} color="#15803d" />
                  <span>{item.bestMarketName}</span>
                  <span style={{ color: '#64748b', fontSize: '0.8rem' }}>({item.bestDistanceKm} km)</span>
                </div>
              </div>

              {item.priceDifference > 0 && (
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#15803d',
                  background: '#f0fdf4',
                  padding: '4px 8px',
                  borderRadius: 6,
                  marginBottom: 10
                }}>
                  +₹{item.priceDifference}/q more than {item.nearestMarketName.split(' ')[0]}
                </div>
              )}

              <div className="highlight-footer">
                <span>{item.updatedAt}</span>
                <button
                  style={{ color: '#15803d', fontWeight: 700, fontSize: '0.8rem' }}
                  onClick={() => setActiveTab('calculator')}
                >
                  Calculate Net ➔
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Value Proposition: The Rahul Scenario */}
      <section style={{
        background: 'linear-gradient(135deg, #14532d 0%, #0f3d1e 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: '36px',
        marginBottom: 48,
        boxShadow: 'var(--shadow-xl)'
      }}>
        <div style={{ maxWidth: 880 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: 12
          }}>
            <Coins size={15} color="#facc15" />
            REAL DECISION SCENARIO
          </div>

          <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: '#ffffff', marginBottom: 12 }}>
            "I have 100 quintals of potato. Where should I sell today?"
          </h2>

          <p style={{ fontSize: '1rem', color: '#bbf7d0', lineHeight: 1.6, marginBottom: 24 }}>
            Local mandis might be just 12 km away, but an extra 40 km drive to Bankura offers ₹380 more per quintal.
            MandiMitra deducts all estimated transport fuel & vehicle costs to prove your actual take-home profit.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 24
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.85rem', color: '#86efac' }}>Durgapur Mandi (12 km)</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, margin: '4px 0' }}>₹2,400 / q</div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Gross: ₹2,40,000</div>
              <div style={{ fontSize: '0.8rem', color: '#fca5a5' }}>Transport: -₹4,000</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#facc15', marginTop: 4 }}>Net: ₹2,36,000</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.85rem', color: '#86efac' }}>Burdwan Mandi (38 km)</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, margin: '4px 0' }}>₹2,650 / q</div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Gross: ₹2,65,000</div>
              <div style={{ fontSize: '0.8rem', color: '#fca5a5' }}>Transport: -₹6,000</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#facc15', marginTop: 4 }}>Net: ₹2,59,000</div>
            </div>

            <div style={{ background: 'rgba(34, 197, 94, 0.2)', padding: 16, borderRadius: 12, border: '2px solid #4ade80' }}>
              <div style={{ fontSize: '0.85rem', color: '#4ade80', fontWeight: 700 }}>🟢 Bankura Mandi (52 km)</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, margin: '4px 0', color: '#fff' }}>₹2,780 / q</div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Gross: ₹2,78,000</div>
              <div style={{ fontSize: '0.8rem', color: '#fca5a5' }}>Transport: -₹8,000</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#4ade80', marginTop: 4 }}>Net: ₹2,70,000</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            background: 'rgba(0, 0, 0, 0.25)',
            padding: '16px 20px',
            borderRadius: 12
          }}>
            <div>
              <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>MandiMitra Recommendation: </span>
              <strong style={{ color: '#4ade80', fontSize: '1.05rem' }}>Sell at Bankura Mandi</strong>
              <div style={{ fontSize: '0.85rem', color: '#facc15', fontWeight: 700 }}>
                Earn ₹34,000 MORE than selling locally!
              </div>
            </div>

            <button 
              className="btn btn-harvest"
              onClick={() => setActiveTab('calculator')}
            >
              Test with Your Own Harvest ➔
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Pillars */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: '1.4rem', textAlign: 'center', marginBottom: 24 }}>
          Built for Farmers. Backed by Data.
        </h2>

        <div className="grid-3">
          <div className="card">
            <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Scale size={24} color="#15803d" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: 8 }}>Transparent Spot Prices</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>
              Compare modal, minimum, and maximum rates across regulated APMC mandis. Never sell blind to middlemen again.
            </p>
          </div>

          <div className="card">
            <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fefce8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Truck size={24} color="#ca8a04" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: 8 }}>Real Transport Accounting</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>
              We factor in truck, pickup, and tractor freight rates so you know if traveling to a distant mandi actually yields higher profit.
            </p>
          </div>

          <div className="card">
            <div style={{ width: 44, height: 44, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Sparkles size={24} color="#0284c7" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: 8 }}>Gemini AI "MandiMitra Saathi"</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>
              Ask questions in your mother tongue (English, हिन्दी, বাংলা) with voice queries. Receive storage and timing guidance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
