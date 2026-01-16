import { useState } from 'react';
import { Plus, Loader2, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';
import { UNITS, CATEGORIES } from '../constants/shopping';
import type { CreateItemPayload } from '../api';

interface Props {
  onAdd: (payload: CreateItemPayload) => Promise<void>;
  adding: boolean;
  extendedFunctions?: boolean;
}

export default function AddItemForm({ onAdd, adding, extendedFunctions = true }: Props) {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [value, setValue] = useState('');
  const [quantity, setQuantity] = useState<string>('1');
  const [unit, setUnit] = useState<string>('pcs');
  const [category, setCategory] = useState<string>('Other');
  const [expanded, setExpanded] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    try {
      await onAdd({
        name: value.trim(),
        quantity: quantity ? parseFloat(quantity) : 1,
        unit,
        category,
      });
      setValue('');
      setQuantity('1');
      setUnit('pcs');
      setCategory('Other');
      setExpanded(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={submit} className="form-with-details">
      <div className="form">
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
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="details-toggle"
          aria-expanded={expanded}
          aria-hidden={!extendedFunctions}
          disabled={!extendedFunctions}
          title="Toggle quantity and category"
        >
          <ChevronDown className={`icon ${expanded ? 'expanded' : ''}`} />
        </button>
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
      </div>

      {expanded && extendedFunctions && (
        <div className="form-details">
          <div className="form-group">
            <label htmlFor="quantity-input">{t.quantity}</label>
            <input
              id="quantity-input"
              type="number"
              min="0.1"
              step="0.1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input small"
              placeholder="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="unit-select">{t.unit}</label>
            <div className="select-wrapper">
              <select
                id="unit-select"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="select"
              >
                {UNITS.map((u) => (
                  <option key={u.value} value={u.value}>
                    {t.units[u.value as keyof typeof t.units] || u.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="select-icon" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category-select">{t.category}</label>
            <div className="select-wrapper">
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {t.categories[c.value as keyof typeof t.categories] || c.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="select-icon" />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
