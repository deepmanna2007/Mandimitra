import React, { useState, useEffect } from 'react';
import { useMandi } from '../context/MandiContext';
import confetti from 'canvas-confetti';
import { 
  Calculator, 
  Truck, 
  MapPin, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Info, 
  Coins, 
  Award,
  CheckCircle2
} from 'lucide-react';

interface BestMarketCalculatorPageProps {
  selectedCropId: string;
  setSelectedCropId: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export const BestMarketCalculatorPage: React.FC<BestMarketCalculatorPageProps> = ({
  selectedCropId,
  setSelectedCropId,
  setActiveTab
}) => {
  const { t, location, crops, dataSourceStatus } = useMandi();
  const [quantity, setQuantity] = useState<number>(100);
  const [vehicleType, setVehicleType] = useState<string>('pickup');
  const [result, setResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const currentCrop = crops.find(c => c.id === selectedCropId) || crops[0] || {
    id: 'crop-potato',
    name: 'Potato',
    icon: '🥔'
  };

  const runCalculation = async () => {
    try {
      setIsCalculating(true);
      const res = await fetch('/api/calculator/best-market', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropId: currentCrop.id,
          quantityQuintals: quantity,
          userLat: location.latitude,
          userLng: location.longitude,
          vehicleType
        })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data);
        if (data.additionalEarning > 0) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        }
      }
    } catch (err) {
      console.error('Calculation error:', err);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    runCalculation();
  }, [currentCrop.id, quantity, vehicleType, location.latitude, location.longitude]);

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calculator size={24} color="#15803d" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.9rem', color: 'var(--slate-900)' }}>
              "Best Market For Me" Profit Engine
            </h1>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
              We calculate fuel, distance, and mandi prices so you take home maximum profit.
            </p>
          </div>
        </div>
      </div>

      {/* Freshness Banner */}
      <div className="freshness-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="freshness-badge">
            {dataSourceStatus.isDemo ? 'DEMO DATA' : 'LIVE FEED'}
          </span>
          <span>{dataSourceStatus.disclaimer}</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
          {dataSourceStatus.freshnessLabel}
        </div>
      </div>

      {/* Input Parameters Form Card */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: '24px',
        marginBottom: 28,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h2 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: 16 }}>
          1. Enter Your Harvest Details
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {/* Crop Selector */}
          <div className="form-group">
            <label className="form-label">Selected Crop / Commodity</label>
            <select
              className="form-select"
              value={currentCrop.id}
              onChange={e => setSelectedCropId(e.target.value)}
            >
              {crops.map(c => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name} {c.bengaliName ? `(${c.bengaliName})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity in Quintals */}
          <div className="form-group">
            <label className="form-label">
              Harvest Quantity (Quintals)
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 400 }}> (100 kg = 1 quintal)</span>
            </label>
            <input
              type="number"
              min="1"
              max="2000"
              className="form-input"
              value={quantity}
              onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
            />
          </div>

          {/* Current Farmer Location */}
          <div className="form-group">
            <label className="form-label">Farmer Origin Location</label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '11px 14px',
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: 12
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', fontWeight: 600 }}>
                <MapPin size={16} color="#15803d" />
                <span>{location.name}</span>
              </div>
            </div>
          </div>

          {/* Vehicle Type */}
          <div className="form-group">
            <label className="form-label">Transport Vehicle Mode</label>
            <select
              className="form-select"
              value={vehicleType}
              onChange={e => setVehicleType(e.target.value)}
            >
              <option value="pickup">Pickup Van (Bolero Maxi / Tata Ace)</option>
              <option value="tractor">Tractor Trolley</option>
              <option value="truck">Medium Truck (Tata 407 / Eicher Pro)</option>
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS DISPLAY */}
      {result && result.recommendedMarket && (
        <div>
          {/* WINNER RECOMMENDATION BANNER (Section 11 & 35 Benchmark) */}
          <div style={{
            background: 'linear-gradient(135deg, #0f3d1e 0%, #15803d 100%)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '32px',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-xl)',
            border: '2px solid #4ade80',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{
                background: '#4ade80',
                color: '#0f3d1e',
                padding: '4px 14px',
                borderRadius: 20,
                fontSize: '0.82rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                🟢 RECOMMENDED MARKET (BEST FOR YOU)
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', color: '#ffffff', margin: '4px 0 8px 0' }}>
                  {result.recommendedMarket.marketName}
                </h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#bbf7d0', fontSize: '1rem', marginBottom: 16 }}>
                  <span>📍 {result.recommendedMarket.distanceKm} km away</span>
                  <span>•</span>
                  <span>Mandi Price: <strong>₹{result.recommendedMarket.modalPrice}/quintal</strong></span>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(10px)',
                  padding: '16px 20px',
                  borderRadius: 14,
                  display: 'inline-block'
                }}>
                  <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                    Net Estimated Take-Home (After All Transport Costs):
                  </div>
                  <div style={{
                    fontSize: '2.4rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    color: '#facc15'
                  }}>
                    ₹{result.recommendedMarket.netRevenue.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Extra Earning Celebration */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 16,
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: 6 }}>🎉</div>
                <div style={{ fontSize: '0.9rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Estimated Additional Earning
                </div>
                <div style={{
                  fontSize: '2.6rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  color: '#4ade80',
                  margin: '4px 0'
                }}>
                  +₹{result.additionalEarning.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#bbf7d0' }}>
                  compared to selling locally at {result.nearestMarket.marketName}!
                </div>

                <button
                  className="btn btn-harvest btn-sm"
                  style={{ marginTop: 16 }}
                  onClick={() => setActiveTab('map')}
                >
                  <MapPin size={15} />
                  View Route to {result.recommendedMarket.marketName}
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: 24,
              paddingTop: 16,
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '0.82rem',
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <Info size={16} />
              <span>{result.disclaimer}</span>
            </div>
          </div>

          {/* Breakdown Comparison Across All Evaluated Mandis (Section 35) */}
          <h3 style={{ fontSize: '1.3rem', marginBottom: 16 }}>
            Complete Financial Breakdown Across Nearby Mandis
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
            marginBottom: 36
          }}>
            {result.allEvaluatedMarkets.map((m: any) => {
              const isRecommended = m.marketId === result.recommendedMarket.marketId;
              const isNearest = m.marketId === result.nearestMarket.marketId;

              return (
                <div
                  key={m.marketId}
                  style={{
                    background: '#ffffff',
                    border: isRecommended ? '2.5px solid #16a34a' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 20,
                    boxShadow: isRecommended ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                    position: 'relative'
                  }}
                >
                  {isRecommended && (
                    <span style={{
                      position: 'absolute',
                      top: -10,
                      left: 16,
                      background: '#15803d',
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 12
                    }}>
                      RECOMMENDED WINNER
                    </span>
                  )}
                  {isNearest && !isRecommended && (
                    <span style={{
                      position: 'absolute',
                      top: -10,
                      left: 16,
                      background: '#64748b',
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 12
                    }}>
                      NEAREST LOCAL MARKET
                    </span>
                  )}

                  <div style={{ marginTop: isRecommended || isNearest ? 6 : 0, marginBottom: 12 }}>
                    <h4 style={{ fontSize: '1.15rem', color: '#0f172a' }}>{m.marketName}</h4>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      📍 Distance: <strong>{m.distanceKm} km</strong>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Mandi Price:</span>
                      <strong>₹{m.modalPrice.toLocaleString('en-IN')}/q</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Gross Revenue ({quantity} q):</span>
                      <span>₹{m.grossRevenue.toLocaleString('en-IN')}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dc2626' }}>
                      <span>Transport Cost:</span>
                      <strong>-₹{m.transportCost.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <div style={{
                    padding: '12px',
                    background: isRecommended ? '#dcfce7' : '#f8fafc',
                    borderRadius: 10,
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>
                      ESTIMATED NET EARNINGS
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: isRecommended ? '#15803d' : '#0f172a'
                    }}>
                      ₹{m.netRevenue.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
