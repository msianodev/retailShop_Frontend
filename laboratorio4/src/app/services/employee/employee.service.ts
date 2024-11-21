import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesURL = 'http://localhost:8080/api/users'; // URL de tu API
  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<User[]> {
    return this.http.get<User[]>(this.employeesURL);
  }

  getEmployeeById(id: number): Observable<User> {
    return this.http.get<User>(`${this.employeesURL}/${id}`);
  }

  createEmployee(employee: User): Observable<User> {
    return this.http.post<User>(this.employeesURL, employee);
  }

  updateEmployee(employee: User) {
    return this.http.put<User>(`${this.employeesURL}/${employee.id}`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.employeesURL}/${id}`);
  }
}
