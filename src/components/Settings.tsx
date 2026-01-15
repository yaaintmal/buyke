import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onThemeChange: (t: 'light' | 'dark') => void;
}

export default function Settings({ open, onClose, theme, onThemeChange }: Props) {
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
          background: 'var(--card)',
          padding: 20,
          borderRadius: 8,
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          minWidth: 320,
        }}
      >
        <h3 style={{ marginTop: 0 }}>Einstellungen</h3>

        <section style={{ marginBottom: 12 }}>
          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend style={{ fontSize: 14, marginBottom: 8 }}>Theme</legend>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ fontWeight: 600 }}>Hell</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  Klarer Hintergrund, grüne Akzente
                </div>
              </div>

              <button
                role="switch"
                aria-checked={theme === 'dark'}
                onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onThemeChange(theme === 'dark' ? 'light' : 'dark');
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 10px',
                  borderRadius: 9999,
                  border: '1px solid var(--input-border)',
                  background: theme === 'dark' ? 'var(--dock-bg)' : 'var(--card)',
                  color: 'var(--text-color)',
                }}
                title={theme === 'dark' ? 'Dunkel (aktiv)' : 'Wechsel zu Dunkel'}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  {theme === 'dark' ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5"></circle>
                      <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
                    </svg>
                  )}
                  <span style={{ fontSize: 13 }}>{theme === 'dark' ? 'Dunkel' : 'Hell'}</span>
                </span>
              </button>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ fontWeight: 600 }}>Dunkel</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  Dunkles Thema mit Amber-Akzenten
                </div>
              </div>
            </div>
          </fieldset>
        </section>

        <div style={{ textAlign: 'right' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid var(--input-border)',
              background: 'var(--card)',
              color: 'var(--text-color)',
            }}
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}
