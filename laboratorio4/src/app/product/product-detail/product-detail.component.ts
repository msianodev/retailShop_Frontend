import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Category, Product } from '../../types/types';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productForm!: FormGroup;
  product: Product | null = null;

  categories: Category[] = [];

  newCategory: string = '';

  isNewProduct: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkIfNewProduct();
    this.loadCategories();
  }
  // Inicializar el formulario reactivo
  initForm(): void {
    this.productForm = this.fb.group({
      description: ['', Validators.required],
      category: ['', Validators.required], // Campo para la categoría
      stock: [0, [Validators.required, Validators.min(0)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      sku: [{ value: '', disabled: true }], // SKU deshabilitado para que no sea editable
    });
  }

  // Verificar si estamos creando o editando un producto
  checkIfNewProduct(): void {
    const sku = Number(this.route.snapshot.paramMap.get('sku'));
    if (sku) {
      // Editando un producto existente
      this.loadProductDetail(Number(sku));
    } else {
      // Creando un nuevo producto
      this.isNewProduct = true;
    }
  }

  // Cargar los detalles del producto y llenar el formulario si es edición
  loadProductDetail(sku: number): void {
    this.productService.getProductBySku(sku).subscribe((product) => {
      this.product = product || null;
      if (this.product) {
        this.productForm.patchValue(this.product);
      } else {
        console.error('No se encontró el producto.');
      }
    });
  }

  // // Guardar los cambios o crear un nuevo producto
  saveChanges(): void {
    if (this.productForm.valid) {
      const updatedProduct = { ...this.product, ...this.productForm.value };
      if (this.isNewProduct) {
        // Crear un nuevo producto
        this.productService.createProduct(updatedProduct).subscribe(() => {
          console.log('Nuevo producto creado:', updatedProduct);
          this.goBack();
        });
      } else {
        // Actualizar producto existente
        this.productService.updateProduct(updatedProduct).subscribe(() => {
          console.log('Producto actualizado:', updatedProduct);
          this.goBack();
        });
      }
    }
  }

  // Cargar las categorías desde la API
  loadCategories(): void {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories; // Asignar las categorías al arreglo
    });
  }

  confirmDelete(): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteProduct();
    }
  }

  deleteProduct(): void {
    if (this.product && this.product.sku) {
      this.productService.deleteProduct(this.product.sku).subscribe(() => {
        console.log('Product Deleted');
        this.goBack();
      });
    }
  }

  // Regresar a la lista de productos
  goBack(): void {
    this.router.navigate(['/products']);
  }
}
