import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import QuantityControl from '@/components/QuantityControl';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-restaurant-neutral flex items-center justify-center">
        <p className="text-xl">Produto não encontrado</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Item adicionado",
      description: `${product.name} foi adicionado à sacola`,
    });
  };

  const handleIncreaseQuantity = () => {
    const currentQuantity = getItemQuantity(product.id);
    if (currentQuantity === 0) {
      addItem(product);
    } else {
      updateQuantity(product.id, currentQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    const currentQuantity = getItemQuantity(product.id);
    if (currentQuantity > 0) {
      updateQuantity(product.id, currentQuantity - 1);
    }
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
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-8 p-8">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-restaurant-primary mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              <div className="text-4xl font-bold text-restaurant-primary">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </div>
              
              {getItemQuantity(product.id) > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-restaurant-primary">
                      Quantidade na sacola:
                    </span>
                    <span className="text-lg font-bold text-restaurant-primary">
                      R$ {(product.price * getItemQuantity(product.id)).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <QuantityControl
                    quantity={getItemQuantity(product.id)}
                    onIncrease={handleIncreaseQuantity}
                    onDecrease={handleDecreaseQuantity}
                    size="md"
                  />
                </div>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  variant="tablet"
                  className="w-full mt-8"
                >
                  <Plus className="h-6 w-6 mr-3" />
                  ADICIONAR À SACOLA
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;