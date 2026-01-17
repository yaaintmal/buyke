import type { ShoppingItem, UpdateItemPayload } from '../api';
import Item from './Item';
import EmptyState from './EmptyState';
import EmptyStateBought from './EmptyStateBought';
import EmptyStateAllBought from './EmptyStateAllBought';
import Loading from './Loading';
import type { FilterType } from './Dock';
import { DEFAULT_CATEGORY_ORDER } from '../constants/shopping';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';

interface Props {
  items: ShoppingItem[]; // filtered items for the current view
  totalItems: number; // total items in the list regardless of filter
  filter: FilterType;
  loading: boolean;
  onToggle: (id: string, current: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: UpdateItemPayload) => Promise<void>;
  extendedFunctions?: boolean;
}

export default function ItemList({
  items,
  totalItems,
  filter,
  loading,
  onToggle,
  onDelete,
  onUpdate,
  extendedFunctions = true,
}: Props) {
  const { lang } = useLanguage();
  const t = translations[lang];

  if (loading) return <Loading />;

  // No products at all
  if (totalItems === 0) return <EmptyState />;

  // There are products overall, but none match the current filter
  if (items.length === 0) {
    if (filter === 'bought') return <EmptyStateBought />;
    // Default fallback for other filters: show generic empty state messaging
    return <EmptyStateAllBought />;
  }

  // Group items by category, preserving category order
  const groupedByCategory = new Map<string, ShoppingItem[]>();
  items.forEach((item) => {
    if (!groupedByCategory.has(item.category)) {
      groupedByCategory.set(item.category, []);
    }
    groupedByCategory.get(item.category)!.push(item);
  });

  const categoryOrder = DEFAULT_CATEGORY_ORDER.filter((cat) => groupedByCategory.has(cat));
  const otherCategories = Array.from(groupedByCategory.keys()).filter(
    (cat): cat is string =>
      !DEFAULT_CATEGORY_ORDER.includes(cat as (typeof DEFAULT_CATEGORY_ORDER)[number]),
  );

  const getCategoryLabel = (category: string): string => {
    return t.categories[category as keyof typeof t.categories] || category;
  };

  return (
    <div className="list">
      <ul>
        {/* Render items in default category order (only group if extended functions enabled) */}
        {extendedFunctions ? (
          <>
            {categoryOrder.map((category) => (
              <div key={`category-${category}`} className="category-group">
                <li className="category-header">{getCategoryLabel(category)}</li>
                {groupedByCategory.get(category as string)!.map((item) => (
                  <Item
                    key={item._id}
                    item={item}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    extendedFunctions={extendedFunctions}
                  />
                ))}
              </div>
            ))}
            {otherCategories.map((category) => (
              <div key={`category-${category}`} className="category-group">
                <li className="category-header">{getCategoryLabel(category)}</li>
                {groupedByCategory.get(category)!.map((item) => (
                  <Item
                    key={item._id}
                    item={item}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    extendedFunctions={extendedFunctions}
                  />
                ))}
              </div>
            ))}
          </>
        ) : (
          items.map((item) => (
            <Item
              key={item._id}
              item={item}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
              extendedFunctions={extendedFunctions}
            />
          ))
        )}
      </ul>
    </div>
  );
}
