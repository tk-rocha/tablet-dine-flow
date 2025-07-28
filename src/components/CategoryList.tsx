import React from 'react';
import { categories } from '@/data/mockData';

interface CategoryListProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryList = ({ selectedCategory, onCategorySelect }: CategoryListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 h-full">
      <h2 className="text-xl font-semibold text-restaurant-primary mb-4 text-center">
        Categorias
      </h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-restaurant-primary text-white shadow-lg'
                : 'bg-restaurant-neutral text-restaurant-primary hover:bg-restaurant-primary/10'
            }`}
          >
            <div className="flex items-center">
              <span className="text-base font-medium">{category.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;