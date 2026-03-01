import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/shopify';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    handle: string;
    featuredImage?: { url: string; altText: string | null };
    variants: { edges: { node: { price: { amount: number; currencyCode: string } } }[] };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.variants?.edges?.[0]?.node?.price;
  
  return (
    <Link href={`/products/${product.handle}`} className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-neutral-400">No image</span>
          </div>
        )}
        
        {/* Quick Add - 移动端隐藏 */}
        <div className="hidden md:block absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-full py-2 bg-white/95 text-neutral-900 text-sm tracking-wide hover:bg-white transition">
            Quick Add
          </button>
        </div>
      </div>
      
      <div className="mt-3 md:mt-4">
        <h3 className="text-xs sm:text-sm font-medium text-neutral-900 group-hover:text-neutral-600 transition line-clamp-2">
          {product.title}
        </h3>
        {price && (
          <p className="mt-1 text-xs sm:text-sm text-neutral-500">
            {formatPrice(price.amount, price.currencyCode)}
          </p>
        )}
      </div>
    </Link>
  );
}
