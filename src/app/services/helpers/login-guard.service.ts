import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(
    private router: Router,
    private ls: LoginService
  ) {}

  canActivate() {
    const currentUser = this.ls.currentUserValue;
    if (currentUser) {
      // authorised so return true
      return true;
    }
    return  this.router.navigate(['login']);
  }
}
