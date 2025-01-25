import {Component, OnInit} from '@angular/core';
import {PrenotazioneResponse} from "../modelli/Prenotazione";
import {BookService} from "../services/prenotazione.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/cookie.service";

@Component({
  selector: 'app-le-mie-prenotazioni',
  templateUrl: './le-mie-prenotazioni.component.html',
  styleUrls: ['./le-mie-prenotazioni.component.css']
})
export class LeMiePrenotazioniComponent implements OnInit {

  prenotazioni:PrenotazioneResponse[] = [];

  constructor(private bookService:BookService,private authService:AuthService, private router:Router,private prenotazioneService:BookService) { }

  ngOnInit(): void {
      this.authService.getUser().subscribe(
      (data) => {
        const user = data;
        this.bookService.getMyBook(+user).subscribe((prenotazioni:PrenotazioneResponse[]) => {
            this.prenotazioni=prenotazioni;
          },
          (error) => {
            console.log(error);
          })
      },
      (error) => {
        console.error(error);
      }
    );;

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
      this.ngOnInit();
    });
  }

  apriInfo(codicePrenotazione: string): void {
    this.router.navigate(['/biglietti'], {
      queryParams: {
        codicePrenotazione: codicePrenotazione
      }
    })
  }
}
