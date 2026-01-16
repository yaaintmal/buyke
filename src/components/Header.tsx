import { ShoppingCart, Share2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';

const title = import.meta.env.VITE_APP_TITLE ?? 'Buyke';
const slogan = import.meta.env.VITE_APP_SLOGAN ?? 'just buy it!';

interface Props {
  openCount: number;
  onShare?: () => void;
}

export default function Header({ openCount, onShare }: Props) {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <header className="card-header">
      <div className="header-left">
        <div className="logo">
          <ShoppingCart className="icon" />
        </div>
        <h1 className="title">
          {title} - {slogan}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="count">
          {openCount} {t.openCountSuffix}
        </div>
        <button className="share-button" onClick={onShare} title={t.share} aria-label={t.share}>
          <Share2 className="icon" />
        </button>
      </div>
    </header>
  );
}
