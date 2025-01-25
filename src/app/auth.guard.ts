import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "./services/cookie.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      this.authService.isJwtValid().subscribe(
        (isValid) => {
          if (!isValid) {
            this.router.navigate(['/login']);  // Se il token non è valido, reindirizza
            observer.next(false);
          } else {
            observer.next(true);  // Permetti l'accesso se valido
          }
        },
        (error) => {
          this.router.navigate(['/login']);  // In caso di errore, reindirizza al login
          observer.next(false);
        }
      );
    });
  }

}
