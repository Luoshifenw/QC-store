import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero_banner.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-black/40 md:via-black/20 md:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left w-full">
        <div className="max-w-xl mx-auto md:mx-0">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-white tracking-wide leading-tight">
            Embrace Your
            <span className="block mt-2 italic">Elegance</span>
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80 max-w-md mx-auto md:mx-0">
            Discover our collection of premium lingerie, designed for comfort and sophistication.
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <Link 
              href="/collection/women"
              className="px-6 sm:px-8 py-3 bg-white text-neutral-900 text-sm tracking-wide hover:bg-neutral-100 transition text-center"
            >
              SHOP NOW
            </Link>
            <Link 
              href="/collection/featured"
              className="px-6 sm:px-8 py-3 border border-white text-white text-sm tracking-wide hover:bg-white/10 transition text-center"
            >
              FEATURED
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - 隐藏在移动端 */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
