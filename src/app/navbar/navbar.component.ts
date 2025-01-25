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
    this.loginService.logout();
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
    this.authService.getUser().subscribe(
      (data) => {
        this.nomeUtente = data;
        this.utenteService.getUserAccount(this.nomeUtente).subscribe((user) => {
          this.nomeUtente = user.nome;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }



}
