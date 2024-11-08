



export interface Product {
    sku: number;
    description: string;
    brand: string;
    stock: number;
    unitPrice: number;
  }

  export interface cartProduct extends Product{
    quantity: number;
    subTotal: number;
  }


  export interface Sale{
    id: number;
    seller: string;
    client: string;
    products: cartProduct[];
    total: number;
    date: Date;
    paymentMethod: string;
    status: string;
  }

