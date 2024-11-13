export interface Product {
  sku: number;
  description: string;
  category: Category;
  stock: number;
  unitPrice: number;
}

export interface Sale {
  id: number;
  seller: string;
  client: number;
  products: cartProduct[];
  total: number;
  date: Date;
  paymentMethod: string;
}
export interface cartProduct {
  sku: number;
  description: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}

export interface Category{
  id: number;
  name: string;
}

