import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, Product } from '../../types/types';
import { HttpClient, HttpParams } from '@angular/common/http';


const ELEMENT_DATA: Product[] = [
  { sku: 1, description: 'Hydrogen', category:{id: 2,name: 'distribucion'}, stock: 1, unitPrice: 1, },
  { sku: 2, description: 'Helium',  category:{id: 2,name: 'distribucion'}, stock: 4, unitPrice: 2, },
  { sku: 3, description: 'Lithium', category:{id: 2,name: 'distribucion'}, stock: 6, unitPrice: 3, },
  { sku: 4, description: 'Beryllium', category:{id: 2,name: 'distribucion'}, stock: 9, unitPrice: 4, },
  { sku: 5, description: 'Boron',  category:{id: 2,name: 'distribucion'}, stock: 10, unitPrice: 5 },
];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // constructor() { }
  private apiUrl = '//localhost:3306/retail_shop_backend/api/products'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Obtener productos filtrados
  getFilteredProducts(column: string, filterValue: string, category: number | null): Observable<Product[]> {
    let params = new HttpParams()
      .set(column, filterValue);
  
    if (category !== null) {
      params = params.set('category', category.toString());
    }
  
    return this.http.get<Product[]>(this.apiUrl, { params });
  }
  

////////REQUESTS DE PRODUCTOS AL BACKEND

  // Obtener todos los productos
  // getAllProducts(): Observable<Product[]> {
  //  return this.http.get<Product[]>(this.apiUrl);
  // }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/api/products', product);
  }
  
  // updateProduct(product: Product): Observable<void> {
  //   return this.http.put<void>(`/api/products/${product.sku}`, product);
  // }

  // Obtener productos filtrados
  // getFilteredProducts(filter: string, column: string): Observable<Product[]> {
  //   const filteredProducts = ELEMENT_DATA.filter((product) =>
  //     product[column as keyof Product]?.toString().includes(filter)
  //   );
  //   return of(filteredProducts);
  // }
////////////////
deleteProduct(sku: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${sku}`);
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

  
////////REQUEST CATEGORIAS AL BACKEND
    // Método para obtener las categorías
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl); // La respuesta será una lista de Category
  }

      // Método para agregar una nueva categoría
    createCategory(category: { name: string }): Observable<Category> {
      return this.http.post<Category>(`${this.apiUrl}/categories`, category);
    }
      
}
