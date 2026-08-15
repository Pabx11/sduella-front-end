export default function OpportunityGridSkeleton({
  kind,
}: {
  kind: 'funding' | 'jobs';
}) {
  const gridClass = kind === 'jobs'
    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
    : 'grid-cols-1 md:grid-cols-2';

  return (
    <div
      className={`grid ${gridClass} gap-6`}
      role="status"
      aria-live="polite"
      aria-label={`Loading live ${kind}`}
    >
      <span className="sr-only">Loading live {kind}. Please wait.</span>
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="min-h-72 bg-white border border-grey-100 rounded-sm p-6 motion-safe:animate-pulse"
        >
          <div className="flex items-start justify-between gap-6 mb-8">
            <div className="h-7 w-2/5 rounded-sm bg-grey-100" />
            <div className="h-7 w-1/5 rounded-sm bg-grey-100" />
          </div>
          <div className="h-6 w-11/12 rounded-sm bg-grey-100 mb-3" />
          <div className="h-6 w-3/4 rounded-sm bg-grey-100 mb-8" />
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <div className="h-3 w-1/2 rounded-sm bg-grey-100" />
              <div className="h-5 w-4/5 rounded-sm bg-grey-100" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-2/3 rounded-sm bg-grey-100" />
              <div className="h-5 w-full rounded-sm bg-grey-100" />
            </div>
          </div>
          <div className="h-11 w-full rounded-sm bg-grey-100" />
        </div>
      ))}
    </div>
  );
}
