import { ShoppingCart } from 'lucide-react';

interface Props {
  openCount: number;
}

export default function Header({ openCount }: Props) {
  return (
    <header className="card-header">
      <div className="header-left">
        <div className="logo"><ShoppingCart className="icon" /></div>
        <h1 className="title">Buyke - just buy it!</h1>
      </div>
      <div className="count">{openCount} offen</div>
    </header>
  );
}
