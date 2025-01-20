import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrenotazioneBagaglio, PrenotazioneRequest, PrenotazioneResponse} from "../modelli/Prenotazione";
import {Cliente} from "../modelli/Cliente";
import {BigliettoResponse} from "../modelli/Biglietto";

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

  public getClienti(idPrenotazione: any): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}/getClientiFromPrenotazione/${idPrenotazione}`);
  }

  public checkin(prenotazione:PrenotazioneBagaglio[],idPrenotazione:string|undefined){
    return this.http.post(`${this.apiUrl}/checkin/${idPrenotazione}`, prenotazione,{ responseType: 'text' });
  }

  public cancellaPrenotazione(codicePrenotazione: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cancellaPrenotazione/${codicePrenotazione}`);
  }

  public getBiglietti(codicePrenotazione:string|undefined): Observable<BigliettoResponse[]> {
    return this.http.get<BigliettoResponse[]>(`${this.apiUrl}/getBiglietti/${codicePrenotazione}`);
  }


}
