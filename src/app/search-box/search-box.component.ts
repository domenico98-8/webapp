import { Component } from '@angular/core';
import {VoloRequest} from "../modelli/Volo";

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  from: string = '';
  to: string = '';
  dateFrom: string = '';
  dateTo: string = '';

  isSearchSubmitted: boolean = false;
  searchParams: VoloRequest | undefined;

  constructor() {}

  onSubmit() {
    this.searchParams = {
      partenzaDa: this.from,
      destinazioneA: this.to,
      dataPartenza: this.dateFrom
    };

    this.isSearchSubmitted = true; // Attiva la visualizzazione dei risultati
  }
}
