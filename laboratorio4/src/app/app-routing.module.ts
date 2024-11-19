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
import { EmployeesComponent } from './components/employees/employees/employees.component';
import { EmployeeDetailComponent } from './components/employees/employee-detail/employee-detail.component';

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
  { path: '**', redirectTo: '/login' },
  {path: 'employees', component: EmployeesComponent, canActivate:[AuthGuard] },
  {path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LoginComponent},
  //TODO AGREGAR 404 NOT FOUND
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
