import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService, ProductList } from '../../../service/product.service';  
import { MatSort } from '@angular/material/sort';  

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sku', 'name', 'stock', 'price_unit', 'edit_button', 'detail_button'];
  dataSource = new MatTableDataSource<ProductList>([]);  // Inicializa con un array vacío
  filterValue: string = '';  // Almacena el valor de búsqueda
  selectedColumn: string = 'name';  // Columna de búsqueda seleccionada, por defecto es 'name'

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  // Inyecta MatSort

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Carga los productos inicialmente (sin filtro)
    this.loadProducts();
  }

  ngAfterViewInit() {
    // Asocia el paginator y el sort con la dataSource después de la vista
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  goToDetail(sku: number): void {
    this.router.navigate(['/products', sku]);
  }

  // Método que se llama cuando el usuario hace clic en el botón de búsqueda
  onSearch(): void {
    this.applyFilter();
  }

  // Método para aplicar el filtro
  applyFilter(): void {
    if (this.filterValue.trim()) {
      // Si hay un valor de filtro, realiza la búsqueda
      this.productService.getFilteredProducts(this.filterValue.trim(), this.selectedColumn)
        .subscribe(products => {
          this.dataSource.data = products;  // Asigna los productos filtrados a la dataSource
        });
    } else {
      // Si no hay filtro, obtén todos los productos
      this.loadProducts();
    }
  }

  // Método para cargar todos los productos
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.dataSource.data = products;  // Asigna todos los productos a la dataSource
    });
  }
}
