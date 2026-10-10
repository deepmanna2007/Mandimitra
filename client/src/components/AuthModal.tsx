import React, { useState } from 'react';
import { useMandi } from '../context/MandiContext';
import type { UserProfile } from '../context/MandiContext';
import { X, User, Shield, CheckCircle2, Sprout } from 'lucide-react';
import type { Language } from '../i18n/translations';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode, 
    currentUser, 
    setCurrentUser, 
    showToast,
    crops,
    markets
  } = useMandi();

  const [loginPhone, setLoginPhone] = useState('');
  
  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: 'West Bengal',
    district: 'Paschim Bardhaman',
    village: '',
    preferredLanguage: 'en' as Language,
    mainCrops: ['crop-potato'],
    approxQuantity: '100 Quintals',
    favoriteMarkets: ['mandi-bankura']
  });

  if (!isAuthModalOpen) return null;

  const handleQuickLogin = (role: 'farmer' | 'admin') => {
    if (role === 'farmer') {
      const farmer: UserProfile = {
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
      setCurrentUser(farmer);
      showToast('Logged in as Rahul Mondal (Farmer, Durgapur)', 'success');
    } else {
      const admin: UserProfile = {
        id: 'user-admin',
        name: 'MandiMitra Administrator',
        phone: '9999999999',
        email: 'admin@mandimitra.in',
        role: 'admin',
        state: 'West Bengal',
        district: 'Kolkata',
        village: 'Salt Lake Sector V',
        latitude: 22.5726,
        longitude: 88.3639,
        preferredLanguage: 'en',
        mainCrops: [],
        approxQuantity: '',
        favoriteMarkets: []
      };
      setCurrentUser(admin);
      showToast('Logged in as MandiMitra Administrator', 'info');
    }
    setIsAuthModalOpen(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please enter your name and phone number', 'warn');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        showToast(`Welcome to MandiMitra, ${data.user.name}!`, 'success');
        setIsAuthModalOpen(false);
      }
    } catch {
      showToast('Error registering account. Please try again.', 'error');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 560 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sprout size={24} color="#15803d" />
            <h3 style={{ fontSize: '1.3rem' }}>
              {authModalMode === 'login' ? 'Farmer Login & Access' : 'Farmer Onboarding'}
            </h3>
          </div>
          <button onClick={() => setIsAuthModalOpen(false)} style={{ color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        {/* 1-Click Demo Profiles */}
        <div style={{
          background: 'linear-gradient(135deg, #f0fdf4, #fefce8)',
          border: '1.5px dashed #86efac',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#166534', marginBottom: 8 }}>
            ⚡ 1-Click Demo Accounts (Instant Access)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => handleQuickLogin('farmer')}
              style={{ background: '#fff', fontSize: '0.82rem', borderColor: '#16a34a', color: '#15803d' }}
            >
              <User size={14} />
              Rahul (Farmer, Durgapur)
            </button>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => handleQuickLogin('admin')}
              style={{ background: '#fff', fontSize: '0.82rem', borderColor: '#c2410c', color: '#c2410c' }}
            >
              <Shield size={14} />
              Mandi Admin Panel
            </button>
          </div>
        </div>

        {/* Current Active User Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: '#f8fafc',
          borderRadius: '10px',
          marginBottom: 16,
          fontSize: '0.85rem'
        }}>
          <div>
            <strong>Active Profile:</strong> {currentUser.name} ({currentUser.role.toUpperCase()})
          </div>
          <span style={{ color: '#15803d', fontWeight: 600 }}>Active Session</span>
        </div>

        {authModalMode === 'login' ? (
          <div>
            <div className="form-group">
              <label className="form-label">Registered Mobile Number</label>
              <input
                type="tel"
                className="form-input"
                placeholder="Enter 10-digit mobile number (e.g. 9876543210)"
                value={loginPhone}
                onChange={e => setLoginPhone(e.target.value)}
              />
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginBottom: 12 }}
              onClick={() => handleQuickLogin('farmer')}
            >
              Sign In to Farmer Dashboard
            </button>

            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <span style={{ fontSize: '0.9rem', color: '#64748b' }}>New farmer on MandiMitra? </span>
              <button
                style={{ color: '#15803d', fontWeight: 700, fontSize: '0.9rem' }}
                onClick={() => setAuthModalMode('register')}
              >
                Register & Onboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegister}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Rahul Mondal"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  className="form-input"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">State *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.state}
                  onChange={e => setFormData({ ...formData, state: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">District *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Village / Locality</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Gopalpur"
                  value={formData.village}
                  onChange={e => setFormData({ ...formData, village: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Language</label>
                <select
                  className="form-select"
                  value={formData.preferredLanguage}
                  onChange={e => setFormData({ ...formData, preferredLanguage: e.target.value as Language })}
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="bn">বাংলা (Bengali)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Primary Crop</label>
                <select
                  className="form-select"
                  value={formData.mainCrops[0] || 'crop-potato'}
                  onChange={e => setFormData({ ...formData, mainCrops: [e.target.value] })}
                >
                  {crops.map(c => (
                    <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Harvest Quantity</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 100 Quintals"
                  value={formData.approxQuantity}
                  onChange={e => setFormData({ ...formData, approxQuantity: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
              Complete Farmer Onboarding
            </button>

            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Already registered? </span>
              <button
                type="button"
                style={{ color: '#15803d', fontWeight: 700, fontSize: '0.9rem' }}
                onClick={() => setAuthModalMode('login')}
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
