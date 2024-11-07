import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ProductsPageComponent } from './components/pages/products-page/products-page.component';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'products/:sku', component: ProductDetailComponent} // Ruta con parámetro `sku`
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
