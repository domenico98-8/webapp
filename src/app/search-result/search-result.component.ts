import {Component, Input, OnInit} from '@angular/core';
import { VoliService } from '../services/voli.service';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {VoloRequest, VoloResponse} from "../modelli/Volo";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultsComponent implements OnInit {

  @Input() searchParams: VoloRequest | undefined;

  flights: VoloResponse[] = [];

  constructor(private flightService: VoliService) { }

  ngOnInit(): void {
    this.loadResults();
  }

  ngOnChanges(): void {
    this.loadResults();
  }

  private loadResults(): void {
    if (this.searchParams) {
      // Ottieni e filtra i voli dal servizio in base ai parametri di ricerca
      this.flightService.getFlightsFromRest(this.searchParams).subscribe(
        (data) => {
          console.log('Dati ricevuti:', data); // Stampa per verificare i dati
          this.flights = data; // Memorizza i dati ricevuti
        },
        (error) => {
          console.error('Errore durante il caricamento dei voli:', error);
        }
      );
    }
  }
}
