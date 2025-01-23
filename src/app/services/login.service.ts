import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://localhost:8443/api/utenti';

  constructor(private http: HttpClient) { }

  login(email: string | undefined, password: string | undefined): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, { email, password },{ responseType: 'text' });
  }


}
