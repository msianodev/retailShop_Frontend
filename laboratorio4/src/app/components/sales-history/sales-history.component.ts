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
  
  // Datos estáticos para pruebas
  public staticSales: Sale[] = [
    {
      id: 1,
      seller: 'julian',
      client: 'Cliente A',
      products: [
        {sku: 1, description: 'Hydrogen', brand: 'Nike' ,stock: 1.0079, unitPrice: 1,quantity: 1, subTotal:1},
        {sku: 2, description: 'Helium', brand: 'Adidas',stock: 4.0026, unitPrice: 2,quantity: 1, subTotal:2},
        {sku: 3, description: 'Lithium', brand: 'Puma',stock: 6.941, unitPrice: 3,quantity: 1, subTotal:3}],
      total: 150.75,
      date: new Date('2024-11-01'),
      paymentMethod: 'Credit Card',
      status: 'Completed'
    },
    {
      id: 2,
      seller: 'julian',
      client: 'Cliente B',
      products: [],
      total: 250.00,
      date: new Date('2024-11-05'),
      paymentMethod: 'Cash',
      status: 'Pending'
    },
    {
      id: 3,
      seller: 'julian',
      client: 'Cliente C',
      products: [],
      total: 325.50,
      date: new Date('2024-11-07'),
      paymentMethod: 'Debit Card',
      status: 'Completed'
    }
  ];

  salesHistory = new MatTableDataSource<Sale>([]);

  searchTerm: string = ''; // Campo para almacenar el término de búsqueda

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private salesHistoryService: SalesHistoryService, // Asegúrate de tener el servicio importado
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSalesHistory(); // Cargar historial de ventas al iniciar el componente
  }

  ngAfterViewInit() {
    this.salesHistory.paginator = this.paginator;
  }

  loadSalesHistory(): void {
    // Usar datos estáticos mientras no haya backend
    this.salesHistory.data = this.staticSales;

    /* 
    // Comenta esta línea para usar datos estáticos y descomenta cuando conectes al backend
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
    */
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
