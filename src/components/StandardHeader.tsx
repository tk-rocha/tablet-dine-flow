import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StandardHeaderProps {
  title: string;
  onBack?: () => void;
}

const StandardHeader = ({ title, onBack }: StandardHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="bg-restaurant-white shadow-lg px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-restaurant-primary hover:bg-restaurant-neutral h-8 w-8 sm:h-10 sm:w-10 p-0"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
        
        <div className="flex-1 flex justify-center px-2">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-restaurant-primary text-center truncate max-w-[200px] sm:max-w-[300px] md:max-w-none">
            {title}
          </h1>
        </div>
        
        {/* Espaço para manter centralização */}
        <div className="w-8 sm:w-[52px]"></div>
      </div>
    </header>
  );
};

export default StandardHeader;