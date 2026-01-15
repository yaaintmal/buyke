import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';

interface Props {
  onAdd: (name: string) => Promise<void>;
  adding: boolean;
}

export default function AddItemForm({ onAdd, adding }: Props) {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [value, setValue] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    await onAdd(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={submit} className="form">
      <label htmlFor="add-input" className="sr-only">
        {t.addItemLabel}
      </label>
      <input
        id="add-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t.addItemPlaceholder}
        className="input"
        aria-label={t.addItemLabel}
      />
      <button
        type="submit"
        disabled={adding || !value.trim()}
        className="add-button"
        aria-disabled={adding || !value.trim()}
        aria-label={t.addButton}
        title={t.addButton}
      >
        {adding ? <Loader2 className="icon spin" /> : <Plus className="icon" />}
      </button>
    </form>
  );
}
