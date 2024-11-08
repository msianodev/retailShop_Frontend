import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../types/types';



let ELEMENT_DATA: Product[] = [
  { sku: 1, description: 'Hydrogen', brand: 'Nike', stock: 1.0079, unitPrice: 1 },
  { sku: 2, description: 'Helium', brand: 'Adidas', stock: 4.0026, unitPrice: 2 },
  { sku: 3, description: 'Lithium', brand: 'Puma', stock: 6.941, unitPrice: 3 },
  { sku: 4, description: 'Beryllium', brand: 'Stella', stock: 9.0122, unitPrice: 4 },
  { sku: 5, description: 'Boron', brand: 'Tesse', stock: 10.811, unitPrice: 5 },
];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() { }
  ///private apiUrl = 'http://localhost:8080/api/products'; // URL de tu API

  //constructor(private http: HttpClient) { }

  // Obtener productos filtrados
  //getFilteredProducts(filter: string, column: string): Observable<Product[]> {
  //  let params = new HttpParams();
  //  if (column === 'name') {
  //    params = params.set('name', filter); // Si la columna es nombre, filtra por nombre
  //  } else if (column === 'sku') {
  //    params = params.set('sku', filter); // Si la columna es SKU, filtra por SKU
  //  }

  //  return this.http.get<Product[]>(this.apiUrl, { params });
  //}

  // Obtener todos los productos
  //getAllProducts(): Observable<Product[]> {
  //  return this.http.get<Product[]>(this.apiUrl);
  //}
  // Obtener productos filtrados
  getFilteredProducts(filter: string, column: string): Observable<Product[]> {
    const filteredProducts = ELEMENT_DATA.filter((product) =>
      product[column as keyof Product]?.toString().includes(filter)
    );
    return of(filteredProducts);
  }

  // Obtener todos los productos
  getAllProducts(): Observable<Product[]> {
    return of(ELEMENT_DATA);
  }

  getProductBySku(sku: number): Observable<Product | null> {
    const product = ELEMENT_DATA.find((p) => p.sku === sku) || null;
    return of(product);
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    // Encuentra el índice del producto en los datos de ejemplo
    const index = ELEMENT_DATA.findIndex((product) => product.sku === updatedProduct.sku);
    if (index !== -1) {
      ELEMENT_DATA[index] = updatedProduct; // Actualiza el producto en los datos de ejemplo
    }
    return of(updatedProduct);
  }
}
