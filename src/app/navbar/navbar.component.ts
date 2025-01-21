import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {AuthService} from "../services/cookie.service";
import {UserService} from "../services/user.services";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nomeUtente: string|null = null;

  constructor(private router: Router,private authService:AuthService,private loginService:LoginService,private utenteService:UserService) { }

  navigateToHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/home-page']);
  }

  logout() {
    if(this.authService.isAuthenticated()){
      this.authService.removeToken();
      this.router.navigate(['/login']);
    }

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
