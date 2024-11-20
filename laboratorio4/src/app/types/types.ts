export interface Product {
  id: number;
  sku: number;
  brandName: string;
  name: string;
  category: Category;
  stockQuantity: number;
  minimunStock: number;
  price: number;
  isActive: boolean;
}

export interface Sale {
  id: number;
  userId: number;
  clientId: number;
  products: CartProduct[];
  total: number;
  date: Date;
  paymentMethod: string;
}
export interface CartProduct {
  id: number;
  sku: number;
  name: string;
  quantity: number;
  price: number;
  subTotal: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface User {
  id: number;
  dni: string;
  password: string;
  isAdmin: boolean;
  name: string;
  email: string;
}

export interface userLogin {
  dni: string;
  password: string;
}
