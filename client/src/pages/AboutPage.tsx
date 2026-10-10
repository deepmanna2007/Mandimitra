import React from 'react';
import { ShieldCheck, HeartHandshake, Eye, Sparkles, Sprout } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#dcfce7', color: '#15803d', padding: '6px 14px', borderRadius: 20, fontSize: '0.85rem', fontWeight: 700, marginBottom: 12 }}>
          <Sprout size={16} />
          About MandiMitra
        </div>
        <h1 style={{ fontSize: '2.4rem', color: '#0f172a', marginBottom: 12 }}>
          "Know the Price. Choose the Market. Earn Better."
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6 }}>
          Empowering India's farmers by turning market information into tangible take-home profit.
        </p>
      </div>

      <div className="card" style={{ padding: 32, marginBottom: 28 }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: 12 }}>Our Agricultural Mission</h2>
        <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
          In traditional agricultural marketing, farmers frequently sell to immediate local middlemen or the nearest mandi without knowing that a regulated market only 35 kilometers away is offering 15% to 25% higher rates for the exact same crop.
        </p>
        <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7 }}>
          <strong>MandiMitra</strong> was built to solve this informational imbalance. We don't merely display raw price numbers—we factor in road distances and realistic transportation freight costs to tell the farmer: <em>“Which market will leave the most money in your pocket today?”</em>
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: 36 }}>
        <div className="card">
          <Eye size={28} color="#15803d" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: 6 }}>100% Price Transparency</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Clearly distinguishing between real APMC data and demo benchmark data so farmers can always trust what they see.
          </p>
        </div>

        <div className="card">
          <HeartHandshake size={28} color="#ca8a04" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: 6 }}>Farmer-First Simplicity</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            High-contrast readable UI, large touch buttons, voice search, and full support for English, हिन्दी, and বাংলা.
          </p>
        </div>

        <div className="card">
          <Sparkles size={28} color="#0284c7" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: 6 }}>Gemini AI Assistance</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Practical advice on storage, auction timings, and price dynamics tailored to regional crops and seasons.
          </p>
        </div>
      </div>
    </div>
  );
};
