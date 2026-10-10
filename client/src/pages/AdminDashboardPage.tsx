import React, { useState, useEffect } from 'react';
import { useMandi } from '../context/MandiContext';
import { 
  ShieldCheck, 
  Database, 
  Layers, 
  Plus, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Server,
  Activity,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { crops, markets, refreshData, showToast } = useMandi();
  const [adminStats, setAdminStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'markets' | 'crops' | 'prices' | 'sources'>('overview');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // New Market Form
  const [newMarket, setNewMarket] = useState({
    name: '',
    state: 'West Bengal',
    district: '',
    address: '',
    latitude: '',
    longitude: '',
    marketType: 'APMC Yard',
    operatingHours: '04:00 AM - 02:00 PM'
  });

  // New Crop Form
  const [newCrop, setNewCrop] = useState({
    name: '',
    category: 'Vegetables',
    unit: 'Quintal',
    icon: '🌱',
    basePrice: 2000,
    msp: ''
  });

  // New Price Form with validation test
  const [newPrice, setNewPrice] = useState({
    cropId: 'crop-potato',
    marketId: 'mandi-bankura',
    minimumPrice: 2600,
    maximumPrice: 2900,
    modalPrice: 2780,
    arrivals: '350 Quintals'
  });

  const fetchMonitoring = async () => {
    try {
      const res = await fetch('/api/admin/monitoring');
      const data = await res.json();
      if (data.success && data.data) {
        setAdminStats(data.data);
      }
    } catch (err) {
      console.error('Error fetching admin monitoring:', err);
    }
  };

  useEffect(() => {
    fetchMonitoring();
  }, []);

  const handleToggleMode = async (mode: 'demo' | 'real') => {
    try {
      const res = await fetch('/api/admin/toggle-source', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Data source mode switched to ${mode.toUpperCase()}`, 'success');
        fetchMonitoring();
        refreshData();
      }
    } catch {
      showToast('Failed to switch source mode.', 'error');
    }
  };

  const handleTriggerSync = async () => {
    try {
      setIsSyncing(true);
      const res = await fetch('/api/admin/trigger-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: 'DEMO-DATA-GOV-IN-KEY' })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Official Agmarknet feed sync completed!', 'success');
        fetchMonitoring();
        refreshData();
      }
    } catch {
      showToast('Sync error.', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddMarket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMarket.name || !newMarket.latitude || !newMarket.longitude) {
      showToast('Please fill required market fields', 'warn');
      return;
    }

    try {
      const res = await fetch('/api/markets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMarket)
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Market ${newMarket.name} added!`, 'success');
        setNewMarket({
          name: '',
          state: 'West Bengal',
          district: '',
          address: '',
          latitude: '',
          longitude: '',
          marketType: 'APMC Yard',
          operatingHours: '04:00 AM - 02:00 PM'
        });
        refreshData();
        fetchMonitoring();
      }
    } catch {
      showToast('Error adding market', 'error');
    }
  };

  const handleAddCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrop.name) return;

    try {
      const res = await fetch('/api/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCrop)
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Crop ${newCrop.name} added!`, 'success');
        setNewCrop({
          name: '',
          category: 'Vegetables',
          unit: 'Quintal',
          icon: '🌱',
          basePrice: 2000,
          msp: ''
        });
        refreshData();
        fetchMonitoring();
      }
    } catch {
      showToast('Error adding crop', 'error');
    }
  };

  const handleAddPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPrice)
      });
      const data = await res.json();
      if (data.success) {
        if (data.warnings && data.warnings.length > 0) {
          showToast(`Price updated with warning: ${data.warnings[0]}`, 'warn');
        } else {
          showToast('Price record updated successfully!', 'success');
        }
        refreshData();
        fetchMonitoring();
      } else {
        showToast(`Validation Rejected: ${data.error}`, 'error');
      }
    } catch {
      showToast('Failed to update price record.', 'error');
    }
  };

  const handleDeleteMarket = async (id: string) => {
    if (!confirm('Are you sure you want to remove this mandi?')) return;
    try {
      const res = await fetch(`/api/markets/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Mandi removed.', 'info');
        refreshData();
        fetchMonitoring();
      }
    } catch {}
  };

  const handleDeleteCrop = async (id: string) => {
    if (!confirm('Are you sure you want to remove this crop?')) return;
    try {
      const res = await fetch(`/api/crops/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Crop removed.', 'info');
        refreshData();
        fetchMonitoring();
      }
    } catch {}
  };

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={24} color="#c2410c" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.9rem', color: 'var(--slate-900)' }}>
              MandiMitra Administrative Control Center
            </h1>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
              Manage markets, crop taxonomy, price feeds, data validation rules, and sync logs.
            </p>
          </div>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="tab-list">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Activity size={16} /> Overview & Health
        </button>
        <button
          className={`tab-btn ${activeTab === 'markets' ? 'active' : ''}`}
          onClick={() => setActiveTab('markets')}
        >
          <Layers size={16} /> Manage Mandis ({markets.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'crops' ? 'active' : ''}`}
          onClick={() => setActiveTab('crops')}
        >
          🌾 Manage Crops ({crops.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'prices' ? 'active' : ''}`}
          onClick={() => setActiveTab('prices')}
        >
          💰 Price Feed & Validation
        </button>
        <button
          className={`tab-btn ${activeTab === 'sources' ? 'active' : ''}`}
          onClick={() => setActiveTab('sources')}
        >
          <Server size={16} /> Data Sources & Sync
        </button>
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && adminStats && (
        <div>
          {/* Key Metric Counters */}
          <div className="grid-4" style={{ marginBottom: 28 }}>
            <div className="card">
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>TOTAL MARKETS (MANDIS)</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>{adminStats.stats.totalMarkets}</div>
              <div style={{ fontSize: '0.78rem', color: '#16a34a' }}>Active across West Bengal & India</div>
            </div>

            <div className="card">
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>CROP COMMODITIES</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>{adminStats.stats.totalCrops}</div>
              <div style={{ fontSize: '0.78rem', color: '#ca8a04' }}>Vegetables, Grains, Cash Crops</div>
            </div>

            <div className="card">
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>PRICE RECORDS MONITORED</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>{adminStats.stats.totalPriceRecords}</div>
              <div style={{ fontSize: '0.78rem', color: '#15803d' }}>Live spot auction sheets</div>
            </div>

            <div className="card">
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>DATA SYNC STATUS</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#15803d', marginTop: 8 }}>
                {adminStats.config.syncStatus}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Mode: {adminStats.config.mode.toUpperCase()}</div>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: 14 }}>System Activity & Validation Logs</h3>
            <div style={{ maxHeight: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {adminStats.recentLogs.map((log: any) => (
                <div
                  key={log.id}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: log.level === 'ERROR' ? '#fee2e2' : log.level === 'WARN' ? '#fef3c7' : '#f8fafc',
                    borderLeft: `4px solid ${log.level === 'ERROR' ? '#dc2626' : log.level === 'WARN' ? '#d97706' : '#16a34a'}`,
                    fontSize: '0.82rem',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <strong>[{log.level}]</strong> {log.message}
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. MANAGE MARKETS TAB */}
      {activeTab === 'markets' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {/* Add Market Form */}
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: 16 }}>Add New Agricultural Mandi</h3>
            <form onSubmit={handleAddMarket}>
              <div className="form-group">
                <label className="form-label">Market Yard Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Rampurhat APMC Mandi"
                  value={newMarket.name}
                  onChange={e => setNewMarket({ ...newMarket, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">District *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Birbhum"
                    value={newMarket.district}
                    onChange={e => setNewMarket({ ...newMarket, district: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newMarket.state}
                    onChange={e => setNewMarket({ ...newMarket, state: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Latitude *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. 24.1667"
                    value={newMarket.latitude}
                    onChange={e => setNewMarket({ ...newMarket, latitude: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Longitude *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. 87.7833"
                    value={newMarket.longitude}
                    onChange={e => setNewMarket({ ...newMarket, longitude: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Street / Yard Address"
                  value={newMarket.address}
                  onChange={e => setNewMarket({ ...newMarket, address: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Register Mandi into Network
              </button>
            </form>
          </div>

          {/* Markets List */}
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: 14 }}>Active Network Mandis</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 480, overflowY: 'auto' }}>
              {markets.map(m => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    border: '1px solid #e2e8f0',
                    borderRadius: 10
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>{m.name}</strong>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {m.district}, {m.state} • Lat: {m.latitude}, Lng: {m.longitude}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteMarket(m.id)}
                    style={{ color: '#ef4444', padding: 6 }}
                    title="Remove mandi"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. MANAGE CROPS TAB */}
      {activeTab === 'crops' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: 16 }}>Register New Crop</h3>
            <form onSubmit={handleAddCrop}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Emoji</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newCrop.icon}
                    onChange={e => setNewCrop({ ...newCrop, icon: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Crop Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Green Gram (Moong)"
                    value={newCrop.name}
                    onChange={e => setNewCrop({ ...newCrop, name: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={newCrop.category}
                    onChange={e => setNewCrop({ ...newCrop, category: e.target.value })}
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Grains">Grains / Cereals</option>
                    <option value="Oilseeds">Oilseeds</option>
                    <option value="Pulses">Pulses</option>
                    <option value="Cash Crops">Cash Crops</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Benchmark Base Price</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newCrop.basePrice}
                    onChange={e => setNewCrop({ ...newCrop, basePrice: Number(e.target.value) })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Add Crop to Taxonomy
              </button>
            </form>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: 14 }}>Active Agricultural Crops</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 480, overflowY: 'auto' }}>
              {crops.map(c => (
                <div
                  key={c.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    border: '1px solid #e2e8f0',
                    borderRadius: 10
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '1.4rem' }}>{c.icon}</span>
                    <div>
                      <strong>{c.name}</strong>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        {c.category} • Base: ₹{c.basePrice}/q {c.msp ? `• MSP: ₹${c.msp}` : ''}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteCrop(c.id)}
                    style={{ color: '#ef4444', padding: 6 }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. PRICE FEED & VALIDATION TAB */}
      {activeTab === 'prices' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: 16 }}>
              Update Mandi Spot Price (with Real-time Validation)
            </h3>
            
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 16 }}>
              MandiMitra validation engine automatically checks for negative rates, inverted min/max, and flags &gt;40% sudden spikes.
            </p>

            <form onSubmit={handleAddPrice}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Crop</label>
                  <select
                    className="form-select"
                    value={newPrice.cropId}
                    onChange={e => setNewPrice({ ...newPrice, cropId: e.target.value })}
                  >
                    {crops.map(c => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Mandi</label>
                  <select
                    className="form-select"
                    value={newPrice.marketId}
                    onChange={e => setNewPrice({ ...newPrice, marketId: e.target.value })}
                  >
                    {markets.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                <div className="form-group">
                  <label className="form-label">Min Price</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newPrice.minimumPrice}
                    onChange={e => setNewPrice({ ...newPrice, minimumPrice: Number(e.target.value) })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Max Price</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newPrice.maximumPrice}
                    onChange={e => setNewPrice({ ...newPrice, maximumPrice: Number(e.target.value) })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Modal Price *</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={newPrice.modalPrice}
                    onChange={e => setNewPrice({ ...newPrice, modalPrice: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Arrival Volume</label>
                <input
                  type="text"
                  className="form-input"
                  value={newPrice.arrivals}
                  onChange={e => setNewPrice({ ...newPrice, arrivals: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Submit Price & Run Validation Engine
              </button>
            </form>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: 14 }}>
              Section 29 Data Validation Safeguards
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#166534' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span>Negative Price Filter: Rejects &lt; 0 price entries</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#166534' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span>Sanity Range Check: Asserts Min Price &le; Max Price</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#166534' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span>Sudden Spike Anomaly Detection: Flags &gt;40% day-over-day shifts</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#166534' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span>Timestamp Auditing: Automatically attaches update time tags</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. DATA SOURCES & SYNC TAB */}
      {activeTab === 'sources' && adminStats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: 14 }}>Active Feed Configuration</h3>

            <div style={{
              padding: 16,
              background: adminStats.config.mode === 'demo' ? '#fefce8' : '#f0fdf4',
              borderRadius: 12,
              border: '1.5px solid #cbd5e1',
              marginBottom: 20
            }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 4 }}>
                Current Operational Mode: {adminStats.config.mode.toUpperCase()}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>
                {adminStats.config.mode === 'demo'
                  ? 'Showing realistic West Bengal benchmark seed data (Durgapur, Burdwan, Bankura). Transparently labeled as demo data to farmers.'
                  : 'Connected to Data.gov.in / Agmarknet official agricultural price API.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <button
                className={`btn ${adminStats.config.mode === 'demo' ? 'btn-harvest' : 'btn-outline'}`}
                style={{ flex: 1 }}
                onClick={() => handleToggleMode('demo')}
              >
                Demo Benchmark Mode
              </button>
              <button
                className={`btn ${adminStats.config.mode === 'real' ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1 }}
                onClick={() => handleToggleMode('real')}
              >
                Official Agmarknet API
              </button>
            </div>

            <button
              className="btn btn-outline"
              style={{ width: '100%', borderColor: '#15803d', color: '#15803d' }}
              onClick={handleTriggerSync}
              disabled={isSyncing}
            >
              <RefreshCw size={16} className={isSyncing ? 'spinning' : ''} />
              {isSyncing ? 'Syncing...' : 'Trigger Manual Market Data Refresh'}
            </button>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: 14 }}>
              Agmarknet / Data.gov.in Integration Architecture
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, marginBottom: 12 }}>
              To connect your real Government of India agricultural data feed:
            </p>
            <ol style={{ fontSize: '0.85rem', color: '#475569', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Register an API Key at <strong>data.gov.in</strong></li>
              <li>Resource: <code>Daily Mandi Market Prices (9ef84268...)</code></li>
              <li>Set <code>DATA_SOURCE_MODE=real</code> in <code>.env</code></li>
              <li>MandiMitra's <code>MarketPriceService</code> automatically maps commodity and district keys.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
