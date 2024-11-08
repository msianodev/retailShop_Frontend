import { Component, Input } from '@angular/core';
import { ProductService, ProductList } from '../../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() product: ProductList | null = null; // Producto recibido del componente padre

  saveChanges() {
    if (this.product) {
      // Aquí puedes agregar lógica para guardar los cambios del producto
      console.log('Producto guardado:', this.product);
    }
  }
}