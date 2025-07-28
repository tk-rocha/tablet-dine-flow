import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
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
    navigate('/menu');
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
              
              <Button
                onClick={handleAddToCart}
                variant="tablet"
                className="w-full mt-8"
              >
                ADICIONAR À SACOLA
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;