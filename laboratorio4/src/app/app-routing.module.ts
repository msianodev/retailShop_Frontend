import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './shared/home-page/home-page.component';
import { CartPageComponent } from './cart/cart-page/cart-page.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductsPageComponent } from './product/products-page/products-page.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { SalesHistoryComponent } from './sales/sales-history/sales-history.component';

import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
  {
    path: 'products',
    component: ProductsPageComponent,
  },
  {
    path: 'products/:sku',
    component: ProductDetailComponent,
  }, // Ruta con parámetro `sku`
  {
    path: 'products/new',
    component: ProductDetailComponent,
  },
  { path: 'sales', component: SalesHistoryComponent },
  { path: 'cart', component: CartPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //TODO AGREGAR 404 NOT FOUND
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
