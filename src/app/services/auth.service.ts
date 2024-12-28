import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Salva il token nel localStorage (o sessionStorage)
  saveToken(token: string): void {
    sessionStorage.setItem('access_token', token);
  }

  // Recupera il token
  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  // Rimuove il token (ad esempio per il logout)
  removeToken(): void {
    sessionStorage.removeItem('access_token');
  }

  // Verifica se l'utente è autenticato
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
