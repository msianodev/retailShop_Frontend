import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ProductsPageComponent } from './components/pages/products-page/products-page.component';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SalesHistoryComponent } from './components/sales-history/sales-history.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'products/:sku', component: ProductDetailComponent }, // Ruta con parámetro `sku`
  { path: 'products/new', component: ProductDetailComponent },
  { path: 'sales', component: SalesHistoryComponent },
  { path: 'cart', component: CartPageComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
