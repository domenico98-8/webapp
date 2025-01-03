import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {PrenotaVoloComponent} from "./prenota-volo/prenota-volo.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'prenota-volo', component: PrenotaVoloComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
