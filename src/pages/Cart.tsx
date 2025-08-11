import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';
import StandardHeader from '@/components/StandardHeader';
import QuantityControl from '@/components/QuantityControl';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart, sentItems, sendToKitchen, isItemSent } = useCart();
  const { setOrderSent } = useApp();
  const [orderNotes, setOrderNotes] = useState('');
  const [itemNotes, setItemNotes] = useState<{[key: string]: string}>({});
  const [showNotesFor, setShowNotesFor] = useState<string | null>(null);

  const handleToggleNotes = (itemId: string) => {
    if (showNotesFor === itemId) {
      setShowNotesFor(null);
    } else {
      setShowNotesFor(itemId);
    }
  };

  const handleNoteChange = (itemId: string, note: string) => {
    setItemNotes(prev => ({
      ...prev,
      [itemId]: note
    }));
  };

  const handleSendToKitchen = () => {
    const pendingItems = items.filter(item => !isItemSent(item.product.id));
    
    if (pendingItems.length === 0) {
      toast({
        title: "Nenhum item pendente",
        description: "Todos os itens já foram enviados para a cozinha",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const itemIds = pendingItems.map(item => item.product.id);
    sendToKitchen(itemIds);
    
    toast({
      title: "Itens enviados!",
      description: "Os itens foram enviados para a cozinha",
      duration: 3000,
    });
  };

  const handleFinalizeSale = () => {
    const pendingItems = items.filter(item => !isItemSent(item.product.id));
    
    if (pendingItems.length > 0) {
      toast({
        title: "Ainda há itens para serem enviados",
        description: "Volte e envie ou exclua os itens pendentes antes de finalizar a venda",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }
    
    setOrderSent(true);
    navigate('/checkout', { 
      state: { orderNotes } 
    });
  };

  const allItemsSent = items.every(item => isItemSent(item.product.id));
  const hasPendingItems = items.some(item => !isItemSent(item.product.id));

  return (
    <div className="min-h-screen bg-restaurant-neutral flex flex-col">
      <StandardHeader title="Meu Carrinho" />
      
      <div className="flex-1 pt-16 sm:pt-20 p-3 sm:p-4 md:p-6 pb-44 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
          
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
                const itemSent = isItemSent(item.product.id);
                return (
                  <div
                    key={item.product.id}
                    className={`p-4 rounded-lg ${itemSent ? 'bg-gray-100 opacity-60' : 'bg-restaurant-neutral'}`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-base sm:text-lg md:text-xl font-semibold ${itemSent ? 'text-gray-500' : 'text-restaurant-primary'}`}>
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
                          {itemNotes[item.product.id] && itemNotes[item.product.id].trim() && (
                            <div className="text-sm text-blue-600 mb-1 font-medium">
                              Obs: {itemNotes[item.product.id]}
                            </div>
                          )}
                          <p className={`text-base sm:text-lg md:text-xl font-semibold ${itemSent ? 'text-gray-500' : 'text-restaurant-primary'}`}>
                            R$ {((item.totalPrice || item.product.price) * item.quantity).toFixed(2).replace('.', ',')}
                          </p>
                          {itemSent && (
                            <p className="text-sm text-gray-500 font-medium">
                              Já enviado para preparo
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
                        {!itemSent && (
                          <QuantityControl
                            quantity={item.quantity}
                            onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                            onDecrease={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            size="sm"
                          />
                        )}
                        {!itemSent && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleNotes(item.product.id)}
                            className={`p-2 ${itemNotes[item.product.id] ? 'bg-blue-50 border-blue-300' : ''}`}
                            title="Adicionar observação"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        )}
                        {!itemSent && (
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
                    
                    {!itemSent && showNotesFor === item.product.id && (
                      <div className="mt-4 space-y-2 border-t pt-3">
                        <Label className="text-sm font-medium text-restaurant-primary">
                          Observação do item
                        </Label>
                        <Textarea
                          placeholder="Digite observações para este item (ex: sem cebola, ao ponto, etc.)"
                          value={itemNotes[item.product.id] || ''}
                          onChange={(e) => handleNoteChange(item.product.id, e.target.value)}
                          className="min-h-16 resize-none text-sm"
                          maxLength={150}
                        />
                        <p className="text-xs text-gray-500">
                          {(itemNotes[item.product.id] || '').length}/150 caracteres
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {items.length > 0 && (
            <div className="mt-6 space-y-3">
              <Label htmlFor="order-notes" className="text-base font-medium text-restaurant-primary">
                Observações do Pedido
              </Label>
              <Textarea
                id="order-notes"
                placeholder="Digite observações sobre o pedido (ex: sem cebola, ponto da carne, etc.)"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="min-h-20 resize-none"
                maxLength={300}
              />
              <p className="text-xs text-gray-500">
                {orderNotes.length}/300 caracteres
              </p>
            </div>
          )}
        </div>
      </div>
      
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 sm:p-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-2 mb-3 sm:mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">
                  Subtotal:
                </span>
                <span className="text-xs sm:text-sm font-medium text-restaurant-primary">
                  R$ {getTotalPrice().toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">
                  Taxa de serviço (10%):
                </span>
                <span className="text-xs sm:text-sm font-medium text-restaurant-primary">
                  R$ {(getTotalPrice() * 0.1).toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base font-bold text-restaurant-primary">
                    Total:
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-restaurant-primary">
                    R$ {(getTotalPrice() * 1.1).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              <Button
                onClick={() => navigate('/menu')}
                variant="outline"
                className="w-full py-2 sm:py-3 text-xs sm:text-sm font-medium order-1"
              >
                Continuar Comprando
              </Button>
              
              <Button
                onClick={handleSendToKitchen}
                className="w-full py-2 sm:py-3 text-xs sm:text-sm font-semibold bg-[#FFC72C] text-black hover:bg-[#FFB800] order-2 sm:order-3 lg:order-2"
              >
                Enviar para a Cozinha
              </Button>
              
              <Button
                onClick={handleFinalizeSale}
                disabled={hasPendingItems}
                variant="default"
                className={`w-full py-2 sm:py-3 text-xs sm:text-sm font-medium order-3 sm:order-2 lg:order-3 ${
                  hasPendingItems 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
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