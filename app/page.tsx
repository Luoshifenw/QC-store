import { Hero } from '@/components/Hero';
import { FeaturedSection } from '@/components/FeaturedSection';
import { AboutSection } from '@/components/AboutSection';
import { ProductGrid } from '@/components/ProductGrid';

// 优雅内衣产品数据
const mockProducts = [
  {
    id: '1',
    title: 'Silk Lace Bralette',
    handle: 'silk-lace-bralette',
    featuredImage: { 
      url: 'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80', 
      altText: 'Elegant silk lace bralette in soft pink' 
    },
    variants: { edges: [{ node: { price: { amount: 68, currencyCode: 'USD' } } }] },
  },
  {
    id: '2',
    title: 'Cotton Comfort Bra',
    handle: 'cotton-comfort-bra',
    featuredImage: { 
      url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80', 
      altText: 'Comfortable cotton bra in white' 
    },
    variants: { edges: [{ node: { price: { amount: 52, currencyCode: 'USD' } } }] },
  },
  {
    id: '3',
    title: 'Lace Brief Set',
    handle: 'lace-brief-set',
    featuredImage: { 
      url: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&q=80', 
      altText: 'Matching lace brief set' 
    },
    variants: { edges: [{ node: { price: { amount: 89, currencyCode: 'USD' } } }] },
  },
  {
    id: '4',
    title: 'Wireless T-Shirt Bra',
    handle: 'wireless-tshirt-bra',
    featuredImage: { 
      url: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=600&q=80', 
      altText: 'Seamless wireless t-shirt bra' 
    },
    variants: { edges: [{ node: { price: { amount: 58, currencyCode: 'USD' } } }] },
  },
];

export default async function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid 
        products={mockProducts} 
        title="New Arrivals"
        subtitle="Discover our latest collection of elegant essentials"
      />
      <FeaturedSection />
      <AboutSection />
      
      <section className="py-16 bg-neutral-900 text-white text-center px-4">
        <h2 className="text-3xl font-light mb-4">Join the AURA Community</h2>
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
