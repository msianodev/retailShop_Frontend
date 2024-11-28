import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../../types/types';
import { EmployeeService } from '../../services/employee/employee.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css',
})
export class EmployeeDetailComponent implements OnInit {
  employeeForm!: FormGroup;
  employee: User | null = null;

  isNewEmployee: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.checkIfNewEmployee();
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      dni: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private _snackBar = inject(MatSnackBar);
  hide = true;

  showErrorSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000, // 2 segundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  checkIfNewEmployee() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isNewEmployee = false;
      this.loadEmployeeDetail(Number(id));
    } else {
      this.isNewEmployee = true;
    }
  }

  loadEmployeeDetail(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.employee = data;
        this.employeeForm.patchValue({
          name: data.name,
          email: data.email,
          dni: data.dni,
          password: data.password,
        });
      },
      error: (error) => {
        console.error('Error al cargar el empleado:', error);
        this.showErrorSnackBar(
          'Error al cargar el empleado. Intenta nuevamente.'
        );
      },
    });
  }

  saveChanges(): void {
    if (this.employeeForm.valid) {

      this.openDialog(
        'Confirmar Carrito',
        '¿Estás seguro de que quieres confirmar los cambios?',
        'Confirmar',
        'Cancelar'
      )
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            const updatedEmployee = { ...this.employee, ...this.employeeForm.value };
            updatedEmployee.isAdmin = false;
            updatedEmployee.isActive = true;

            if (this.isNewEmployee) {
              this.employeeService.createEmployee(updatedEmployee).subscribe({
                next: () => {
                  this.goBack();
                },
                error: (error) => {
                  this.showErrorSnackBar(
                    'Hubo un error al crear el empleado. Intenta nuevamente.'
                  );
                },
              });
            } else {
              this.employeeService.updateEmployee(updatedEmployee).subscribe({
                next: () => {
                  this.goBack();
                },
                error: (error) => {
                  this.showErrorSnackBar(
                    'Hubo un error al actualizar el empleado. Intenta nuevamente.'
                  );
                },
              });
            }
          }
        });
    }
  }

  confirmDelete(): void {
    this.openDialog(
      'Eliminar Empleado',
      '¿Estas seguro de que quieres eliminar el empleado?',
      'Si',
      'No'
    ).afterClosed().subscribe((result) => {
      if (result) {
        console.log('Empleado eliminado', this.employee);
        this.employeeService.deleteEmployee(this.employee!.id).subscribe({
          next: () => {
            this.showErrorSnackBar('Empleado eliminado con exito.');
            this.goBack();
          },
          error: (err) => {
            console.error('Error deleting employee:', err);
            this.showErrorSnackBar('Error deleting employee. Please try again.');
          },
        });
      }
    })
  }



  goBack(): void {
    this.router.navigate(['/employees']);
  }


  private openDialog(
    title: string,
    message: string,
    confirmText: string,
    cancelText: string
  ) {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { title, message, confirmText, cancelText },
    });
  }
}
