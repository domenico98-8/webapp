import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/cookie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {
  utente: any = {
    nome: 'Mario',
    cognome: 'Rossi',
    annoNascita: 1990,
    email: 'mario.rossi@example.com'
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Caricare le informazioni utente se vengono da un'API
    // Esempio:
    // this.authService.getUserProfile().subscribe(data => this.utente = data);
  }

  logout(): void {
    if(this.authService.isAuthenticated()){
      this.authService.removeToken();
      this.router.navigate(['/login']);
    }
  }

  cambioPassword(): void {
    this.router.navigate(['/cambio-password']); // Naviga a una pagina dedicata per il cambio password
  }
}
