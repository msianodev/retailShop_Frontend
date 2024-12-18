import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class SalesHistoryService {

  constructor(private http : HttpClient) { }

    private apiUrl = 'http://localhost:8080/api/products';

    getSalesHistory(): Observable<Sale[]>{
      return this.http.get<Sale[]>(this.apiUrl);
    }

    getSalesHistoryById(id: string): Observable<Sale[]> {
      // Realiza un GET con el ID para filtrar por cliente
      return this.http.get<Sale[]>(`${this.apiUrl}?id=${id}`);
    }
}
