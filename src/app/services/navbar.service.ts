import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private navbarVisibilitySubject = new Subject<boolean>();
  navbarVisibility$ = this.navbarVisibilitySubject.asObservable();

  setNavbarVisible(visible: boolean): void {
    this.navbarVisibilitySubject.next(visible);
  }

}
