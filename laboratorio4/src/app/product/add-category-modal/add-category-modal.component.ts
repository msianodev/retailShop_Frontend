import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class AddCategoryModalComponent {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCategoryModalComponent>
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  submit() {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value.name);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
