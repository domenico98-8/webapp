import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isAuthenticated = false;
  title = 'wabapp';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    const token = this.authService.getToken();
    this.isAuthenticated = token !== null && token.trim().length > 0;
  }
}
