import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchBoxComponent} from "./search-box/search-box.component";
import {SearchResultsComponent} from "./search-result/search-result.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
