import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { PasswordChange } from '../models/PasswordChange';
import { HttpService } from '../HttpService';
import { SettingsService } from "../settings.service";

@Component({
  selector: 'app-settings-password-change',
  templateUrl: 'password-change.html'
})
export class PasswordChangeComponent {
  newPasswordForm: PasswordChange = new PasswordChange();
  passwordChangeMessage: string = '';
  changeDone: boolean = false;
  constructor(private auth: AuthService, private router: Router, private http: HttpService,
              private settingsService: SettingsService) {
  }
  onPasswordChange(): void {
    this.passwordChangeMessage = '';
    if (this.newPasswordForm.newPassword != this.newPasswordForm.newPasswordConfirm) {
      this.passwordChangeMessage = 'New password fields do not match.';
    } else {
      this.settingsService.changePassword(this.newPasswordForm)
        .subscribe(response => {
            console.log(response);
            var res_json = response.json();
            if (res_json.ok === true) {
              this.changeDone = true;
            } else {
              this.passwordChangeMessage = res_json.error;
              this.changeDone = false;
            }
          });
    }
  }
}
