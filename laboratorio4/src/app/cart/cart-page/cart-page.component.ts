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
      cardData: this.fb.group({
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        cardExpiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
        cardCvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      }),
    });

    // Validación dinámica de los datos de la tarjeta según el método de pago
    this.ventaForm.get('paymentMethod')?.valueChanges.subscribe((value) => {
      const cardDataGroup = this.ventaForm.get('cardData');
      if (value === 'cad') {
        cardDataGroup?.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
        cardDataGroup?.get('cardExpiry')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
        cardDataGroup?.get('cardCvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
      } else {
        cardDataGroup?.get('cardNumber')?.clearValidators();
        cardDataGroup?.get('cardExpiry')?.clearValidators();
        cardDataGroup?.get('cardCvv')?.clearValidators();
      }
      cardDataGroup?.updateValueAndValidity();
    });

    this.cartService.getCart().subscribe((cart) => {
      console.log('Carrito recibido: ', cart);

      this.cartItems = cart;
      this.cartItems.forEach((item) => {
        item.subTotal = item.price * item.quantity;
      });

      this.dataSource.data = this.cartItems;
      this.calculateTotals();
      this.cdRef.detectChanges();
    });

    this.dateNow = new Date();
    console.log('Fecha actual:', this.dateNow);
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
    this.total = this.subTotal * 1.21;
  }

  confirmSale(): void {
    if (this.ventaForm.invalid) {
      alert('Por favor complete todos los campos correctamente.');
      return;
    }

    const { clientId, paymentMethod, cardData } = this.ventaForm.value;
    const sale: Sale = {
      id: 0,
      userId: 0,
      clientId,
      products: this.cartItems,
      total: this.total,
      date: this.dateNow,
      paymentMethod,
      cardData: paymentMethod === 'cad' ? cardData : null,
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

  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El diálogo se cerró con el resultado: ', result);
    });
  }

  removeProduct(product: CartProduct): void {
    this.cartItems = this.cartItems.filter((item) => item.sku !== product.sku);
    this.dataSource.data = this.cartItems;
    this.calculateTotals();
    this.cartService.updateCart(this.cartItems);
  }


  onPaymentMethodChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.ventaForm.get('paymentMethod')?.setValue(target.value);
  }

}
