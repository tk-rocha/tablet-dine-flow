import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';
import StandardHeader from '@/components/StandardHeader';
import QuantityControl from '@/components/QuantityControl';

const waiters = [
  { name: "Charles", password: "123" },
  { name: "Ester", password: "123" },
  { name: "Fagner", password: "123" }
];

const Checkout = () => {
  const [people, setPeople] = useState(1);
  const [selectedWaiter, setSelectedWaiter] = useState('');
  const [password, setPassword] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { setOrderSent, setCurrentTable } = useApp();

  // Calculate total from sent items only (in a real app, this would come from a sent items context)
  const sentItems = items; // For now, assuming all items are sent
  const subtotal = sentItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const serviceCharge = subtotal * 0.1;
  const total = subtotal + serviceCharge;
  const pricePerPerson = total / people;

  const handleFinalizeSale = () => {
    const waiter = waiters.find(w => w.name === selectedWaiter);
    if (!waiter || password !== waiter.password) {
      toast({
        title: "Credenciais incorretas",
        description: "Verifique o garçom selecionado e a senha",
        variant: "destructive",
      });
      return;
    }

    // Navigate to payment page with the order data
    navigate('/pagamento', { 
      state: { 
        orderData: {
          items: sentItems,
          subtotal,
          serviceCharge,
          total,
          people,
          waiter: selectedWaiter
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-restaurant-neutral flex flex-col">
      <StandardHeader title="Checkout" />
      
      <div className="flex-1 pt-20 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-restaurant-primary mb-8 text-center">
            Fechamento do Pedido
          </h1>
          
          <div className="space-y-6">
            <div className="bg-restaurant-neutral p-6 rounded-lg">
              <div className="space-y-4">
                <div className="flex justify-between text-xl">
                  <span>Subtotal:</span>
                  <span className="font-semibold">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-xl">
                  <span>Taxa de serviço (10%):</span>
                  <span className="font-semibold">R$ {serviceCharge.toFixed(2).replace('.', ',')}</span>
                </div>
                <hr className="border-restaurant-primary/20" />
                <div className="flex justify-between text-2xl font-bold text-restaurant-primary">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Label className="text-lg font-semibold">
                Quantas pessoas na mesa?
              </Label>
              <div className="flex items-center justify-center">
                <QuantityControl
                  quantity={people}
                  onIncrease={() => setPeople(people + 1)}
                  onDecrease={() => setPeople(Math.max(1, people - 1))}
                />
              </div>
              <p className="text-lg text-restaurant-primary font-semibold text-center">
                Valor por pessoa: R$ {pricePerPerson.toFixed(2).replace('.', ',')}
              </p>
            </div>
            
            <div className="bg-restaurant-secondary/20 p-6 rounded-lg">
              <p className="text-lg text-restaurant-primary font-semibold text-center">
                O pagamento será feito diretamente com o garçom.
              </p>
            </div>
            
            {!showAuth ? (
              <Button
                onClick={() => setShowAuth(true)}
                className="w-full h-14 text-lg bg-[#FFC72C] text-black hover:bg-[#FFB800] font-semibold"
              >
                Finalizar Venda (Somente Garçom)
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-lg font-semibold">
                    Selecione o Garçom
                  </Label>
                  <Select value={selectedWaiter} onValueChange={setSelectedWaiter}>
                    <SelectTrigger className="h-14 text-lg">
                      <SelectValue placeholder="Escolha o garçom" />
                    </SelectTrigger>
                    <SelectContent>
                      {waiters.map((waiter) => (
                        <SelectItem key={waiter.name} value={waiter.name}>
                          {waiter.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="waiter-password" className="text-lg font-semibold">
                    Senha do Garçom
                  </Label>
                  <Input
                    id="waiter-password"
                    type="password"
                    placeholder="Digite a senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleFinalizeSale()}
                  />
                </div>
                
                <Button
                  onClick={handleFinalizeSale}
                  variant="tablet"
                  className="w-full"
                  disabled={!selectedWaiter || !password}
                >
                  AUTENTICAR E CONTINUAR
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;