import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartProduct, Sale } from '../../types/types';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/success-dialog/success-dialog.component';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  ventaForm!: FormGroup;

  cartItems: CartProduct[] = [];

  displayedColumns: string[] = [
    'SKU',
    'Description',
    'Quantity',
    'Unit.Price',
    'SubTotal',
    'Actions',
  ];

  dataSource = new MatTableDataSource<CartProduct>(this.cartItems);

  total = 0;
  subTotal = 0;
  iva = 0.21; // IVA del 21%
  dateNow = new Date();
  userId = 0;
  userName = '';

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ventaForm = this.fb.group({
      clientId: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });

    this.cartService.getCart().subscribe((cart) => {
      console.log('Carrito recibido: ', cart); // Verifica que los productos se reciben correctamente

      this.cartItems = cart;
      //Inicializar el subtotal de cada producto
      this.cartItems.forEach((item) => {
        item.subTotal = item.price * item.quantity;
      });

      this.dataSource.data = this.cartItems;
      this.calculateTotals();
      this.cdRef.detectChanges(); // Fuerza la detección de cambios después de actualizar el carrito
    });

    this.dateNow = new Date(); // Formato de fecha y hora
    console.log('Fecha actual:', this.dateNow); // Verificar que la fecha se asigna correctamente

    /*
    //TODO, AUTH SERVICE
    this.userId = authService.getUserId();
    this.userName = authService.getuserName();
    */
  }

  updateQuantity(product: CartProduct, event: Event): void {
    const newQuantity = +(event.target as HTMLInputElement).value;
    product.quantity = newQuantity;
    product.subTotal = product.price * newQuantity;
    this.calculateTotals();
    this.dataSource.data = this.cartItems;
  }

  calculateTotals(): void {
    this.subTotal = this.cartItems.reduce(
      (acc, item) => acc + item.subTotal,
      0
    );
    this.total = this.subTotal * 1.21; // Total con IVA del 21%
  }

  confirmSale(): void {
    if (this.ventaForm.invalid) {
      alert('Por favor complete todos los campos correctamente.');
      return;
    }

    //TODO: PEDIR EL NUMERO DE VENDEDOR AL SERVICIO DE USUARIOS O AUTH SERVICE.
    const { client, paymentMethod } = this.ventaForm.value;
    const sale: Sale = {
      id: 0, //  autogenerado en el backend
      userId: 0,
      clientId: client,
      products: this.cartItems,
      total: this.total,
      date: this.dateNow,
      paymentMethod: paymentMethod,
    };

    this.cartService.confirmSale(sale).subscribe({
      next: (response) => {
        console.log('Venta confirmada:', response);
        this.cartService.clearCart();
        this.cartItems = [];
        this.dataSource.data = [];
        this.total = 0;
        this.subTotal = 0;
        this.ventaForm.reset();

        // Llamar al método para abrir el modal después de una venta exitosa
        this.openSuccessDialog();
      },
      error: (err) => console.error('Error al confirmar la venta:', err),
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

  // Método para abrir el modal de éxito
  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El diálogo se cerró con el resultado: ', result);
    });
  }

  // Método para eliminar un producto del carrito
  removeProduct(product: CartProduct): void {
    // Remover el producto de la lista del carrito
    this.cartItems = this.cartItems.filter((item) => item.sku !== product.sku);

    // Actualizar la fuente de datos de la tabla
    this.dataSource.data = this.cartItems;

    // Recalcular los totales
    this.calculateTotals();

    // Actualizar el carrito en el servicio
    this.cartService.updateCart(this.cartItems);
  }
}
