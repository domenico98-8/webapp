import {UtenteRequest} from "./Utente";
import {PostoResponse} from "./Posto";
import {Bagaglio} from "./Bagaglio";

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
  idCliente: number;
  idPrenotazione: number;
  bagaglioSelezionato: Bagaglio | null;
}

export class PrenotazioneResponse{
  codicePrenotazione!:string;
  origine!:string;
  destinazione!:string;
  orario!:string;
  numero_passeggeri!:string;

  constructor() {
  }
}
