import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductList {
  sku: number;
  name: string;
  stock: number;
  price_unit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/products'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Obtener productos filtrados
  getFilteredProducts(filter: string, column: string): Observable<ProductList[]> {
    let params = new HttpParams();
    if (column === 'name') {
      params = params.set('name', filter); // Si la columna es nombre, filtra por nombre
    } else if (column === 'sku') {
      params = params.set('sku', filter); // Si la columna es SKU, filtra por SKU
    }

    return this.http.get<ProductList[]>(this.apiUrl, { params });
  }

  // Obtener todos los productos
  getAllProducts(): Observable<ProductList[]> {
    return this.http.get<ProductList[]>(this.apiUrl);
  }
}
