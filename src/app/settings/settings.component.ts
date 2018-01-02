import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { PasswordChange } from '../models/PasswordChange';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.html'
})
export class SettingsComponent {
  changePasswordSelected = true;
  newUserCreateSelected = false;
  editUserSelected = false;
  constructor(public auth: AuthService, private router: Router) {
  }
  onTabSelect(selection): void {
    this.changePasswordSelected = false;
    this.newUserCreateSelected = false;
    this.editUserSelected = false;
    switch (selection) {
      case 'changePassword':
        this.changePasswordSelected = true;
        break;
      case 'newUser':
        this.newUserCreateSelected = true;
        break;
      case 'systemSettings':
        this.editUserSelected = true;
        break;
      default:
        alert('something went wrong');
    }
  }
}
