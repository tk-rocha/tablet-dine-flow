import { Product, Category, Table } from '@/lib/types';

export const categories: Category[] = [
  { id: '1', name: 'Bebidas' },
  { id: '2', name: 'Doces' },
  { id: '3', name: 'Salgados' },
  { id: '4', name: 'Pratos Quentes' },
  { id: '5', name: 'Cafés' },
];

export const products: Product[] = [
  // Bebidas
  { id: '1', name: 'Coca-Cola 350ml', description: 'Refrigerante tradicional gelado', price: 5.50, image: '/placeholder.svg', category: '1' },
  { id: '2', name: 'Suco de Laranja', description: 'Suco natural de laranja', price: 8.00, image: '/placeholder.svg', category: '1' },
  { id: '3', name: 'Água Mineral', description: 'Água mineral sem gás 500ml', price: 3.00, image: '/placeholder.svg', category: '1' },
  
  // Doces
  { id: '4', name: 'Bolo de Chocolate', description: 'Fatia generosa de bolo de chocolate com cobertura', price: 12.00, image: '/placeholder.svg', category: '2' },
  { id: '5', name: 'Pudim de Leite', description: 'Pudim cremoso com calda de caramelo', price: 9.50, image: '/placeholder.svg', category: '2' },
  { id: '6', name: 'Torta de Limão', description: 'Torta de limão com merengue', price: 11.00, image: '/placeholder.svg', category: '2' },
  
  // Salgados
  { id: '7', name: 'Sanduíche Natural', description: 'Peito de peru, alface, tomate e queijo branco', price: 15.00, image: '/placeholder.svg', category: '3' },
  { id: '8', name: 'Coxinha de Frango', description: 'Coxinha tradicional de frango', price: 6.50, image: '/placeholder.svg', category: '3' },
  { id: '9', name: 'Pão de Açúcar', description: 'Pão de açúcar com recheio de queijo', price: 7.00, image: '/placeholder.svg', category: '3' },
  
  // Pratos Quentes
  { id: '10', name: 'Lasanha Bolonhesa', description: 'Lasanha com molho bolonhesa e queijo derretido', price: 25.00, image: '/placeholder.svg', category: '4' },
  { id: '11', name: 'Frango Grelhado', description: 'Peito de frango grelhado com legumes', price: 22.00, image: '/placeholder.svg', category: '4' },
  
  // Cafés
  { id: '12', name: 'Café Expresso', description: 'Café expresso tradicional', price: 4.50, image: '/placeholder.svg', category: '5' },
  { id: '13', name: 'Cappuccino', description: 'Cappuccino cremoso com canela', price: 7.50, image: '/placeholder.svg', category: '5' },
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