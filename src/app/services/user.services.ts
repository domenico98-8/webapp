import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UtenteRequest} from "../modelli/Utente";
import {ClienteResponse} from "../modelli/Cliente";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/utenti';

  constructor(private http: HttpClient) { }

  public registrazione(utente: UtenteRequest|undefined): Observable<string> {
    return this.http.post(`${this.apiUrl}/registrazione`, utente,{ responseType: 'text' });
  }

  public getUserAccount(codiceUtente:string|null): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.apiUrl}/getUserAccount/${codiceUtente}`);
  }


}
