import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sale } from '../../types/types';
import { SalesHistoryService } from '../../services/salesHistory/sales-history.service';

@Component({
  selector: 'app-sale-detail-modal',
  templateUrl: './sale-detail-modal.component.html',
  styleUrls: ['./sale-detail-modal.component.css'],
})
export class SaleDetailModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public sale: Sale,
    private salesHistoryService: SalesHistoryService  // Inyectar el servicio
  ) {}

  getSubtotalWithoutVAT(): number {
    return this.sale.total / 1.21;
  }

  // Método para descargar la factura
  downloadInvoice(saleId: number): void {
    this.salesHistoryService.downloadInvoice(saleId).subscribe(
      (blob: Blob) => {
        // Crear un enlace para descargar el archivo PDF
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice_${saleId}.pdf`;  // Establecer nombre del archivo
        document.body.appendChild(a);
        a.click();  // Simula el clic en el enlace para iniciar la descarga
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  // Libera la URL creada
      },
      (error) => {
        console.error('Error al generar la factura:', error);
      }
    );
  }
}
