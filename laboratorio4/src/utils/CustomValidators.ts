import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numbersOnly(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Si el valor no está definido, no aplicamos la validación
    if (!value) {
      return null;
    }

    // Expresión regular para verificar que el valor sea solo números
    const isValid = /^[0-9]+$/.test(value);

    // Si no es válido, regresamos el error
    return isValid ? null : { numbersOnly: true };
  };
}
