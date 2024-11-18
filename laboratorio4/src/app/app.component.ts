import { Component, OnInit } from '@angular/core';
import { on } from 'events';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'laboratorio4';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Verifica si hay un usuario guardado en el localStorage
    this.authService.checkAuthentication();
  }

}
