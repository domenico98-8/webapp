import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrenotazioneRequest} from "../modelli/Prenotazione";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:8080/api/prenotazioni';

  constructor(private http: HttpClient) { }

  bookFly(prenotazione: PrenotazioneRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/prenota`, prenotazione,{ responseType: 'text' });
  }


}
