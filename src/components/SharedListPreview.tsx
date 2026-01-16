import type { CreateItemPayload } from '../api';
import { translations } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  items: CreateItemPayload[];
  onImport: (items: CreateItemPayload[]) => Promise<void>;
  onClose: () => void;
}

export default function SharedListPreview({ items, onImport, onClose }: Props) {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div className="shared-overlay" role="dialog" aria-modal="true">
      <div className="shared-card">
        <h3>{t.sharedListTitle}</h3>
        <ul>
          {items.map((it, idx) => (
            <li key={idx} className="shared-item">
              {it.quantity ? `${it.quantity} ${it.unit} ` : ''}
              {it.name} {it.category ? `— ${it.category}` : ''}
            </li>
          ))}
        </ul>
        <div className="shared-actions">
          <button onClick={() => onImport(items)} className="action-button">
            {t.importList}
          </button>
          <button onClick={onClose} className="action-button cancel-button">
            {t.cancelButton}
          </button>
        </div>
      </div>
    </div>
  );
}
