'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AddToCartButton } from '@/components/AddToCartButton';
import { formatPrice } from '@/lib/cart';

// Mock product data
const mockProducts: Record<string, any> = {
  'silk-lace-bralette': {
    id: '1',
    title: 'Silk Lace Bralette',
    handle: 'silk-lace-bralette',
    description: 'Luxurious silk blend bralette with delicate lace details. Perfect for everyday elegance. Made from 82% Silk and 18% Elastane for a comfortable, breathable fit.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=800&q=80', altText: 'Silk Lace Bralette' },
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=800&q=80', altText: 'Silk Lace Bralette' } },
        { node: { url: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&q=80', altText: 'Detail view' } },
        { node: { url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80', altText: 'On model' } },
      ]
    },
    variants: {
      edges: [
        { node: { id: 'v1', title: 'Beige / S', availableForSale: true, price: { amount: 68, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Beige' }, { name: 'Size', value: 'S' }] } },
        { node: { id: 'v2', title: 'Beige / M', availableForSale: true, price: { amount: 68, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Beige' }, { name: 'Size', value: 'M' }] } },
        { node: { id: 'v3', title: 'Beige / L', availableForSale: true, price: { amount: 68, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Beige' }, { name: 'Size', value: 'L' }] } },
        { node: { id: 'v4', title: 'Black / S', availableForSale: true, price: { amount: 68, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Black' }, { name: 'Size', value: 'S' }] } },
        { node: { id: 'v5', title: 'Black / M', availableForSale: false, price: { amount: 68, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Black' }, { name: 'Size', value: 'M' }] } },
        { node: { id: 'v6', title: 'Black / L', availableForSale: true, price: { amount: 68, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Black' }, { name: 'Size', value: 'L' }] } },
      ]
    },
    options: [
      { id: 'opt1', name: 'Color', values: ['Beige', 'Black'] },
      { id: 'opt2', name: 'Size', values: ['S', 'M', 'L'] },
    ]
  },
  'cotton-comfort-bra': {
    id: '2',
    title: 'Cotton Comfort Bra',
    handle: 'cotton-comfort-bra',
    description: 'Soft cotton bra for everyday comfort. Seamless design for a smooth look under any outfit.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80', altText: 'Cotton Comfort Bra' },
    images: { edges: [{ node: { url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80', altText: 'Cotton Comfort Bra' } }] },
    variants: { edges: [
      { node: { id: 'v7', title: 'White / S', availableForSale: true, price: { amount: 52, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'White' }, { name: 'Size', value: 'S' }] } },
      { node: { id: 'v8', title: 'White / M', availableForSale: true, price: { amount: 52, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'White' }, { name: 'Size', value: 'M' }] } },
      { node: { id: 'v9', title: 'White / L', availableForSale: true, price: { amount: 52, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'White' }, { name: 'Size', value: 'L' }] } },
    ] },
    options: [
      { id: 'opt3', name: 'Color', values: ['White'] },
      { id: 'opt4', name: 'Size', values: ['S', 'M', 'L'] },
    ]
  },
  'lace-brief-set': {
    id: '3',
    title: 'Lace Brief Set',
    handle: 'lace-brief-set',
    description: 'Elegant matching lace brief set. Perfect for special occasions or everyday luxury.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&q=80', altText: 'Lace Brief Set' },
    images: { edges: [{ node: { url: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&q=80', altText: 'Lace Brief Set' } }] },
    variants: { edges: [{ node: { id: 'v10', title: 'One Size', availableForSale: true, price: { amount: 89, currencyCode: 'USD' }, selectedOptions: [] } }] },
    options: []
  },
  'wireless-tshirt-bra': {
    id: '4',
    title: 'Wireless T-Shirt Bra',
    handle: 'wireless-tshirt-bra',
    description: 'Comfortable wireless t-shirt bra with smooth cups. Invisible under clothing.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=800&q=80', altText: 'Wireless T-Shirt Bra' },
    images: { edges: [{ node: { url: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=800&q=80', altText: 'Wireless T-Shirt Bra' } }] },
    variants: { edges: [
      { node: { id: 'v11', title: 'Nude / S', availableForSale: true, price: { amount: 58, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Nude' }, { name: 'Size', value: 'S' }] } },
      { node: { id: 'v12', title: 'Nude / M', availableForSale: true, price: { amount: 58, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Nude' }, { name: 'Size', value: 'M' }] } },
      { node: { id: 'v13', title: 'Nude / L', availableForSale: true, price: { amount: 58, currencyCode: 'USD' }, selectedOptions: [{ name: 'Color', value: 'Nude' }, { name: 'Size', value: 'L' }] } },
    ] },
    options: [
      { id: 'opt5', name: 'Color', values: ['Nude'] },
      { id: 'opt6', name: 'Size', values: ['S', 'M', 'L'] },
    ]
  },
};

export default function ProductPage() {
  const params = useParams();
  const handle = params.handle as string;
  const product = mockProducts[handle] || mockProducts['silk-lace-bralette'];
  
  const images = product.images?.edges?.map((e: any) => e.node) || [product.featuredImage];
  const variants = product.variants?.edges?.map((e: any) => e.node) || [];
  const defaultPrice = variants[0]?.price;
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // 根据选择的选项找到对应的 variant
  const selectedVariant = useMemo(() => {
    if (variants.length === 0) return null;
    if (Object.keys(selectedOptions).length === 0) return variants[0];
    
    return variants.find((v: any) => 
      v.selectedOptions.every((opt: any) => selectedOptions[opt.name] === opt.value)
    ) || variants[0];
  }, [selectedOptions, variants]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  // 检查某个选项值是否有货
  const isOptionAvailable = (optionName: string, value: string) => {
    return variants.some((v: any) => {
      const matchOption = v.selectedOptions.find((opt: any) => opt.name === optionName);
      return matchOption?.value === value && v.availableForSale;
    });
  };

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
              {images.map((img: any, idx: number) => (
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
          {product.options?.map((option: any) => (
            <div key={option.id} className="mt-8">
              <label className="block text-sm font-medium text-neutral-900 mb-3">
                {option.name}: <span className="font-normal text-neutral-600">{selectedOptions[option.name] || 'Select'}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value: string) => {
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
          ))}

          {/* 加购按钮 */}
          <div className="mt-8">
            <AddToCartButton 
              product={{
                id: product.id,
                title: product.title,
                handle: product.handle,
                featuredImage: product.featuredImage,
                variants: product.variants,
              }}
              selectedVariant={selectedVariant}
            />
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
