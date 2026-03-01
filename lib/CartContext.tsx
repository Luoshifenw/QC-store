'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  CartItem, 
  getCart as fetchCart, 
  addToCart as addItem, 
  updateQuantity, 
  removeFromCart, 
  clearCart, 
  getCartTotal, 
  getCartCount 
} from './cart';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateItemQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  // 初始化购物车
  useEffect(() => {
    const savedCart = fetchCart();
    setCart(savedCart);
    setTotal(getCartTotal(savedCart));
    setCount(getCartCount(savedCart));
  }, []);

  const handleAddToCart = (item: Omit<CartItem, 'quantity'>) => {
    const newCart = addItem(item);
    setCart(newCart);
    setTotal(getCartTotal(newCart));
    setCount(getCartCount(newCart));
  };

  const handleUpdateQuantity = (variantId: string, quantity: number) => {
    const newCart = updateQuantity(variantId, quantity);
    setCart(newCart);
    setTotal(getCartTotal(newCart));
    setCount(getCartCount(newCart));
  };

  const handleRemoveItem = (variantId: string) => {
    const newCart = removeFromCart(variantId);
    setCart(newCart);
    setTotal(getCartTotal(newCart));
    setCount(getCartCount(newCart));
  };

  const handleClearCart = () => {
    clearCart();
    setCart([]);
    setTotal(0);
    setCount(0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart: handleAddToCart,
      updateItemQuantity: handleUpdateQuantity,
      removeItem: handleRemoveItem,
      clearCart: handleClearCart,
      total,
      count,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
