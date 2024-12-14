import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VoliService {

  private apiUrl = 'https://localhost::8080/api/voli';

  constructor(private http: HttpClient) { }

  getFlightsFromRest(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Metodo per ottenere i dati dei voli (esempio statico)
  getFlights() {
    return [
      {
        airline: 'Alitalia',
        departure: 'Roma (Fiumicino) - 10:00',
        arrival: 'Milano (Malpensa) - 11:30',
        duration: '1h 30m',
        price: '€150'
      },
      {
        airline: 'EasyJet',
        departure: 'Roma (Fiumicino) - 14:00',
        arrival: 'Milano (Linate) - 15:30',
        duration: '1h 30m',
        price: '€120'
      },
      {
        airline: 'Ryanair',
        departure: 'Napoli (Capodichino) - 09:00',
        arrival: 'Bari (Karol Wojtyła) - 10:00',
        duration: '1h 0m',
        price: '€80'
      }
    ];
  }
}
