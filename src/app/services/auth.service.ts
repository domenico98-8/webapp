/*
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

  saveUser(id: string): void {
    sessionStorage.setItem('user_id', id);
  }

  // Recupera il token
  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  getUser(): any {
    return sessionStorage.getItem('user_id');
  }

  // Rimuove il token (ad esempio per il logout)
  removeToken(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user_id');
  }


  // Verifica se l'utente è autenticato
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
*/
