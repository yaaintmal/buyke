import { Check, Trash2 } from 'lucide-react';
import type { ShoppingItem } from '../api';

type LocalItem = ShoppingItem & { pending?: boolean };

interface Props {
  item: LocalItem;
  onToggle: (id: string, current: boolean) => void;
  onDelete: (id: string) => void;
}

export default function Item({ item, onToggle, onDelete }: Props) {
  const isPending = item.pending === true;

  return (
    <li
      className={isPending ? 'list-item pending' : item.bought ? 'list-item bought' : 'list-item'}
      onClick={() => !isPending && onToggle(item._id, item.bought)}
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

        {isPending ? (
          <span className="item-name skeleton-line" />
        ) : (
          <span className={item.bought ? 'item-name bought' : 'item-name'}>{item.name}</span>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isPending) onDelete(item._id);
        }}
        className="delete-button"
        title={`Löschen ${isPending ? '' : item.name}`}
        aria-label={isPending ? 'Löschen deaktiviert' : `Löschen ${item.name}`}
        disabled={isPending}
      >
        {!isPending ? <Trash2 className="icon" /> : null}
      </button>
    </li>
  );
}
