export class VoloResponse {
  id!: number;
  codiceVolo!: string;
  partenzaDa!: string;
  destinazioneA!: string;
  dataPartenza!: string;
  orarioPartenza!: string;
  dataArrivo!: string;
  orarioArrivo!: string;
  prezzo!: number;
  durataVolo!:string;

  constructor() {
  }
}

export class VoloRequest {
  partenzaDa!: string;
  destinazioneA!: string;
  dataPartenza!: string;

  constructor() {
  }
}
