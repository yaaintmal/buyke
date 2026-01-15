import type { ShoppingItem } from '../api';
import Item from './Item';
import EmptyState from './EmptyState';
import Loading from './Loading';

interface Props {
  items: ShoppingItem[];
  loading: boolean;
  onToggle: (id: string, current: boolean) => void;
  onDelete: (id: string) => void;
}

export default function ItemList({ items, loading, onToggle, onDelete }: Props) {
  if (loading) return <Loading />;
  if (items.length === 0) return <EmptyState />;

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
