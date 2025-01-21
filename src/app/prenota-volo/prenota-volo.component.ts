import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostiServices} from "../services/posti.services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../services/prenotazione.service";
import {UtenteRequest} from "../modelli/Utente";
import {PostoResponse} from "../modelli/Posto";
import {PrenotazioneRequest} from "../modelli/Prenotazione";
import {AuthService} from "../services/cookie.service";

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
  numeroPasseggeriForm: FormGroup; //form selezione numeri
  passeggeriForms: FormGroup[] = []; //form del passeggeri
  passeggeriSelezionati: boolean = false;

  postiSelezionati: any[] = []; // Array per tracciare i posti selezionati

  // Struttura per la mappa dei posti sull'aereo
  aereo: any = [];

  // Variabile per tracciare il posto selezionato
  postoSelezionato: string | null = null;

  constructor(private route: ActivatedRoute,private postiService:PostiServices, private fb: FormBuilder, private bookService: BookService,
              private authService:AuthService, private router: Router) {
    this.numeroPasseggeriForm = this.fb.group({
      numeroPasseggeri: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
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
    this.numeroPasseggeri = this.numeroPasseggeriForm.get('numeroPasseggeri')?.value;
    this.passeggeriForms = [];
    for (let i = 0; i < this.numeroPasseggeri; i++) {
      this.passeggeriForms.push(this.fb.group({
        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        documento: ['', Validators.required],
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

    if (this.postiSelezionati!=null && this.postiSelezionati.length > 0 && this.passeggeriForms!=null && this.passeggeriForms.length > 0 && this.codiceVolo!='') {
      const richiestaPrenotazione= this.generaRichiestaPrenotazione(this.passeggeriForms,this.postiSelezionati,this.codiceVolo);
      this.bookService.bookFly(richiestaPrenotazione).subscribe(book => {
          alert("Prenotazione Effettuata con successo!");
          this.router.navigate(['/le-mie-prenotazioni']);
      },
        err => {
          alert(err.error);
        })
    } else {
      alert("Per favore, seleziona un posto.");
    }
  }

  generaRichiestaPrenotazione(formPasseggeri:FormGroup[],postiSelezionati:any,codiceVolo:string):PrenotazioneRequest {
    const passeggeri:UtenteRequest[]=[];
    for (let i = 0; i < formPasseggeri.length; i++) {
      const user:UtenteRequest=new UtenteRequest();
      user.nome=formPasseggeri[i].get('nome')?.value;
      user.dataNascita=formPasseggeri[i].get('dataNascita')?.value;
      user.cognome=formPasseggeri[i].get('cognome')?.value;
      user.sesso=formPasseggeri[i].get('sesso')?.value;
      user.documento=formPasseggeri[i].get('documento')?.value;
      passeggeri.push(user);
    }
    const posti:PostoResponse[]=[];
    for(let i=0;i<postiSelezionati.length;i++){
      const posto:PostoResponse=new PostoResponse();
      posto.numeroPosto=postiSelezionati[i];
      posti.push(posto);
    }
    const utente=this.authService.getUser() ?? 0;
    const prenotazione:PrenotazioneRequest={
      passeggeri: passeggeri,
      posti: posti,
      costo:this.prezzo,
      volo: codiceVolo,
      idUtente:+utente
    };
    return prenotazione;
  }
}
