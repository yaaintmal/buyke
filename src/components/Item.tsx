import { useState } from 'react';
import { Check, Trash2, Edit2, X } from 'lucide-react';
import type { ShoppingItem, UpdateItemPayload, Unit } from '../api';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';
import { UNITS, CATEGORIES } from '../constants/shopping';

type LocalItem = ShoppingItem & { pending?: boolean };

interface Props {
  item: LocalItem;
  onToggle: (id: string, current: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: UpdateItemPayload) => Promise<void>;
  extendedFunctions?: boolean;
}

export default function Item({
  item,
  onToggle,
  onDelete,
  onUpdate,
  extendedFunctions = true,
}: Props) {
  const { lang } = useLanguage();
  const t = translations[lang];
  const isPending = item.pending === true;
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState<string>(String(item.quantity));
  const [editUnit, setEditUnit] = useState(item.unit);
  const [editCategory, setEditCategory] = useState(item.category);
  const [isSaving, setIsSaving] = useState(false);

  const unitLabel = t.units[item.unit as keyof typeof t.units] || item.unit;
  const categoryLabel = t.categories[item.category as keyof typeof t.categories] || item.category;
  const quantityLabel = item.quantity !== 1 ? `${item.quantity}${item.unit}` : `1 ${unitLabel}`;

  const handleSave = async () => {
    if (!editName.trim()) return;
    try {
      setIsSaving(true);
      await onUpdate(item._id, {
        name: editName.trim(),
        quantity: parseFloat(editQuantity),
        unit: editUnit,
        category: editCategory,
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditName(item.name);
    setEditQuantity(String(item.quantity));
    setEditUnit(item.unit);
    setEditCategory(item.category);
    setIsEditing(false);
  };

  return (
    <li
      className={isPending ? 'list-item pending' : item.bought ? 'list-item bought' : 'list-item'}
      onClick={() => !isPending && !isEditing && onToggle(item._id, item.bought)}
    >
      <div className="item-left">
        <div
          className={
            isPending ? 'checkbox skeleton-box' : item.bought ? 'checkbox bought' : 'checkbox'
          }
        >
          {!isPending && (
            <Check
              className={item.bought ? 'icon check visible' : 'icon check hidden'}
              strokeWidth={3}
            />
          )}
        </div>

        <div className="item-content">
          {isPending ? (
            <>
              <span className="item-name skeleton-line" />
              <span className="item-detail skeleton-line" />
            </>
          ) : isEditing ? (
            <form
              className="item-edit-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="input"
                placeholder="Item name"
                autoFocus
              />
              {extendedFunctions && (
                <>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                    className="input"
                  />
                  <select
                    value={editUnit}
                    onChange={(e) => setEditUnit(e.target.value as Unit)}
                    className="select"
                  >
                    {UNITS.map((u) => (
                      <option key={u.value} value={u.value}>
                        {t.units[u.value as keyof typeof t.units] || u.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="select"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {t.categories[c.value as keyof typeof t.categories] || c.label}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </form>
          ) : (
            <>
              <div className="item-header">
                <span className={item.bought ? 'item-name bought' : 'item-name'}>{item.name}</span>
                {extendedFunctions && <span className="item-category-badge">{categoryLabel}</span>}
              </div>
              {extendedFunctions && <span className="item-detail">{quantityLabel}</span>}
            </>
          )}
        </div>
      </div>

      <div className="item-actions">
        {isEditing ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              disabled={isSaving || !editName.trim()}
              className="action-button save-button"
              title={t.saveButton}
              aria-label={t.saveButton}
            >
              <Check className="icon" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              disabled={isSaving}
              className="action-button cancel-button"
              title={t.cancelButton}
              aria-label={t.cancelButton}
            >
              <X className="icon" />
            </button>
          </>
        ) : (
          <>
            {!isPending && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="action-button"
                title={t.editButton}
                aria-label={t.editButton}
              >
                <Edit2 className="icon" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isPending) onDelete(item._id);
              }}
              className="action-button delete-button"
              title={`Löschen ${isPending ? '' : item.name}`}
              aria-label={isPending ? 'Löschen deaktiviert' : `Löschen ${item.name}`}
              disabled={isPending}
            >
              {!isPending ? <Trash2 className="icon" /> : null}
            </button>
          </>
        )}
      </div>
    </li>
  );
}
