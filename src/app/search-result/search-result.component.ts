import {Component, Input, OnInit} from '@angular/core';
import { VoliService } from '../services/voli.service';
import {VoloRequest, VoloResponse} from "../modelli/Volo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultsComponent implements OnInit {

  @Input() searchParams: VoloRequest | undefined;

  isLoading: boolean = true;

  flights: VoloResponse[] = [];

  constructor(private flightService: VoliService,private router:Router) { }

  ngOnInit(): void {
    this.loadResults();
  }

  ngOnChanges(): void {
    this.loadResults();
  }

  prenotaVolo(flight: VoloResponse) {
    this.router.navigate(['/prenota-volo'], {
      queryParams: {
        codiceVolo: flight.codiceVolo,
        origine: flight.partenzaDa,
        destinazione: flight.destinazioneA,
        orarioPartenza: flight.orarioPartenza,
        orarioArrivo: flight.orarioArrivo,
        prezzo: flight.prezzo,
      }
    });
  }

  private loadResults(): void {
    if (this.searchParams) {
      // Ottieni e filtra i voli dal servizio in base ai parametri di ricerca
      this.flightService.getFlightsFromRest(this.searchParams).subscribe(
        (data) => {
          console.log('Dati ricevuti:', data); // Stampa per verificare i dati
          this.flights = data; // Memorizza i dati ricevuti
          this.isLoading = false;
        },
        (error) => {
          console.error('Errore durante il caricamento dei voli:', error);
          this.isLoading = false;
        }
      );
    }
  }
}
