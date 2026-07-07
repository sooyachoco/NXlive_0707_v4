import { IconSearch } from './icons';

export function GridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <div className="skeleton" style={{ height: 158 }} />
          <div className="skeleton" style={{ height: 14, width: '40%', margin: '12px 0 8px' }} />
          <div className="skeleton" style={{ height: 18, width: '85%' }} />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="empty">
      <IconSearch className="ico" />
      <h3>{title}</h3>
      {desc && <p>{desc}</p>}
    </div>
  );
}

export function ErrorState({
  title = '문제가 발생했습니다',
  desc = '잠시 후 다시 시도해주세요.',
  onRetry,
}: {
  title?: string;
  desc?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="empty" role="alert">
      <IconSearch className="ico" />
      <h3>{title}</h3>
      {desc && <p>{desc}</p>}
      {onRetry && (
        <button type="button" className="btn-retry" onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  );
}
