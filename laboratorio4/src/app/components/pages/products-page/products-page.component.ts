import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
];

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})

export class ProductsPageComponent implements AfterViewInit {
  // private _liveAnnouncer = inject(LiveAnnouncer);
  
  displayedColumns: string[] = ['sku', 'name', 'stock', 'brand', 'price_unit','detail_button', 'add_to_cart'];
  dataSource = new MatTableDataSource<ProductList>(ELEMENT_DATA);

  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

    // Inyecta el servicio de Router
    constructor(private router: Router) {}

    goToDetail(sku: number): void {
      this.router.navigate(['/products', sku]);
    }

    // Método para añadir al carrito
  addToCart(product: ProductList): void {
    console.log(`Producto añadido al carrito: ${product.name}`);
    // Aquí podrías agregar lógica para añadir el producto al carrito, por ejemplo:
    // this.cartService.addProduct(product);
  }
  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }

  // edit(element: Elemento) {
  //   this.router.navigate(['/editar', element.id]);
  // }
}
  