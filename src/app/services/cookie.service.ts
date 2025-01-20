import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'access_token';
  private userKey = 'user_id';
  private logoutTimer: any;

  constructor(private cookieService: CookieService) {}

  // Salva il token nei cookie e imposta il timer per il logout automatico
  saveToken(token: string): void {
    this.cookieService.set(this.tokenKey, token, {
      expires: 7,
      path: '/',
      secure: true,
      sameSite: 'Strict',
    });

    this.setLogoutTimer(token);
  }

  // Salva l'ID utente nei cookie
  saveUser(id: string): void {
    this.cookieService.set(this.userKey, id, {
      expires: 7,
      path: '/',
      secure: true,
      sameSite: 'Strict',
    });
  }

  // Recupera il token dai cookie
  getToken(): string | null {
    return this.cookieService.get(this.tokenKey) || null;
  }

  // Recupera l'ID utente dai cookie
  getUser(): string | null {
    return this.cookieService.get(this.userKey) || null;
  }

  // Rimuove il token e l'ID utente dai cookie (logout)
  removeToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
    this.cookieService.delete(this.userKey, '/');

    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }

  // Verifica se l'utente è autenticato
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const isExpired = this.isTokenExpired(token);
    if (isExpired) {
      this.removeToken(); // Logout automatico
    }
    return !isExpired;
  }

  // Imposta un timer per il logout automatico
  private setLogoutTimer(token: string): void {
    const expiryTime = this.getTokenExpiration(token);
    if (!expiryTime) return;

    const now = Date.now();
    const timeout = expiryTime - now;

    if (timeout > 0) {
      this.logoutTimer = setTimeout(() => {
        this.removeToken();
        console.log('Sessione scaduta: logout eseguito automaticamente.');
      }, timeout);
    }
  }

  // Decodifica il token e calcola la scadenza
  private getTokenExpiration(token: string): number | null {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp ? decoded.exp * 1000 : null; // `exp` è in secondi, quindi moltiplica per 1000
    } catch (error) {
      console.error('Errore nella decodifica del token:', error);
      return null;
    }
  }

  // Verifica se il token è scaduto
  private isTokenExpired(token: string): boolean {
    const expiryTime = this.getTokenExpiration(token);
    if (!expiryTime) return true;
    return Date.now() > expiryTime;
  }
}
