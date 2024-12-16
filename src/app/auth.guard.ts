import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('authToken'); // Controlla se esiste il token
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Reindirizza alla pagina di login
      return false;
    }
    return true; // Consenti l'accesso se autenticato
  }
}
