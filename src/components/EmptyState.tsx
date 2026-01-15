import needInput from '../public/1_need-input.png';

export default function EmptyState() {
  return (
    <div className="empty">
      <div className="empty-illustration">
        <img src={needInput} alt="Bitte Einträge hinzufügen" className="empty-illustration-image" />
      </div>
      <p className="empty-title">Deine Liste ist leer</p>
      <p className="empty-sub">Füge oben Produkte hinzu, die du einkaufen möchtest.</p>
    </div>
  );
}
