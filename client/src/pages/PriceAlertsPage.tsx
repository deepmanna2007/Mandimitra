import React, { useState } from 'react';
import { useMandi } from '../context/MandiContext';
import { Bell, Plus, Trash2, CheckCircle2, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const PriceAlertsPage: React.FC = () => {
  const { alerts, createAlert, deleteAlert, crops, markets, showToast } = useMandi();
  const [selectedCropId, setSelectedCropId] = useState<string>('crop-potato');
  const [targetPrice, setTargetPrice] = useState<number>(2900);
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  const [selectedMarketId, setSelectedMarketId] = useState<string>('mandi-bankura');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const crop = crops.find(c => c.id === selectedCropId);
    const market = markets.find(m => m.id === selectedMarketId);

    const success = await createAlert({
      cropId: selectedCropId,
      cropName: crop ? crop.name : 'Potato',
      marketId: selectedMarketId,
      marketName: market ? market.name : 'Bankura Mandi',
      targetPrice,
      condition,
      currentPrice: crop?.basePrice || 2400
    });

    if (success) {
      showToast('New price alert active! We will notify you when price hits the target.', 'success');
    }
  };

  const handleSimulateTrigger = (alertId: string) => {
    showToast('🔔 Mandi alert triggered! Bankura Mandi reached ₹2,780/quintal.', 'success');
  };

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={24} color="#dc2626" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.9rem', color: 'var(--slate-900)' }}>
              Mandi Price Alerts & Notifications
            </h1>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
              Set SMS, in-app and audio alerts when crop prices rise above or drop below your desired rate.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {/* Create Alert Form */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          padding: 24,
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Plus size={20} color="#15803d" />
            Create New Price Alert
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Crop / Commodity</label>
              <select
                className="form-select"
                value={selectedCropId}
                onChange={e => setSelectedCropId(e.target.value)}
              >
                {crops.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Mandi / Market Yard</label>
              <select
                className="form-select"
                value={selectedMarketId}
                onChange={e => setSelectedMarketId(e.target.value)}
              >
                <option value="">All Nearby Mandis</option>
                {markets.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.district})</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Condition</label>
                <select
                  className="form-select"
                  value={condition}
                  onChange={e => setCondition(e.target.value as any)}
                >
                  <option value="above">Price Goes Above (↑)</option>
                  <option value="below">Price Falls Below (↓)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Rate (₹/q)</label>
                <input
                  type="number"
                  className="form-input"
                  value={targetPrice}
                  onChange={e => setTargetPrice(Number(e.target.value))}
                  step="50"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
              Activate Price Alert
            </button>
          </form>
        </div>

        {/* Existing Alerts List */}
        <div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 16 }}>
            Your Monitored Alerts ({alerts.length})
          </h2>

          {alerts.length === 0 ? (
            <div style={{ background: '#fff', padding: 28, borderRadius: 16, border: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b' }}>
              No active alerts. Create one on the left to monitor spikes!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {alerts.map(a => {
                const isTriggered = a.status === 'triggered';
                return (
                  <div
                    key={a.id}
                    style={{
                      background: '#ffffff',
                      border: isTriggered ? '2px solid #86efac' : '1px solid #e2e8f0',
                      borderRadius: 14,
                      padding: '16px 20px',
                      boxShadow: 'var(--shadow-xs)',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: 6,
                          background: isTriggered ? '#dcfce7' : '#f1f5f9',
                          color: isTriggered ? '#15803d' : '#475569',
                          textTransform: 'uppercase'
                        }}>
                          {isTriggered ? '🎉 TARGET TRIGGERED' : '⏳ ACTIVE MONITORING'}
                        </span>
                        <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginTop: 4 }}>
                          {a.cropName} @ {a.marketName}
                        </h3>
                      </div>

                      <button
                        onClick={() => deleteAlert(a.id)}
                        style={{ color: '#94a3b8', padding: 4 }}
                        title="Delete alert"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: '#334155', marginBottom: 8 }}>
                      Condition: <strong>When price is {a.condition} ₹{a.targetPrice.toLocaleString('en-IN')}/q</strong>
                    </div>

                    {a.message && (
                      <div style={{
                        fontSize: '0.82rem',
                        color: isTriggered ? '#166534' : '#64748b',
                        background: isTriggered ? '#f0fdf4' : '#f8fafc',
                        padding: '8px 12px',
                        borderRadius: 8
                      }}>
                        {a.message}
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleSimulateTrigger(a.id)}
                        style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                      >
                        Simulate Notification Push
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
