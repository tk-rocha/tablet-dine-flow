import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, getTotalPrice } = useCart();
  const { setOrderSent } = useApp();

  const handleSendToKitchen = () => {
    if (items.length === 0) {
      toast({
        title: "Sacola vazia",
        description: "Adicione alguns itens antes de enviar",
        variant: "destructive",
      });
      return;
    }

    setOrderSent(true);
    navigate('/checkout');
    toast({
      title: "Pedido enviado!",
      description: "Seus itens foram enviados para a cozinha",
    });
  };

  return (
    <div className="min-h-screen bg-restaurant-neutral">
      <div className="p-6">
        <Button
          variant="outline"
          onClick={() => navigate('/menu')}
          className="mb-6 text-lg"
        >
          <ArrowLeft className="h-5 w-5" />
          Voltar
        </Button>
        
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-restaurant-primary mb-8">
            Minha Sacola
          </h1>
          
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl text-muted-foreground mb-6">
                Sua sacola está vazia
              </p>
              <Button
                variant="tablet"
                onClick={() => navigate('/menu')}
              >
                Adicionar Itens
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between p-4 bg-restaurant-neutral rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-restaurant-primary">
                          {item.product.name}
                        </h3>
                        <p className="text-muted-foreground">
                          Quantidade: {item.quantity}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-restaurant-primary">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => removeItem(item.product.id)}
                        className="text-destructive border-destructive hover:bg-destructive hover:text-white"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-bold text-restaurant-primary">
                    Total:
                  </span>
                  <span className="text-3xl font-bold text-restaurant-primary">
                    R$ {getTotalPrice().toFixed(2)}
                  </span>
                </div>
                
                <div className="bg-restaurant-secondary/20 p-6 rounded-lg mb-6">
                  <p className="text-lg text-restaurant-primary font-semibold text-center">
                    Finalize e aguarde! Seus itens serão enviados à cozinha para preparo.
                  </p>
                </div>
                
                <Button
                  onClick={handleSendToKitchen}
                  variant="tablet-secondary"
                  className="w-full"
                >
                  ENVIAR PARA COZINHA
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;