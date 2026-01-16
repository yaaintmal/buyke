export default function Loading() {
  // Show three skeleton rows that match the height of a list item to prevent layout shifts
  return (
    <div className="list" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <ul>
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="list-item skeleton-item">
            <div className="item-left">
              <div className="checkbox skeleton-box" aria-hidden="true" />
              <span className="item-name skeleton-line" aria-hidden="true" />
            </div>
            <div className="delete-button skeleton-box" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  );
}
