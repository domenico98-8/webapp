import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostiServices} from "../services/posti.services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-prenota-volo',
  templateUrl: './prenota-volo.component.html',
  styleUrls: ['./prenota-volo.component.css']
})
export class PrenotaVoloComponent implements OnInit  {
  @Input() codiceVolo!: string;
  @Input() origine!: string;
  @Input() destinazione!: string;
  @Input() orarioPartenza!: string;
  @Input() orarioArrivo!: string;
  @Input() prezzo!: number;

  numeroPasseggeri: number = 0;
  passeggeriForm: FormGroup;
  passeggeri: any[] = [];
  passeggeriSelezionati: boolean = false;

  postiSelezionati: number[] = []; // Array per tracciare i posti selezionati

  // Struttura per la mappa dei posti sull'aereo
  aereo: any = [];

  // Variabile per tracciare il posto selezionato
  postoSelezionato: string | null = null;

  constructor(private route: ActivatedRoute,private postiService:PostiServices, private fb: FormBuilder) {
    this.passeggeriForm = this.fb.group({
      numeroPasseggeri: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.codiceVolo = params['codiceVolo'];
      this.origine = params['origine'];
      this.destinazione = params['destinazione'];
      this.orarioPartenza = params['orarioPartenza'];
      this.orarioArrivo = params['orarioArrivo'];
      this.prezzo = params['prezzo'];
    });
    this.postiService.getSeatsFromFlyCode(this.codiceVolo).subscribe(params => {
      this.aereo=params;
      console.log("OK");
      },
      err => {
        console.log("KO");
      });
  }

  selezionaPosto(fila: any) {
    // Verifica se il posto è disponibile
    if (!fila.stato) {
      // Se il numero di posti selezionati è inferiore al numero di passeggeri, possiamo selezionare il posto
      if (this.postiSelezionati.length < this.numeroPasseggeri) {
        this.postoSelezionato = fila.numeroPosto;
        fila.stato = 2;  // Impostiamo lo stato del posto a "selezionato"
        this.postiSelezionati.push(fila.numeroPosto); // Aggiungiamo il numero del posto selezionato all'array
      } else {
        alert("Hai selezionato il numero massimo di posti disponibili per i passeggeri.");
      }
    } else if (fila.stato === 2 && this.postiSelezionati.includes(fila.numeroPosto)) {
      // Se il posto è già selezionato e l'utente cerca di deselezionarlo
      fila.stato = false; // Deseleziona il posto
      const index = this.postiSelezionati.indexOf(fila.numeroPosto);
      if (index !== -1) {
        this.postiSelezionati.splice(index, 1); // Rimuoviamo il posto selezionato dall'array
      }
    } else {
      alert("Questo posto è già occupato.");
    }
  }


  selezionaPasseggeri() {
    this.numeroPasseggeri = this.passeggeriForm.get('numeroPasseggeri')?.value;
    this.passeggeri = [];
    for (let i = 0; i < this.numeroPasseggeri; i++) {
      this.passeggeri.push(this.fb.group({
        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        dataNascita: ['', Validators.required],
        sesso: ['', Validators.required],
      }));
    }
    this.passeggeriSelezionati = true;
  }

  annullaDettagliPasseggeri() {
    this.passeggeriSelezionati = false;
    this.tornaIndietro()
  }

  private tornaIndietro() {
    this.postiSelezionati = [];

    for (let fila of this.aereo) {
      if (fila.stato === 2) {
        fila.stato = false;
      }
    }

    this.numeroPasseggeri = 0;
  }

  prenotaVolo() {
    if (this.postoSelezionato) {
      alert(`Prenotazione confermata per il volo. Posto selezionato: ${this.postoSelezionato}`);
    } else {
      alert("Per favore, seleziona un posto.");
    }
  }
}
