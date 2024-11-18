import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ProductsPageComponent } from './components/pages/products-page/products-page.component';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SalesHistoryComponent } from './components/sales-history/sales-history.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsPageComponent, canActivate: [AuthGuard] },
  { path: 'products/:sku', component: ProductDetailComponent, canActivate: [AuthGuard] }, // Ruta con parámetro `sku`
  { path: 'products/new', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'sales', component: SalesHistoryComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartPageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //TODO AGREGAR 404 NOT FOUND
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
