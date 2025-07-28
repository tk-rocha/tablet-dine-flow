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
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <div className="text-lg font-semibold text-restaurant-primary">
        {currentTable}
      </div>
      
      <div className="flex-1 flex justify-center">
        <img 
          src="/lovable-uploads/5a57adf3-7843-4356-94a1-b26fadcb3dd7.png" 
          alt="The Cuisine Restaurant" 
          className="h-16"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="default"
          onClick={() => navigate('/search')}
          className="h-10 px-4"
        >
          <Search className="h-5 w-5" />
        </Button>
        
        <Button
          variant="outline"
          size="default"
          className="h-10 px-4"
        >
          <Phone className="h-5 w-5 mr-2" />
          Chamar Garçom
        </Button>
        
        <Button
          variant="tablet"
          onClick={() => navigate('/cart')}
          className="relative h-10 px-4"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Minha Sacola
          {getTotalItems() > 0 && (
            <span className="absolute -top-1 -right-1 bg-restaurant-secondary text-restaurant-primary rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;