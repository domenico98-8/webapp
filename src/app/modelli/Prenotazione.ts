import {UtenteRequest} from "./Utente";
import {PostoResponse} from "./Posto";

export class PrenotazioneRequest{
  passeggeri!:UtenteRequest[];
  posti!:PostoResponse[];
  costo!:number;
  volo!:string;

  constructor() {
  }

}
