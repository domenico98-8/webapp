import {UtenteRequest} from "./Utente";
import {PostoResponse} from "./Posto";
import {Bagaglio} from "./Bagaglio";
import {Cliente} from "./Cliente";

export class PrenotazioneRequest{
  passeggeri!:UtenteRequest[];
  posti!:PostoResponse[];
  costo!:number;
  volo!:string;
  idUtente!:number;

  constructor() {
  }

}

export interface PrenotazioneBagaglio {
  cliente: Cliente;
  bagaglio: Bagaglio|null;
}

export class PrenotazioneResponse{
  codicePrenotazione!:string;
  origine!:string;
  destinazione!:string;
  orario!:string;
  numero_passeggeri!:string;
  checkin!:boolean;

  constructor() {
  }
}
