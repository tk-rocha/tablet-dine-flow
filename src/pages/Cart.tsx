import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';
import StandardHeader from '@/components/StandardHeader';
import QuantityControl from '@/components/QuantityControl';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { setOrderSent } = useApp();
  const [sentItems, setSentItems] = useState<string[]>([]);

  const handleSendToKitchen = () => {
    const pendingItems = items.filter(item => !sentItems.includes(item.product.id));
    
    if (pendingItems.length === 0) {
      toast({
        title: "Nenhum item pendente",
        description: "Todos os itens já foram enviados para a cozinha",
        variant: "destructive",
      });
      return;
    }

    const newSentItems = [...sentItems, ...pendingItems.map(item => item.product.id)];
    setSentItems(newSentItems);
    
    toast({
      title: "Itens enviados!",
      description: "Os itens foram enviados para a cozinha",
    });
  };

  const handleFinalizeSale = () => {
    const pendingItems = items.filter(item => !sentItems.includes(item.product.id));
    
    if (pendingItems.length > 0) {
      if (window.confirm("Você ainda possui itens pendentes para envio. Deseja continuar?\nSe sim, os itens pendentes serão descartados.\nCaso contrário, volte e envie os itens restantes para preparo.")) {
        setOrderSent(true);
        clearCart();
        navigate('/checkout');
      }
    } else {
      setOrderSent(true);
      clearCart();
      navigate('/checkout');
    }
  };

  const allItemsSent = items.every(item => sentItems.includes(item.product.id));

  return (
    <div className="min-h-screen bg-restaurant-neutral flex flex-col">
      <StandardHeader title="Meu Carrinho" />
      
      <div className="flex-1 pt-20 p-6 pb-44 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          
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
            <div className="space-y-4">
              {items.map((item) => {
                const isItemSent = sentItems.includes(item.product.id);
                return (
                  <div
                    key={item.product.id}
                    className={`flex items-center justify-between p-4 rounded-lg ${isItemSent ? 'bg-gray-100 opacity-60' : 'bg-restaurant-neutral'}`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className={`text-xl font-semibold ${isItemSent ? 'text-gray-500' : 'text-restaurant-primary'}`}>
                          {item.product.name}
                        </h3>
                        {item.selectedOptions && (
                          <div className="text-sm text-gray-600 mb-1">
                            {Object.values(item.selectedOptions).map((option, index) => (
                              <span key={option.id}>
                                {option.name}
                                {index < Object.values(item.selectedOptions!).length - 1 && ', '}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className={`text-xl font-semibold ${isItemSent ? 'text-gray-500' : 'text-restaurant-primary'}`}>
                          R$ {((item.totalPrice || item.product.price) * item.quantity).toFixed(2).replace('.', ',')}
                        </p>
                        {isItemSent && (
                          <p className="text-sm text-gray-500 font-medium">
                            Já enviado para preparo
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {!isItemSent && (
                        <QuantityControl
                          quantity={item.quantity}
                          onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                          onDecrease={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          size="sm"
                        />
                      )}
                      {!isItemSent && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.product.id)}
                          className="text-destructive border-destructive hover:bg-destructive hover:text-white p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Subtotal:
                </span>
                <span className="text-sm font-medium text-restaurant-primary">
                  R$ {getTotalPrice().toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Taxa de serviço (10%):
                </span>
                <span className="text-sm font-medium text-restaurant-primary">
                  R$ {(getTotalPrice() * 0.1).toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-restaurant-primary">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-restaurant-primary">
                    R$ {(getTotalPrice() * 1.1).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={() => navigate('/menu')}
                variant="outline"
                className="w-full py-3 text-sm font-medium"
              >
                Continuar Comprando
              </Button>
              
              <Button
                onClick={handleSendToKitchen}
                className="w-full py-3 text-sm font-semibold bg-[#FFC72C] text-black hover:bg-[#FFB800]"
              >
                Enviar para a Cozinha
              </Button>
              
              <Button
                onClick={handleFinalizeSale}
                variant={allItemsSent ? "default" : "outline"}
                className={`w-full py-3 text-sm font-medium ${!allItemsSent ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!allItemsSent && items.length > 0}
              >
                Finalizar Venda
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;