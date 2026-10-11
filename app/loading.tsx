/** Route-level loading state (client navigations, e.g. 404 → home). */
export default function Loading() {
  return (
    <div className="grid min-h-dvh place-items-center bg-paper">
      <div className="relative h-2 w-48 overflow-hidden rounded-full bg-purple-50" role="status" aria-label="Loading">
        <div className="pl-bar stripes absolute inset-y-0 w-1/2 rounded-full [--stripe-w:6px]" />
      </div>
    </div>
  );
}
