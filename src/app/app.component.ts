import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck{
  private isAuthenticated = false;

  constructor(private authService: AuthService,private loginService: LoginService) {
  }

  ngOnInit(): void {
    if(!this.isAuthenticated) {
      this.loginService.getAuthenticate().subscribe((auth) => {
        this.isAuthenticated = auth;
      })
    }
  }

  checkAuthentication(): void {
    const token = this.authService.getToken();
    this.isAuthenticated = token !== null && token.trim().length > 0;
  }

  ngDoCheck(): void {
    this.checkAuthentication();
  }

  getIsAuthenticated(){
    return this.isAuthenticated;
  }
}
