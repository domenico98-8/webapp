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

  constructor(private route:ActivatedRoute,private bagaglioService:BagaglioService, private prenotazioneService:BookService) {
  }

  onBagaglioSelect(cliente: Cliente, bagaglio: Bagaglio): void {
    const prenotazione=this.prenotazione.find(prenotazione=>prenotazione.cliente.id === cliente.id);
    if(!prenotazione){
      const nuovaPrenotazione:PrenotazioneBagaglio={
        cliente:cliente,
        bagaglio:bagaglio,
      }
      this.prenotazione.push(nuovaPrenotazione);
    }else{
      this.prenotazione.forEach((prenotazione:PrenotazioneBagaglio)=>{if(prenotazione.cliente.id === cliente.id){
        prenotazione.bagaglio=bagaglio;
      }})
    }
  }

  postoSelzionato(cliente: Cliente, bagaglio: Bagaglio):boolean{
    const prenotazione=this.prenotazione.find(prenotazione=>prenotazione.cliente.id === cliente.id && prenotazione.bagaglio==bagaglio);
    if(prenotazione){
      return true;
    }else return false;

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

