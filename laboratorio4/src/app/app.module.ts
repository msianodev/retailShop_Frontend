import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // Si usas mat-select
import { MatOptionModule } from '@angular/material/core'; // Si usas mat-select
// import { MatPaginator } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

//COMPONENTS
// import { HomePageComponent } from './shared/home-page/home-page.component';
// import { HeaderComponent } from './core/header/header.component';
// import { SectionComponent } from './shared/section/section.component';
// import { AsideComponent } from './core/aside/aside.component';
// import { SalesHistoryComponent } from './sales/sales-history/sales-history.component';
// import { SaleDetailModalComponent } from './sales/sale-detail-modal/sale-detail-modal.component';
// import { CartPageComponent } from './cart/cart-page/cart-page.component';
// import { SuccessDialogComponent } from './shared/success-dialog/success-dialog.component';
// import { LoginComponent } from './auth/login/login.component';
// import { AuthModule } from './auth/auth.module';
// import { core } from '@angular/compiler';
import { CartModule } from './cart/cart.module';
import { CoreModule } from './core/core.module';
import { InventoryModule } from './inventory/inventory.module';
import { SalesModule } from './sales/sales.module';
import { SettingsModule } from './settings/settings.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@NgModule({
  declarations: [
    AppComponent,

    // HomePageComponent,
    // HeaderComponent,
    // SectionComponent,
    // AsideComponent,
    // SalesHistoryComponent,
    // SaleDetailModalComponent,
    // CartPageComponent,
    // SuccessDialogComponent,
    // LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
    CartModule,
    CoreModule,
    InventoryModule,
    SalesModule,
    SettingsModule,
    SharedModule,
    ProductModule,

    // MatToolbarModule,
    // MatButtonModule,
    // MatIconModule,
    // MatSidenavModule,
    // MatListModule,
    // MatPaginatorModule,
    // MatTableModule,
    // MatFormFieldModule,
    // MatCardModule,
    // MatSelectModule,
    // MatOptionModule,
    // MatInputModule,
    // MatDialogModule,
    // MatGridListModule,

    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
