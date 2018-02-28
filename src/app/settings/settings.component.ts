import {Component, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import {SettingsService} from "../settings.service";
import {CameraConfigComponent} from "./camera-config.component";
import {isNullOrUndefined} from "util";
import {EditUserComponent} from "./edit-user.component";

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.html',
  providers: [SettingsService]
})
export class SettingsComponent {
  changePasswordSelected = true;
  newUserCreateSelected = false;
  editUserSelected = false;
  editCamerasSelected = false;
  @ViewChild('camChild') private camChild: CameraConfigComponent;
  @ViewChild('editUserChild') private editUserChild: EditUserComponent;
  constructor(public auth: AuthService, private router: Router,
              private settingsService: SettingsService) {
  }
  onTabSelect(selection): void {
    this.changePasswordSelected = false;
    this.newUserCreateSelected = false;
    this.editUserSelected = false;
    this.editCamerasSelected = false;
    if (!isNullOrUndefined(this.camChild)) {
      this.camChild.reset();
    }
    if (!isNullOrUndefined(this.editUserChild)) {
      this.editUserChild.reset();
    }
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
      case 'editCameras':
        this.editCamerasSelected = true;
        break;
      default:
        alert('something went wrong');
    }
  }
}
