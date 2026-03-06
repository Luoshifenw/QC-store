'use client';

import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
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
  const [cart, setCart] = useState<CartItem[]>(() => fetchCart());
  const total = useMemo(() => getCartTotal(cart), [cart]);
  const count = useMemo(() => getCartCount(cart), [cart]);

  const handleAddToCart = (item: Omit<CartItem, 'quantity'>) => {
    const newCart = addItem(item);
    setCart(newCart);
  };

  const handleUpdateQuantity = (variantId: string, quantity: number) => {
    const newCart = updateQuantity(variantId, quantity);
    setCart(newCart);
  };

  const handleRemoveItem = (variantId: string) => {
    const newCart = removeFromCart(variantId);
    setCart(newCart);
  };

  const handleClearCart = () => {
    clearCart();
    setCart([]);
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
