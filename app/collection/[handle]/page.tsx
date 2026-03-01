'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/shopify';

// Mock products with lingerie-appropriate images
const allProducts = [
  { id: '1', title: 'Silk Lace Bralette', handle: 'silk-lace-bralette', featuredImage: { url: 'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80', altText: 'Silk Lace Bralette' }, variants: { edges: [{ node: { price: { amount: 68, currencyCode: 'USD' } } }] } },
  { id: '2', title: 'Cotton Comfort Bra', handle: 'cotton-comfort-bra', featuredImage: { url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80', altText: 'Cotton Comfort Bra' }, variants: { edges: [{ node: { price: { amount: 52, currencyCode: 'USD' } } }] } },
  { id: '3', title: 'Lace Brief Set', handle: 'lace-brief-set', featuredImage: { url: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&q=80', altText: 'Lace Brief Set' }, variants: { edges: [{ node: { price: { amount: 89, currencyCode: 'USD' } } }] } },
  { id: '4', title: 'Wireless T-Shirt Bra', handle: 'wireless-tshirt-bra', featuredImage: { url: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=600&q=80', altText: 'Wireless T-Shirt Bra' }, variants: { edges: [{ node: { price: { amount: 58, currencyCode: 'USD' } } }] } },
  { id: '5', title: 'Seamless Thong', handle: 'seamless-thong', featuredImage: { url: 'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80', altText: 'Seamless Thong' }, variants: { edges: [{ node: { price: { amount: 28, currencyCode: 'USD' } } }] } },
  { id: '6', title: 'Push-Up Plunge Bra', handle: 'pushup-plunge-bra', featuredImage: { url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80', altText: 'Push-Up Plunge Bra' }, variants: { edges: [{ node: { price: { amount: 72, currencyCode: 'USD' } } }] } },
  { id: '7', title: 'Bridal Lace Set', handle: 'bridal-lace-set', featuredImage: { url: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&q=80', altText: 'Bridal Lace Set' }, variants: { edges: [{ node: { price: { amount: 128, currencyCode: 'USD' } } }] } },
  { id: '8', title: 'Sports Bra - Light Support', handle: 'sports-bra-light', featuredImage: { url: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=600&q=80', altText: 'Sports Bra' }, variants: { edges: [{ node: { price: { amount: 45, currencyCode: 'USD' } } }] } },
];

const collections: Record<string, { title: string; description: string }> = {
  'all': { title: 'All Products', description: 'Discover our complete collection of elegant lingerie' },
  'bras': { title: 'Bras', description: 'Comfortable, supportive, and beautiful' },
  'panties': { title: 'Panties', description: 'Soft essentials for everyday comfort' },
  'sets': { title: 'Sets', description: 'Coordinated elegance' },
  'new': { title: 'New Arrivals', description: 'Fresh styles just landed' },
};

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export default function CollectionPage({ params }: { params: { handle: string } }) {
  const collection = collections[params.handle] || collections['all'];
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // 排序逻辑
  const sortedProducts = useMemo(() => {
    const products = [...allProducts];
    
    switch (sortBy) {
      case 'price-asc':
        return products.sort((a, b) => 
          a.variants.edges[0].node.price.amount - b.variants.edges[0].node.price.amount
        );
      case 'price-desc':
        return products.sort((a, b) => 
          b.variants.edges[0].node.price.amount - a.variants.edges[0].node.price.amount
        );
      case 'newest':
        return products.reverse();
      default:
        return products;
    }
  }, [sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <nav className="mb-6 md:mb-8 text-sm">
        <Link href="/" className="text-neutral-500 hover:text-neutral-900">Home</Link>
        <span className="mx-2 text-neutral-300">/</span>
        <span className="text-neutral-900">{collection.title}</span>
      </nav>

      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-light text-neutral-900">{collection.title}</h1>
        <p className="mt-3 md:mt-4 text-sm md:text-base text-neutral-500">{collection.description}</p>
      </div>

      {/* 筛选栏 */}
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 mb-6 md:mb-8 pb-4 border-b border-neutral-200">
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-3 md:px-4 py-2 border border-neutral-200 text-xs md:text-sm bg-white focus:outline-none focus:border-neutral-400 cursor-pointer"
        >
          <option value="featured">Sort by: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
        <span className="text-xs md:text-sm text-neutral-500">{sortedProducts.length} products</span>
      </div>

      {/* 产品网格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
        {sortedProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.handle}`} className="group">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
              <Image
                src={product.featuredImage?.url || '/placeholder.jpg'}
                alt={product.featuredImage?.altText || product.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
            </div>
            <div className="mt-3 md:mt-4">
              <h3 className="text-xs md:text-sm font-medium text-neutral-900 group-hover:text-neutral-600 transition line-clamp-2">
                {product.title}
              </h3>
              {product.variants?.edges?.[0]?.node?.price && (
                <p className="mt-1 text-xs md:text-sm text-neutral-500">
                  {formatPrice(product.variants.edges[0].node.price.amount, product.variants.edges[0].node.price.currencyCode)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
