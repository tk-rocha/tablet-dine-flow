import React, { useState } from 'react';
import Header from '@/components/Header';
import CategoryList from '@/components/CategoryList';
import ProductGrid from '@/components/ProductGrid';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('1');

  return (
    <div className="min-h-screen bg-restaurant-neutral">
      <Header />
      <div className="p-6 h-[calc(100vh-100px)]">
        <div className="grid grid-cols-4 gap-6 h-full">
          <div className="col-span-1">
            <CategoryList 
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>
          <div className="col-span-3">
            <ProductGrid selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;