'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, searchProducts, type ShopifyProduct } from '@/lib/shopify';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 打开时自动聚焦
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // ESC 关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // 连接 Shopify 搜索，输入停止 250ms 后发起请求
  useEffect(() => {
    const keyword = query.trim();
    if (!isOpen || !keyword) {
      setResults([]);
      setSearching(false);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const products = await searchProducts(keyword, 8);
        if (!cancelled) {
          setResults(products);
        }
      } catch {
        if (!cancelled) {
          setResults([]);
        }
      } finally {
        if (!cancelled) {
          setSearching(false);
        }
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute top-0 left-0 right-0 bg-white shadow-lg max-h-[80vh] overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="max-w-3xl mx-auto px-4 py-6">
          {/* 搜索输入框 */}
          <div className="flex items-center gap-4">
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 text-lg outline-none"
            />
            <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 搜索结果 */}
          {query.trim() && (
            <div className="mt-6 border-t border-neutral-200 pt-6">
              {searching ? (
                <p className="text-neutral-500 text-center py-8">Searching...</p>
              ) : results.length > 0 ? (
                <>
                  <p className="text-sm text-neutral-500 mb-4">{results.length} results for &quot;{query}&quot;</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.handle}`}
                        onClick={onClose}
                        className="group"
                      >
                        <div className="aspect-square relative bg-neutral-100 overflow-hidden">
                          <Image
                            src={product.featuredImage?.url || ''}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-neutral-900 line-clamp-1">{product.title}</h3>
                        {product.variants?.edges?.[0]?.node?.price && (
                          <p className="text-sm text-neutral-500">
                            {formatPrice(product.variants.edges[0].node.price.amount, product.variants.edges[0].node.price.currencyCode)}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-neutral-500 text-center py-8">No results for &quot;{query}&quot;</p>
              )}
            </div>
          )}

          {/* 快捷提示 */}
          {!query.trim() && (
            <div className="mt-6 text-center text-neutral-400 text-sm">
              Type to search products
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
