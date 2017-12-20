import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/User';
import { HttpService } from '../HttpService';

@Component({
  selector: 'app-settings-new-user',
  templateUrl: 'new-user.html'
})
export class NewUserComponent {
  newUserMessage: string;
  userCreateDone: boolean = false;
  newUser: User;
  constructor(private auth: AuthService, private router: Router) {
  }
  onUserCreate() {
  }
}
