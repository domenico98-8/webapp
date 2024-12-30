import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  navigateToHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/home-page']).then(() => {
      // Esegui il refresh della pagina
      window.location.reload();
    }); // Reindirizza alla rotta /home
  }
}
