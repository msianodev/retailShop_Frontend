import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { cartProduct, Sale } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<cartProduct[]>([]);
  private apiUrl = 'http://localhost:3306/retail_shop_backend/cart'; // Cambiar por tu URL del backend
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
// Agregar un producto al carrito o actualizar su cantidad si ya existe
addProductToCart(product: cartProduct): void {
  const existingProductIndex = this.cartSubject.value.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    // Producto ya existe en el carrito; actualizar la cantidad y subtotal
    const updatedCart = this.cartSubject.value.map((item, index) => {
      if (index === existingProductIndex) {
        const updatedQuantity = item.quantity + product.quantity;
        return {
          ...item,
          quantity: updatedQuantity,
          subTotal: updatedQuantity * item.price
        };
      }
      return item;
    });
    this.cartSubject.next(updatedCart);
  } else {
    // Producto no existe en el carrito; agregarlo como nuevo producto
    const newProduct = {
      ...product,
      subTotal: product.quantity * product.price
    };
    this.cartSubject.next([...this.cartSubject.value, newProduct]);
  }
}


  // Actualizar la cantidad de un producto en el carrito
  updateProductQuantity(product: cartProduct, quantity: number): void {
    const updatedCart = this.cartSubject.value.map(item => {
      if (item.id === product.id) {
        item.quantity = quantity;
        item.subTotal = item.price * quantity;
      }
      return item;
    });
    this.cartSubject.next(updatedCart);
  }
}