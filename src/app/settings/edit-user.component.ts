import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/User';
import { HttpService } from '../HttpService';
import { SettingsService } from "../settings.service";

@Component({
  selector: 'app-settings-edit-user',
  templateUrl: 'edit-user.html'
})
export class EditUserComponent implements OnInit {
  newUserMessage: string;
  userList: null;
  newUser: User = new User();
  selectedUser = null;
  constructor(private auth: AuthService, private router: Router, private http: HttpService,
              private settingService: SettingsService) {
  }
  public ngOnInit() {
    this.newUserMessage = '';
    this.selectedUser = null;
    this.settingService.getUserList()
      .subscribe(data => {
        if (data != null) {
          this.userList = data;
        } else {
          if (!this.auth.isLoggedIn()) {
            console.log('No data returned, redirect.');
            this.router.navigateByUrl('/Login');
          }
        }
      });
  }
  public reset() {
    this.ngOnInit();
  }
  public editUser(user: User) {
    this.selectedUser = user;
  }
  public onUserEdit() {
    this.settingService.modifyUser(this.selectedUser)
      .subscribe( data => {
        this.selectedUser = null;
        this.ngOnInit();
      });
  }
  public onDelete() {
    this.settingService.deleteUser(this.selectedUser)
      .subscribe(response => {
        this.selectedUser = null;
        this.ngOnInit();
      });
  }
  public onCancel() {
    this.selectedUser = null;
    this.ngOnInit();
  }
}
