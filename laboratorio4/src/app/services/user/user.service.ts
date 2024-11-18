import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = 'http://localhost:8080/api/users/'

  constructor(private http : HttpClient) { }


}