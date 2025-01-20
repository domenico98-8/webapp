import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./services/cookie.service";
import {Router} from "@angular/router";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Ottieni il token dal servizio AuthService
    const token = this.authService.getToken();

    // Se c'è un token, aggiungilo nell'header Authorization
    if (token && this.authService.isAuthenticated()) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }else{
      this.router.navigate(['/login']);
    }

    // Altrimenti, lascia la richiesta invariata
    return next.handle(req);
  }
}
