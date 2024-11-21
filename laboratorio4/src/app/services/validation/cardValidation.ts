import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { debounceTime, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CardValidationService } from './card-validation.service';

export function cardAsyncValidator(service: CardValidationService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ invalidCard?: boolean } | null> => {
    // Verificar si se envían los campos necesarios
    const cardNumber = control.get('cardNumber')?.value;
    const cardExpiry = control.get('cardExpiry')?.value;
    const cardCvv = control.get('cardCvv')?.value;

    if (!cardNumber || !cardExpiry || !cardCvv) {
      return of(null); // No validamos si falta algún campo
    }

    return service.validateCard({ cardNumber, cardExpiry, cardCvv }).pipe(
      debounceTime(500), // Opcional, para no validar en cada tecla presionada
      map((isValid) => (isValid ? null : { invalidCard: true })),
      catchError(() => of({ invalidCard: true }))
    );
  };
}
