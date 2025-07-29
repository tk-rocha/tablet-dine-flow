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
  const buttonSize = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';
  const containerHeight = size === 'sm' ? 'h-8' : 'h-10';

  return (
    <div className={`flex items-center bg-restaurant-primary rounded-lg ${containerHeight} overflow-hidden`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDecrease}
        className={`${buttonSize} rounded-none text-white hover:bg-white/20 p-0`}
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <div className={`flex-1 flex items-center justify-center text-white font-medium ${textSize} min-w-[2rem]`}>
        {quantity}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onIncrease}
        className={`${buttonSize} rounded-none text-white hover:bg-white/20 p-0`}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantityControl;