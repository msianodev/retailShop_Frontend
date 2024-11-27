import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Category, Product } from '../../types/types';
import { ProductService } from '../../services/product/product.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  toastVisible = false;
  toastMessage = '';
  toastType: 'error' | 'success' = 'success';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
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
      sku: ['', Validators.required],
    });
  }

  // Verificar si estamos creando o editando un producto
  checkIfNewProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProductDetail(id);
    } else {
      this.isNewProduct = true;
    }
  }

  // Cargar los detalles del producto y llenar el formulario si es edición
  loadProductDetail(id: number): void {
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product || null;
      if (this.product) {
        this.productForm.patchValue(this.product);
      } else {
        this.showToast('Producto no encontrado', 'error');
        this.productForm.reset();
      }
    });
  }

  // // Guardar los cambios o crear un nuevo producto
  saveChanges(): void {
    this.openDialog(
      'Guardar cambios',
      '¿Estás seguro de que quieres guardar los cambios?',
      'si',
      'no'
    )
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (this.productForm.valid) {
            const updatedProduct = {
              ...this.product,
              ...this.productForm.value,
            };
            updatedProduct.minimumStock = 0;
            if (this.isNewProduct) {
              this.productService
                .createProduct(updatedProduct)
                .subscribe(() => {
                  this.showToast('Producto creado exitosamente', 'success');
                  this.goBack();
                });
            } else {
              this.productService
                .updateProduct(updatedProduct)
                .subscribe(() => {
                  this.showToast(
                    'Producto actualizado exitosamente',
                    'success'
                  );
                  this.goBack();
                });
            }
          } else {
            this.showToast(
              'Por favor complete todos los campos correctamente',
              'error'
            );
          }
        }
      });
  }

  // Cargar las categorías desde la API
  loadCategories(): void {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  confirmDelete(): void {
    this.openDialog(
      'Eliminar Producto',
      '¿Estás seguro de que quieres eliminar el producto?',
      'si',
      'no'
    )
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (this.product && this.product.id) {
            this.productService
              .deleteProductById(this.product.id)
              .subscribe(() => {
                this.showToast('Producto eliminado exitosamente', 'success');
                this.goBack();
              });
          }
        }
      });
    this.showToast('Producto eliminado exitosamente', 'success');
  }

  // Regresar a la lista de productos
  goBack(): void {
    this.router.navigate(['/products']);
  }

  private openDialog(
    title: string,
    message: string,
    confirmText: string,
    cancelText: string
  ) {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { title, message, confirmText, cancelText },
    });
  }

  showToast(message: string, type: 'error' | 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;

    // Ocultar el toast después de 3 segundos, por ejemplo.
    setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }
}
