import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Phone, ShoppingCart } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentTable } = useApp();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold text-restaurant-primary">
        {currentTable}
      </div>
      
      <div className="flex-1 flex justify-center">
        <h1 className="text-3xl font-bold text-restaurant-primary">
          CAFETERIA BELLA
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/search')}
          className="min-h-12 px-6"
        >
          <Search className="h-6 w-6" />
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="min-h-12 px-6"
        >
          <Phone className="h-6 w-6" />
          Chamar Garçom
        </Button>
        
        <Button
          variant="tablet"
          onClick={() => navigate('/cart')}
          className="relative min-h-12 px-6"
        >
          <ShoppingCart className="h-6 w-6" />
          Minha Sacola
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-restaurant-secondary text-restaurant-primary rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;