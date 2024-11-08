import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cartProduct, Sale } from '../../types/types';
import { CartService } from '../../services/cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { log } from 'console';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  ventaForm!: FormGroup;
  cartItems: cartProduct[] = [];
  displayedColumns: string[] = ['SKU', 'Description', 'Quantity', 'Brand', 'Unit.Price', 'SubTotal'];
  dataSource = new MatTableDataSource<cartProduct>(this.cartItems);
  total = 0;
  subTotal = 0;

  constructor(private fb: FormBuilder, private cartService: CartService) {}

  ngOnInit(): void {
    this.ventaForm = this.fb.group({
      nombreVenta: ['', Validators.required],
      fecha: ['', Validators.required],
      vendedor: ['', Validators.required],
      cliente: ['', Validators.required],
      pago: ['', Validators.required],
    });

    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart;
      this.dataSource.data = this.cartItems;
      this.calculateTotals();
    });
  }

  updateQuantity(product: cartProduct, event: Event): void {
    const newQuantity = +(event.target as HTMLInputElement).value;
    product.quantity = newQuantity;
    product.subTotal = product.unitPrice * newQuantity;
    this.calculateTotals();
    this.dataSource.data = this.cartItems;
  }

  calculateTotals(): void {
    this.subTotal = this.cartItems.reduce((acc, item) => acc + item.subTotal, 0);
    this.total = this.subTotal * 1.21; // Total con IVA del 21%
  }

  confirmSale(): void {
    if (this.ventaForm.invalid) {
      return;
    }

    const { nombreVenta, fecha, vendedor, cliente, pago } = this.ventaForm.value;
    const sale: Sale = {
      id: 0, // O un valor autogenerado en el backend
      seller: vendedor,
      client: cliente,
      products: this.cartItems,
      total: this.total,
      date: new Date(fecha),
      paymentMethod: pago
    };

    this.cartService.confirmSale(sale).subscribe({
      next: response => {
        console.log('Venta confirmada:', response);
        this.cartService.clearCart();
        this.cartItems = [];
        this.dataSource.data = [];
        this.total = 0;
        this.subTotal = 0;
        this.ventaForm.reset();
      },
      error: err => console.error('Error al confirmar la venta:', err)
    });
  }

  cancelSale(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.dataSource.data = [];
    this.total = 0;
    this.subTotal = 0;
    this.ventaForm.reset();
    console.log('Carrito cancelado y limpiado');
  }

  abrirModal(){
    console.log('se abre modal');
  }
}
