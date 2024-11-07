import { Component, Input } from '@angular/core';
import { ProductList } from '../products-page/products-page.component'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() product!: ProductList; // Declara la propiedad `product` como un Input
}