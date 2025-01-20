import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "./services/cookie.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated(); // Controlla se esiste il token
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Reindirizza alla pagina di login
      return false;
    }
    return true; // Consenti l'accesso se autenticato
  }

}
