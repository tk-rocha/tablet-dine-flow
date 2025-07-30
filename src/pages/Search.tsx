import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import QuantityControl from '@/components/QuantityControl';
import StandardHeader from '@/components/StandardHeader';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="min-h-screen bg-restaurant-neutral">
      <StandardHeader title="Pesquisar Produtos" />
      
      <div className="pt-20 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-xl font-bold text-restaurant-primary mb-8">
            Pesquisar Produtos
          </h1>
          
          <div className="mb-8">
            <Input
              type="text"
              placeholder="Digite o nome do produto ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-16 text-xl"
            />
          </div>
          
          {searchTerm && (
            <div>
              <h2 className="text-sm font-normal text-restaurant-primary mb-6">
                Resultado da pesquisa ({filteredProducts.length} encontrados)
              </h2>
              
              {filteredProducts.length === 0 ? (
                <p className="text-xl text-muted-foreground text-center py-8">
                  Nenhum produto encontrado para "{searchTerm}"
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover cursor-pointer"
                        onClick={() => navigate(`/product/${product.id}`)}
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-restaurant-primary mb-2">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-restaurant-primary">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        {getItemQuantity(product.id) > 0 ? (
                          <QuantityControl
                            quantity={getItemQuantity(product.id)}
                            onIncrease={() => handleIncreaseQuantity(product)}
                            onDecrease={() => handleDecreaseQuantity(product.id)}
                          />
                        ) : (
                          <Button
                            onClick={() => handleAddToCart(product)}
                            variant="tablet"
                            className="w-full"
                          >
                            <Plus className="h-5 w-5" />
                            Adicionar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;