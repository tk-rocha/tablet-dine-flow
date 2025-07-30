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
    <header className="bg-restaurant-white shadow-lg px-6 py-4 border-b fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-restaurant-primary hover:bg-restaurant-neutral h-10 w-10 p-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-bold text-restaurant-primary">
            {title}
          </h1>
        </div>
        
        {/* Espaço para manter centralização */}
        <div className="w-[52px]"></div>
      </div>
    </header>
  );
};

export default StandardHeader;