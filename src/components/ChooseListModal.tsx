import { useState } from 'react';
import { createList, getList } from '../api';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';
import toast from 'react-hot-toast';
import { Plus, Download, ArrowRight } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onListSelected: (id: string) => void;
}

export default function ChooseListModal({ open, onClose, onListSelected }: Props) {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [loading, setLoading] = useState(false);
  const [listIdInput, setListIdInput] = useState('');

  if (!open) return null;

  const handleCreate = async () => {
    try {
      setLoading(true);
      const data = await createList();
      onListSelected(data.id);
      toast.success(t.listCreatedSuccess);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(t.listCreateError);
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = async () => {
    if (!listIdInput.trim()) return;
    try {
      setLoading(true);
      await getList(listIdInput.trim());
      onListSelected(listIdInput.trim());
      toast.success(t.loadExistingList);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(t.listLoadError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="intro-modal-overlay" role="dialog" aria-modal="true">
      <div className="intro-card">
        <header className="intro-header">
          <h2>{t.createNewList}</h2>
          <p>{t.startFreshOrJoin || 'Create a new list or join an existing one.'}</p>
        </header>

        <div className="intro-content">
          {/* Option 1: Create New */}
          <div className="intro-option" onClick={handleCreate} style={{ cursor: 'pointer' }}>
            <div className="intro-option-header">
              <div className="intro-icon">
                <Plus size={20} strokeWidth={3} />
              </div>
              <div className="intro-title">{t.createButton}</div>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
              {t.createListDesc || 'Start a brand new shopping list.'}
            </p>
          </div>

          <div
            style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', margin: '-4px 0' }}
          >
            — {t.or || 'OR'} —
          </div>

          {/* Option 2: Join Existing */}
          <div className="intro-option">
            <div className="intro-option-header">
              <div className="intro-icon">
                <Download size={20} strokeWidth={3} />
              </div>
              <div className="intro-title">{t.loadExistingListTitle || 'Join List'}</div>
            </div>

            <div className="intro-actions">
              <input
                className="intro-input"
                placeholder="List ID (e.g. 123-abc)"
                value={listIdInput}
                onChange={(e) => setListIdInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLoad();
                  if (e.key === 'Escape') onClose();
                }}
              />
              <button
                className="btn-primary"
                onClick={handleLoad}
                disabled={loading || !listIdInput.trim()}
                title={t.loadButton}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="intro-footer">
          <button className="btn-text" onClick={onClose}>
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
