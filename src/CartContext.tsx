import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  estimatedDeliveryDays?: number;
}

interface CartItem extends Product {
  quantity: number;
  addedAt: string;
  estimatedDeliveryDays: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const addOrder = (items: CartItem[]) => {
    const existing = localStorage.getItem('orders');
    const parsed = existing ? JSON.parse(existing) : [];
    const combined = [...parsed, ...items];
    localStorage.setItem('orders', JSON.stringify(combined));
    setOrders(combined);
  };

  const changeQuantity = (productId: number, amount: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const now = new Date().toISOString();

    setCart(prev =>
      prev.some(item => item.id === product.id)
        ? prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...prev,
            {
              ...product,
              quantity: 1,
              addedAt: now,
              estimatedDeliveryDays: product.estimatedDeliveryDays || 7
            }
          ]
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      addOrder, // ✅ nuevo
      orders ,    // ✅ nuevo
      changeQuantity,
    }}>
      {children}
    </CartContext.Provider>
  );
};

const addToCart = (product: Product) => {
  const now = new Date().toISOString();

  setCart(prev =>
    prev.some(item => item.id === product.id)
      ? prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [
          ...prev,
          {
            ...product,
            quantity: 1,
            addedAt: now,
            estimatedDeliveryDays: product.estimatedDeliveryDays || 7
          }
        ]
  );
};


