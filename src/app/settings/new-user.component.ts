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
  private URL: string = 'http://192.168.1.99:5000/api/user/create_user';
  newUserMessage: string;
  userCreateDone: boolean = false;
  newUser: User = new User();
  constructor(private auth: AuthService, private router: Router, private http: HttpService) {
  }
  onUserCreate() {
    this.newUserMessage = '';
    this.http.post(this.URL, this.newUser)
      .map(res => res.json())
      .subscribe(response => {
        console.log('user creation request sent');
        console.log(this.newUser);
      });
  }
}
