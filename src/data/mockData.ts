import { Product, Category, Table } from '@/lib/types';

export const categories: Category[] = [
  { id: '1', name: 'PRATO DO DIA' },
  { id: '2', name: 'EXECUTIVO' },
  { id: '3', name: 'MASSAS' },
  { id: '4', name: 'LANCHES' },
  { id: '5', name: 'BEBIDAS' },
  { id: '6', name: 'CAFÉS' },
  { id: '7', name: 'PORÇÕES' },
  { id: '8', name: 'SOBREMESAS' },
];

export const products: Product[] = [
  // PRATO DO DIA
  { id: '1', name: 'Virado à Paulista', description: 'Virado à paulista tradicional', price: 28.00, image: '/placeholder.svg', category: '1' },
  { id: '2', name: 'Bife à Rolê', description: 'Bife à rolê grelhado', price: 28.00, image: '/placeholder.svg', category: '1' },
  { id: '3', name: 'Feijoada', description: 'Feijoada completa tradicional', price: 32.00, image: '/placeholder.svg', category: '1' },
  { id: '4', name: 'Macarrão à Bolonhesa', description: 'Macarrão com molho bolonhesa', price: 25.00, image: '/placeholder.svg', category: '1' },
  { id: '5', name: 'Peixe Empanado', description: 'Peixe empanado dourado', price: 28.00, image: '/placeholder.svg', category: '1' },
  { id: '6', name: 'Churrasco', description: 'Churrasco misto da casa', price: 34.00, image: '/placeholder.svg', category: '1' },

  // EXECUTIVO
  { id: '7', name: 'Bife à Parmegiana', description: 'Bife à parmegiana com fritas', price: 32.00, image: '/placeholder.svg', category: '2' },
  { id: '8', name: 'Frango com Fritas', description: 'Frango grelhado com batatas fritas', price: 32.00, image: '/placeholder.svg', category: '2' },
  { id: '9', name: 'Bife com Fritas', description: 'Bife grelhado com batatas fritas', price: 32.00, image: '/placeholder.svg', category: '2' },
  { id: '10', name: 'Panquecas', description: 'Panquecas doces da casa', price: 30.00, image: '/placeholder.svg', category: '2' },
  { id: '11', name: 'Omelete', description: 'Omelete simples ou especial', price: 25.00, image: '/placeholder.svg', category: '2' },

  // MASSAS
  { id: '12', name: 'Lasanha', description: 'Lasanha à bolonhesa', price: 34.00, image: '/placeholder.svg', category: '3' },
  { id: '13', name: 'Ravioli', description: 'Ravioli recheado', price: 34.00, image: '/placeholder.svg', category: '3' },
  { id: '14', name: 'Cappelletti', description: 'Cappelletti na manteiga', price: 38.00, image: '/placeholder.svg', category: '3' },
  { id: '15', name: 'Gnocchi', description: 'Gnocchi ao molho de sua escolha', price: 44.00, image: '/placeholder.svg', category: '3' },
  { id: '16', name: 'Rondelli', description: 'Rondelli especial da casa', price: 44.00, image: '/placeholder.svg', category: '3' },
  { id: '17', name: 'Sorrentini', description: 'Sorrentini com molho especial', price: 45.00, image: '/placeholder.svg', category: '3' },

  // LANCHES
  { 
    id: '18', 
    name: 'Combo X-Salada', 
    description: 'X-Salada com fritas e refrigerante', 
    price: 29.99, 
    image: '/placeholder.svg', 
    category: '4',
    configuration: {
      phases: [
        {
          id: 'meat',
          name: 'Ponto da Carne',
          required: true,
          options: [
            { id: 'rare', name: 'Mal passada' },
            { id: 'medium', name: 'Ao ponto' },
            { id: 'well', name: 'Bem passada' }
          ]
        },
        {
          id: 'drink',
          name: 'Refrigerante',
          required: true,
          options: [
            { id: 'coke', name: 'Coca-Cola' },
            { id: 'fanta', name: 'Fanta' },
            { id: 'sprite', name: 'Sprite' },
            { id: 'guarana', name: 'Guaraná' }
          ]
        },
        {
          id: 'extra',
          name: 'Adicional',
          required: false,
          options: [
            { id: 'bbq', name: 'Molho Barbecue', price: 2.00 },
            { id: 'mayo', name: 'Maionese temperada', price: 1.50 },
            { id: 'fries', name: 'Fritas extras', price: 5.00 }
          ]
        }
      ]
    }
  },
  { 
    id: '19', 
    name: 'Combo X-Bacon', 
    description: 'X-Bacon com fritas e refrigerante', 
    price: 31.00, 
    image: '/placeholder.svg', 
    category: '4',
    configuration: {
      phases: [
        {
          id: 'meat',
          name: 'Ponto da Carne',
          required: true,
          options: [
            { id: 'rare', name: 'Mal passada' },
            { id: 'medium', name: 'Ao ponto' },
            { id: 'well', name: 'Bem passada' }
          ]
        },
        {
          id: 'drink',
          name: 'Refrigerante',
          required: true,
          options: [
            { id: 'coke', name: 'Coca-Cola' },
            { id: 'fanta', name: 'Fanta' },
            { id: 'sprite', name: 'Sprite' },
            { id: 'guarana', name: 'Guaraná' }
          ]
        },
        {
          id: 'extra',
          name: 'Adicional',
          required: false,
          options: [
            { id: 'bbq', name: 'Molho Barbecue', price: 2.00 },
            { id: 'mayo', name: 'Maionese temperada', price: 1.50 },
            { id: 'fries', name: 'Fritas extras', price: 5.00 }
          ]
        }
      ]
    }
  },
  { 
    id: '20', 
    name: 'Combo X-Tudo', 
    description: 'X-Tudo com fritas e refrigerante', 
    price: 36.99, 
    image: '/placeholder.svg', 
    category: '4',
    configuration: {
      phases: [
        {
          id: 'meat',
          name: 'Ponto da Carne',
          required: true,
          options: [
            { id: 'rare', name: 'Mal passada' },
            { id: 'medium', name: 'Ao ponto' },
            { id: 'well', name: 'Bem passada' }
          ]
        },
        {
          id: 'drink',
          name: 'Refrigerante',
          required: true,
          options: [
            { id: 'coke', name: 'Coca-Cola' },
            { id: 'fanta', name: 'Fanta' },
            { id: 'sprite', name: 'Sprite' },
            { id: 'guarana', name: 'Guaraná' }
          ]
        },
        {
          id: 'extra',
          name: 'Adicional',
          required: false,
          options: [
            { id: 'bbq', name: 'Molho Barbecue', price: 2.00 },
            { id: 'mayo', name: 'Maionese temperada', price: 1.50 },
            { id: 'fries', name: 'Fritas extras', price: 5.00 }
          ]
        }
      ]
    }
  },
  { 
    id: '21', 
    name: 'Combo Pastel', 
    description: 'Pastel com fritas e refrigerante', 
    price: 19.99, 
    image: '/placeholder.svg', 
    category: '4',
    configuration: {
      phases: [
        {
          id: 'flavor',
          name: 'Escolha o sabor do pastel',
          required: true,
          options: [
            { id: 'meat', name: 'Carne' },
            { id: 'cheese', name: 'Queijo' },
            { id: 'pizza', name: 'Pizza' },
            { id: 'palmito', name: 'Palmito' }
          ]
        },
        {
          id: 'drink',
          name: 'Refrigerante',
          required: true,
          options: [
            { id: 'coke', name: 'Coca-Cola' },
            { id: 'fanta', name: 'Fanta' },
            { id: 'sprite', name: 'Sprite' },
            { id: 'guarana', name: 'Guaraná' }
          ]
        },
        {
          id: 'extra',
          name: 'Adicional',
          required: false,
          options: [
            { id: 'bbq', name: 'Molho Barbecue', price: 2.00 },
            { id: 'mayo', name: 'Maionese temperada', price: 1.50 },
            { id: 'fries', name: 'Fritas extras', price: 5.00 }
          ]
        }
      ]
    }
  },
  { 
    id: '22', 
    name: 'Misto Quente', 
    description: 'Misto quente tradicional', 
    price: 22.00, 
    image: '/placeholder.svg', 
    category: '4',
    configuration: {
      phases: [
        {
          id: 'drink',
          name: 'Bebida',
          required: true,
          options: [
            { id: 'coffee', name: 'Café' },
            { id: 'juice', name: 'Suco' },
            { id: 'soda', name: 'Refrigerante' }
          ]
        },
        {
          id: 'extra',
          name: 'Adicional',
          required: false,
          options: [
            { id: 'sauce', name: 'Molho', price: 1.00 },
            { id: 'chips', name: 'Batata palha', price: 2.00 },
            { id: 'egg', name: 'Ovo extra', price: 3.00 }
          ]
        }
      ]
    }
  },

  // BEBIDAS
  { id: '23', name: 'Suco de Laranja', description: 'Suco natural de laranja', price: 15.00, image: '/placeholder.svg', category: '5' },
  { id: '24', name: 'Suco de Maracujá', description: 'Suco natural de maracujá', price: 15.00, image: '/placeholder.svg', category: '5' },
  { id: '25', name: 'Suco de Abacaxi', description: 'Suco natural de abacaxi', price: 15.00, image: '/placeholder.svg', category: '5' },
  { id: '26', name: 'Sprite', description: 'Sprite gelado', price: 9.00, image: '/placeholder.svg', category: '5' },
  { id: '27', name: 'Coca-Cola', description: 'Coca-Cola gelada', price: 9.00, image: '/placeholder.svg', category: '5' },
  { id: '28', name: 'Fanta Laranja', description: 'Fanta Laranja gelada', price: 9.90, image: '/placeholder.svg', category: '5' },

  // CAFÉS
  { id: '29', name: 'Café Expresso', description: 'Café expresso tradicional', price: 8.00, image: '/placeholder.svg', category: '6' },
  { id: '30', name: 'Macchiato', description: 'Macchiato cremoso', price: 9.90, image: '/placeholder.svg', category: '6' },
  { id: '31', name: 'Carioca', description: 'Café carioca', price: 7.90, image: '/placeholder.svg', category: '6' },
  { id: '32', name: 'Café Coado', description: 'Café coado tradicional', price: 10.00, image: '/placeholder.svg', category: '6' },
  { id: '33', name: 'Latte', description: 'Latte cremoso', price: 7.90, image: '/placeholder.svg', category: '6' },
  { id: '34', name: 'Prensa Francesa', description: 'Café na prensa francesa', price: 9.99, image: '/placeholder.svg', category: '6' },
  { id: '35', name: 'Mocaccino', description: 'Mocaccino com chocolate', price: 14.00, image: '/placeholder.svg', category: '6' },

  // PORÇÕES
  { id: '36', name: 'Batata Frita', description: 'Porção de batata frita', price: 28.00, image: '/placeholder.svg', category: '7' },
  { id: '37', name: 'Batata com Cheddar', description: 'Batata frita com molho cheddar', price: 37.00, image: '/placeholder.svg', category: '7' },
  { id: '38', name: 'Mandioca Frita', description: 'Porção de mandioca frita', price: 29.90, image: '/placeholder.svg', category: '7' },
  { id: '39', name: 'Calabresa', description: 'Porção de calabresa acebolada', price: 32.00, image: '/placeholder.svg', category: '7' },

  // SOBREMESAS
  { id: '40', name: 'Fondant de Chocolate', description: 'Fondant de chocolate quente', price: 13.00, image: '/placeholder.svg', category: '8' },
  { id: '41', name: 'Mousse de Limão', description: 'Mousse de limão cremoso', price: 14.00, image: '/placeholder.svg', category: '8' },
  { id: '42', name: 'Tiramisù', description: 'Tiramisù tradicional italiano', price: 21.00, image: '/placeholder.svg', category: '8' },
];

export const tables: Table[] = [
  { id: '1', name: 'Mesa 1' },
  { id: '2', name: 'Mesa 2' },
  { id: '3', name: 'Mesa 3' },
  { id: '4', name: 'Mesa 4' },
  { id: '5', name: 'Mesa 5' },
  { id: '6', name: 'Mesa 6' },
  { id: '7', name: 'Mesa 7' },
  { id: '8', name: 'Mesa 8' },
];