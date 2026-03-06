'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getCollection, formatPrice, getProducts } from '@/lib/shopify';

type Product = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  featuredImage?: { url: string; altText?: string };
  variants?: { edges: { node: { id: string; price: { amount: number; currencyCode: string } } }[] };
};

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

const collectionInfo: Record<string, { title: string; description: string }> = {
  'women': { title: 'Women', description: 'Elegant lingerie crafted for her' },
  'men': { title: 'Men', description: 'Comfortable essentials for him' },
  'featured': { title: 'Featured', description: 'Our curated picks' },
  'all': { title: 'All Products', description: 'Discover our complete collection' },
};

export default function CollectionPage() {
  const params = useParams<{ handle: string }>();
  const handle = params?.handle || 'all';
  const collectionMeta = collectionInfo[handle] || collectionInfo['all'];
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        if (handle === 'all') {
          const allProducts = await getProducts(50);
          setProducts(allProducts);
        } else {
          const collection = await getCollection(handle, 50);
          if (collection) {
            setProducts(collection.products);
          } else {
            setProducts([]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [handle]);

  // 排序逻辑
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => 
          (a.variants?.edges?.[0]?.node?.price?.amount || 0) - (b.variants?.edges?.[0]?.node?.price?.amount || 0)
        );
      case 'price-desc':
        return sorted.sort((a, b) => 
          (b.variants?.edges?.[0]?.node?.price?.amount || 0) - (a.variants?.edges?.[0]?.node?.price?.amount || 0)
        );
      case 'newest':
        return sorted.reverse();
      default:
        return sorted;
    }
  }, [sortBy, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <nav className="mb-6 md:mb-8 text-sm">
        <Link href="/" className="text-neutral-500 hover:text-neutral-900">Home</Link>
        <span className="mx-2 text-neutral-300">/</span>
        <span className="text-neutral-900">{collectionMeta.title}</span>
      </nav>

      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-light text-neutral-900">{collectionMeta.title}</h1>
        <p className="mt-3 md:mt-4 text-sm md:text-base text-neutral-500">{collectionMeta.description}</p>
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

      {/* 加载状态 */}
      {loading ? (
        <div className="text-center py-20">
          <p className="text-neutral-500">Loading products...</p>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-neutral-500">No products found in this collection.</p>
        </div>
      ) : (
        /* 产品网格 */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
          {sortedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.handle}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                <Image
                  src={product.featuredImage?.url || '/placeholder.jpg'}
                  alt={product.featuredImage?.altText || product.title}
                  fill
                  className="object-contain object-center p-2 transition-transform duration-500"
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
      )}
    </div>
  );
}
