import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {AuthService} from "../services/cookie.service";
import {NavbarService} from "../services/navbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string | undefined;
  password: string | undefined;
  private hash: string | undefined;
  authenticated: boolean = false;

  constructor(private router: Router, private loginService: LoginService,private authService: AuthService,    private navbarService: NavbarService) { }

  async login() {
    if (!this.email || !this.password) {
      alert('Inserisci email e password.');
      console.error('Email o password mancante');
      return;
    }

    this.loginService.login(this.email, this.password).subscribe(
      (token) => {
        // Salva il token nel cookie
        if(token.status == 202){
          this.authenticated=true;
          this.navbarService.setNavbarVisible(true);
          this.router.navigate(['/home-page']);
        }else {
          alert(token);
        }
      },
      (error) => {
        this.navbarService.setNavbarVisible(false);
        alert(error.error);
      });
  }
}
