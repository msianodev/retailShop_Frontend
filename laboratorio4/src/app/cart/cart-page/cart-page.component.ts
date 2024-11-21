import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartProduct, Sale } from '../../types/types';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/success-dialog/success-dialog.component';
import { CartService } from '../../services/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { clear } from 'console';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { SnackbarDialogComponent } from '../../shared/snack-bar-dialog/snack-bar-dialog.component';
import { cardAsyncValidator } from '../../services/validation/cardValidation';
import { CardValidationService } from '../../services/validation/card-validation.service';

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
  employeeId = 0;
  userName = '';


  toastVisible = false;
  toastMessage = '';
  toastType: 'error' | 'success' = 'success';

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private cardValidationService: CardValidationService
  ) { }

  ngOnInit(): void {
    this.ventaForm = this.fb.group({
      clientId: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      cardData: this.fb.group({
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        cardExpiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
        cardCvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      }, { asyncValidators: cardAsyncValidator(this.cardValidationService) }) // Agregamos aquí el validador
    });

    // Validación dinámica de los datos de la tarjeta según el método de pago
    this.ventaForm.get('paymentMethod')?.valueChanges.subscribe((value) => {
      const cardDataGroup = this.ventaForm.get('cardData');
      if (value === 'card') {
        cardDataGroup?.setValidators([
          Validators.required,
          cardAsyncValidator(this.cardValidationService) // Agregamos validación también aquí, si no está presente
        ]);
      } else {
        cardDataGroup?.clearValidators();
      }
      cardDataGroup?.updateValueAndValidity();
    });

    this.cartService.getCart().subscribe((cart) => {
      console.log('Carrito recibido: ', cart);

      this.cartItems = cart;
      this.cartItems.forEach((item) => {
        item.subTotal = item.unitPrice * item.quantity;
      });

      this.dataSource.data = this.cartItems;
      this.calculateTotals();
      this.cdRef.detectChanges();
    });

    this.dateNow = new Date();
    console.log('Fecha actual:', this.dateNow);
  }

  showToast(message: string, type: 'error' | 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;

    // Ocultar el toast después de 3 segundos, por ejemplo.
    setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }
  private openDialog(title: string, message: string, confirmText: string, cancelText: string) {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { title, message, confirmText, cancelText }
    });
  }

  updateQuantity(product: CartProduct, event: Event): void {
    const newQuantity = +(event.target as HTMLInputElement).value;
    product.quantity = newQuantity;
    product.subTotal = product.unitPrice * newQuantity;
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
    this.openDialog('Confirmar Carrito', '¿Estás seguro de que quieres confirmar el carrito?', 'Confirmar', 'Cancelar')
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (this.ventaForm.invalid) {
            this.showToast('Por favor complete todos los campos correctamente.', 'error');
            return;
          }

          const { clientId, paymentMethod, cardData } = this.ventaForm.value;
          const sale: Sale = {
            id: 0,
            employeeId: 0,
            clientId,
            products: this.cartItems,
            total: this.total,
            date: this.dateNow,
            paymentMethod,
            // cardData: paymentMethod === 'card' ? cardData : null,
          };

          this.cartService.confirmSale(sale).subscribe({
            next: (response) => {
              this.showToast('Venta exitosa !.', 'success');
              this.clearCart();
            },

            error: (err) => {
              console.error('Error al confirmar la venta:', err);
              this.showToast('Hubo un error al confirmar la venta. Intenta nuevamente.', 'error');
            }
          });
        }
      })
  }

  cancelSale(): void {

    this.openDialog('Cancelar la venta', '¿Estás seguro de que quieres cancelar la venta?', 'si', 'no')
      .afterClosed().subscribe((result) => {
        if (result) {
          this.clearCart();
        }
      })

  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.dataSource.data = [];
    this.total = 0;
    this.subTotal = 0;
    this.ventaForm.reset();
    this.ventaForm.markAsUntouched();
    this.ventaForm.markAsPristine();
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
