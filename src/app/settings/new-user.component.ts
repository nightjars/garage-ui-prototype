import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/User';
import { HttpService } from '../HttpService';
import { SettingsService } from "../settings.service";

@Component({
  selector: 'app-settings-new-user',
  templateUrl: 'new-user.html'
})
export class NewUserComponent {
  newUserMessage: string;
  userCreateDone: boolean = false;
  newUser: User = new User();
  constructor(private auth: AuthService, private router: Router, private http: HttpService,
              private settingsService: SettingsService) {
  }
  onUserCreate() {
    this.newUserMessage = '';
    this.settingsService.createUser(this.newUser)
      .subscribe(response => {
        let json_res = response.json();
        if (json_res.ok === true) {
          this.userCreateDone = true;
        } else {
          this.newUserMessage = 'Error creating user.  ' + json_res.error;
          this.userCreateDone = false;
        }
        console.log('user creation request sent');
        console.log(this.newUser);
        console.log(response);
      });
  }
}
