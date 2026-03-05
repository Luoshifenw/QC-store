'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProduct, formatPrice } from '@/lib/shopify';
import { useCart } from '@/lib/CartContext';

type Product = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  descriptionHtml?: string;
  featuredImage?: { url: string; altText?: string };
  images?: { edges: { node: { url: string; altText?: string } }[] };
  variants?: { 
    edges: { 
      node: { 
        id: string; 
        title: string; 
        availableForSale: boolean; 
        price: { amount: number; currencyCode: string }; 
        selectedOptions: { name: string; value: string }[] 
      } 
    }[] 
  };
  options?: { id: string; name: string; values: string[] }[];
};

export default function ProductPage() {
  const params = useParams();
  const handle = params.handle as string;
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const data = await getProduct(handle);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setProduct(null);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [handle]);

  const images = product?.images?.edges?.map((e) => e.node) || (product?.featuredImage ? [product.featuredImage] : []);
  const variants = product?.variants?.edges?.map((e) => e.node) || [];
  const defaultPrice = variants[0]?.price;

  // 根据选择的选项找到对应的 variant
  const selectedVariant = useMemo(() => {
    if (variants.length === 0) return null;
    if (Object.keys(selectedOptions).length === 0) return variants.find(v => v.availableForSale) || variants[0];
    
    return variants.find((v) => 
      v.selectedOptions.every((opt) => selectedOptions[opt.name] === opt.value)
    ) || variants[0];
  }, [selectedOptions, variants]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  // 检查某个选项值是否有货
  const isOptionAvailable = (optionName: string, value: string) => {
    return variants.some((v) => {
      const matchOption = v.selectedOptions.find((opt) => opt.name === optionName);
      return matchOption?.value === value && v.availableForSale;
    });
  };

  const handleAddToCart = async () => {
    if (!selectedVariant || !product) return;
    setAddingToCart(true);
    
    addToCart({
      id: selectedVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price.amount,
      image: product.featuredImage?.url,
      quantity: 1,
    });
    
    setTimeout(() => setAddingToCart(false), 500);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <p className="text-neutral-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <p className="text-neutral-500">Product not found.</p>
          <Link href="/collection/all" className="mt-4 inline-block text-neutral-900 underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-8 text-sm">
        <Link href="/" className="text-neutral-500 hover:text-neutral-900">Home</Link>
        <span className="mx-2 text-neutral-300">/</span>
        <Link href="/collection/all" className="text-neutral-500 hover:text-neutral-900">Shop All</Link>
        <span className="mx-2 text-neutral-300">/</span>
        <span className="text-neutral-900">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* 图片区域 */}
        <div className="space-y-4">
          <div className="aspect-[3/4] relative overflow-hidden bg-neutral-100">
            <Image
              src={images[selectedImageIndex]?.url || '/placeholder.jpg'}
              alt={images[selectedImageIndex]?.altText || product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-square relative overflow-hidden bg-neutral-100 transition-all ${
                    selectedImageIndex === idx ? 'ring-2 ring-neutral-900' : 'hover:opacity-80'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.altText || `${product.title} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 产品信息 */}
        <div className="md:pt-8">
          <h1 className="text-3xl font-light text-neutral-900">{product.title}</h1>
          <p className="mt-4 text-xl text-neutral-900">
            {formatPrice(selectedVariant?.price?.amount || defaultPrice?.amount, selectedVariant?.price?.currencyCode || defaultPrice?.currencyCode)}
          </p>
          
          <div className="mt-6 text-neutral-600 leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* 选项选择 */}
          {product.options?.map((option) => (
            option.name !== 'Title' && (
              <div key={option.id} className="mt-8">
                <label className="block text-sm font-medium text-neutral-900 mb-3">
                  {option.name}: <span className="font-normal text-neutral-600">{selectedOptions[option.name] || 'Select'}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const isSelected = selectedOptions[option.name] === value;
                    const available = isOptionAvailable(option.name, value);
                    return (
                      <button
                        key={value}
                        onClick={() => handleOptionChange(option.name, value)}
                        disabled={!available}
                        className={`px-4 py-2 border text-sm transition ${
                          isSelected 
                            ? 'border-neutral-900 bg-neutral-900 text-white' 
                            : available
                              ? 'border-neutral-200 hover:border-neutral-900'
                              : 'border-neutral-100 text-neutral-300 cursor-not-allowed line-through'
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            )
          ))}

          {/* 加购按钮 */}
          <div className="mt-8">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale || addingToCart}
              className={`w-full py-4 text-sm tracking-wide transition ${
                selectedVariant?.availableForSale
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                  : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
              }`}
            >
              {addingToCart ? 'Adding...' : selectedVariant?.availableForSale ? 'ADD TO CART' : 'SOLD OUT'}
            </button>
          </div>

          {/* 附加信息 */}
          <div className="mt-12 pt-8 border-t border-neutral-200 space-y-4 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <span>📦</span>
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-2">
              <span>↩️</span>
              <span>30-day returns & exchanges</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}