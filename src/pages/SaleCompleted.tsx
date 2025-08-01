import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SaleCompleted = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const saleData = location.state?.saleData;

  const handleNewSale = () => {
    navigate('/');
  };

  if (!saleData) {
    return (
      <div className="min-h-screen bg-restaurant-neutral flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-8">
            <p className="text-lg text-gray-600">Dados da venda não encontrados</p>
            <Button onClick={handleNewSale} className="mt-4">
              Voltar ao Início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-restaurant-neutral flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl text-restaurant-primary">
            Venda Finalizada com Sucesso!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-restaurant-neutral p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-restaurant-primary mb-4">Resumo da Venda</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R$ {saleData.subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de serviço:</span>
                <span>R$ {saleData.serviceCharge.toFixed(2).replace('.', ',')}</span>
              </div>
              {saleData.discount && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto:</span>
                  <span>-R$ {saleData.discount.appliedAmount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <hr className="border-gray-300" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Final:</span>
                <span>R$ {saleData.totalWithDiscount.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>

          <div className="bg-restaurant-neutral p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-restaurant-primary mb-4">Formas de Pagamento</h3>
            <div className="space-y-2">
              {saleData.paymentMethods.map((method: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <span>{method.type}:</span>
                  <span>R$ {method.amount.toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-restaurant-neutral p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Pessoas na mesa:</span> {saleData.people}
              </div>
              <div>
                <span className="font-medium">Garçom:</span> {saleData.waiter}
              </div>
              <div>
                <span className="font-medium">Valor por pessoa:</span> R$ {(saleData.totalWithDiscount / saleData.people).toFixed(2).replace('.', ',')}
              </div>
              <div>
                <span className="font-medium">Data/Hora:</span> {new Date(saleData.timestamp).toLocaleString('pt-BR')}
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-lg text-restaurant-primary font-semibold">
              Obrigado pela preferência!
            </p>
            
            <Button
              onClick={handleNewSale}
              className="w-full h-14 text-lg bg-[#FFC72C] text-black hover:bg-[#FFB800] font-semibold"
            >
              NOVA VENDA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaleCompleted;