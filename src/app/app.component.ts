import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from "./services/cookie.service";
import {Router} from "@angular/router";
import {NavbarService} from "./services/navbar.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  navbarVisible: boolean = false;
  navbarSubscription: Subscription | undefined;

  constructor(private authService: AuthService,private router: Router,private navbarService: NavbarService // Inietta il servizio
  ) {
  }

  ngOnInit(): void {
    // Verifica la validità del JWT quando l'app è inizializzata
    this.authService.isJwtValid().subscribe(
      (isValid) => {
        if (isValid) {
          this.navbarService.setNavbarVisible(true);
          this.router.navigate(['/home-page']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        this.navbarService.setNavbarVisible(false);
        this.router.navigate(['/login']);
      }
    );
  }

  ngDoCheck(): void {
    // Ascolta le modifiche di visibilità della navbar
    this.navbarSubscription = this.navbarService.navbarVisibility$.subscribe(
      (visible) => {
        this.navbarVisible = visible;
      }
    );
  }


}
