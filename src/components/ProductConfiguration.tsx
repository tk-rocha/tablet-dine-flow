import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Product, ProductOption, ProductPhase } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductConfigurationProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedOptions: { [phaseId: string]: ProductOption }, totalPrice: number) => void;
}

const ProductConfiguration = ({ product, isOpen, onClose, onConfirm }: ProductConfigurationProps) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [phaseId: string]: ProductOption }>({});

  if (!product.configuration) return null;

  const phases = product.configuration.phases;
  const currentPhase = phases[currentPhaseIndex];
  const isLastPhase = currentPhaseIndex === phases.length - 1;
  const isFirstPhase = currentPhaseIndex === 0;

  const handleOptionSelect = (option: ProductOption) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentPhase.id]: option
    }));
  };

  const handleNext = () => {
    if (currentPhase.required && !selectedOptions[currentPhase.id]) {
      return;
    }

    if (isLastPhase) {
      handleConfirm();
    } else {
      setCurrentPhaseIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstPhase) {
      setCurrentPhaseIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    if (!currentPhase.required) {
      if (isLastPhase) {
        handleConfirm();
      } else {
        setCurrentPhaseIndex(prev => prev + 1);
      }
    }
  };

  const calculateTotalPrice = () => {
    let total = product.price;
    Object.values(selectedOptions).forEach(option => {
      if (option.price) {
        total += option.price;
      }
    });
    return total;
  };

  const handleConfirm = () => {
    const totalPrice = calculateTotalPrice();
    onConfirm(selectedOptions, totalPrice);
    onClose();
    // Reset state
    setCurrentPhaseIndex(0);
    setSelectedOptions({});
  };

  const handleClose = () => {
    onClose();
    // Reset state
    setCurrentPhaseIndex(0);
    setSelectedOptions({});
  };

  const canProceed = !currentPhase.required || selectedOptions[currentPhase.id];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-restaurant-primary">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Etapa {currentPhaseIndex + 1} de {phases.length}
            </span>
            <div className="flex space-x-1">
              {phases.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentPhaseIndex ? 'bg-restaurant-primary' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Current phase */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-restaurant-primary">
              {currentPhase.name}
              {currentPhase.required && <span className="text-red-500 ml-1">*</span>}
            </h3>

            <div className="space-y-2">
              {currentPhase.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full p-3 text-left rounded-lg border transition-all ${
                    selectedOptions[currentPhase.id]?.id === option.id
                      ? 'border-restaurant-primary bg-restaurant-primary/10'
                      : 'border-gray-200 hover:border-restaurant-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{option.name}</span>
                    {option.price && (
                      <span className="text-restaurant-primary font-semibold">
                        + R$ {option.price.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total atual:</span>
              <span className="text-xl font-bold text-restaurant-primary">
                R$ {calculateTotalPrice().toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            {!isFirstPhase && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            )}

            {!currentPhase.required && (
              <Button
                variant="outline"
                onClick={handleSkip}
                className="flex-1"
              >
                Pular
              </Button>
            )}

            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex-1 bg-restaurant-primary text-white hover:bg-restaurant-primary/90"
            >
              {isLastPhase ? 'Adicionar à Sacola' : 'Próximo'}
              {!isLastPhase && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>

          {currentPhase.required && !selectedOptions[currentPhase.id] && (
            <p className="text-sm text-red-500 text-center">
              Esta escolha é obrigatória
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductConfiguration;