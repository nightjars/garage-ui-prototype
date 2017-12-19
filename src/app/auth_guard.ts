import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginModule } from './login/login.module';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    this.router.navigate(['/Login']);
    return false;
  }
}
