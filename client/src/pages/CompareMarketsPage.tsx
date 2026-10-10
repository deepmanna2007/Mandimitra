import React, { useState, useEffect } from 'react';
import { useMandi } from '../context/MandiContext';
import { Scale, TrendingUp, TrendingDown, Minus, MapPin, Calculator, Plus, X } from 'lucide-react';

interface CompareMarketsPageProps {
  selectedCropId: string;
  setSelectedCropId: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export const CompareMarketsPage: React.FC<CompareMarketsPageProps> = ({
  selectedCropId,
  setSelectedCropId,
  setActiveTab
}) => {
  const { location, crops, markets } = useMandi();
  const [selectedMarketIds, setSelectedMarketIds] = useState<string[]>([
    'mandi-durgapur',
    'mandi-bankura',
    'mandi-burdwan',
    'mandi-asansol'
  ]);
  const [comparisonData, setComparisonData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const currentCrop = crops.find(c => c.id === selectedCropId) || crops[0] || {
    id: 'crop-potato',
    name: 'Potato',
    icon: '🥔'
  };

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/prices/compare', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cropId: currentCrop.id,
            marketIds: selectedMarketIds,
            userLat: location.latitude,
            userLng: location.longitude
          })
        });
        const data = await res.json();
        if (data.success && data.data) {
          setComparisonData(data.data);
        }
      } catch (err) {
        console.error('Error fetching comparison:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComparison();
  }, [currentCrop.id, selectedMarketIds, location.latitude, location.longitude]);

  const toggleMarket = (marketId: string) => {
    if (selectedMarketIds.includes(marketId)) {
      if (selectedMarketIds.length > 2) {
        setSelectedMarketIds(prev => prev.filter(id => id !== marketId));
      }
    } else {
      if (selectedMarketIds.length < 5) {
        setSelectedMarketIds(prev => [...prev, marketId]);
      }
    }
  };

  const comparedList = comparisonData?.markets || [];
  const bestMandi = comparedList.find((m: any) => m.isBest);
  const baselineMandi = comparedList.find((m: any) => m.marketId === 'mandi-durgapur') || comparedList[0];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Scale size={28} color="#15803d" />
          <h1 style={{ fontSize: '1.9rem', color: 'var(--slate-900)' }}>
            Compare {currentCrop.name} Prices Across Mandis
          </h1>
        </div>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
          Side-by-side comparison of prices, distances, and daily trends from {location.name.split(',')[0]}.
        </p>
      </div>

      {/* Crop Ribbon */}
      <div style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        padding: '6px 0 16px 0',
        marginBottom: 16
      }}>
        {crops.map(c => {
          const isSelected = c.id === currentCrop.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCropId(c.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                border: isSelected ? '2px solid var(--primary-600)' : '1px solid var(--slate-300)',
                background: isSelected ? 'var(--primary-100)' : 'var(--white)',
                color: isSelected ? 'var(--primary-900)' : 'var(--slate-700)',
                fontWeight: isSelected ? 700 : 500,
                fontSize: '0.9rem',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Mandi Selector Badges */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: '16px 20px',
        marginBottom: 24
      }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: 10 }}>
          Select Mandis to Compare (2 to 4 markets):
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {markets.slice(0, 8).map(m => {
            const isChecked = selectedMarketIds.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => toggleMarket(m.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: 20,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: isChecked ? '2px solid #16a34a' : '1px solid #cbd5e1',
                  background: isChecked ? '#dcfce7' : '#ffffff',
                  color: isChecked ? '#14532d' : '#475569'
                }}
              >
                <span>{m.name}</span>
                {isChecked ? <X size={14} /> : <Plus size={14} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Head-to-Head Highlight Banner (Section 10) */}
      {bestMandi && baselineMandi && bestMandi.marketId !== baselineMandi.marketId && (
        <div style={{
          background: 'linear-gradient(135deg, #15803d, #14532d)',
          color: '#ffffff',
          borderRadius: 16,
          padding: '20px 24px',
          marginBottom: 24,
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#86efac', textTransform: 'uppercase' }}>
              HEAD-TO-HEAD COMPARISON (SECTION 10 BENCHMARK)
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: 4 }}>
              {bestMandi.marketName} vs {baselineMandi.marketName}
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 8, fontSize: '0.95rem' }}>
              <div>
                {bestMandi.marketName}: <strong>₹{bestMandi.modalPrice}/q</strong>
              </div>
              <div>
                {baselineMandi.marketName}: <strong>₹{baselineMandi.modalPrice}/q</strong>
              </div>
              <div style={{ color: '#facc15', fontWeight: 800 }}>
                Difference: +₹{bestMandi.modalPrice - baselineMandi.modalPrice}/quintal
              </div>
            </div>
          </div>

          <button
            className="btn btn-harvest"
            onClick={() => setActiveTab('calculator')}
          >
            <Calculator size={16} />
            Test 100 Quintal Net Earnings ➔
          </button>
        </div>
      )}

      {/* Side-by-Side Comparison Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(240px, 1fr))`,
        gap: 16,
        marginBottom: 36
      }}>
        {comparedList.map((m: any) => {
          const isWinner = m.isBest;
          const diffFromBase = baselineMandi ? m.modalPrice - baselineMandi.modalPrice : 0;

          return (
            <div
              key={m.marketId}
              style={{
                background: '#ffffff',
                border: isWinner ? '2.5px solid #16a34a' : '1px solid #e2e8f0',
                borderRadius: 16,
                padding: 20,
                boxShadow: isWinner ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {isWinner && (
                <div style={{
                  position: 'absolute',
                  top: -12,
                  left: 20,
                  background: '#15803d',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: 20,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  👑 BEST PRICE
                </div>
              )}

              <div style={{ marginTop: isWinner ? 6 : 0, marginBottom: 12 }}>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a' }}>{m.marketName}</h3>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {m.district}, {m.state}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.85rem', color: '#15803d', fontWeight: 600, marginTop: 4 }}>
                  <MapPin size={14} />
                  {m.distanceKm} km from {location.name.split(',')[0]}
                </div>
              </div>

              {/* Main Price */}
              <div style={{
                background: isWinner ? '#f0fdf4' : '#f8fafc',
                padding: '12px 14px',
                borderRadius: 12,
                marginBottom: 16
              }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                  TODAY'S MAIN PRICE
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  color: isWinner ? '#15803d' : '#0f172a',
                  lineHeight: 1.1
                }}>
                  ₹{m.modalPrice.toLocaleString('en-IN')}
                  <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>/q</span>
                </div>

                {m.marketId !== baselineMandi?.marketId && (
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: diffFromBase >= 0 ? '#15803d' : '#dc2626',
                    marginTop: 4
                  }}>
                    {diffFromBase >= 0 ? `+₹${diffFromBase}/q vs local` : `-₹${Math.abs(diffFromBase)}/q vs local`}
                  </div>
                )}
              </div>

              {/* Price Range & Historical Trend */}
              <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Price Range:</span>
                  <strong>₹{m.minPrice} - ₹{m.maxPrice}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Previous Day:</span>
                  <span>₹{m.previousPrice}/q</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Market Trend:</span>
                  <span className={`trend-badge trend-${m.trend}`}>
                    {m.trend === 'up' ? '↑ Increasing' : m.trend === 'down' ? '↓ Decreasing' : '● Stable'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Arrival Volume:</span>
                  <span>{m.arrivals}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Last Updated:</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{m.updatedAt}</span>
                </div>
              </div>

              {/* Button */}
              <div style={{ marginTop: 'auto' }}>
                <button
                  className={`btn ${isWinner ? 'btn-primary' : 'btn-outline'} btn-sm`}
                  style={{ width: '100%' }}
                  onClick={() => setActiveTab('calculator')}
                >
                  Calculate Take-Home ➔
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
