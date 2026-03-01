'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    handle: string;
    featuredImage?: { url: string };
    variants: {
      edges: {
        node: {
          id: string;
          title: string;
          price: { amount: number; currencyCode: string };
          availableForSale: boolean;
          selectedOptions?: { name: string; value: string }[];
        };
      }[];
    };
  };
  selectedVariant?: {
    id: string;
    title: string;
    price: { amount: number; currencyCode: string };
    availableForSale: boolean;
    selectedOptions?: { name: string; value: string }[];
  };
}

export function AddToCartButton({ product, selectedVariant }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const variant = selectedVariant || product.variants?.edges?.[0]?.node;

  const handleAddToCart = async () => {
    if (!variant?.availableForSale) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 从 selectedOptions 提取颜色和尺寸
    const colorOption = variant.selectedOptions?.find(opt => opt.name.toLowerCase() === 'color');
    const sizeOption = variant.selectedOptions?.find(opt => opt.name.toLowerCase() === 'size');
    
    addToCart({
      id: product.id,
      title: product.title,
      handle: product.handle,
      price: variant.price.amount,
      currencyCode: variant.price.currencyCode,
      image: product.featuredImage?.url || '',
      variantId: variant.id,
      variantTitle: variant.title,
      color: colorOption?.value,
      size: sizeOption?.value,
    });
    
    setLoading(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading || !variant?.availableForSale}
      className={`
        w-full py-4 text-sm tracking-wide transition
        ${added 
          ? 'bg-green-600 text-white' 
          : variant?.availableForSale
            ? 'bg-neutral-900 text-white hover:bg-neutral-800'
            : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
        }
      `}
    >
      {loading ? 'Adding...' : added ? '✓ Added to Cart!' : !variant?.availableForSale ? 'Sold Out' : 'Add to Cart'}
    </button>
  );
}
