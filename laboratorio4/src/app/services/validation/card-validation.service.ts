import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { CardData } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class CardValidationService {
  private apiUrl = 'https://localhost:8080/api/payment/verify';

  constructor(private http: HttpClient) {}
  validateCard(cardData: CardData): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, cardData).pipe(
      catchError(() => of(false))
    );
  }
}
