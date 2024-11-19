import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../types/types';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { EmployeeService } from '../../../services/employee/employee.service';
import { AuthService } from '../../../services/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'dni', 'name', 'email'];

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
  ) { }

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.displayedColumns.push('edit', 'delete');
    }
    
    this.loadEmployeeList();
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

  loadEmployeeList():void{
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employeeList.data = data;
      },
      error: (error) => {
        console.error('Error al cargar la lista de empleados:', error);
        this.showErrorSnackBar('Error al cargar la lista de empleados.');
      },
    });
  }

  goToDetail(id: number): void {
    this.router.navigate([`/products/${id}`]);
  }

}
