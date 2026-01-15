export default function Loading() {
  // Show three skeleton rows that match the height of a list item to prevent layout shifts
  return (
    <div className="list">
      <ul>
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="list-item skeleton-item">
            <div className="item-left">
              <div className="checkbox skeleton-box" />
              <span className="item-name skeleton-line" />
            </div>
            <div className="delete-button skeleton-box" />
          </li>
        ))}
      </ul>
    </div>
  );
}
