import React from 'react';
import { useMandi } from '../context/MandiContext';
import { CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useMandi();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 80,
      right: 20,
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      maxWidth: 380,
      width: '100%',
      pointerEvents: 'none'
    }}>
      {toasts.map(toast => {
        const bgColors = {
          success: '#15803d',
          info: '#0284c7',
          warn: '#d97706',
          error: '#dc2626'
        };

        const icons = {
          success: <CheckCircle2 size={20} color="#fff" />,
          info: <Info size={20} color="#fff" />,
          warn: <AlertCircle size={20} color="#fff" />,
          error: <XCircle size={20} color="#fff" />
        };

        return (
          <div
            key={toast.id}
            style={{
              background: bgColors[toast.type] || '#1e293b',
              color: '#ffffff',
              padding: '12px 18px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: '0.9rem',
              fontWeight: 600,
              pointerEvents: 'auto',
              animation: 'modalIn 0.2s ease-out'
            }}
          >
            {icons[toast.type]}
            <span style={{ flex: 1 }}>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
