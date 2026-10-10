import React from 'react';
import { ArrowDown, CheckCircle, Calculator, TrendingUp, Truck, Scale } from 'lucide-react';

interface HowItWorksPageProps {
  setActiveTab: (tab: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ setActiveTab }) => {
  const steps = [
    {
      step: '01',
      title: 'Select Your Origin Location',
      desc: 'Set your district or village (e.g. Durgapur, West Bengal) or use 1-click GPS detection.',
      icon: '📍'
    },
    {
      step: '02',
      title: 'Choose Your Harvest Crop',
      desc: 'Pick your harvested produce (Potato, Rice, Onion, Tomato, Mustard, etc.) and quantity in quintals.',
      icon: '🥔'
    },
    {
      step: '03',
      title: 'Discover Nearby Mandis',
      desc: 'MandiMitra searches regulated APMC yards in a 25 to 100 km radius with today’s auction modal rates.',
      icon: '🏛️'
    },
    {
      step: '04',
      title: 'Calculate Distance & Transport Cost',
      desc: 'We calculate exact round-trip freight for pickup vans, tractors, or trucks based on real fuel rates.',
      icon: '🚚'
    },
    {
      step: '05',
      title: 'Determine True Net Take-Home Earnings',
      desc: 'Gross revenue minus freight gives your true net return across every competing mandi.',
      icon: '💰'
    },
    {
      step: '06',
      title: 'Sell Confidently with Best Profit',
      desc: 'Know that travelling to Bankura rather than Durgapur yields ₹34,000 more take-home earnings!',
      icon: '🏆'
    }
  ];

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h1 style={{ fontSize: '2.4rem', color: '#0f172a', marginBottom: 12 }}>
          How MandiMitra Works
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#64748b' }}>
          Section 34 Farmer Decision Flow: From field to best market in 6 straightforward steps.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
        {steps.map((item, index) => (
          <div
            key={item.step}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: '#f0fdf4',
              border: '1.5px solid #86efac',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              flexShrink: 0
            }}>
              {item.icon}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                STEP {item.step}
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', margin: '2px 0 4px 0' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <button 
          className="btn btn-primary btn-lg"
          onClick={() => setActiveTab('calculator')}
        >
          Try the "Best Market For Me" Feature ➔
        </button>
      </div>
    </div>
  );
};
