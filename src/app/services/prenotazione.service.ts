import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrenotazioneRequest, PrenotazioneResponse} from "../modelli/Prenotazione";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:8080/api/prenotazioni';

  constructor(private http: HttpClient) { }

  public bookFly(prenotazione: PrenotazioneRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/prenota`, prenotazione,{ responseType: 'text' });
  }

  public getMyBook(idUtente: number): Observable<PrenotazioneResponse[]> {
    return this.http.get<PrenotazioneResponse[]>(`${this.apiUrl}/le-mie-prenotazioni/${idUtente}`);
  }


}
