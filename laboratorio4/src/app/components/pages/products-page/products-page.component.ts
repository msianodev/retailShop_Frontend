import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ProductService } from '../../../services//product/product.service';
import { MatSort, Sort } from '@angular/material/sort';
import { cartProduct, Product } from '../../../types/types';
import { CartService } from '../../../services/cart.service';

/*
export interface Product {
  sku: number;
  description: string;
  brand: string;
  stock: number;
  price_unit: number;

}
*/

const ELEMENT_DATA: Product[] = [
  {sku: 1, description: 'Hydrogen', brand: 'Nike' ,stock: 1.0079, unitPrice: 1,},
  {sku: 2, description: 'Helium', brand: 'Adidas',stock: 4.0026, unitPrice: 2,},
  {sku: 3, description: 'Lithium', brand: 'Puma',stock: 6.941, unitPrice: 3,},
  {sku: 4, description: 'Beryllium', brand: 'Stella' ,stock: 9.0122, unitPrice: 4,},
  {sku: 5, description: 'Boron', brand: 'Tesse',stock: 10.811, unitPrice: 5},
];


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sku', 'description', 'stock', 'brand','price_unit', 'detail_button','add_to_cart'];
  dataSource = new MatTableDataSource<Product>([]); // Inicializa con un array vacío
  filterValue: string = ''; // Almacena el valor de búsqueda
  selectedColumn: string = 'name'; // Columna de búsqueda seleccionada, por defecto es 'name'

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private router: Router, private cartService: CartService) {}

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

  add_to_cart(product: Product): void {
    const cartProduct: cartProduct = {
      sku: product.sku,
      description: product.description,
      brand: product.brand,
      unitPrice: product.unitPrice,
      quantity: 1, // Cantidad inicial
      subTotal: product.unitPrice // Subtotal inicial
    };
    this.cartService.addProductToCart(cartProduct);
    console.log('Producto añadido al carrito:', cartProduct);
  }
  
} 