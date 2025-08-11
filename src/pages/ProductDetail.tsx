import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import QuantityControl from '@/components/QuantityControl';
import StandardHeader from '@/components/StandardHeader';
import ProductConfiguration from '@/components/ProductConfiguration';
import { Product, ProductOption } from '@/lib/types';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, updateQuantity, getItemQuantity, addConfiguredItem } = useCart();
  const [configurationProduct, setConfigurationProduct] = useState<Product | null>(null);
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-restaurant-neutral flex items-center justify-center">
        <p className="text-xl">Produto não encontrado</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.configuration) {
      setConfigurationProduct(product);
    } else {
      addItem(product);
      toast({
        title: "Item adicionado",
        description: `${product.name} foi adicionado à sacola`,
      });
    }
  };

  const handleIncreaseQuantity = () => {
    const currentQuantity = getItemQuantity(product.id);
    if (currentQuantity === 0) {
      handleAddToCart();
    } else {
      updateQuantity(product.id, currentQuantity + 1);
    }
  };

  const handleConfigurationConfirm = (selectedOptions: { [phaseId: string]: ProductOption }, totalPrice: number) => {
    if (configurationProduct) {
      addConfiguredItem(configurationProduct, selectedOptions, totalPrice);
      toast({
        title: "Item adicionado",
        description: `${configurationProduct.name} foi adicionado à sacola`,
      });
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
      <StandardHeader title="Detalhes do Produto" />
      
      <div className="pt-16 sm:pt-20 p-3 sm:p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="order-1 md:order-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 object-cover rounded-lg"
              />
            </div>
            
            <div className="order-2 md:order-2 space-y-3 sm:space-y-4 md:space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-restaurant-primary mb-2 sm:mb-3">
                  {product.name}
                </h1>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-restaurant-primary mb-3 sm:mb-4">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              {getItemQuantity(product.id) > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-base sm:text-lg md:text-xl font-medium text-restaurant-primary">
                      Quantidade na sacola:
                    </span>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-restaurant-primary">
                      R$ {(product.price * getItemQuantity(product.id)).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="flex justify-center sm:justify-start">
                    <QuantityControl
                      quantity={getItemQuantity(product.id)}
                      onIncrease={handleIncreaseQuantity}
                      onDecrease={handleDecreaseQuantity}
                      size="md"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center sm:justify-start">
                  <Button
                    onClick={handleAddToCart}
                    variant="tablet"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold mt-4 sm:mt-6 md:mt-8 rounded-lg"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Adicionar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {configurationProduct && (
        <ProductConfiguration
          product={configurationProduct}
          isOpen={!!configurationProduct}
          onClose={() => setConfigurationProduct(null)}
          onConfirm={handleConfigurationConfirm}
        />
      )}
    </div>
  );
};

export default ProductDetail;