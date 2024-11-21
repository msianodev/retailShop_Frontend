import { Component, inject, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../types/types';
import { EmployeeService } from '../../services/employee/employee.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'dni', 'name', 'email', 'edit'];

  employeeList = new MatTableDataSource<User>([]);

  private _snackBar = inject(MatSnackBar);
  hide = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.checkAuthentication(); // Verifica si el usuario está en el localStorage
    this.authService.currentUser.subscribe(user => {
      if (user && user.isAdmin) {
        this.displayedColumns.push('edit');
      }
      this.loadEmployeeList();

    });
    
  }
  
  
  
  ngAfterViewInit() {
    if (this.employeeList.data.length > 0) {
      this.employeeList.paginator = this.paginator;
      this.employeeList.sort = this.sort;
    }
  }

  showErrorSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000, // 2 segundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  loadEmployeeList(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        console.log('Lista de empleados cargada:', data);
        this.employeeList.data = data;
      },
      error: (error) => {
        console.error('Error al cargar la lista de empleados:', error);
        this.showErrorSnackBar('Error al cargar la lista de empleados.');
      },
    });
  }

  goToDetail(id: number): void {
    this.router.navigate([`/employees/${id}`]);
  }
}
