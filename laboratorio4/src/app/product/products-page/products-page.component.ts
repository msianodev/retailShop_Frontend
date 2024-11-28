import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatSort, Sort } from '@angular/material/sort';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { Category, Product, CartProduct } from '../../types/types';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryModalComponent } from '../add-category-modal/add-category-modal.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'sku',
    'description',
    'stock',
    'unitPrice',
    'detail_button',
    'category',
    'add_to_cart',
  ];
  productList = new MatTableDataSource<Product>([]); // Inicializa con un array vacío

  private _snackBar = inject(MatSnackBar);
  hide = true;

  searchForm!: FormGroup; // Formulario reactivo

  ///Filtros y busqueda
  filterValue: string = ''; // Valor para el campo de búsqueda
  selectedColumn: string = 'description'; // Columna de búsqueda seleccionada, por defecto es 'name'
  selectedCategory: number | null = null; // Categoría seleccionada

  noResultsFound: boolean = false;

  categories: Category[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    // console.log(this.productList.data);
    this.loadCategories();

    this.searchForm = this.fb.group({
      filterValue: [''],
      selectedColumn: [''],
      category: [''],
    });
  }

  ngAfterViewInit() {
    if (this.productList.data.length > 0) {
      this.productList.paginator = this.paginator;
      this.productList.sort = this.sort;
    }
  }

  //Función de filtrado de la tabla de productos Material
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productList.filter = filterValue.trim().toLowerCase();

    if (this.productList.paginator) {
      this.productList.paginator.firstPage();
    }
  }

  goToDetail(id: number): void {
    this.router.navigate([`/products/${id}`]);
  }

  // Método que se llama cuando el usuario hace clic en el botón de búsqueda
  onSearch(): void {
    if (this.searchForm.valid) {
      const formData = this.searchForm.value;
  
      const filterValue = formData.filterValue || ''; // Si el campo de texto está vacío, usa una cadena vacía
      const selectedColumn = formData.selectedColumn; // Puede ser null
      const selectedCategory = formData.category; // Puede ser null
  
      this.productService
        .getFilteredProducts(filterValue, selectedColumn, selectedCategory)
        .subscribe({
          next: (products) => {
            this.productList.data = products;
            this.noResultsFound = products.length === 0; // Si no hay productos, activa la bandera
          },
          error: (error) => {
            this.noResultsFound = true; // Si ocurre un error, también mostramos el mensaje
          },
        });
    }
  }
    


  // Método para cargar todos los productos
  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        console.log('productos:', products);
        this.productList.data = products;
        this.productList.paginator = this.paginator;
        this.productList.sort = this.sort;
      },
      error: (error) => {
        console.error('Error al cargar productos en el componente:', error);
        this.showErrorSnackBar('Error al cargar productos.');
      },
    });
  }

  add_to_cart(product: Product): void {
    // const cartProduct: CartProduct = {
    const cartProduct: CartProduct = {
      id: product.id,
      sku: product.sku,
      description: product.description,
      unitPrice: product.unitPrice,
      quantity: 1,
      subTotal: product.unitPrice,
    };
    this.cartService.addProductToCart(cartProduct);
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.showErrorSnackBar(
          'Error al cargar categorías. Intenta más tarde.'
        );
      },
    });
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((newCategoryName) => {
      if (newCategoryName) {
        this.addCategory(newCategoryName);
      }
    });
  }

  addCategory(name: string): void {
    this.productService.createCategory({ name }).subscribe({
      next: () => {
        this.loadCategories();
        /// TODO implementar TOASTS
        this.showErrorSnackBar('Categoría agregada con éxito.');
      },
      error: () => {
        this.showErrorSnackBar(
          'Hubo un error al agregar la categoría. Intenta nuevamente.'
        );
      },
    });
  }

  showErrorSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000, // 2 segundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  deleteProduct(product: Product): void {
    if (
      confirm(
        `¿Estás seguro de que quieres eliminar el producto ${product.description}?`
      )
    ) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.loadProducts();
          this.showErrorSnackBar('Producto eliminado con éxito');
        },

        error: (error) => {
          console.error('Error al eliminar el producto:', error);
          this.showErrorSnackBar(
            'Hubo un error al eliminar el producto. Intenta nuevamente.'
          );
        },
      });
    }
  }

  // Sombreado de filas según stock
  getRowClass(row: Product): string {
    if (row.stock < row.minimumStock || row.stock === 0) {
      return 'stock-below-minimum';
    }
    else {
      return '';
    }
  }
}
