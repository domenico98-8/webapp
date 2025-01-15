import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrenotazioneBagaglio, PrenotazioneRequest, PrenotazioneResponse} from "../modelli/Prenotazione";
import {Cliente} from "../modelli/Cliente";

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

  public checkin(prenotazione:PrenotazioneBagaglio[]){
    return this.http.post(`${this.apiUrl}/checkin`, prenotazione,{ responseType: 'text' });
  }


}
