import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { Observable } from 'rxjs';
import { CategoryDto, Product } from '../../../types/types';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productForm!: FormGroup;
  product: Product | null = null;
  categories: CategoryDto[] = [];

  newCategory: string = '';


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProductDetail();
    //this.loadCategories();
    this.initForm();
  }

  // Inicializar el formulario reactivo
  initForm(): void {
    this.productForm = this.fb.group({
      description: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required], // Campo para la categoría
      stock: [0, [Validators.required, Validators.min(0)]],
      price_unit: [0, [Validators.required, Validators.min(0)]],
      sku: [{ value: '', disabled: true }] // SKU deshabilitado para que no sea editable
    });
  }

  // Cargar los detalles del producto y llenar el formulario
  loadProductDetail(): void {
    const sku = Number(this.route.snapshot.paramMap.get('sku'));
    if (sku) {
      this.productService.getProductBySku(sku).subscribe((product) => {
        this.product = product || null;
        if (this.product) {
          this.productForm.patchValue(this.product); // Cargar los valores en el formulario
        }
      });
    }
  }


    
  // Agregar una nueva categoría
  addCategory(): void {
    if (this.newCategory.trim()) {
      this.productService.addCategory(this.newCategory).subscribe(
        (response) => {
          console.log('Categoría agregada:', response);
          // Si la respuesta es exitosa, actualizamos las categorías
          this.loadCategories();
          this.newCategory = ''; // Limpiar el campo de la nueva categoría
        },
        (error) => {
          console.error('Error al agregar categoría:', error);
        }
      );
    }
  }

  // Cargar las categorías desde la API
  loadCategories(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories; // Asignar las categorías al arreglo
    });
  }


  // Guardar los cambios
  saveChanges(): void {
    if (this.productForm.valid && this.product) {
      const updatedProduct = { ...this.product, ...this.productForm.value };
      this.productService.updateProduct(updatedProduct).subscribe(() => {
        console.log('Producto actualizado:', updatedProduct);
        this.goBack();
      });
    }
  }

  // Regresar a la lista de productos
  goBack(): void {
    this.router.navigate(['/products']);
  }
}
