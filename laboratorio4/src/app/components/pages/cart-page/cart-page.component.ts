import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

interface ProductList {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  price: number;
}

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CartPageComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'price'];
  dataSource = new MatTableDataSource<ProductList>(ELEMENT_DATA);
  subtotal: number = 0;
  total: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.dataSource.data.reduce((acc, product) => acc + product.price, 0);
    this.total = this.subtotal; // Puedes agregar impuestos o descuentos si es necesario
  }

  confirmar() {
    // Lógica para confirmar la compra
    console.log('Compra confirmada');
  }

  cancelar() {
    // Lógica para cancelar la compra
    console.log('Compra cancelada');
  }

}

const ELEMENT_DATA: ProductList[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', price: 10},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', price: 20},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', price: 30},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', price: 40},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', price: 50},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', price: 60},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', price: 70},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', price: 80},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', price: 90},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', price: 100},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', price: 110},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', price: 120},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', price: 130},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', price: 140},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', price: 150},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', price: 160},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', price: 170},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', price: 180},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', price: 190},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', price: 200},
];
