import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isAuthenticated = false;
  title = 'wabapp';

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    // Verifica con un semplice controllo su localStorage
    this.isAuthenticated = !!localStorage.getItem('authToken');
  }
}
