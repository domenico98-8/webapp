import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, } from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {NavbarService} from "./navbar.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://localhost:8443/api/utenti';

  constructor(private http: HttpClient,private router: Router, private navbarService: NavbarService) {
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
  logout() {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe(
      response => {
        // Gestisci la risposta positiva (logout avvenuto con successo)
        console.log('Logout effettuato con successo');
        this.navbarService.setNavbarVisible(false);
        this.router.navigate(['/login']);
      },
      error => {
        // Gestisci eventuali errori durante il logout
        console.error('Errore durante il logout', error);
      }
    );
  }

}

export interface ResponseData {
  message: string;
  status: number;
}
