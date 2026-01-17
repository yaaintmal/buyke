import { ShoppingCart, Copy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';

const title = import.meta.env.VITE_APP_TITLE ?? 'Buyke';
const slogan = import.meta.env.VITE_APP_SLOGAN ?? 'just buy it!';

interface Props {
  openCount: number;
  onShare?: () => void;
  listId?: string;
  onCopyList?: () => void;
}

export default function Header({ openCount, listId, onCopyList }: Props) {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <header className="app-header">
      <div className="brand-section">
        <div className="brand-logo">
          <ShoppingCart size={22} strokeWidth={2.5} />
        </div>
        <div className="brand-text">
          <h1 className="brand-title">{title}</h1>
          <span className="brand-slogan">{slogan}</span>
        </div>
      </div>

      <div className="header-actions">
        {listId && (
          <button className="id-badge" onClick={onCopyList} title={t.copyListLink}>
            <span className="id-label">ID:</span>
            <span className="id-value">{listId.slice(0, 8)}</span>
            <Copy size={12} className="id-icon" />
          </button>
        )}
        <div className="status-pill">
          <span className="status-count">{openCount}</span>
          <span className="status-label">{t.openCountSuffix}</span>
        </div>
      </div>
    </header>
  );
}
