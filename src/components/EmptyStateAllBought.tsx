import allChecked from '../public/3_all-checked.png';

export default function EmptyStateBought() {
  return (
    <div className="empty">
      <div className="empty-illustration">
        <img src={allChecked} alt="Alle Artikel gekauft" className="empty-illustration-image" />
      </div>
      <p className="empty-title">Du bist ein Shop-a-Holic 🤑🛍️</p>
      <p className="empty-sub">Du hast bereits alle Artikel gekauft!</p>
    </div>
  );
}
