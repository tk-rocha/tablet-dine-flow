import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const [people, setPeople] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);
  const navigate = useNavigate();
  const { getTotalPrice, clearCart } = useCart();
  const { setOrderSent, setCurrentTable } = useApp();

  const total = getTotalPrice();
  const serviceCharge = total * 0.1;
  const totalWithService = total + serviceCharge;
  const pricePerPerson = people ? totalWithService / parseInt(people) : 0;

  const handleFinalizeSale = () => {
    if (password !== '123') {
      toast({
        title: "Senha incorreta",
        description: "Apenas o garçom pode finalizar a venda",
        variant: "destructive",
      });
      return;
    }

    clearCart();
    setOrderSent(false);
    setCurrentTable(null);
    navigate('/');
    toast({
      title: "Venda finalizada",
      description: "Obrigado pela preferência!",
    });
  };

  return (
    <div className="min-h-screen bg-restaurant-neutral flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-restaurant-primary mb-8 text-center">
          Fechamento do Pedido
        </h1>
        
        <div className="space-y-6">
          <div className="bg-restaurant-neutral p-6 rounded-lg">
            <div className="space-y-4">
              <div className="flex justify-between text-xl">
                <span>Subtotal:</span>
                <span className="font-semibold">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-xl">
                <span>Taxa de serviço (10%):</span>
                <span className="font-semibold">R$ {serviceCharge.toFixed(2).replace('.', ',')}</span>
              </div>
              <hr className="border-restaurant-primary/20" />
              <div className="flex justify-between text-2xl font-bold text-restaurant-primary">
                <span>Total:</span>
                <span>R$ {totalWithService.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="people" className="text-lg font-semibold">
              Quantas pessoas na mesa?
            </Label>
            <Input
              id="people"
              type="number"
              placeholder="Digite o número de pessoas"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="h-14 text-lg"
            />
            {people && parseInt(people) > 0 && (
              <p className="text-lg text-restaurant-primary font-semibold">
                Valor por pessoa: R$ {pricePerPerson.toFixed(2).replace('.', ',')}
              </p>
            )}
          </div>
          
          <div className="bg-restaurant-secondary/20 p-6 rounded-lg">
            <p className="text-lg text-restaurant-primary font-semibold text-center">
              O pagamento será feito diretamente com o garçom.
            </p>
          </div>
          
          {!showPasswordField ? (
            <Button
              onClick={() => setShowPasswordField(true)}
              variant="outline"
              className="w-full h-14 text-lg opacity-60 cursor-not-allowed"
              disabled
            >
              Finalizar Venda (Somente Garçom)
            </Button>
          ) : (
            <div className="space-y-4">
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
              >
                FINALIZAR VENDA
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;