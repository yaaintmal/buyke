import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onThemeChange: (t: 'light' | 'dark') => void;
  onFactoryReset: () => Promise<void>;
}

export default function Settings({ open, onClose, theme, onThemeChange, onFactoryReset }: Props) {
  if (!open) return null;

  const handleFactoryReset = async () => {
    const ok = window.confirm(
      'Bist du sicher, dass du alle Einträge löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.',
    );
    if (!ok) return;

    try {
      await onFactoryReset();
      // simple feedback
      alert('Alle Einträge wurden gelöscht.');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Fehler beim Löschen der Einträge.');
    }
  };

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
            <legend style={{ fontSize: 14, marginBottom: 8, color: 'var(--accent)' }}>Theme</legend>

            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
            >
              <button
                role="switch"
                aria-checked={theme === 'dark'}
                aria-label={
                  theme === 'dark'
                    ? 'Dunkles Thema, wechseln zu hellem Thema'
                    : 'Helles Thema, wechseln zu dunklem Thema'
                }
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
                  {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                  <span style={{ fontSize: 13 }}>{theme === 'dark' ? 'Dunkel' : 'Hell'}</span>
                </span>
              </button>

              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 6 }}>
                <button
                  onClick={() => onThemeChange('light')}
                  aria-pressed={theme === 'light'}
                  aria-label={theme === 'light' ? 'Hell (aktiv)' : 'Wechsel zu Hell'}
                  style={{
                    textAlign: 'center',
                    background: theme === 'light' ? 'var(--accent-12)' : 'transparent',
                    border: '1px solid transparent',
                    padding: 8,
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--text-color)' }}>Hell</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    Klarer Hintergrund, grüne Akzente
                  </div>
                </button>

                <button
                  onClick={() => onThemeChange('dark')}
                  aria-pressed={theme === 'dark'}
                  aria-label={theme === 'dark' ? 'Dunkel (aktiv)' : 'Wechsel zu Dunkel'}
                  style={{
                    textAlign: 'center',
                    background: theme === 'dark' ? 'rgba(255, 183, 77, 0.12)' : 'transparent',
                    border: '1px solid transparent',
                    padding: 8,
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--text-color)' }}>Dunkel</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    Dunkles Thema mit Amber-Akzenten
                  </div>
                </button>
              </div>
            </div>
          </fieldset>
        </section>

        <section style={{ marginBottom: 12 }}>
          <legend style={{ fontSize: 14, marginBottom: 8, color: 'var(--accent)' }}>Daten</legend>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              Löscht alle Einträge unwiderruflich
            </div>
            <button
              onClick={handleFactoryReset}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: 'none',
                background: 'var(--danger)',
                color: 'white',
                fontWeight: 600,
              }}
            >
              Factory reset
            </button>
          </div>
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
