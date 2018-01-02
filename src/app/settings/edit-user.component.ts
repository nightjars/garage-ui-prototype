import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/User';
import { HttpService } from '../HttpService';

@Component({
  selector: 'app-settings-edit-user',
  templateUrl: 'edit-user.html'
})
export class EditUserComponent implements OnInit {
  private getURL: string = 'http://192.168.1.99:5000/api/user/users';
  private postURL: string = 'http://192.168.1.99:5000/api/user/modify_user';
  private deleteURL: string = 'http://192.168.1.99:5000/api/user/delete_user';
  newUserMessage: string;
  userList: null;
  newUser: User = new User();
  selectedUser = null;
  constructor(private auth: AuthService, private router: Router, private http: HttpService) {
  }
  public ngOnInit() {
    this.newUserMessage = '';
    this.http.get(this.getURL)
      .map(res => res)
      .subscribe(response => {
        this.userList = response;
        console.log(response);
      });
  }
  public editUser(user: User) {
    this.selectedUser = user;
    console.log(user);
  }
  public onUserEdit() {
    this.http.post(this.postURL, this.selectedUser)
      .map(res => res.json())
      .subscribe(response => {
        console.log(response);
        this.selectedUser = null;
        this.ngOnInit();
      });
  }
  public onDelete() {
    this.http.post(this.deleteURL, this.selectedUser)
      .map(res => res.json())
      .subscribe(response => {
        console.log(response);
        this.selectedUser = null;
        this.ngOnInit();
      });
  }
  public onCancel() {
    this.selectedUser = null;
    this.ngOnInit();
  }
}
