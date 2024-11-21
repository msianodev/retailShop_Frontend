import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SectionComponent } from './section/section.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatOptionModule } from '@angular/material/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SnackbarDialogComponent } from './snack-bar-dialog/snack-bar-dialog.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [HomePageComponent, SectionComponent, SuccessDialogComponent, ConfirmationDialogComponent, SnackbarDialogComponent, ToastComponent],
  imports: [
    CommonModule,

    MatToolbarModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatSort,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatPaginator,
    MatDialogModule,
    MatGridListModule,
  ],
  exports: [HomePageComponent, SectionComponent, SuccessDialogComponent, ConfirmationDialogComponent,ToastComponent],
})
export class SharedModule {}
