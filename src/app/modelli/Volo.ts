export interface VoloResponse {
  id: number;
  codiceVolo: string;
  partenzaDa: string;
  destinazioneA: string;
  dataPartenza: string;
  orarioPartenza: string;
  dataArrivo: string;
  orarioArrivo: string;
  prezzo: number;
  durataVolo:string;
}

export interface VoloRequest {
  partenzaDa: string;
  destinazioneA: string;
  dataPartenza: string;
}
