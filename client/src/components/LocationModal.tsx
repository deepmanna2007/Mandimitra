import React from 'react';
import { useMandi } from '../context/MandiContext';
import type { LocationInfo } from '../context/MandiContext';
import { X, MapPin, Navigation, Check } from 'lucide-react';

const popularLocations: LocationInfo[] = [
  { name: 'Durgapur, West Bengal', district: 'Paschim Bardhaman', state: 'West Bengal', latitude: 23.5204, longitude: 87.3119 },
  { name: 'Burdwan, West Bengal', district: 'Purba Bardhaman', state: 'West Bengal', latitude: 23.2324, longitude: 87.8615 },
  { name: 'Bankura, West Bengal', district: 'Bankura', state: 'West Bengal', latitude: 23.2319, longitude: 87.0784 },
  { name: 'Asansol, West Bengal', district: 'Paschim Bardhaman', state: 'West Bengal', latitude: 23.6889, longitude: 86.9661 },
  { name: 'Suri (Birbhum), West Bengal', district: 'Birbhum', state: 'West Bengal', latitude: 23.9056, longitude: 87.5246 },
  { name: 'Kalna (Hooghly), West Bengal', district: 'Hooghly', state: 'West Bengal', latitude: 23.2194, longitude: 88.3683 },
  { name: 'Ranaghat (Nadia), West Bengal', district: 'Nadia', state: 'West Bengal', latitude: 23.1804, longitude: 88.5804 },
  { name: 'Patna, Bihar', district: 'Patna', state: 'Bihar', latitude: 25.5941, longitude: 85.1376 },
  { name: 'Varanasi, Uttar Pradesh', district: 'Varanasi', state: 'Uttar Pradesh', latitude: 25.3176, longitude: 82.9739 },
  { name: 'Lasalgaon (Nashik), Maharashtra', district: 'Nashik', state: 'Maharashtra', latitude: 20.1478, longitude: 74.2269 },
  { name: 'Khanna (Ludhiana), Punjab', district: 'Ludhiana', state: 'Punjab', latitude: 30.7071, longitude: 76.2166 }
];

export const LocationModal: React.FC = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, location, setLocation, showToast } = useMandi();

  if (!isLocationModalOpen) return null;

  const handleSelect = (loc: LocationInfo) => {
    setLocation(loc);
    setIsLocationModalOpen(false);
  };

  const handleUseGps = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({
            name: 'Detected Location',
            district: 'Nearby Mandis',
            state: 'India',
            latitude,
            longitude
          });
          setIsLocationModalOpen(false);
          showToast('GPS coordinates detected successfully!', 'success');
        },
        error => {
          console.warn('Geolocation error:', error);
          showToast('Location permission denied. Please select from the list below.', 'warn');
        }
      );
    } else {
      showToast('Geolocation is not supported by your browser.', 'error');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsLocationModalOpen(false)}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <MapPin size={24} color="#15803d" />
            <h3 style={{ fontSize: '1.25rem' }}>Select Your Location / District</h3>
          </div>
          <button onClick={() => setIsLocationModalOpen(false)} style={{ color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: 16 }}>
          MandiMitra uses your location to calculate distance to nearby mandis and estimate your transport savings.
        </p>

        <button 
          className="btn btn-outline" 
          onClick={handleUseGps}
          style={{ width: '100%', marginBottom: 20, borderColor: '#15803d', color: '#15803d', fontWeight: 700 }}
        >
          <Navigation size={18} />
          Use GPS / Auto-Detect Location
        </button>

        <h4 style={{ fontSize: '0.95rem', color: '#334155', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Key Agricultural Hubs (West Bengal & India)
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {popularLocations.map((loc, idx) => {
            const isSelected = loc.name === location.name;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(loc)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: isSelected ? '2px solid #16a34a' : '1px solid #e2e8f0',
                  background: isSelected ? '#f0fdf4' : '#ffffff',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{loc.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    District: {loc.district} • {loc.state}
                  </div>
                </div>
                {isSelected && <Check size={20} color="#16a34a" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
