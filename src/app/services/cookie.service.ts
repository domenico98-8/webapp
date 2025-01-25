import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {ResponseData} from "./login.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userKey = 'userId';

  private apiUrl: string = 'https://localhost:8443';

  constructor(private cookieService: CookieService, private http: HttpClient) {}

  // Recupera l'ID utente dai cookie
  getUser(): string | null {
    return this.cookieService.get(this.userKey) || null;
  }

  isJwtValid(): Observable<ResponseData> {
    return this.http.get<ResponseData>(`${this.apiUrl}/auth/check`, { withCredentials: true });
  }

}
