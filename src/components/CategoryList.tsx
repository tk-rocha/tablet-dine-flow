import React from 'react';
import { categories } from '@/data/mockData';

interface CategoryListProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryList = ({ selectedCategory, onCategorySelect }: CategoryListProps) => {
  return (
    <div className="bg-restaurant-white rounded-lg shadow-md p-4 h-full">
      <div className="space-y-3">
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
    </div>
  );
};

export default CategoryList;