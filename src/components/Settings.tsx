import { Sun, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';
import { useAvatar } from '../contexts/AvatarContext';
import v1Preview from '../public/v1-1_need-input.webp';
import v2Preview from '../public/v2-1_need-input.webp';
import v3Preview from '../public/v3-1_need-input.webp';
import './Settings.css';
import toast from 'react-hot-toast';

interface Props {
  open: boolean;
  onClose: () => void;
  theme: 'light' | 'dark' | 'highContrast';
  onThemeChange: (t: 'light' | 'dark' | 'highContrast') => void;
  onFactoryReset: () => Promise<void>;
  extendedFunctions?: boolean;
  onExtendedFunctionsChange?: (value: boolean) => void;
}

export default function Settings({
  open,
  onClose,
  theme,
  onThemeChange,
  onFactoryReset,
  extendedFunctions = true,
  onExtendedFunctionsChange,
}: Props) {
  const { lang, setLang } = useLanguage();
  const { avatar, setAvatar } = useAvatar();
  const t = translations[lang];

  if (!open) return null;

  const handleFactoryReset = async () => {
    // Show a non-blocking toast asking for confirmation with action buttons
    toast(
      (toastObj) => (
        <div style={{ maxWidth: 360 }}>
          <div style={{ marginBottom: 8 }}>{t.factoryResetConfirm}</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              onClick={async () => {
                toast.dismiss(toastObj.id);
                try {
                  await onFactoryReset();
                  toast.success(t.factoryResetSuccess);
                  onClose();
                } catch (err) {
                  console.error(err);
                  toast.error(t.factoryResetError);
                }
              }}
              style={{
                padding: '6px 10px',
                borderRadius: 6,
                border: 'none',
                background: 'var(--danger)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {t.confirm}
            </button>

            <button
              onClick={() => toast.dismiss(toastObj.id)}
              style={{
                padding: '6px 10px',
                borderRadius: 6,
                border: '1px solid var(--input-border)',
                background: 'var(--card)',
                cursor: 'pointer',
              }}
            >
              {t.cancel}
            </button>
          </div>
        </div>
      ),
      { duration: Infinity },
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 110, // ensure modal overlays the dock on small screens
      }}
    >
      <div
        style={{ background: 'rgba(0,0,0,0.4)', position: 'absolute', inset: 0 }}
        onClick={onClose}
      ></div>
      <div
        className="settings-dialog"
        style={{
          position: 'relative',
          background: 'var(--card)',
          padding: 20,
          borderRadius: 8,
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          minWidth: 320,
        }}
      >
        <h3 style={{ marginTop: 0 }}>{t.settings}</h3>

        <section style={{ marginBottom: 12 }}>
          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend style={{ fontSize: 14, marginBottom: 8, color: 'var(--accent)' }}>
              {t.theme}
            </legend>

            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
            >
              <button
                role="switch"
                aria-checked={theme === 'dark'}
                aria-label={
                  theme === 'dark'
                    ? `${t.themeDark}, ${t.themeLight}`
                    : `${t.themeLight}, ${t.themeDark}`
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
                title={theme === 'dark' ? `${t.themeDark} (aktiv)` : `Wechsel zu ${t.themeDark}`}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                  <span style={{ fontSize: 13 }}>
                    {theme === 'dark' ? t.themeDark : t.themeLight}
                  </span>
                </span>
              </button>

              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 6 }}>
                <button
                  onClick={() => onThemeChange('light')}
                  aria-pressed={theme === 'light'}
                  aria-label={
                    theme === 'light' ? `${t.themeLight} (aktiv)` : `Wechsel zu ${t.themeLight}`
                  }
                  style={{
                    textAlign: 'center',
                    background: theme === 'light' ? 'var(--accent-12)' : 'transparent',
                    border: '1px solid transparent',
                    padding: 8,
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
                >
                  <Sun size={18} style={{ color: 'var(--accent)' }} />
                  <div style={{ fontWeight: 600, color: 'var(--text-color)' }}>{t.themeLight}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.themeLightDesc}</div>
                </button>

                <button
                  onClick={() => onThemeChange('dark')}
                  aria-pressed={theme === 'dark'}
                  aria-label={
                    theme === 'dark' ? `${t.themeDark} (aktiv)` : `Wechsel zu ${t.themeDark}`
                  }
                  style={{
                    textAlign: 'center',
                    background: theme === 'dark' ? 'rgba(255, 183, 77, 0.12)' : 'transparent',
                    border: '1px solid transparent',
                    padding: 8,
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
                >
                  <Moon size={18} style={{ color: 'var(--accent)' }} />
                  <div style={{ fontWeight: 600, color: 'var(--text-color)' }}>{t.themeDark}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.themeDarkDesc}</div>
                </button>

                <button
                  onClick={() => onThemeChange('highContrast')}
                  aria-pressed={theme === 'highContrast'}
                  aria-label={
                    theme === 'highContrast'
                      ? `${t.themeHighContrast} (aktiv)`
                      : `Wechsel zu ${t.themeHighContrast}`
                  }
                  style={{
                    textAlign: 'center',
                    background: theme === 'highContrast' ? 'var(--accent-12)' : 'transparent',
                    border: '1px solid transparent',
                    padding: 8,
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--text-color)' }}>
                    {t.themeHighContrast}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {t.themeHighContrastDesc}
                  </div>
                </button>
              </div>
            </div>
          </fieldset>
        </section>

        <section style={{ marginBottom: 12 }}>
          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend style={{ fontSize: 14, marginBottom: 8, color: 'var(--accent)' }}>
              {t.language}
            </legend>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={() => setLang('de')}
                aria-pressed={lang === 'de'}
                title={t.languageGerman}
                style={{
                  padding: 8,
                  borderRadius: 6,
                  cursor: 'pointer',
                  background: lang === 'de' ? 'var(--accent-12)' : 'transparent',
                  color: 'var(--text-color)',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  🇩🇪
                  <span>{t.languageGerman}</span>
                </span>
              </button>

              <button
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                title={t.languageEnglish}
                style={{
                  padding: 8,
                  borderRadius: 6,
                  cursor: 'pointer',
                  background: lang === 'en' ? 'var(--accent-12)' : 'transparent',
                  color: 'var(--text-color)',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  🏴󠁧󠁢󠁥󠁮󠁧󠁿
                  <span>{t.languageEnglish}</span>
                </span>
              </button>
            </div>
          </fieldset>
        </section>

        <section style={{ marginBottom: 12 }}>
          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend style={{ fontSize: 14, marginBottom: 8, color: 'var(--accent)' }}>
              {t.avatar}
            </legend>
            <div
              className="avatar-options"
              style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center' }}
            >
              <button
                onClick={() => setAvatar('v1')}
                aria-pressed={avatar === 'v1'}
                title={t.avatarHamster}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: avatar === 'v1' ? 'var(--accent-12)' : 'transparent',
                  border: '1px solid transparent',
                  color: 'var(--muted)',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <img src={v1Preview} alt={t.avatarHamster} className="avatar-preview" />
                  <span style={{ fontSize: 13 }}>{t.avatarHamster}</span>
                </span>
              </button>

              <button
                onClick={() => setAvatar('v2')}
                aria-pressed={avatar === 'v2'}
                title={t.avatarRobot}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: avatar === 'v2' ? 'var(--accent-12)' : 'transparent',
                  border: '1px solid transparent',
                  color: 'var(--muted)',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <img src={v2Preview} alt={t.avatarRobot} className="avatar-preview" />
                  <span style={{ fontSize: 13 }}>{t.avatarRobot}</span>
                </span>
              </button>

              <button
                onClick={() => setAvatar('v3')}
                aria-pressed={avatar === 'v3'}
                title={t.avatarBag}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: avatar === 'v3' ? 'var(--accent-12)' : 'transparent',
                  border: '1px solid transparent',
                  color: 'var(--muted)',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <img src={v3Preview} alt={t.avatarBag} className="avatar-preview" />
                  <span style={{ fontSize: 13 }}>{t.avatarBag}</span>
                </span>
              </button>
            </div>
          </fieldset>
        </section>

        <section style={{ marginBottom: 12 }}>
          <legend style={{ fontSize: 14, marginBottom: 8, color: 'var(--accent)' }}>
            {t.extendedFunctions}
          </legend>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.extendedFunctionsDesc}</div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={extendedFunctions}
                onChange={(e) => onExtendedFunctionsChange?.(e.target.checked)}
                style={{ marginRight: 8, cursor: 'pointer' }}
              />
              <span style={{ fontSize: 12, fontWeight: 600 }}>
                {extendedFunctions ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>
        </section>

        <section style={{ marginBottom: 12 }}>
          <legend style={{ fontSize: 14, marginBottom: 8, color: 'var(--accent)' }}>
            {t.data}
          </legend>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.dataDeleteDesc}</div>
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
              {t.factoryResetButton}
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
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
