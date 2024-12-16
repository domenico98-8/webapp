import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string | undefined;
  password: string | undefined;
  private hash: string | undefined;

  constructor(private router: Router, private loginService: LoginService) { }

  async login() {
    if (!this.email || !this.password) {
      alert('Inserisci email e password.');
      console.error('Email o password mancante');
      return;
    }

    try {
      this.hash = await this.generateHash(this.password);
    } catch (error) {
      console.error('Errore durante la generazione dell\'hash:', error);
      alert('Errore interno, riprova più tardi.');
      return;
    }

    this.loginService.login(this.email, this.hash).subscribe(
      (token: string) => {
        console.log('Token ricevuto:', token);

        // Salva il token nel localStorage
        localStorage.setItem('authToken', token);

        // Reindirizza alla home page
        this.router.navigate(['/home-page']);
      },
      (error) => {
        console.error('Errore durante l\'accesso:', error);
        alert('Credenziali non valide, riprova');
      });
  }

  private async generateHash(input: string | undefined): Promise<string> {
    // Codifica la stringa in formato Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    // Calcola l'hash utilizzando l'algoritmo SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Converti l'ArrayBuffer risultante in una stringa esadecimale
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  }
}
