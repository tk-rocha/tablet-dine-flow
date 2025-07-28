export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
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