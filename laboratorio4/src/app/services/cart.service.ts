import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { cartProduct, Sale } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<cartProduct[]>([]);
  private apiUrl = 'http://localhost:8080/cart'; // Cambiar por tu URL del backend
  constructor(private http: HttpClient) {}

  // Obtener los productos del carrito
  getCart(): Observable<cartProduct[]> {
    return this.cartSubject.asObservable();
  }

  // Confirmar la venta (envío al backend)
  confirmSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(`${this.apiUrl}/sales`, sale);
  }

  // Limpiar el carrito
  clearCart(): void {
    this.cartSubject.next([]);
  }

  // Agregar un producto al carrito
  addProductToCart(product: cartProduct): void {
    this.cartSubject.next([...this.cartSubject.value, product]);
  }

  // Actualizar la cantidad de un producto en el carrito
  updateProductQuantity(product: cartProduct, quantity: number): void {
    const updatedCart = this.cartSubject.value.map(item => {
      if (item.sku === product.sku) {
        item.quantity = quantity;
        item.subTotal = item.unitPrice * quantity;
      }
      return item;
    });
    this.cartSubject.next(updatedCart);
  }
}
