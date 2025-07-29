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
    <header className="bg-gradient-to-r from-restaurant-primary to-restaurant-primary/90 shadow-lg px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mesa */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-white font-medium text-lg">{currentTable}</span>
          </div>
        </div>
        
        {/* Logo centralizado */}
        <div className="flex-1 flex justify-center">
          <img 
            src="/lovable-uploads/5a57adf3-7843-4356-94a1-b26fadcb3dd7.png" 
            alt="The Cuisine Restaurant" 
            className="h-12 filter brightness-0 invert"
          />
        </div>
        
        {/* Ações */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/search')}
            className="text-white hover:bg-white/20 h-10 w-10 p-0"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 h-10 px-3"
          >
            <Phone className="h-4 w-4 mr-2" />
            Garçom
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => navigate('/cart')}
            className="relative h-10 px-4 bg-restaurant-secondary hover:bg-restaurant-secondary/90 text-restaurant-primary font-medium"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Sacola
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-restaurant-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                {getTotalItems()}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;