import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      dni: ['', [Validators.maxLength(8), Validators.required]],
      password: ['', Validators.required],
    });
  }

  private _snackBar = inject(MatSnackBar);
  hide = true;

  // Mostrar snackbar en caso de error
  showErrorSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000, // 2 segundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  // Obtener controles del formulario
  get dni() {
    return this.loginForm.get('dni');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Acción al iniciar sesión
  login() {
    if (this.loginForm.valid) {
      // Si el formulario es válido, redirige al home
      this.router.navigate(['/home']);
      this.loginForm.reset();
    } else {
      // Si hay errores, muestra el snackbar
      this.loginForm.markAllAsTouched();
      if (this.dni?.invalid) {
        this.showErrorSnackBar('Por favor, ingrese un DNI válido.');
      }
      if (this.password?.invalid) {
        this.showErrorSnackBar('La contraseña es obligatoria.');
      }
    }
  }
}
