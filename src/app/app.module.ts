import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { PopularDestinationsComponent } from './popular-destinations/popular-destinations.component';
import {SearchResultsComponent} from "./search-result/search-result.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomePageComponent} from "./home-page/home-page.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {AuthInterceptor} from "./auth.interceptor";
import { PrenotaVoloComponent } from './prenota-volo/prenota-volo.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    SearchBoxComponent,
    PopularDestinationsComponent,
    SearchResultsComponent,
    HomePageComponent,
    LoginComponent,
    PrenotaVoloComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
