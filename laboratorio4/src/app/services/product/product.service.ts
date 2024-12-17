import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, of } from 'rxjs';
import { Category, Product } from '../../types/types';
import { HttpClient, HttpParams } from '@angular/common/http';

// const ELEMENT_DATA: Product[] = [
//   { sku: 1, description: 'Hydrogen', category:{id: 2,name: 'distribucion'}, stock: 1, unitPrice: 1, },
//   { sku: 2, description: 'Helium',  category:{id: 2,name: 'distribucion'}, stock: 4, unitPrice: 2, },
//   { sku: 3, description: 'Lithium', category:{id: 2,name: 'distribucion'}, stock: 6, unitPrice: 3, },
//   { sku: 4, description: 'Beryllium', category:{id: 2,name: 'distribucion'}, stock: 9, unitPrice: 4, },
//   { sku: 5, description: 'Boron',  category:{id: 2,name: 'distribucion'}, stock: 10, unitPrice: 5 },
// ];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // constructor() { }
  private productsURL = 'http://localhost:8080/api/products';
  private categoriesURL = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  getFilteredProducts(
    filterValue: string,
    selectedColumn: string,
    category: string | null
  ): Observable<Product[]> {
    let params = new HttpParams();

    if (selectedColumn && filterValue) {
      params = params.set(selectedColumn, filterValue);
    }

    if (category !== null) {
      params = params.set('category', category);
    }

    return this.http.get<Product[]>(this.productsURL, { params });
  }

  getPaginatedProducts(page: number, size: number, searchTerm: string, filterName: string | null, category: string | null) {
    let params = new HttpParams()
      .set('pageSize', size)
      .set('pageNumber', page);
  

    if (filterName == 'description') {
      params = params.set('description', searchTerm);
    }
    if(filterName == 'sku') {
      params = params.set('sku', searchTerm);
    }
    if (category) {
      params = params.set('category', category);
    }
  
    return this.http.get<{ content: Product[]; totalElements: number }>('/api/products', { params });
  }
  
  

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsURL);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsURL, product, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${this.productsURL}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsURL}/${id}`);
  }
  deleteProductById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsURL}/${id}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsURL}/${id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener el producto:', error);
        return of({} as Product); // Retornar un objeto vacío que es un Product vacío
      })
    );
  }

  ////////REQUEST CATEGORIAS AL BACKEND
  // Método para obtener las categorías
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesURL).pipe(
      catchError((error) => {
        console.error('Error al obtener las categorías:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }

  // Método para agregar una nueva categoría
  createCategory(category: { name: string }): Observable<Category> {
    return this.http.post<Category>(`${this.categoriesURL}`, category);
  }
}
