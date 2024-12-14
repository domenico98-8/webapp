import { Component } from '@angular/core';

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
  searchParams: any = {};

  constructor() {}

  onSubmit() {
    this.searchParams = {
      from: this.from,
      to: this.to,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo
    };

    this.isSearchSubmitted = true; // Attiva la visualizzazione dei risultati
  }
}
