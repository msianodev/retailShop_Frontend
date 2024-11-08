



export interface Product {
    sku: number;
    description: string;
    brand: string;
    stock: number;
    unitPrice: number;
  }

  export interface Sale{
    id: number;
    seller: string;
    client: string;
    products: cartProduct[];
    total: number;
    date: Date;
    paymentMethod: string;
  }
  export interface cartProduct {
    sku: number;
    description: string;
    quantity: number;
    brand: string;
    unitPrice: number;
    subTotal: number;
  }
  
export interface CategoryDto {
  id: number;
  name: string;
}

