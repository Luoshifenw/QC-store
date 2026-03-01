'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { formatPrice } from '@/lib/cart';

export default function CartPage() {
  const { cart, updateItemQuantity, removeItem, total, count } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <h1 className="text-2xl md:text-3xl font-light text-neutral-900">Your Cart</h1>
        
        <div className="mt-8 md:mt-12 py-12 md:py-16 border border-neutral-200">
          <svg className="w-12 h-12 md:w-16 md:h-16 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="mt-4 text-neutral-500">Your cart is empty</p>
          <Link 
            href="/collection/all"
            className="mt-6 inline-block px-6 md:px-8 py-3 bg-neutral-900 text-white text-sm tracking-wide hover:bg-neutral-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-light text-neutral-900 mb-6 md:mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* 商品列表 */}
        <div className="lg:col-span-2 space-y-3 md:space-y-4">
          {cart.map((item) => (
            <div key={item.variantId} className="flex gap-3 md:gap-4 p-3 md:p-4 border border-neutral-200">
              {/* 图片 */}
              <div className="w-20 h-28 md:w-24 md:h-32 relative bg-neutral-100 flex-shrink-0">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              
              {/* 信息 */}
              <div className="flex-1 min-w-0">
                <Link 
                  href={`/products/${item.handle}`}
                  className="text-xs md:text-sm font-medium text-neutral-900 hover:text-neutral-600 line-clamp-2"
                >
                  {item.title}
                </Link>
                
                {/* 显示颜色和尺寸 */}
                <div className="mt-1 text-xs md:text-sm text-neutral-500">
                  {item.color && <span>Color: {item.color}</span>}
                  {item.color && item.size && <span> · </span>}
                  {item.size && <span>Size: {item.size}</span>}
                </div>
                
                <p className="mt-1 text-xs md:text-sm text-neutral-900 font-medium">{formatPrice(item.price, item.currencyCode)}</p>
                
                {/* 数量控制 */}
                <div className="mt-3 md:mt-4 flex items-center gap-2">
                  <button
                    onClick={() => updateItemQuantity(item.variantId, item.quantity - 1)}
                    className="w-7 h-7 md:w-8 md:h-8 border border-neutral-200 text-neutral-600 hover:border-neutral-900 transition text-sm"
                  >
                    -
                  </button>
                  <span className="w-6 md:w-8 text-center text-xs md:text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateItemQuantity(item.variantId, item.quantity + 1)}
                    className="w-7 h-7 md:w-8 md:h-8 border border-neutral-200 text-neutral-600 hover:border-neutral-900 transition text-sm"
                  >
                    +
                  </button>
                  
                  {/* 删除按钮 */}
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="ml-2 md:ml-4 text-xs md:text-sm text-neutral-400 hover:text-red-500 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              {/* 小计 - 移动端隐藏 */}
              <div className="hidden md:block text-sm font-medium text-neutral-900">
                {formatPrice(item.price * item.quantity, item.currencyCode)}
              </div>
            </div>
          ))}
        </div>
        
        {/* 结账区域 */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-50 p-4 md:p-6 sticky top-20">
            <h2 className="text-base md:text-lg font-medium text-neutral-900 mb-3 md:mb-4">Order Summary</h2>
            
            <div className="space-y-2 text-xs md:text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal ({count} items)</span>
                <span className="text-neutral-900">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span className="text-neutral-500">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-neutral-200">
              <div className="flex justify-between text-base md:text-lg font-medium">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            
            <button
              className="mt-4 md:mt-6 w-full py-3 bg-neutral-900 text-white text-sm tracking-wide hover:bg-neutral-800 transition"
              onClick={() => alert('Checkout requires Shopify API. Please upgrade your plan to enable checkout.')}
            >
              Proceed to Checkout
            </button>
            
            <Link 
              href="/collection/all"
              className="mt-3 md:mt-4 block text-center text-xs md:text-sm text-neutral-500 hover:text-neutral-900 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
