import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isAuthenticated= new Subject<boolean>();
  private authenticate = this.isAuthenticated.asObservable();

  private apiUrl = 'http://localhost:8080/api/utenti';

  constructor(private http: HttpClient) { }

  login(email: string | undefined, password: string | undefined): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, { email, password },{ responseType: 'text' });
  }

  authenticateNavBar(authenticated: boolean){
    this.isAuthenticated.next(authenticated);
  }

  getAuthenticate(): Observable<boolean> {
    return this.authenticate;
  }
}
