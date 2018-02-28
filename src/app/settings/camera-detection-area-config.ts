import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Camera } from '../models/Camera';
import { HttpService } from '../HttpService';
import { SettingsService } from "../settings.service";

@Component({
  selector: 'app-camera-detection-area-config',
  templateUrl: 'camera-detection-area-config.html',
  styleUrls: ['../garage-view/vehicle-details.css']
})
export class CameraDetectionAreaConfig implements OnInit {
  @Input() camera: Camera;
  doneSet = false;
  firstSet = false;
  x1 = 0;
  x2 = 0;
  y1 = 0;
  y2 = 0;
  sample_address = "";
  @Output() onCloseSettings = new EventEmitter();
  constructor(private auth: AuthService, private router: Router,
              private settingService: SettingsService) {
  }
  public ngOnInit() {
    this.doneSet = false;
    this.firstSet = false;
    this.x1 = 0;
    this.x2 = 0;
    this.y1 = 0;
    this.y2 = 0;
  }
  public onImageClick(event){
    var scale = event.srcElement.naturalWidth / 600;  // 600 refers to static pixel defined width in html
    if (!this.firstSet){
      this.x1 = Math.round(event.offsetX * scale);
      this.y1 = Math.round(event.offsetY * scale);
      this.firstSet = true;
    } else {
      this.x2 = Math.round(event.offsetX * scale);
      this.y2 = Math.round(event.offsetY * scale);
      this.doneSet = true;
      this.sample_address="http://192.168.1.99:5000/api/camera/get/sample_motion_image?x1="+this.x1+"&x2="+this.x2+
        "&y1="+this.y1+"&y2="+this.y2+"&id="+this.camera.id;
    }
  }
  public cancelCoordinates() {
    this.onCloseSettings.emit();
  }
  public resetCoordinates() {
    this.ngOnInit();
  }
  public sendCoordinates() {

    this.settingService.setDetectionArea(this.x1, this.y1, this.x2, this.y2, this.camera.id)
      .subscribe(res =>{
        console.log(res);
      });
    this.onCloseSettings.emit();
  }
}
