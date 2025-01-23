import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PostoResponse} from "../modelli/Posto";

@Injectable({
  providedIn: 'root'
})
export class PostiServices {

  private apiUrl = 'https://localhost:8443/api/posti';

  constructor(private http: HttpClient) { }

  getSeatsFromFlyCode(flyCode: string): Observable<any[]> {
    const endpoint = `findByCodiceVolo/${flyCode}`;
    const fullUrl = `${this.apiUrl}/${endpoint}`;
    return this.http.get<any[]>(fullUrl);
  }

}
