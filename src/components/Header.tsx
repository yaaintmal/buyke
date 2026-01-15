import { ShoppingCart } from 'lucide-react';

const title = import.meta.env.VITE_APP_TITLE ?? 'Buyke';
const slogan = import.meta.env.VITE_APP_SLOGAN ?? 'just buy it!';

interface Props {
  openCount: number;
}

export default function Header({ openCount }: Props) {
  return (
    <header className="card-header">
      <div className="header-left">
        <div className="logo">
          <ShoppingCart className="icon" />
        </div>
        <h1 className="title">
          {title} - {slogan}
        </h1>
      </div>

      <div className="count">{openCount} offen</div>
    </header>
  );
}
