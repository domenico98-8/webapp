import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bagaglio} from "../modelli/Bagaglio";

@Injectable({
  providedIn: 'root'
})
export class BagaglioService {

  private apiUrl = 'https://localhost:8443/api/bagaglio';

  constructor(private http: HttpClient) { }

  getAllBagagli(): Observable<Bagaglio[]> {
    return this.http.get<Bagaglio[]>(this.apiUrl+'/getAllBagagli');
  }

}
