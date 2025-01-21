export class Cliente {
  id!: number;
  nome!: string;
  cognome!:string;

  constructor() {
  }
}

export class ClienteResponse {
  id!: number;
  nome!: string;
  cognome!:string;
  dataNascita!:string;
  documento!:string;
  sesso!:string;
  idUtente!: number;

  constructor() {
  }
}
