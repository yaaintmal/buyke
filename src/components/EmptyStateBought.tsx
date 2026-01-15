import nuttinBought from '../public/2_nuttin-bought.png';

export default function EmptyStateBought() {
  return (
    <div className="empty">
      <div className="empty-illustration">
        <img src={nuttinBought} alt="Noch nichts gekauft" className="empty-illustration-image" />
      </div>
      <p className="empty-title">Du hast noch keine Artikel gekauft</p>
      <p className="empty-sub">Vielleicht solltest Du mal einkaufen gehen</p>
    </div>
  );
}
