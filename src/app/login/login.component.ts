import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {AuthService} from "../services/cookie.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string | undefined;
  password: string | undefined;
  private hash: string | undefined;

  constructor(private router: Router, private loginService: LoginService,private authService: AuthService) { }

  async login() {
    if (!this.email || !this.password) {
      alert('Inserisci email e password.');
      console.error('Email o password mancante');
      return;
    }

    this.loginService.login(this.email, this.password).subscribe(
      (token: string) => {
        const tokenId:string[]=token.split(';');

        // Salva il token nel cookie
        if(tokenId.length == 2){
          this.authService.saveToken(tokenId[0]);
          this.authService.saveUser(tokenId[1]);
          this.router.navigate(['/home-page']);
        }else {
          alert(token);
        }
      },
      (error) => {
        alert(error.error);
      });
  }
}
