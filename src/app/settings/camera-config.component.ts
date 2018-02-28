import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Camera } from '../models/Camera';
import { HttpService } from '../HttpService';
import { SettingsService } from "../settings.service";
import { CameraDetectionAreaConfig } from "./camera-detection-area-config";

@Component({
  selector: 'app-settings-camera-config',
  templateUrl: 'camera-config.html',
  styleUrls: ['../garage-view/vehicle-details.css']
})
export class CameraConfigComponent implements OnInit {
  newUserMessage: string;
  cameraList = null;
  newCamera: Camera = new Camera();
  selectedCamera: Camera = null;
  detectionAreaConfig: boolean = false;
  constructor(private auth: AuthService, private router: Router,
              private settingService: SettingsService) {
  }
  public ngOnInit() {
    this.newUserMessage = '';
    this.selectedCamera = null;
    this.detectionAreaConfig = false;
    this.settingService.getCameeras()
      .subscribe(data => {
        if (data != null) {
          this.cameraList = data;
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
  public editCamera(camera: Camera, newCam = false) {
    console.log(camera);
    this.selectedCamera = camera;
    if (newCam){
      this.selectedCamera = new Camera();
    }
  }
  public onCameraEdit() {
    this.settingService.saveCamera(this.selectedCamera)
      .subscribe( data => {
        this.selectedCamera = null;
        this.ngOnInit();
      });
  }
  public onDelete() {
    this.settingService.deleteUser(this.selectedCamera)
      .subscribe(response => {
        this.selectedCamera = null;
        this.ngOnInit();
      });
  }
  public onCancel() {
    this.selectedCamera = null;
    this.ngOnInit();
  }
  public onDetectionAreaConfig() {
    this.detectionAreaConfig = !this.detectionAreaConfig;
  }
}
