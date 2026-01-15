import type { ShoppingItem } from '../api';
import Item from './Item';
import EmptyState from './EmptyState';
import EmptyStateBought from './EmptyStateBought';
import EmptyStateAllBought from './EmptyStateAllBought';
import Loading from './Loading';
import type { FilterType } from './Dock';

interface Props {
  items: ShoppingItem[]; // filtered items for the current view
  totalItems: number; // total items in the list regardless of filter
  filter: FilterType;
  loading: boolean;
  onToggle: (id: string, current: boolean) => void;
  onDelete: (id: string) => void;
}

export default function ItemList({
  items,
  totalItems,
  filter,
  loading,
  onToggle,
  onDelete,
}: Props) {
  if (loading) return <Loading />;

  // No products at all
  if (totalItems === 0) return <EmptyState />;

  // There are products overall, but none match the current filter
  if (items.length === 0) {
    if (filter === 'bought') return <EmptyStateBought />;
    // Default fallback for other filters: show generic empty state messaging
    return <EmptyStateAllBought />;
  }

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item._id} item={item} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
