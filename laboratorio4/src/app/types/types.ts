export interface Product {
  sku: number;
  description: string;
  category: Category;
  stock: number;
  unitPrice: number;
}

export interface Sale {
  id: number;
  userId: number;
  clientId: number;
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

export interface User{
  id: number;
  password: string;
  isAdmin: boolean;
  name: string;
  email: string;
}

export interface userLogin{
  id: string;
  password: string;
}