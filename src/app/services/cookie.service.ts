import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {ResponseData} from "./login.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'https://localhost:8443/auth';
  private codiceUtente:string='';

  constructor(private cookieService: CookieService, private http: HttpClient) {}

  getUser(): Observable<string> {
    return this.http.get(`${this.apiUrl}/getCodiceUtente`, { responseType: 'text' });
  }

  isJwtValid(): Observable<ResponseData> {
    return this.http.get<ResponseData>(`${this.apiUrl}/check`, { withCredentials: true });
  }

}
