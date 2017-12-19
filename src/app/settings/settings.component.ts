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
  userSettingsSelected = false;
  systemSettingsSelected = false;
  constructor(private auth: AuthService, private router: Router) {
  }
  onTabSelect(selection): void {
    this.changePasswordSelected = false;
    this.userSettingsSelected = false;
    this.systemSettingsSelected = false;
    switch (selection) {
      case 'changePassword':
        this.changePasswordSelected = true;
        break;
      case 'userSettings':
        this.userSettingsSelected = true;
        break;
      case 'systemSettings':
        this.systemSettingsSelected = true;
        break;
      default:
        alert('something went wrong');
    }
  }
}
