import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { Observable } from 'rxjs';
import { Category, Product } from '../../../types/types';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
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
    const sku = this.route.snapshot.paramMap.get('sku');
    this.isNewProduct = !sku; // Si no hay SKU, entonces es un producto nuevo
    this.initForm();
  
    if (!this.isNewProduct) {
      this.loadProductDetail(); // Cargar datos solo si no es un nuevo producto
    }
  }
  

    // Verificar si estamos creando o editando un producto
    // checkIfNewProduct(): void {
    //   const sku = this.route.snapshot.paramMap.get('sku');
    //   if (sku) {
    //     // Editando un producto existente
    //     this.loadProductDetail(Number(sku));
    //   } else {
    //     // Creando un nuevo producto
    //     this.isNewProduct = true;
    //   }
    // }

  // Inicializar el formulario reactivo
  initForm(): void {
    this.productForm = this.fb.group({
      description: ['', Validators.required],
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


///////
    // Cargar los detalles del producto y llenar el formulario si es edición
  //   loadProductDetail(sku: number): void {
  //     this.productService.getProductBySku(sku).subscribe((product) => {
  //       this.product = product || null;
  //       if (this.product) {
  //         this.productForm.patchValue(this.product);
  //       }
  //     });
  //   }

  // // Guardar los cambios o crear un nuevo producto
  // saveChanges(): void {
  //   if (this.productForm.valid) {
  //     const updatedProduct = { ...this.product, ...this.productForm.value };
  //     if (this.isNewProduct) {
  //       // Crear un nuevo producto
  //       this.productService.createProduct(updatedProduct).subscribe(() => {
  //         console.log('Nuevo producto creado:', updatedProduct);
  //         this.goBack();
  //       });
  //     } else {  
  //       // Actualizar producto existente
  //       this.productService.updateProduct(updatedProduct).subscribe(() => {
  //         console.log('Producto actualizado:', updatedProduct);
  //         this.goBack();
  //       });
  //     }
  //   }
  // }
    
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
