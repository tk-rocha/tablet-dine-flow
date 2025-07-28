import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  currentTable: string | null;
  setCurrentTable: (table: string) => void;
  orderSent: boolean;
  setOrderSent: (sent: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentTable, setCurrentTable] = useState<string | null>(null);
  const [orderSent, setOrderSent] = useState(false);

  return (
    <AppContext.Provider value={{ 
      currentTable, 
      setCurrentTable, 
      orderSent, 
      setOrderSent 
    }}>
      {children}
    </AppContext.Provider>
  );
};