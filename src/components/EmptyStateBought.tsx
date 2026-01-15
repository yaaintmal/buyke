import { ShoppingCart } from 'lucide-react';

export default function EmptyStateBought() {
  return (
    <div className="empty">
      <div className="empty-illustration">
        <ShoppingCart className="icon large muted" />
      </div>
      <p className="empty-title">Du hast noch keine Artikel gekauft</p>
      <p className="empty-sub">Vielleicht solltest Du mal einkaufen gehen</p>
    </div>
  );
}
