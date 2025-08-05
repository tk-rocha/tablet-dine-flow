import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import StandardHeader from '@/components/StandardHeader';
import { Trash2, Plus } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: string;
  amount: number;
}

interface DiscountData {
  type: 'percentage' | 'fixed';
  value: number;
  appliedAmount: number;
}

const paymentTypes = [
  { id: 'cash', name: 'Dinheiro', icon: '💵' },
  { id: 'card', name: 'Cartão', icon: '💳' },
  { id: 'pix', name: 'PIX', icon: '📱' }
];

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [discount, setDiscount] = useState<DiscountData | null>(null);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  // Get order data from navigation state
  const orderData = location.state?.orderData;
  
  useEffect(() => {
    if (!orderData) {
      toast({
        title: "Erro",
        description: "Dados do pedido não encontrados",
        variant: "destructive",
      });
      navigate('/checkout');
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  const { items, subtotal, serviceCharge, total: originalTotal, people, waiter } = orderData;

  // Calculate current total with discount
  const discountAmount = discount?.appliedAmount || 0;
  const totalWithDiscount = originalTotal - discountAmount;

  // Calculate total of payment methods
  const totalPayments = paymentMethods.reduce((sum, method) => sum + method.amount, 0);
  const remainingAmount = totalWithDiscount - totalPayments;
  const canFinalize = Math.abs(remainingAmount) < 0.01; // Allow for floating point precision

  const addPaymentMethod = (type: string) => {
    // Sugerir o valor restante a ser pago, ou valor total se for primeira forma de pagamento
    const suggestedAmount = paymentMethods.length === 0 ? totalWithDiscount : Math.max(0, remainingAmount);
    
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type,
      amount: suggestedAmount
    };
    setPaymentMethods([...paymentMethods, newMethod]);
  };

  const updatePaymentAmount = (id: string, amount: number) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === id ? { ...method, amount: Math.max(0, amount) } : method
      )
    );
  };

  const removePaymentMethod = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const applyDiscount = () => {
    const value = parseFloat(discountValue);
    if (isNaN(value) || value <= 0) {
      toast({
        title: "Valor inválido",
        description: "Digite um valor válido para o desconto",
        variant: "destructive",
      });
      return;
    }

    let appliedAmount = 0;
    if (discountType === 'percentage') {
      if (value > 100) {
        toast({
          title: "Porcentagem inválida",
          description: "A porcentagem não pode ser maior que 100%",
          variant: "destructive",
        });
        return;
      }
      appliedAmount = originalTotal * (value / 100);
    } else {
      if (value > originalTotal) {
        toast({
          title: "Valor inválido",
          description: "O desconto não pode ser maior que o total",
          variant: "destructive",
        });
        return;
      }
      appliedAmount = value;
    }

    setDiscount({
      type: discountType,
      value,
      appliedAmount
    });

    setShowDiscountModal(false);
    setDiscountValue('');
    
    toast({
      title: "Desconto aplicado",
      description: `Desconto de R$ ${appliedAmount.toFixed(2).replace('.', ',')} aplicado`,
    });
  };

  const removeDiscount = () => {
    setDiscount(null);
    toast({
      title: "Desconto removido",
      description: "O desconto foi removido da venda",
    });
  };

  const finalizeSale = () => {
    // Here you would save the sale data to your backend
    const saleData = {
      items,
      subtotal,
      serviceCharge,
      originalTotal,
      discount,
      totalWithDiscount,
      paymentMethods,
      people,
      waiter,
      timestamp: new Date().toISOString()
    };

    console.log('Sale finalized:', saleData);
    
    navigate('/venda-finalizada', { 
      state: { saleData }
    });
  };

  return (
    <div className="min-h-screen bg-restaurant-neutral flex flex-col">
      <StandardHeader title="Pagamento" />
      
      <div className="flex-1 pt-20 p-4 md:p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          
          {/* Left Column - Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-restaurant-primary">Resumo da Venda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item: any) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.product.name}</span>
                      <span>R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                    </div>
                  ))}
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de serviço (10%):</span>
                    <span>R$ {serviceCharge.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total sem desconto:</span>
                    <span>R$ {originalTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  
                  {discount && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-2">
                        Desconto ({discount.type === 'percentage' ? `${discount.value}%` : 'Valor fixo'})
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeDiscount}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </span>
                      <span>-R$ {discount.appliedAmount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xl font-bold text-restaurant-primary border-t pt-2">
                    <span>Total Final:</span>
                    <span>R$ {totalWithDiscount.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p>Pessoas na mesa: {people}</p>
                  <p>Garçom: {waiter}</p>
                  <p>Valor por pessoa: R$ {(totalWithDiscount / people).toFixed(2).replace('.', ',')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Discount Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-restaurant-primary flex items-center justify-between">
                  Desconto
                  <Dialog open={showDiscountModal} onOpenChange={setShowDiscountModal}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Desconto
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Aplicar Desconto</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Tipo de Desconto</Label>
                          <RadioGroup value={discountType} onValueChange={(value: 'percentage' | 'fixed') => setDiscountType(value)}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="percentage" id="percentage" />
                              <Label htmlFor="percentage">Porcentagem (%)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="fixed" id="fixed" />
                              <Label htmlFor="fixed">Valor Fixo (R$)</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label htmlFor="discount-value">
                            {discountType === 'percentage' ? 'Porcentagem' : 'Valor'} do Desconto
                          </Label>
                          <Input
                            id="discount-value"
                            type="number"
                            step="0.01"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                            placeholder={discountType === 'percentage' ? 'Ex: 10' : 'Ex: 5.00'}
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button onClick={applyDiscount} className="flex-1">
                            Aplicar Desconto
                          </Button>
                          <Button variant="outline" onClick={() => setShowDiscountModal(false)}>
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {discount ? (
                  <div className="text-green-600 font-semibold">
                    Desconto de R$ {discount.appliedAmount.toFixed(2).replace('.', ',')} aplicado
                  </div>
                ) : (
                  <p className="text-gray-500">Nenhum desconto aplicado</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment Methods */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-restaurant-primary">Formas de Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant="outline"
                      className="h-20 flex-col gap-2"
                      onClick={() => addPaymentMethod(type.name)}
                    >
                      <span className="text-2xl">{type.icon}</span>
                      <span className="text-sm">{type.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods List */}
            {paymentMethods.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-restaurant-primary">Pagamentos Adicionados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <span className="font-medium min-w-20">{method.type}:</span>
                      <div className="flex-1">
                        <Input
                          type="text"
                          value={method.amount.toFixed(2).replace('.', ',')}
                          onChange={(e) => {
                            const value = e.target.value.replace(',', '.');
                            updatePaymentAmount(method.id, parseFloat(value) || 0);
                          }}
                          placeholder="0,00"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePaymentMethod(method.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Total dos Pagamentos:</span>
                      <span className="font-semibold">R$ {totalPayments.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Valor Restante:</span>
                      <span className={`font-semibold ${remainingAmount > 0 ? 'text-red-500' : remainingAmount < 0 ? 'text-blue-500' : 'text-green-500'}`}>
                        R$ {Math.abs(remainingAmount).toFixed(2).replace('.', ',')}
                        {remainingAmount > 0 && ' (faltando)'}
                        {remainingAmount < 0 && ' (troco)'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Finalize Button */}
            <Button
              onClick={finalizeSale}
              disabled={!canFinalize}
              className={`w-full h-14 text-lg font-semibold ${
                canFinalize 
                  ? 'bg-[#FFC72C] text-black hover:bg-[#FFB800]' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {canFinalize ? 'FINALIZAR VENDA' : 'ADICIONE FORMAS DE PAGAMENTO'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;