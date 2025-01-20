import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {PrenotaVoloComponent} from "./prenota-volo/prenota-volo.component";
import {RegistrazioneComponent} from "./registrazione/registrazione.component";
import {LeMiePrenotazioniComponent} from "./le-mie-prenotazioni/le-mie-prenotazioni.component";
import {CheckinBagaglioComponent} from "./checkin-bagaglio/checkin-bagaglio.component";
import {BigliettiAereiComponent} from "./biglietti-aerei/biglietti-aerei.component";
import {ProfiloComponent} from "./profilo/profilo.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'profilo', component: ProfiloComponent, canActivate: [AuthGuard] },
  { path: 'prenota-volo', component: PrenotaVoloComponent, canActivate: [AuthGuard] },
  { path: 'le-mie-prenotazioni', component: LeMiePrenotazioniComponent, canActivate: [AuthGuard]},
  { path: 'checkin-bagaglio', component: CheckinBagaglioComponent, canActivate: [AuthGuard]},
  { path: 'biglietti', component:BigliettiAereiComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
