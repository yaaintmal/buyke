import { ShoppingCart } from 'lucide-react';

export default function EmptyState(){
  return (
    <div className="empty">
      <div className="empty-illustration"><ShoppingCart className="icon large muted" /></div>
      <p className="empty-title">Deine Liste ist leer</p>
      <p className="empty-sub">Füge oben Produkte hinzu, die du einkaufen möchtest.</p>
    </div>
  );
}
