import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      cognome: ['', [Validators.required, Validators.minLength(2)]],
      documento: ['', Validators.required],
      sesso: ['', Validators.required],
      dataNascita: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Dati utente:', this.registrationForm.value);
      alert('Registrazione completata con successo!');
      this.registrationForm.reset(); // Resetta il modulo
    } else {
      alert('Per favore, compila tutti i campi obbligatori.');
    }
  }
}
