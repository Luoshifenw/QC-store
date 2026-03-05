import Link from 'next/link';

export function FeaturedSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Image - Women */}
          <Link href="/collection/women" className="group relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=800&q=80"
              alt="Women Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-2xl font-light text-white">Women</h3>
              <span className="text-white/80 text-sm mt-1 block">Shop Collection →</span>
            </div>
          </Link>
          
          {/* Right Image - Men */}
          <Link href="/collection/men" className="group relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&q=80"
              alt="Men Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-2xl font-light text-white">Men</h3>
              <span className="text-white/80 text-sm mt-1 block">Shop Collection →</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
