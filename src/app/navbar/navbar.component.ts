import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {AuthService} from "../services/cookie.service";
import {UserService} from "../services/user.services";
import {NavbarService} from "../services/navbar.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nomeUtente: string|null = null;

  constructor(private router: Router,private authService:AuthService,private loginService:LoginService,private utenteService:UserService,private navbarService: NavbarService) { }

  navigateToHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/home-page']);
  }

  logout() {
    this.loginService.logout().subscribe(
      response => {
        // Gestisci la risposta positiva (logout avvenuto con successo)
        console.log('Logout effettuato con successo');
        this.navbarService.setNavbarVisible(false);
        this.router.navigate(['/login']);
      },
      error => {
        // Gestisci eventuali errori durante il logout
        console.error('Errore durante il logout', error);
      }
    );

  }

  navigateToProfilo(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/profilo']);
  }

  navigateToLeMiePrenotazioni(event: Event){
    event.preventDefault();
    this.router.navigate(['/le-mie-prenotazioni']);
  }

  ngOnInit(): void {
    this.utenteService.getUserAccount(this.authService.getUser()).subscribe(user=>{
      if(user){
        this.nomeUtente = user.nome;
      }
    })
  }

}
