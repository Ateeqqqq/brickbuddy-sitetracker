export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-100" aria-label={`${value}% complete`}>
      <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}
