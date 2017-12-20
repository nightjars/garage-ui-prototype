import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { PasswordChange } from '../models/PasswordChange';
import { HttpService } from '../HttpService'

@Component({
  selector: 'app-settings-password-change',
  templateUrl: 'password-change.html'
})
export class PasswordChangeComponent {
  private CHANGE_URL: string = 'http://192.168.1.99:5000/api/user/change_password';
  newPasswordForm: PasswordChange = new PasswordChange();
  passwordChangeMessage: string = '';
  changeDone: boolean = false;
  constructor(private auth: AuthService, private router: Router, private http: HttpService) {
  }
  onPasswordChange(): void {
    this.passwordChangeMessage = '';
    if (this.newPasswordForm.newPassword != this.newPasswordForm.newPasswordConfirm) {
      this.passwordChangeMessage = 'New password fields do not match.';
    } else {
      this.http.post(this.CHANGE_URL, this.newPasswordForm)
        .map(res => res.json())
        .subscribe(response => {
            console.log(response)
            if (response.ok == true) {
              this.changeDone = true;
            } else {
              this.passwordChangeMessage = 'Current password entered incorrectly.';
              this.changeDone = false;
            }
          });
    }
  }
}
