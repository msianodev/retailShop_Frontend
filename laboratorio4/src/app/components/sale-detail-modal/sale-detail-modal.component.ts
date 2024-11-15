import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sale } from '../../types/types';

@Component({
  selector: 'app-sale-detail-modal',
  templateUrl: './sale-detail-modal.component.html',
  styleUrls: ['./sale-detail-modal.component.css']
})
export class SaleDetailModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public sale: Sale) {}

  getSubtotalWithoutVAT(): number {
    return this.sale.total / 1.21; // Calcular subtotal sin IVA
  }
}
