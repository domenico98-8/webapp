import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {Bagaglio} from "../modelli/Bagaglio";
import {PrenotazioneBagaglio} from "../modelli/Prenotazione";
import {Cliente} from "../modelli/Cliente";
import {ActivatedRoute} from "@angular/router";
import {BagaglioService} from "../services/bagaglio.service";
import {BookService} from "../services/prenotazione.service";


@Component({
  selector: 'app-checkin-bagaglio',
  templateUrl: './checkin-bagaglio.component.html',
  styleUrls: ['./checkin-bagaglio.component.css']
})
export class CheckinBagaglioComponent implements OnInit {
  @Input() idPrenotazione: string | undefined;

  bagagliDisponibili: Bagaglio[] = [];

  clienti: Cliente[]=[];

  prenotazione: PrenotazioneBagaglio[] = [];

  @Output() bagaglioSelezionato = new EventEmitter<PrenotazioneBagaglio>();

  constructor(private route:ActivatedRoute,private bagaglioService:BagaglioService, private prenotazioneService:BookService) {
  }

  onBagaglioSelect(cliente: number, bagaglio: Bagaglio): void {
    const prenotazioneCliente = this.prenotazione.find(p => p.idCliente === cliente);
    if (prenotazioneCliente) {
      prenotazioneCliente.bagaglioSelezionato = bagaglio;
      this.bagaglioSelezionato.emit(prenotazioneCliente);
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.idPrenotazione = params['codicePrenotazione'];
    });
    this.bagaglioService.getAllBagagli().subscribe(bagagli=>{
      this.bagagliDisponibili = bagagli;
    },
      error => {
      console.log(error);
      });

    this.prenotazioneService.getClienti(this.idPrenotazione).subscribe(clienti=>{
      this.clienti = clienti;
    },
      error => {
      console.log(error);
      });
  }
}

