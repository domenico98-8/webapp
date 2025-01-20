import {Component, Input, OnInit} from '@angular/core';
import {BigliettoResponse} from "../modelli/Biglietto";
import {BookService} from "../services/prenotazione.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-biglietti-aerei',
  templateUrl: './biglietti-aerei.component.html',
  styleUrls: ['./biglietti-aerei.component.css']
})
export class BigliettiAereiComponent implements OnInit {
  @Input() codicePrenotazione: string | undefined;

  passeggeri:BigliettoResponse[] = [];

  constructor(private prenotazioneService:BookService,private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.codicePrenotazione = params['codicePrenotazione'];
    });

    this.prenotazioneService.getBiglietti(this.codicePrenotazione).subscribe(biglietti=>{
        this.passeggeri = biglietti;
      },
      err => console.log(err)
    );
  }
}
