import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { tables } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const WaiterLogin = () => {
  const [password, setPassword] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const navigate = useNavigate();
  const { setCurrentTable } = useApp();

  const handleLogin = () => {
    if (password !== '123') {
      toast({
        title: "Senha incorreta",
        description: "A senha deve ser '123'",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedTable) {
      toast({
        title: "Mesa não selecionada",
        description: "Por favor, selecione uma mesa",
        variant: "destructive",
      });
      return;
    }

    setCurrentTable(selectedTable);
    navigate('/menu');
    toast({
      title: "Acesso liberado",
      description: `Tablet configurado para ${selectedTable}`,
    });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/lovable-uploads/52e34c82-6180-4e8f-8b47-019c6822d850.png')`
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="bg-card rounded-2xl shadow-2xl p-8 w-full max-w-sm space-y-6 relative z-10">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-restaurant-primary">
            Sistema de Autoatendimento
          </h1>
          <p className="text-base text-muted-foreground">
            Acesso do Garçom
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-medium">
              Senha de Acesso
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 text-base"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="table" className="text-base font-medium">
              Selecionar Mesa
            </Label>
            <Select value={selectedTable} onValueChange={setSelectedTable}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Escolha uma mesa" />
              </SelectTrigger>
              <SelectContent>
                {tables.map((table) => (
                  <SelectItem key={table.id} value={table.name} className="text-base">
                    {table.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleLogin}
            variant="tablet"
            className="w-full mt-6"
          >
            ENTREGAR AO CLIENTE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaiterLogin;