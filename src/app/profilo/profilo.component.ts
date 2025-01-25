import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/cookie.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.services";
import {ClienteResponse} from "../modelli/Cliente";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {
  utente: ClienteResponse|null = null;

  constructor(private authService: AuthService,private userService: UserService,private loginService: LoginService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (data) => {
        this.userService.getUserAccount(data).subscribe((user) => {
          this.utente = user;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  logout(): void {
    this.loginService.logout();
  }

  cambioPassword(): void {
  }
}
