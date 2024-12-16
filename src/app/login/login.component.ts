import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) { }

  login() {
    // Simulazione: imposta un token di autenticazione
    localStorage.setItem('authToken', 'my-secret-token');

    // Reindirizza alla home page
    this.router.navigate(['/home-page']);
  }
}
