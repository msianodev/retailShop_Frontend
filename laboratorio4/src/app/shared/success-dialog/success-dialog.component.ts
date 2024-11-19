import { Component } from '@angular/core';

@Component({
  selector: 'app-success-dialog',
  template: `
    <h1 mat-dialog-title>Sale Successful</h1>
    <div mat-dialog-content>
      <p>Your sale has been completed successfully!</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">OK</button>
    </div>
  `,
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent {
  constructor() {}
}
