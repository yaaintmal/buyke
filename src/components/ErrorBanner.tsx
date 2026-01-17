interface Props {
  message: string;
}
export default function ErrorBanner({ message }: Props) {
  // Keep a consistent height to avoid shifting when banner appears/disappears
  return (
    <div className="error" role="status" aria-live="polite">
      <div className="error-inner">⚠️ {message}</div>
    </div>
  );
}
