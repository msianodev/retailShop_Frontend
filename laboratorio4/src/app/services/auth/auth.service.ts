import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'; // Asegúrate de importar tap
import { User } from '../../types/types'; // Tu modelo de usuario
import { C } from '@angular/cdk/keycodes';
import { Console } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/login'; // URL de la API para autenticar al usuario

  // Comportamiento de usuario autenticado (usamos BehaviorSubject para manejar el estado de forma reactiva)
  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public currentUser: Observable<User | null> =
    this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Método para realizar el login
  login(dni: string, password: string): Observable<User> {
    const credentials = { dni, password };

    return this.http.post<User>(this.apiUrl, credentials).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  // Método para obtener el usuario actual
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  // Logout y limpiar el almacenamiento
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']); // Redirige al login
  }

  // Comprobar si existe un usuario autenticado en el localStorage (revisión al cargar la aplicación)
  checkAuthentication(): void {
    const userString = localStorage.getItem('currentUser');
    const user = JSON.parse(userString || 'null');
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  isAdmin(): boolean {
    const currentUser = this.currentUserValue;
    if (currentUser) {
      return Boolean(currentUser.isAdmin);
    }
    return false;
  }
}
