import Link from 'next/link';

export function AboutSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src="/images/about_fabric.png"
              alt="About LIVRA"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="max-w-lg">
            <h2 className="text-4xl font-light text-neutral-900 leading-tight">
              Crafted with
              <span className="block italic text-neutral-400">Intention</span>
            </h2>
            <p className="mt-6 text-neutral-600 leading-relaxed">
              At LIVRA, we believe that beautiful lingerie should be an everyday luxury. 
              Each piece is thoughtfully designed to celebrate your body, combining premium 
              materials with timeless elegance.
            </p>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              From the first sketch to the final stitch, we obsess over every detail. 
              Because you deserve to feel confident and comfortable, every single day.
            </p>
            <Link 
              href="/pages/about"
              className="mt-8 inline-block text-sm tracking-wide text-neutral-900 border-b border-neutral-900 pb-1 hover:text-neutral-600 hover:border-neutral-600 transition"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
