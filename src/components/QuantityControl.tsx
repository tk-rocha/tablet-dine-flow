import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md';
}

const QuantityControl = ({ quantity, onIncrease, onDecrease, size = 'md' }: QuantityControlProps) => {
  const buttonSize = size === 'sm' ? 'h-8 w-8 sm:h-10 sm:w-10' : 'h-10 w-10 sm:h-12 sm:w-12';
  const textSize = size === 'sm' ? 'text-sm sm:text-base' : 'text-base sm:text-lg';
  const containerHeight = size === 'sm' ? 'h-8 sm:h-10' : 'h-10 sm:h-12';
  const iconSize = size === 'sm' ? 'h-3 w-3 sm:h-4 sm:w-4' : 'h-4 w-4 sm:h-5 sm:w-5';

  return (
    <div className={`flex items-center bg-restaurant-primary rounded-lg ${containerHeight} overflow-hidden min-w-[120px] sm:min-w-[140px]`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDecrease}
        className={`${buttonSize} rounded-none text-white hover:bg-white/20 p-0 flex-shrink-0`}
      >
        <Minus className={iconSize} />
      </Button>
      
      <div className={`flex-1 flex items-center justify-center text-white font-medium ${textSize} min-w-[2.5rem] sm:min-w-[3rem]`}>
        {quantity}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onIncrease}
        className={`${buttonSize} rounded-none text-white hover:bg-white/20 p-0 flex-shrink-0`}
      >
        <Plus className={iconSize} />
      </Button>
    </div>
  );
};

export default QuantityControl;