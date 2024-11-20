import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './shared/home-page/home-page.component';
import { CartPageComponent } from './cart/cart-page/cart-page.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductsPageComponent } from './product/products-page/products-page.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { SalesHistoryComponent } from './sales/sales-history/sales-history.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { EmployeesComponent } from './settings/employees/employees.component';
import { EmployeeDetailComponent } from './settings/employee-detail/employee-detail.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: 'products',
    component: ProductsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/:sku',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
  }, // Ruta con parámetro `sku`
  {
    path: 'products/new',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'sales', component: SalesHistoryComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartPageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'logout', component: LoginComponent },

  //TODO AGREGAR 404 NOT FOUND
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
