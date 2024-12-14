import {Component, Input, OnInit} from '@angular/core';
import { VoliService } from '../services/voli.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultsComponent implements OnInit {

  @Input() searchParams: any;

  flights: any[] = [];

  constructor(private flightService: VoliService) { }

  ngOnInit(): void {
    this.loadResults();
  }

  ngOnChanges(): void {
    this.loadResults();
  }

  private loadResults(): void {
    this.flightService.getFlightsFromRest();
    if (this.searchParams) {
      // Ottieni e filtra i voli dal servizio in base ai parametri di ricerca
      this.flights = this.flightService.getFlights();
    }
  }
}
