import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';



//COMPONENTS
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { SectionComponent } from './components/section/section.component';
import { AsideComponent } from './components/aside/aside.component';
import { ProductsPageComponent } from './components/pages/products-page/products-page.component';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,

    HomePageComponent,
    HeaderComponent,
    SectionComponent,
    AsideComponent,
    ProductsPageComponent,
    ProductDetailComponent,
    CartPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatSort,
    MatFormFieldModule,
    MatCardModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
