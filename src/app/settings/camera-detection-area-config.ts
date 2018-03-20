import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  imgWidth = 0;
  canvasContext = null;
  imgContext = null;
  canvasElement = null;
  imgRatio = 0;
  @Output() onCloseSettings = new EventEmitter();
  @ViewChild('imgCanvas') imgCanvas: ElementRef;
  @ViewChild('imgParentDiv') imgParentDiv: ElementRef;
  @ViewChild('camImg') camImg: ElementRef;
  @HostListener('window:resize') onResize() {
    this.initImg();
  }
  @HostListener('mousemove', ['$event']) onMouseMove(event) {
    if (this.firstSet) {
      this.canvasContext.drawImage(this.imgContext, 0, 0, this.imgContext.width,
        this.imgContext.height, 0, 0, this.canvasElement.width, this.canvasElement.height);
      this.canvasContext.beginPath();
      this.canvasContext.rect(this.x1 * this.imgRatio, this.y1 * this.imgRatio,
        event.offsetX - this.x1 * this.imgRatio, event.offsetY - this.y1 * this.imgRatio);
      this.canvasContext.lineWidth = 2;
      this.canvasContext.strokeStyle = 'red';
      this.canvasContext.stroke();
      this.canvasContext.closePath();
    }
  }
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
  public initImg() {
    this.imgWidth = this.imgParentDiv.nativeElement.clientWidth;
    this.canvasElement = (<HTMLCanvasElement>this.imgCanvas.nativeElement);
    this.canvasContext = this.canvasElement.getContext('2d');
    this.imgContext = (<HTMLImageElement>this.camImg.nativeElement);
    this.imgRatio = this.imgWidth / this.imgContext.width;
    this.canvasElement.width = this.imgWidth;
    this.canvasElement.height = this.imgContext.height * this.imgRatio;
    this.canvasContext.drawImage(this.imgContext, 0, 0, this.imgContext.width,
      this.imgContext.height, 0, 0, this.canvasElement.width, this.canvasElement.height);
  }
  public onImageClick(event) {
    if (!this.firstSet) {
      this.x1 = Math.round(event.offsetX * (1 / this.imgRatio));
      this.y1 = Math.round(event.offsetY * (1 / this.imgRatio));
      this.firstSet = true;
    } else {
      this.x2 = Math.round(event.offsetX * (1 / this.imgRatio));
      this.y2 = Math.round(event.offsetY * (1 / this.imgRatio));
      this.doneSet = true;
      this.sample_address="http://garageapiserv:5000/api/camera/get/sample_motion_image?x1="+this.x1+"&x2="+this.x2+
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
