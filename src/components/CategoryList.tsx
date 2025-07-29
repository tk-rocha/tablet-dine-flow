import React from 'react';
import { categories } from '@/data/mockData';

interface CategoryListProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryList = ({ selectedCategory, onCategorySelect }: CategoryListProps) => {
  return (
    <div className="bg-restaurant-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <div className="flex-1 space-y-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`w-full text-center py-4 px-3 rounded-lg transition-all duration-300 font-medium ${
              selectedCategory === category.id
                ? 'bg-restaurant-primary text-restaurant-white shadow-lg'
                : 'bg-restaurant-white text-restaurant-primary hover:bg-restaurant-neutral border border-restaurant-neutral'
            }`}
          >
            <span className="text-sm">{category.name}</span>
          </button>
        ))}
      </div>
      
      {/* Ícone de sincronização no rodapé */}
      <div className="pt-4 border-t border-restaurant-neutral">
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-restaurant-neutral flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-restaurant-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;