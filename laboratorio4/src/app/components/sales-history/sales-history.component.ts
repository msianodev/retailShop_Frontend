import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Sale } from '../../types/types';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SalesHistoryService } from '../../services/salesHistory/sales-history.service'; // Asegúrate de importar el servicio
import { SaleDetailModalComponent } from '../sale-detail-modal/sale-detail-modal.component';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.css']
})
export class SalesHistoryComponent implements OnInit {

  item = { 
    icon: 'bar_chart', 
    label: 'SALES HISTORY',
  };

  displayedColumns: string[] = ['id', 'userName', 'date', 'total', 'detail_button'];
  

  salesHistory = new MatTableDataSource<Sale>([]);

  searchTerm: string = ''; // Campo para almacenar el término de búsqueda

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private salesHistoryService: SalesHistoryService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSalesHistory();
  }

  ngAfterViewInit() {
    this.salesHistory.paginator = this.paginator;
  }

  loadSalesHistory(): void {
    if (this.searchTerm.trim()) {
      this.salesHistoryService.getSalesHistoryById(this.searchTerm).subscribe(sales => {
        this.salesHistory.data = sales;
      });
    } else {
      // Si no hay búsqueda, cargar todo el historial de ventas desde la API
      this.salesHistoryService.getSalesHistory().subscribe(sales => {
        this.salesHistory.data = sales;
      });
    }
    
  }

  onSearch(): void {
    this.loadSalesHistory(); // Ejecuta la búsqueda cuando cambia el término
  }

  goToSaleDetail(id: number): void {
    const sale = this.salesHistory.data.find(s => s.id === id);
    if (sale) {
      this.dialog.open(SaleDetailModalComponent, {
        width: '600px',
        data: sale
      });
    }
  }
}
