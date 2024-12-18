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
import { MatSort } from '@angular/material/sort';
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

  // Filtros y busqueda
  searchTerm: string = ''; // Valor para el campo de búsqueda
  selectedFilterName: string = 'description'; // Columna de búsqueda seleccionada, por defecto es 'name'
  selectedCategory: number | null = null; // Categoría seleccionada

  currentPage: number = 0;
  pageSize: number = 5; // Cambia según el tamaño que desees
  totalProducts: number = 0; // Para almacenar el total de productos

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
  ) {
    this.searchForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();

    this.searchForm = this.fb.group({
      searchTerm: [''],
      selectedFilterName: [''],
      category: [''],
    });
  }

  ngAfterViewInit() {
    // Asignar paginator y sort en el ciclo de vida AfterViewInit
    if (this.productList.data.length > 0) {
      this.productList.paginator = this.paginator;
      this.productList.sort = this.sort;
    }
  }

  // Función de filtrado de la tabla de productos Material
  applyFilter(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.productList.filter = searchTerm.trim().toLowerCase();

    if (this.productList.paginator) {
      this.productList.paginator.firstPage();
    }
  }

  goToDetail(id: number): void {
    this.router.navigate([`/products/${id}`]);
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.currentPage = 0; // Reinicia a la primera página cuando se hace una búsqueda
      this.loadProducts();
    }
  }

  loadProducts(): void {
    const formData = this.searchForm.value;
    const searchTerm = formData.searchTerm || '';
    const selectedFilterName = formData.selectedFilterName;
    const selectedCategory = formData.category;

    this.productService
      .getPaginatedProducts(
        this.currentPage,
        this.pageSize,
        searchTerm,
        selectedFilterName,
        selectedCategory
      )
      .subscribe({
        next: (response) => {
          this.productList.data = response.content;
          this.totalProducts = response.totalElements; // Asegúrate de que totalElements sea correcto

          // Aquí aseguras que el paginador siempre recibe los valores adecuados
          if (this.paginator) {
            this.paginator.length = this.totalProducts;
            this.paginator.pageIndex = this.currentPage;
          }

          // Confirmar si la respuesta tiene resultados
          this.noResultsFound = response.content.length === 0;
        },
        error: () => {
          this.showErrorSnackBar('Error al cargar los productos.');
        },
      });
  }

  onPageChange(event: any): void {
    // Aquí se actualiza currentPage y pageSize al cambiar de página
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;

    // Recargar los productos con los valores de página y tamaño actualizados
    this.loadProducts();
  }

  add_to_cart(product: Product): void {
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
        this.showErrorSnackBar('Error al cargar categorías. Intenta más tarde.');
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
        this.showErrorSnackBar('Categoría agregada con éxito.');
      },
      error: () => {
        this.showErrorSnackBar('Hubo un error al agregar la categoría. Intenta nuevamente.');
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
    if (confirm(`¿Estás seguro de que quieres eliminar el producto ${product.description}?`)) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.loadProducts();
          this.showErrorSnackBar('Producto eliminado con éxito');
        },
        error: (error) => {
          console.error('Error al eliminar el producto:', error);
          this.showErrorSnackBar('Hubo un error al eliminar el producto. Intenta nuevamente.');
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
