import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import QuantityControl from './QuantityControl';

interface ProductGridProps {
  selectedCategory: string;
}

const ProductGrid = ({ selectedCategory }: ProductGridProps) => {
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  const navigate = useNavigate();
  
  const filteredProducts = products.filter(
    product => product.category === selectedCategory
  );

  const handleAddToCart = (product: any) => {
    addItem(product);
    toast({
      title: "Item adicionado",
      description: `${product.name} foi adicionado à sacola`,
    });
  };

  const handleIncreaseQuantity = (product: any) => {
    const currentQuantity = getItemQuantity(product.id);
    if (currentQuantity === 0) {
      addItem(product);
    } else {
      updateQuantity(product.id, currentQuantity + 1);
    }
  };

  const handleDecreaseQuantity = (productId: string) => {
    const currentQuantity = getItemQuantity(productId);
    if (currentQuantity > 0) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 h-full flex items-center justify-center">
        <p className="text-xl text-muted-foreground">
          Selecione uma categoria para ver os produtos
        </p>
      </div>
    );
  }

  return (
    <div className="bg-restaurant-white rounded-lg shadow-md p-6 h-full overflow-y-auto">
      <div className="grid grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-restaurant-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-restaurant-neutral"
          >
            <div 
              className="cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-restaurant-primary mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-restaurant-primary">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4 space-y-2">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProductClick(product.id);
                }}
                className="w-full border-restaurant-primary text-restaurant-primary hover:bg-restaurant-primary hover:text-restaurant-white"
              >
                VER PRODUTO
              </Button>
              
              {getItemQuantity(product.id) > 0 ? (
                <QuantityControl
                  quantity={getItemQuantity(product.id)}
                  onIncrease={() => handleIncreaseQuantity(product)}
                  onDecrease={() => handleDecreaseQuantity(product.id)}
                />
              ) : (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="w-full bg-restaurant-primary text-restaurant-white hover:bg-restaurant-primary/90"
                >
                  ADICIONAR
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;