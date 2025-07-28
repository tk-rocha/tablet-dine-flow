import React from 'react';
import { categories } from '@/data/mockData';

interface CategoryListProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryList = ({ selectedCategory, onCategorySelect }: CategoryListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h2 className="text-2xl font-bold text-restaurant-primary mb-6">
        Categorias
      </h2>
      <div className="space-y-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-restaurant-primary text-white shadow-lg'
                : 'bg-restaurant-neutral text-restaurant-primary hover:bg-restaurant-primary/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <span className="text-lg font-semibold">{category.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;