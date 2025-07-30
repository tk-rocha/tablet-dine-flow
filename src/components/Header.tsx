import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Phone, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentTable } = useApp();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className="bg-restaurant-white shadow-lg px-6 py-4 border-b">
      <div className="flex items-center justify-between">
        {/* Botão Voltar e Mesa */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-restaurant-primary hover:bg-restaurant-neutral h-10 w-10 p-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-restaurant-primary font-bold text-xl">{currentTable}</span>
        </div>
        
        {/* Logo centralizado */}
        <div className="flex-1 flex justify-center">
          <img 
            src="/lovable-uploads/5a57adf3-7843-4356-94a1-b26fadcb3dd7.png" 
            alt="The Cuisine Restaurant" 
            className="h-12"
          />
        </div>
        
        {/* Ações */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/search')}
            className="text-restaurant-primary hover:bg-restaurant-neutral h-10 w-10 p-0"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-restaurant-secondary hover:bg-restaurant-secondary/10 h-10 px-3 border border-restaurant-secondary"
          >
            <Phone className="h-4 w-4 mr-2" />
            Chamar Garçom
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => navigate('/cart')}
            className="relative h-10 px-4 text-restaurant-primary hover:bg-restaurant-neutral"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
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