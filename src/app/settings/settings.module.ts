import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { SettingsComponent } from './settings.component';
import { PasswordChangeComponent } from './password-change.component';
import { NewUserComponent } from './new-user.component';
import { EditUserComponent } from './edit-user.component';
import { CameraConfigComponent } from "./camera-config.component";
import {CameraDetectionAreaConfig} from "./camera-detection-area-config";
import { LiveCameraComponent } from "./live-camera.component";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    SettingsComponent,
    PasswordChangeComponent,
    NewUserComponent,
    EditUserComponent,
    CameraConfigComponent,
    CameraDetectionAreaConfig,
    LiveCameraComponent
  ],
  exports: [],
  providers: []
})
export class SettingsModule {}
