import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, ProductOption } from '@/lib/types';

interface CartContextType {
  items: CartItem[];
  sentItems: string[];
  addItem: (product: Product) => void;
  addConfiguredItem: (product: Product, selectedOptions: { [phaseId: string]: ProductOption }, totalPrice: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getItemQuantity: (productId: string) => number;
  sendToKitchen: (itemIds: string[]) => void;
  isItemSent: (productId: string) => boolean;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Persist cart data in localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart-items');
    return saved ? JSON.parse(saved) : [];
  });
  const [sentItems, setSentItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('sent-items');
    return saved ? JSON.parse(saved) : [];
  });

  const addItem = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.product.id === product.id && !item.selectedOptions
      );
      const newItems = existingItem
        ? prevItems.map(item =>
            item.product.id === product.id && !item.selectedOptions
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [{ product, quantity: 1 }, ...prevItems];
      
      localStorage.setItem('cart-items', JSON.stringify(newItems));
      return newItems;
    });
  };

  const addConfiguredItem = (product: Product, selectedOptions: { [phaseId: string]: ProductOption }, totalPrice: number) => {
    setItems(prevItems => {
      const newItems = [
        { 
          product, 
          quantity: 1, 
          selectedOptions, 
          totalPrice 
        }, 
        ...prevItems
      ];
      localStorage.setItem('cart-items', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.product.id !== productId);
      localStorage.setItem('cart-items', JSON.stringify(newItems));
      return newItems;
    });
    setSentItems(prevSentItems => {
      const newSentItems = prevSentItems.filter(id => id !== productId);
      localStorage.setItem('sent-items', JSON.stringify(newSentItems));
      return newSentItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      );
      localStorage.setItem('cart-items', JSON.stringify(newItems));
      return newItems;
    });
  };

  const getItemQuantity = (productId: string) => {
    const item = items.find(item => item.product.id === productId && !item.selectedOptions);
    return item ? item.quantity : 0;
  };

  const sendToKitchen = (itemIds: string[]) => {
    setSentItems(prevSentItems => {
      const newSentItems = [...prevSentItems, ...itemIds];
      localStorage.setItem('sent-items', JSON.stringify(newSentItems));
      return newSentItems;
    });
  };

  const isItemSent = (productId: string) => {
    return sentItems.includes(productId);
  };

  const clearCart = () => {
    setItems([]);
    setSentItems([]);
    localStorage.removeItem('cart-items');
    localStorage.removeItem('sent-items');
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = item.totalPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{ 
      items,
      sentItems,
      addItem,
      addConfiguredItem, 
      removeItem, 
      updateQuantity,
      getItemQuantity,
      sendToKitchen,
      isItemSent,
      clearCart, 
      getTotalItems, 
      getTotalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
};