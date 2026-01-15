import { Check, Trash2 } from 'lucide-react';
import type { ShoppingItem } from '../api';

interface Props {
  item: ShoppingItem;
  onToggle: (id: string, current: boolean) => void;
  onDelete: (id: string) => void;
}

export default function Item({ item, onToggle, onDelete }: Props){
  return (
    <li className={item.bought ? 'list-item bought' : 'list-item'} onClick={() => onToggle(item._id, item.bought)}>
      <div className="item-left">
        <div className={item.bought ? 'checkbox bought' : 'checkbox'}>
          <Check className={item.bought ? 'icon check visible' : 'icon check hidden'} strokeWidth={3} />
        </div>

        <span className={item.bought ? 'item-name bought' : 'item-name'}>{item.name}</span>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onDelete(item._id); }}
        className="delete-button"
        title="Löschen"
      >
        <Trash2 className="icon" />
      </button>
    </li>
  );
}
