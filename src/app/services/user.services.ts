import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UtenteRequest} from "../modelli/Utente";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/utenti';

  constructor(private http: HttpClient) { }

  public registrazione(utente: UtenteRequest|undefined): Observable<string> {
    return this.http.post(`${this.apiUrl}/registrazione`, utente,{ responseType: 'text' });
  }


}
