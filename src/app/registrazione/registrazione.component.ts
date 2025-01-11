import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.services";
import {UtenteRequest} from "../modelli/Utente";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent {
  registrationForm: FormGroup;
  request:UtenteRequest|undefined;

  constructor(private fb: FormBuilder,private utenteService: UserService,private router: Router) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2)]],
      cognome: ['', [Validators.required, Validators.minLength(2)]],
      documento: ['', Validators.required],
      sesso: ['', Validators.required],
      dataNascita: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      this.generateRequest();
      this.utenteService.registrazione(this.request).subscribe((s:string)=>{
        this.registrationForm.reset();
        this.router.navigate(['login']);
        alert('Registrazione completata con successo!');
      }, (error) => {
          if (error.status === 409) { // Codice HTTP 409 Conflict
            alert('Errore: l\'utente esiste già!');
          } else if(error.status === 403){
            alert('Errore durante la registrazione. Utente con questo documento già esistente.');
          }
        })
    } else {
      alert('Per favore, compila tutti i campi obbligatori.');
    }
  }

  private async generateRequest() {
    const password: string | undefined = await this.generateHash(this.registrationForm.get('password')?.value);
    this.request = {
      nome: this.registrationForm.get('nome')?.value,
      cognome: this.registrationForm.get('cognome')?.value,
      email: this.registrationForm.get('email')?.value,
      password: password,
      sesso: this.registrationForm.get('sesso')?.value[0],
      dataNascita: this.registrationForm.get('dataNascita')?.value,
      documento: this.registrationForm.get('documento')?.value
    }
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
