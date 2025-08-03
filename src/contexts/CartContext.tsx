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
  const [items, setItems] = useState<CartItem[]>([]);
  const [sentItems, setSentItems] = useState<string[]>([]);

  const addItem = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.product.id === product.id && !item.selectedOptions
      );
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id && !item.selectedOptions
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [{ product, quantity: 1 }, ...prevItems];
    });
  };

  const addConfiguredItem = (product: Product, selectedOptions: { [phaseId: string]: ProductOption }, totalPrice: number) => {
    setItems(prevItems => [
      { 
        product, 
        quantity: 1, 
        selectedOptions, 
        totalPrice 
      }, 
      ...prevItems
    ]);
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    setSentItems(prevSentItems => prevSentItems.filter(id => id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item =>
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getItemQuantity = (productId: string) => {
    const item = items.find(item => item.product.id === productId && !item.selectedOptions);
    return item ? item.quantity : 0;
  };

  const sendToKitchen = (itemIds: string[]) => {
    setSentItems(prevSentItems => [...prevSentItems, ...itemIds]);
  };

  const isItemSent = (productId: string) => {
    return sentItems.includes(productId);
  };

  const clearCart = () => {
    setItems([]);
    setSentItems([]);
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