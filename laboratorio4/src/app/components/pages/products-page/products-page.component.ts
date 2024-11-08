import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ProductService, ProductList } from '../../../services/product.service';
import { MatSort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';


export interface ProductList {
  sku: number;
  name: string;
  brand: string;
  stock: number;
  price_unit: number;

}

const ELEMENT_DATA: ProductList[] = [
  {sku: 1, name: 'Hydrogen', brand: 'Nike' ,stock: 1.0079, price_unit: 1,},
  {sku: 2, name: 'Helium', brand: 'Adidas',stock: 4.0026, price_unit: 2,},
  {sku: 3, name: 'Lithium', brand: 'Puma',stock: 6.941, price_unit: 3,},
  {sku: 4, name: 'Beryllium', brand: 'Stella' ,stock: 9.0122, price_unit: 4,},
  {sku: 5, name: 'Boron', brand: 'Tesse',stock: 10.811, price_unit: 5},
  {sku: 5, name: 'Boron', brand: 'Tesse',stock: 10.811, price_unit: 5},
  {sku: 5, name: 'Boron', brand: 'Tesse',stock: 10.811, price_unit: 5},
  {sku: 5, name: 'Boron', brand: 'Tesse',stock: 10.811, price_unit: 5},
  {sku: 5, name: 'Boron', brand: 'Tesse',stock: 10.811, price_unit: 5},
  {sku: 5, name: 'Boron', brand: 'Tesse',stock: 10.811, price_unit: 5},
  {sku: 5, name: 'Boron', brand: 'Tesse',stock: 10.811, price_unit: 5},
  {sku: 5, name: 'Boron', brand: 'Tesse',stock: 10.811, price_unit: 5},
  {sku: 5, name: 'Boron', brand: 'Tesse',stock: 10.811, price_unit: 5},
  {sku: 5, name: 'Boron', brand: 'Tesse',stock: 10.811, price_unit: 5},
  {sku: 5, name: 'Boron', brand: 'Tesse',stock: 10.811, price_unit: 5},
  
];


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sku', 'name', 'stock', 'brand','price_unit', 'detail_button','add_to_cart'];
  dataSource = new MatTableDataSource<ProductList>([]); // Inicializa con un array vacío
  filterValue: string = ''; // Almacena el valor de búsqueda
  selectedColumn: string = 'name'; // Columna de búsqueda seleccionada, por defecto es 'name'

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts(); // Carga los productos inicialmente
  }

  ngAfterViewInit() {
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
          this.dataSource.data = products.length > 0 ? products : []; // Asigna productos filtrados o un array vacío
        });
    } else {
      this.loadProducts(); // Si no hay filtro, carga todos los productos
    }
  }


  // Método para cargar todos los productos
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.dataSource.data = products;
    });
  }

  // Método para añadir un producto al carrito
  add_to_cart(product: ProductList): void {
    // Lógica para agregar el producto al carrito
    console.log('Producto añadido al carrito:', product);
    // Puedes añadir aquí lógica adicional, como enviar el producto a un servicio de carrito
  }
} 