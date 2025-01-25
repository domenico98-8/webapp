import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, } from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://localhost:8443/api/utenti';

  constructor(private http: HttpClient,private router: Router) {
  }

  login(email: string | undefined, password: string | undefined): Observable<ResponseData> {
    const loginData = {email, password};
    const url = `${this.apiUrl}/login`;

    // Restituisci l'intera risposta con observe: 'response' per ottenere status e body
    // Passa l'email e la password come oggetto
    return this.http.post<ResponseData>(`${this.apiUrl}/login`, {email, password}, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json',
    });
  }
  // Funzione per il logout
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

}

export interface ResponseData {
  message: string;
  status: number;
}
