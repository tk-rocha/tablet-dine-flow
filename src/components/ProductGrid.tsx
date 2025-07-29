import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface ProductGridProps {
  selectedCategory: string;
}

const ProductGrid = ({ selectedCategory }: ProductGridProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  
  const filteredProducts = products.filter(
    product => product.category === selectedCategory
  );

  const handleAddToCart = (product: any) => {
    addItem(product);
    setAddedItems(prev => new Set(prev).add(product.id));
    toast({
      title: "Item adicionado",
      description: `${product.name} foi adicionado à sacola`,
    });
    
    // Remove o efeito após 2 segundos
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
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
    <div className="bg-white rounded-lg shadow-md p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-restaurant-primary mb-6">
        Produtos
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
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
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-restaurant-primary">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                variant="tablet"
                className={`w-full transition-all duration-300 ${
                  addedItems.has(product.id) 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : ''
                }`}
              >
                {addedItems.has(product.id) ? (
                  <>
                    <Check className="h-5 w-5" />
                    Adicionado
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    Adicionar
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;