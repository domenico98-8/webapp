import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { PopularDestinationsComponent } from './popular-destinations/popular-destinations.component';
import {SearchResultsComponent} from "./search-result/search-result.component";
import {FormsModule} from "@angular/forms";
import {HomePageComponent} from "./home-page/home-page.component";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    SearchBoxComponent,
    PopularDestinationsComponent,
    SearchResultsComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
