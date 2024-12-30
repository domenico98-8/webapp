import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router,private authService:AuthService) {}

  navigateToHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/home-page']).then(() => {
      // Esegui il refresh della pagina
      window.location.reload();
    }); // Reindirizza alla rotta /home
  }

  logout() {
    if(this.authService.isAuthenticated()){
      this.authService.removeToken();
      this.router.navigate(['/login']).then(() => {
        // Esegui il refresh della pagina
        window.location.reload();
      });
    }

  }

}
