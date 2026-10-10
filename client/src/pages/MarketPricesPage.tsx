import React, { useState, useEffect } from 'react';
import { useMandi } from '../context/MandiContext';
import type { PriceRecord } from '../context/MandiContext';
import { 
  MapPin, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Calculator, 
  Scale, 
  Info,
  CheckCircle2
} from 'lucide-react';

interface MarketPricesPageProps {
  selectedCropId: string;
  setSelectedCropId: (id: string) => void;
  setActiveTab: (tab: string) => void;
  setCompareCropId?: (id: string) => void;
}

export const MarketPricesPage: React.FC<MarketPricesPageProps> = ({ 
  selectedCropId, 
  setSelectedCropId, 
  setActiveTab 
}) => {
  const { t, location, crops, dataSourceStatus } = useMandi();
  const [prices, setPrices] = useState<PriceRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [radiusKm, setRadiusKm] = useState<string>('100');
  const [sortBy, setSortBy] = useState<'price-desc' | 'price-asc' | 'distance-asc'>('price-desc');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentCrop = crops.find(c => c.id === selectedCropId) || crops[0] || {
    id: 'crop-potato',
    name: 'Potato',
    icon: '🥔',
    category: 'Vegetables'
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setIsLoading(true);
        const url = `/api/prices?cropId=${currentCrop.id}&userLat=${location.latitude}&userLng=${location.longitude}&radiusKm=${radiusKm}&search=${encodeURIComponent(searchQuery)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success && data.prices) {
          let sorted = [...data.prices];
          if (sortBy === 'price-desc') sorted.sort((a, b) => b.modalPrice - a.modalPrice);
          else if (sortBy === 'price-asc') sorted.sort((a, b) => a.modalPrice - b.modalPrice);
          else if (sortBy === 'distance-asc') sorted.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
          setPrices(sorted);
        }
      } catch (err) {
        console.error('Failed to fetch prices:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, [currentCrop.id, location.latitude, location.longitude, radiusKm, sortBy, searchQuery]);

  // Find best price record
  const bestRecord = prices.length > 0 ? prices.reduce((max, p) => p.modalPrice > max.modalPrice ? p : max, prices[0]) : null;

  return (
    <div>
      {/* Page Title & Breadcrumb */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '2.4rem' }}>{currentCrop.icon}</span>
          <div>
            <h1 style={{ fontSize: '1.9rem', color: 'var(--slate-900)' }}>
              {currentCrop.name} Prices
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.88rem', color: 'var(--slate-500)' }}>
              <span>📍 <strong>Location:</strong> {location.name}</span>
              <span>•</span>
              <span>🕒 <strong>Updated:</strong> {dataSourceStatus.freshnessLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Freshness Banner */}
      <div className="freshness-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="freshness-badge">
            {dataSourceStatus.isDemo ? 'DEMO DATA' : 'LIVE APMC FEED'}
          </span>
          <span>{dataSourceStatus.disclaimer}</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
          {dataSourceStatus.freshnessLabel}
        </div>
      </div>

      {/* Crop Selector Ribbon */}
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
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: 'var(--white)',
        border: '1px solid var(--slate-200)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        marginBottom: 24,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 14,
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search size={18} style={{ position: 'absolute', left: 14, top: 12, color: 'var(--slate-400)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: 40 }}
            placeholder="Search mandi or district..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Distance Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-600)' }}>
            Distance:
          </span>
          {['25', '50', '100', '200'].map(dist => (
            <button
              key={dist}
              onClick={() => setRadiusKm(dist)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: radiusKm === dist ? '1.5px solid var(--primary-600)' : '1px solid var(--slate-300)',
                background: radiusKm === dist ? 'var(--primary-50)' : 'var(--white)',
                color: radiusKm === dist ? 'var(--primary-800)' : 'var(--slate-600)'
              }}
            >
              Within {dist} km
            </button>
          ))}
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ArrowUpDown size={16} color="var(--slate-500)" />
          <select
            className="form-select"
            style={{ padding: '6px 12px', width: 'auto', fontSize: '0.85rem' }}
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
          >
            <option value="price-desc">Highest Price First</option>
            <option value="price-asc">Lowest Price First</option>
            <option value="distance-asc">Nearest Distance First</option>
          </select>
        </div>
      </div>

      {/* Best Price Highlight Banner */}
      {bestRecord && (
        <div style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          border: '2px solid #86efac',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#15803d',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.2rem'
            }}>
              ✓
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                🟢 HIGHEST MODAL PRICE TODAY
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                {bestRecord.marketName} — ₹{bestRecord.modalPrice.toLocaleString('en-IN')}/quintal
              </div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                📍 {bestRecord.distanceKm} km from {location.name.split(',')[0]} • District: {bestRecord.district}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setActiveTab('calculator')}
            >
              <Calculator size={16} />
              Calculate Transport & Net Profit
            </button>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setActiveTab('compare')}
            >
              <Scale size={16} />
              Compare All
            </button>
          </div>
        </div>
      )}

      {/* Table: Section 9 Benchmark Layout */}
      {isLoading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
          Loading latest market intelligence...
        </div>
      ) : prices.length === 0 ? (
        <div style={{
          background: '#fff',
          padding: 40,
          textAlign: 'center',
          borderRadius: 16,
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🌾</div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: 6 }}>No market prices available for this crop near your location.</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 16 }}>
            Try increasing the distance radius to 100 km or 200 km, or select another crop.
          </p>
          <button className="btn btn-outline" onClick={() => setRadiusKm('200')}>
            Expand Search to 200 km
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="mandi-table">
            <thead>
              <tr>
                <th>Market (Mandi)</th>
                <th>Distance</th>
                <th>Min Price</th>
                <th>Max Price</th>
                <th>
                  Today's Main Price
                  <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 500, color: '#64748b' }}>
                    (Modal Auction Price)
                  </span>
                </th>
                <th>Trend</th>
                <th>Arrivals</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {prices.map(item => {
                const isBest = bestRecord && item.id === bestRecord.id;
                return (
                  <tr key={item.id} className={isBest ? 'best-price-row' : ''}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {isBest && (
                          <span style={{ color: '#16a34a', fontSize: '1rem' }} title="Best price available">
                            🟢
                          </span>
                        )}
                        <div>
                          <strong style={{ fontSize: '1rem', color: '#0f172a' }}>
                            {item.marketName}
                          </strong>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            {item.district}, {item.state}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td style={{ fontWeight: 600, color: '#475569' }}>
                      {item.distanceKm} km
                    </td>

                    <td style={{ color: '#64748b' }}>
                      ₹{item.minimumPrice?.toLocaleString('en-IN') || '—'}
                    </td>

                    <td style={{ color: '#64748b' }}>
                      ₹{item.maximumPrice?.toLocaleString('en-IN') || '—'}
                    </td>

                    <td>
                      <div className={`price-pill ${isBest ? 'best' : ''}`}>
                        ₹{item.modalPrice.toLocaleString('en-IN')}
                        <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748b' }}>
                          /q
                        </span>
                      </div>
                      {isBest && (
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: '#15803d',
                          background: '#dcfce7',
                          padding: '2px 6px',
                          borderRadius: 4
                        }}>
                          BEST PRICE
                        </span>
                      )}
                    </td>

                    <td>
                      <span className={`trend-badge trend-${item.trend}`}>
                        {item.trend === 'up' ? (
                          <>
                            <TrendingUp size={13} />
                            <span>↑ Rising</span>
                          </>
                        ) : item.trend === 'down' ? (
                          <>
                            <TrendingDown size={13} />
                            <span>↓ Falling</span>
                          </>
                        ) : (
                          <>
                            <Minus size={13} />
                            <span>● Stable</span>
                          </>
                        )}
                      </span>
                    </td>

                    <td style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      {item.arrivals || 'Standard'}
                    </td>

                    <td>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setActiveTab('calculator')}
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        Calculate Net
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
