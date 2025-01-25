import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/cookie.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.services";
import {ClienteResponse} from "../modelli/Cliente";

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {
  utente: ClienteResponse|null = null;

  constructor(private authService: AuthService, private router: Router,private userService: UserService) {}

  ngOnInit(): void {
    const codiceUtente=this.authService.getUser();
    this.userService.getUserAccount(codiceUtente).subscribe(user => {
      this.utente = user;
    })
  }

  logout(): void {
    this.authService.isJwtValid().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/logout']);
      }
    }, err => {
      console.log(err);
    })
  }

  cambioPassword(): void {
  }
}
