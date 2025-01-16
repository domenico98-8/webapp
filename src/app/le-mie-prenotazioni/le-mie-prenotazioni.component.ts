import {Component, OnInit} from '@angular/core';
import {PrenotazioneResponse} from "../modelli/Prenotazione";
import {BookService} from "../services/prenotazione.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-le-mie-prenotazioni',
  templateUrl: './le-mie-prenotazioni.component.html',
  styleUrls: ['./le-mie-prenotazioni.component.css']
})
export class LeMiePrenotazioniComponent implements OnInit {

  prenotazioni:PrenotazioneResponse[] = [];

  constructor(private bookService:BookService,private authService:AuthService, private router:Router,private prenotazioneService:BookService) { }

  ngOnInit(): void {
    this.bookService.getMyBook(this.authService.getUser()).subscribe((prenotazioni:PrenotazioneResponse[]) => {
      this.prenotazioni=prenotazioni;
    },
      (error) => {
        console.log(error);
      })
  }

  checkIn(codicePrenotazione: string): void {
    this.router.navigate(['/checkin-bagaglio'], {
      queryParams: {
        codicePrenotazione: codicePrenotazione
      }
    });
  }

  cancellaPrenotazione(codicePrenotazione:string): void {
    this.prenotazioneService.cancellaPrenotazione(codicePrenotazione).subscribe(remove=>{
      alert("Penotazione Cancellata");
      window.location.reload();
    });
  }

  apriInfo(codicePrenotazione: string): void {
    alert(`Informazioni del biglietto per: ${codicePrenotazione}`);
  }
}
