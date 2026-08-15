export default function Loading() {
  return (
    <main className="min-h-screen bg-off-white pt-[62px]" role="status" aria-live="polite">
      <span className="sr-only">Loading page. Please wait.</span>
      <div className="h-1 w-full overflow-hidden bg-blue/10" aria-hidden="true">
        <div className="h-full w-1/3 bg-blue motion-safe:animate-pulse" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16" aria-hidden="true">
        <div className="h-4 w-32 bg-grey-200 rounded-sm motion-safe:animate-pulse mb-6" />
        <div className="h-12 max-w-xl bg-grey-200 rounded-sm motion-safe:animate-pulse mb-4" />
        <div className="h-5 max-w-2xl bg-grey-200 rounded-sm motion-safe:animate-pulse mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-64 bg-white border border-grey-100 rounded-sm motion-safe:animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  );
}
