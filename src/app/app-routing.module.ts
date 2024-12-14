import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchBoxComponent} from "./search-box/search-box.component";
import {SearchResultsComponent} from "./search-result/search-result.component";
import {HomePageComponent} from "./home-page/home-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'home-page', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
