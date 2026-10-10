import React, { useEffect, useRef, useState } from 'react';
import { useMandi } from '../context/MandiContext';
import type { Market } from '../context/MandiContext';
import L from 'leaflet';
import { MapPin, Navigation, Clock, Phone, Layers, Info, Calculator } from 'lucide-react';

interface NearbyMarketsMapPageProps {
  setActiveTab: (tab: string) => void;
  setSelectedCropId: (id: string) => void;
}

export const NearbyMarketsMapPage: React.FC<NearbyMarketsMapPageProps> = ({ setActiveTab, setSelectedCropId }) => {
  const { location, markets, crops, highlights } = useMandi();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [activeRadius, setActiveRadius] = useState<number>(100);

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Fix default marker icon assets in Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
    });

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([location.latitude, location.longitude], 9);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    map.setView([location.latitude, location.longitude], 9);

    // Clear existing layers except base tiles
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker || layer instanceof L.Circle || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // 1. Farmer Location Marker (Pulsing Red Marker)
    const farmerIcon = L.divIcon({
      className: 'custom-farmer-pin',
      html: `📍 You are here (${location.name.split(',')[0]})`,
      iconSize: [160, 28],
      iconAnchor: [80, 28]
    });

    L.marker([location.latitude, location.longitude], { icon: farmerIcon })
      .addTo(map)
      .bindPopup(`<strong>Your Origin:</strong> ${location.name}`)
      .openPopup();

    // Visual radius circle
    L.circle([location.latitude, location.longitude], {
      radius: activeRadius * 1000,
      color: '#16a34a',
      fillColor: '#22c55e',
      fillOpacity: 0.05,
      weight: 1.5,
      dashArray: '4, 4'
    }).addTo(map);

    // 2. Mandi Markers
    markets.forEach(mandi => {
      const isSelected = selectedMarket && selectedMarket.id === mandi.id;
      const isBankura = mandi.id === 'mandi-bankura';

      const mandiIcon = L.divIcon({
        className: 'custom-mandi-pin',
        html: `🌾 ${mandi.name} (${mandi.distanceKm} km)`,
        iconSize: [150, 26],
        iconAnchor: [75, 26]
      });

      const marker = L.marker([mandi.latitude, mandi.longitude], { icon: mandiIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedMarket(mandi);
      });

      // If market is selected, draw connecting route line
      if (selectedMarket && selectedMarket.id === mandi.id) {
        L.polyline(
          [
            [location.latitude, location.longitude],
            [mandi.latitude, mandi.longitude]
          ],
          {
            color: '#15803d',
            weight: 3.5,
            dashArray: '6, 6'
          }
        ).addTo(map);
      }
    });

    // Default select Bankura if none selected
    if (!selectedMarket && markets.length > 0) {
      const bankura = markets.find(m => m.id === 'mandi-bankura') || markets[0];
      setSelectedMarket(bankura);
    }
  }, [location, markets, selectedMarket?.id, activeRadius]);

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Layers size={28} color="#15803d" />
          <h1 style={{ fontSize: '1.9rem', color: 'var(--slate-900)' }}>
            Nearby Mandis Interactive Map
          </h1>
        </div>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
          Explore mandi coordinates, operating auction hours, facilities, and road distances.
        </p>
      </div>

      {/* Radius Filter Chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
          Radius Filter:
        </span>
        {[25, 50, 100, 150].map(rad => (
          <button
            key={rad}
            onClick={() => setActiveRadius(rad)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: '0.82rem',
              fontWeight: 700,
              border: activeRadius === rad ? '2px solid #16a34a' : '1px solid #cbd5e1',
              background: activeRadius === rad ? '#dcfce7' : '#ffffff',
              color: activeRadius === rad ? '#14532d' : '#64748b'
            }}
          >
            {rad} km
          </button>
        ))}
      </div>

      {/* Main Grid: Map + Mandi Details Card (Section 12 Layout) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 20,
        marginBottom: 36
      }}>
        {/* Leaflet Map Card */}
        <div style={{ minHeight: 460 }}>
          <div ref={mapContainerRef} className="map-container" style={{ height: 460 }} />
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 8 }}>
            💡 Tip: Click on any green mandi marker to inspect today's prices and draw road route line.
          </div>
        </div>

        {/* Selected Mandi Information Card (Section 12 Benchmark) */}
        {selectedMarket && (
          <div style={{
            background: '#ffffff',
            border: '2px solid #86efac',
            borderRadius: 16,
            padding: 24,
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  background: '#dcfce7',
                  color: '#15803d',
                  borderRadius: 6
                }}>
                  {selectedMarket.marketType}
                </span>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginTop: 6 }}>
                  {selectedMarket.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#15803d', fontWeight: 700, fontSize: '0.95rem' }}>
                  <MapPin size={16} />
                  📍 {selectedMarket.distanceKm} km away from {location.name.split(',')[0]}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 16 }}>
              {selectedMarket.address}
            </p>

            {/* Today's Benchmark Commodity Rates at this Mandi */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 10 }}>
                Today's Benchmark Commodity Prices:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>🥔 Potato (আলু):</span>
                  <strong style={{ color: selectedMarket.id === 'mandi-bankura' ? '#15803d' : '#0f172a', fontSize: '1.05rem' }}>
                    {selectedMarket.id === 'mandi-bankura' ? '₹2,780/q (Best!)' : selectedMarket.id === 'mandi-burdwan' ? '₹2,650/q' : '₹2,400/q'}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>🌾 Rice (Paddy):</span>
                  <strong style={{ color: selectedMarket.id === 'mandi-burdwan' ? '#15803d' : '#0f172a', fontSize: '1.05rem' }}>
                    {selectedMarket.id === 'mandi-burdwan' ? '₹3,250/q (Best!)' : '₹3,080/q'}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>🧅 Onion (পেঁয়াজ):</span>
                  <strong style={{ color: selectedMarket.id === 'mandi-durgapur' ? '#15803d' : '#0f172a', fontSize: '1.05rem' }}>
                    {selectedMarket.id === 'mandi-durgapur' ? '₹2,900/q (Best!)' : '₹2,810/q'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Operating Hours & Facilities */}
            <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={15} color="#ca8a04" />
                <span>Auction Timings: <strong>{selectedMarket.operatingHours}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Phone size={15} color="#0284c7" />
                <span>Mandi Yard Contact: <strong>{selectedMarket.contactPhone}</strong></span>
              </div>
              <div style={{ marginTop: 4 }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Facilities: </span>
                {selectedMarket.facilities?.map((f, i) => (
                  <span key={i} style={{
                    display: 'inline-block',
                    background: '#e2e8f0',
                    color: '#334155',
                    fontSize: '0.72rem',
                    padding: '2px 6px',
                    borderRadius: 4,
                    marginRight: 4,
                    marginTop: 4
                  }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Action */}
            <div style={{ marginTop: 'auto', display: 'flex', gap: 10 }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  setSelectedCropId('crop-potato');
                  setActiveTab('calculator');
                }}
              >
                <Calculator size={16} />
                Calculate Net Profit For This Mandi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
