import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router,private authService:AuthService,private loginService:LoginService) { }

  navigateToHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/home-page']);
  }

  logout() {
    if(this.authService.isAuthenticated()){
      this.authService.removeToken();
      this.router.navigate(['/login']).then(() => {
        this.loginService.authenticateNavBar(this.authService.isAuthenticated());
      });
    }

  }

}
