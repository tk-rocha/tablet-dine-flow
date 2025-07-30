import React, { useState } from 'react';
import Header from '@/components/Header';
import CategoryList from '@/components/CategoryList';
import ProductGrid from '@/components/ProductGrid';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('1');

  return (
    <div className="h-screen bg-restaurant-neutral flex flex-col">
      <Header />
      <div className="flex-1 flex p-4 md:p-6 gap-4 md:gap-6 min-h-0">
        <div className="w-full md:w-1/4 lg:w-1/5 flex-shrink-0">
          <CategoryList 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>
        <div className="flex-1 min-w-0">
          <ProductGrid selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
};

export default Menu;