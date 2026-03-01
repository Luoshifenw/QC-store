// 购物车状态管理 (纯前端，使用 localStorage)

export interface CartItem {
  id: string;
  title: string;
  handle: string;
  price: number;
  currencyCode: string;
  image: string;
  quantity: number;
  variantId: string;
  variantTitle: string; // 例如 "Beige / M"
  color?: string;
  size?: string;
}

const CART_KEY = 'aura_cart';

// 获取购物车
export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

// 保存购物车
function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// 添加商品到购物车
export function addToCart(item: Omit<CartItem, 'quantity'>): CartItem[] {
  const cart = getCart();
  const existingIndex = cart.findIndex(i => i.variantId === item.variantId);
  
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  
  saveCart(cart);
  return cart;
}

// 更新数量
export function updateQuantity(variantId: string, quantity: number): CartItem[] {
  const cart = getCart();
  const index = cart.findIndex(i => i.variantId === variantId);
  
  if (index >= 0) {
    if (quantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }
  }
  
  saveCart(cart);
  return cart;
}

// 删除商品
export function removeFromCart(variantId: string): CartItem[] {
  const cart = getCart().filter(i => i.variantId !== variantId);
  saveCart(cart);
  return cart;
}

// 清空购物车
export function clearCart(): void {
  saveCart([]);
}

// 计算总价
export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// 获取商品总数
export function getCartCount(cart: CartItem[]): number {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// 格式化价格
export function formatPrice(amount: number, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}
