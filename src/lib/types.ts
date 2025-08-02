export interface ProductOption {
  id: string;
  name: string;
  price?: number; // preço adicional
}

export interface ProductPhase {
  id: string;
  name: string;
  required: boolean;
  options: ProductOption[];
}

export interface ProductConfiguration {
  phases: ProductPhase[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  configuration?: ProductConfiguration;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: { [phaseId: string]: ProductOption };
  totalPrice?: number;
}

export interface Table {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}