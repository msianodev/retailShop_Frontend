import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';


export interface ProductList {
  sku: number;
  name: string;
  stock: number;
  price_unit: number;
  edit_button: string;
}

const ELEMENT_DATA: ProductList[] = [
  {sku: 1, name: 'Hydrogen', stock: 1.0079, price_unit: 1, edit_button: 'Edit'},
  {sku: 2, name: 'Helium', stock: 4.0026, price_unit: 2, edit_button: 'Edit'},
  {sku: 3, name: 'Lithium', stock: 6.941, price_unit: 3, edit_button: 'Edit'},
  {sku: 4, name: 'Beryllium', stock: 9.0122, price_unit: 4, edit_button: 'Edit'},
  {sku: 5, name: 'Boron', stock: 10.811, price_unit: 5, edit_button: 'Edit'},
];

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})

export class ProductsPageComponent implements AfterViewInit {
  // private _liveAnnouncer = inject(LiveAnnouncer);
  
  displayedColumns: string[] = ['sku', 'name', 'stock', 'price_unit', 'edit_button','detail_button'];
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
  