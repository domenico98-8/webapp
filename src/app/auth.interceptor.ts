import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./services/cookie.service";
import {Router} from "@angular/router";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Modifica la richiesta per includere i cookie
    const modifiedRequest = req.clone({
      withCredentials: true // Indica che i cookie devono essere inviati con la richiesta
    });

    return next.handle(modifiedRequest);
  }
}
