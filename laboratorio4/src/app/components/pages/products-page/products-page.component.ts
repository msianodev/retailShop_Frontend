import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ProductService } from '../../../services//product/product.service';
import { MatSort, Sort } from '@angular/material/sort';
import { cartProduct, Category, Product } from '../../../types/types';
import { CartService } from '../../../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


const ELEMENT_DATA: Product[] = [
  { sku: 1, description: 'Hydrogen', category:{id: 1,name: 'automotor'}, stock: 1, unitPrice: 1, },
  { sku: 2, description: 'Helium',  category:{id: 1,name: 'automotor'}, stock: 4, unitPrice: 2, },
  { sku: 3, description: 'Lithium', category:{id: 1,name: 'automotor'}, stock: 6, unitPrice: 3, },
  { sku: 4, description: 'Beryllium', category:{id: 1,name: 'automotor'}, stock: 9, unitPrice: 4, },
  { sku: 5, description: 'Boron',  category:{id: 1,name: 'automotor'}, stock: 10, unitPrice: 5 },
];


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sku', 'description', 'stock', 'price_unit', 'detail_button', 'category', 'add_to_cart'];
  productList = new MatTableDataSource<Product>([]); // Inicializa con un array vacío

  searchForm!: FormGroup; // Formulario reactivo

  ///Filtros y busqueda
  filterValue: string = ''; // Valor para el campo de búsqueda
  selectedColumn: string = 'name'; // Columna de búsqueda seleccionada, por defecto es 'name'
  selectedCategory: number | null = null; // Categoría seleccionada

  categories: Category[] = [
    {
      id: 1,
      name: 'automotor'
    },
    {
      id: 2,
      name: 'distribucion'
    }];



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private router: Router, private cartService: CartService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadProducts();
    console.log(this.productList);
    // this.loadCategories();

    // Definimos el formulario y sus controles
    this.searchForm = this.fb.group({
      filterValue: [''], // Control para el campo de búsqueda
      selectedColumn: [''], // Filtro de búsqueda
      category: [''] // Categoría seleccionada
    });
  }

  ngAfterViewInit() {
    this.productList.paginator = this.paginator;
    this.productList.sort = this.sort;
  }

  goToDetail(sku: number): void {
    this.router.navigate(['/products', sku]);
  }

  // Método que se llama cuando el usuario hace clic en el botón de búsqueda
  onSearch(): void {
    if (this.searchForm.valid) {
      const formData = this.searchForm.value;

      this.productService.getFilteredProducts(this.filterValue, this.selectedColumn, this.selectedCategory)
        .subscribe({
          next: products => this.productList.data = products,
          error: error => {
            console.error('Error al cargar productos filtrados:', error);
            alert('Error al cargar productos filtrados.');
          }
        });
    }
  }

  // Método para cargar todos los productos
  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: products => {
        this.productList.data = products;
      },
      error: error => {
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
        if (categories.length === 0) {
          alert('No se encontraron categorías.');
        }
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