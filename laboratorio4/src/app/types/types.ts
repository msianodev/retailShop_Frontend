export interface Product {
  id: number;
  sku: string;
  description: string;
  // name: string;
  category: Category;
  stock: number;
  stockQuantity: number;
  minimunStock: number;
  unitPrice: number;
  // isActive: boolean;
}

export interface Sale {
  id: number;
  // employeeId: number;
  userId: number;

  clientId: number;
  products: CartProduct[];
  total: number;
  date: Date;
  paymentMethod: string;
}
export interface CartProduct {
  id: number;
  sku: string;
  description: string;
  // name: string;
  quantity: number;
  // unitPrice: number;
  unitPrice: number;
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

export interface CardData {
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}
