import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ProductList {
  sku: number;
  name: string;
  brand: string;
  stock: number;
  price_unit: number;
}

let ELEMENT_DATA: ProductList[] = [
  { sku: 1, name: 'Hydrogen', brand: 'Nike', stock: 1.0079, price_unit: 1 },
  { sku: 2, name: 'Helium', brand: 'Adidas', stock: 4.0026, price_unit: 2 },
  { sku: 3, name: 'Lithium', brand: 'Puma', stock: 6.941, price_unit: 3 },
  { sku: 4, name: 'Beryllium', brand: 'Stella', stock: 9.0122, price_unit: 4 },
  { sku: 5, name: 'Boron', brand: 'Tesse', stock: 10.811, price_unit: 5 },
];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}
  ///private apiUrl = 'http://localhost:8080/api/products'; // URL de tu API

  //constructor(private http: HttpClient) { }

  // Obtener productos filtrados
  //getFilteredProducts(filter: string, column: string): Observable<ProductList[]> {
  //  let params = new HttpParams();
  //  if (column === 'name') {
  //    params = params.set('name', filter); // Si la columna es nombre, filtra por nombre
  //  } else if (column === 'sku') {
  //    params = params.set('sku', filter); // Si la columna es SKU, filtra por SKU
  //  }

  //  return this.http.get<ProductList[]>(this.apiUrl, { params });
  //}

  // Obtener todos los productos
  //getAllProducts(): Observable<ProductList[]> {
  //  return this.http.get<ProductList[]>(this.apiUrl);
  //}
  // Obtener productos filtrados
  getFilteredProducts(filter: string, column: string): Observable<ProductList[]> {
    const filteredProducts = ELEMENT_DATA.filter((product) =>
      product[column as keyof ProductList]?.toString().includes(filter)
    );
    return of(filteredProducts);
  }

  // Obtener todos los productos
  getAllProducts(): Observable<ProductList[]> {
    return of(ELEMENT_DATA);
  }

  getProductBySku(sku: number): Observable<ProductList | null> {
    const product = ELEMENT_DATA.find((p) => p.sku === sku) || null;
    return of(product); 
  }

  updateProduct(updatedProduct: ProductList): Observable<ProductList> {
  // Encuentra el índice del producto en los datos de ejemplo
  const index = ELEMENT_DATA.findIndex((product) => product.sku === updatedProduct.sku);
  if (index !== -1) {
    ELEMENT_DATA[index] = updatedProduct; // Actualiza el producto en los datos de ejemplo
  }
  return of(updatedProduct);
}
}
