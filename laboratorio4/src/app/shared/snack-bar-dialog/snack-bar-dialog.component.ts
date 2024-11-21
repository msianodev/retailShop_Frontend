import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-snack-bar-dialog',
  templateUrl: './snack-bar-dialog.component.html',
  styleUrl: './snack-bar-dialog.component.css'
})
export class SnackbarDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SnackbarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, type: 'error' | 'success' }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}