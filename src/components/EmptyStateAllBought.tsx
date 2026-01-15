import { ShoppingCart } from 'lucide-react';

export default function EmptyStateBought() {
  return (
    <div className="empty">
      <div className="empty-illustration">
        <ShoppingCart className="icon large muted" />
      </div>
      <p className="empty-title">Du hast bereits alle Artikel gekauft</p>
      <p className="empty-sub">Du Shop-a-Holic! 🤑🛍️</p>
    </div>
  );
}
