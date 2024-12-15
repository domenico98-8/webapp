import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {VoloRequest, VoloResponse} from "../modelli/Volo";

@Injectable({
  providedIn: 'root'
})
export class VoliService {

  private apiUrl = 'http://localhost:8080/api/voli';

  constructor(private http: HttpClient) { }

  getFlightsFromRest(body: VoloRequest): Observable<VoloResponse[]> {
    const endpoint = 'cercaVoli';
    const fullUrl = `${this.apiUrl}/${endpoint}`;
    return this.http.post<any[]>(fullUrl, body);
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
