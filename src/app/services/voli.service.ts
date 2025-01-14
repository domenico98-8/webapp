import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
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

}
