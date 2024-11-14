import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ProductService } from '../../../services//product/product.service';
import { MatSort, Sort } from '@angular/material/sort';
import { cartProduct, Category, Product } from '../../../types/types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CartService } from '../../../services/cart/cart.service';



@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sku', 'description', 'stock', 'unitPrice', 'detail_button', 'category', 'add_to_cart'];
  productList = new MatTableDataSource<Product>([]); // Inicializa con un array vacío

  searchForm!: FormGroup; // Formulario reactivo

  ///Filtros y busqueda
  filterValue: string = ''; // Valor para el campo de búsqueda
  selectedColumn: string = 'name'; // Columna de búsqueda seleccionada, por defecto es 'name'
  selectedCategory: number | null = null; // Categoría seleccionada


  noResultsFound: boolean = false;


  categories: Category[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private router: Router, private cartService: CartService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadProducts();
    // console.log(this.productList.data); 
    this.loadCategories();

    // Definimos el formulario y sus controles
    this.searchForm = this.fb.group({
      filterValue: [''], // Control para el campo de búsqueda
      selectedColumn: [''], // Filtro de búsqueda
      category: [''] // Categoría seleccionada
    });
  }

  ngAfterViewInit() {
    if (this.productList.data.length > 0) {
      this.productList.paginator = this.paginator;
      this.productList.sort = this.sort;
    }
  }
  

  goToDetail(sku: number): void {
    this.router.navigate([`/products/${sku}`]);
  }

  // Método que se llama cuando el usuario hace clic en el botón de búsqueda
  onSearch(): void {
    if (this.searchForm.valid) {
      const formData = this.searchForm.value;
      
      // Llama al servicio con los datos del formulario
      this.productService.getFilteredProducts(
        formData.filterValue,
        formData.selectedColumn,
        formData.category
      ).subscribe({
        next: products => {
          this.productList.data = products;
          this.noResultsFound = products.length === 0;  // Si no hay productos, activa la bandera
        },
        error: error => {
          this.noResultsFound = true; // Si ocurre un error, también mostramos el mensaje
        }
      });
    }
  }
  

  // Método para cargar todos los productos
  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.productList.data = products;  // Asignar correctamente los datos
        console.log(this.productList.data);  // Verifica en la consola si los datos son correctos
      },
      error: (error) => {
        console.error('Error al cargar productos en el componente:', error);
        alert('Error al cargar productos.');
      }
    });
  }
  

  add_to_cart(product: Product): void {
    const cartProduct: cartProduct = {
      sku: product.sku,
      description: product.description,
      unitPrice: product.unitPrice,
      quantity: 1, // Cantidad inicial
      subTotal: product.unitPrice // Subtotal inicial
    };
    this.cartService.addProductToCart(cartProduct);
    console.log('Producto añadido al carrito:', cartProduct);
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: categories => {
        this.categories = categories;
      },
      error: error => {
        console.error('Error al cargar categorías en el componente:', error);
        alert('Error al cargar categorías. Intenta más tarde.');
      }
    });
  }

  openAddCategoryDialog(): void {
    const newCategoryName = prompt("Ingrese el nombre de la nueva categoría:");
    if (newCategoryName) {
      this.addCategory(newCategoryName);
    }
  }
  addCategory(name: string): void {
    this.productService.createCategory({ name }).subscribe({
      next: () => {
        this.loadCategories(); // Recargar las categorías para incluir la nueva
        alert("Categoría agregada con éxito.");
      },
      error: error => {
        console.error("Error al agregar categoría:", error);
        alert("Hubo un error al agregar la categoría. Intenta nuevamente.");
      }
    });
  }

} 