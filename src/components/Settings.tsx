import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Settings({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 30,
      }}
    >
      <div
        style={{ background: 'rgba(0,0,0,0.4)', position: 'absolute', inset: 0 }}
        onClick={onClose}
      ></div>
      <div
        style={{
          position: 'relative',
          background: '#fff',
          padding: 20,
          borderRadius: 8,
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          minWidth: 260,
        }}
      >
        <h3 style={{ marginTop: 0 }}>Einstellungen</h3>
        <p style={{ marginBottom: 12, color: '#374151' }}>
          Settings placeholder — add settings UI later.
        </p>
        <div style={{ textAlign: 'right' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              background: '#f9fafb',
            }}
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}
