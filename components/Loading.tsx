'use client';

import { usePathname } from 'next/navigation';

export function LoadingBar() {
  const pathname = usePathname();
  if (!pathname) return null;

  return (
    <div key={pathname} className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent pointer-events-none">
      <div className="h-full bg-neutral-900 animate-loading-bar" />
      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; opacity: 1; }
          70% { width: 70%; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        .animate-loading-bar {
          animation: loading 500ms ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-neutral-200" />
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-neutral-200 rounded w-3/4" />
        <div className="h-4 bg-neutral-200 rounded w-1/4" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
