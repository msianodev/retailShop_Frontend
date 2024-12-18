import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';
import { numbersOnly } from '../../../utils/CustomValidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      dni: ['', [Validators.required,numbersOnly()]],
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
      // Extraer los valores de DNI y contraseña, asegurándose de que no sean null o undefined
      const { dni, password } = this.loginForm.value;

      // Verificar si el dni y password no son nulos ni indefinidos
      if (dni && password) {
        // Llamar al AuthService para autenticar al usuario
        this.authService.login(dni, password).subscribe(
          (user) => {
            // Si la autenticación es exitosa, redirige al home
            this.router.navigate(['/home']); // Redirige al home
            this.loginForm.reset(); // Resetea el formulario
          },
          (error) => {
            // Si hay un error en la autenticación (ej. credenciales incorrectas)
            this.showErrorSnackBar('DNI o contraseña incorrectos');
          }
        );
      } else {
        this.showErrorSnackBar('DNI y contraseña son obligatorios.');
      }
    } else {
      // Si el formulario tiene errores, muestra el snackbar
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
