import { Hero } from '@/components/Hero';
import { FeaturedSection } from '@/components/FeaturedSection';
import { AboutSection } from '@/components/AboutSection';
import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // 从 Shopify API 获取真实商品
  const products = await getProducts(8);
  
  return (
    <>
      <Hero />
      <ProductGrid 
        products={products} 
        title="New Arrivals"
        subtitle="Discover our latest collection of elegant essentials"
      />
      <FeaturedSection />
      <AboutSection />
      
      <section className="py-16 bg-neutral-900 text-white text-center px-4">
        <h2 className="text-3xl font-light mb-4">Join the LIVRA Community</h2>
        <p className="text-neutral-400 mb-8 max-w-md mx-auto">
          Subscribe to receive exclusive offers, early access to new arrivals, and styling tips.
        </p>
        <form className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500"
          />
          <button className="px-6 py-3 bg-white text-neutral-900 text-sm tracking-wide hover:bg-neutral-100 transition">
            Subscribe
          </button>
        </form>
      </section>
    </>
  );
}
