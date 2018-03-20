import {Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef, HostListener} from '@angular/core';
import { GarageService } from '../garage.service';
import { AuthService } from "../auth.service";
import { UpdateNote } from "../models/UpdateNote";
import { VehicleAlertsModule } from "../alerts/vehicle-alerts.module";
import { VehicleAlertListComponent } from "../alerts/vehicle-alert-list.component";

@Component({
  selector: 'app-event-photo-process',
  providers: [GarageService],
  templateUrl: 'event-photo-process.html',
  styleUrls: ['./vehicle-details.css']
})
export class EventPhotoProcessComponent implements OnInit {
  event;
  loading = true;
  @Input() event_id: string = null;
  @ViewChild('carImgCanvas') carCanvas: ElementRef;
  @ViewChild('carImg') carImage: ElementRef;
  @ViewChild('parentDiv') parentDiv: ElementRef;
  @HostListener('window:resize') onResize() {
    this.drawRect();
  }

  constructor(private garageService: GarageService, public auth: AuthService) { }
  ngOnInit() {
    this.event = this.garageService.getEvent(null, this.event_id)
      .subscribe( data => {
        this.event = data;
        this.loading = false;
        console.log(this.event);
      });
  }
  drawRect() {
    var clientWidth = this.parentDiv.nativeElement.clientWidth;
    var clientHeight = screen.height;
    var can = (<HTMLCanvasElement>this.carCanvas.nativeElement);
    var canContext = can.getContext('2d');
    var imgContext = (<HTMLImageElement>this.carImage.nativeElement);
    var readCoords = this.event.raw_data.results[0].coordinates;

    // max of half the vertical
    var drawImgRatio = Math.min(clientWidth / imgContext.width,
      (1 / 2) * clientHeight / imgContext.height, 1);
    can.width = imgContext.width * drawImgRatio;
    can.height = imgContext.height * drawImgRatio;
    canContext.drawImage(imgContext, 0, 0, imgContext.width, imgContext.height,
      0, 0, can.width, can.height);
    canContext.beginPath();
    canContext.moveTo(readCoords[0].x * drawImgRatio - 5, readCoords[0].y * drawImgRatio - 5);
    canContext.lineTo(readCoords[1].x * drawImgRatio + 5, readCoords[1].y * drawImgRatio - 5);
    canContext.lineTo(readCoords[2].x * drawImgRatio + 5, readCoords[2].y * drawImgRatio + 5);
    canContext.lineTo(readCoords[3].x * drawImgRatio - 5, readCoords[3].y * drawImgRatio + 5);
    canContext.lineTo(readCoords[0].x * drawImgRatio - 5, readCoords[0].y * drawImgRatio - 5);
    canContext.lineWidth = 2;
    canContext.strokeStyle = 'red';
    canContext.stroke();

    const proportion = .35;
    const bufferSpace = 10;
    var top = Math.min(readCoords[0].y, readCoords[1].y) - bufferSpace;
    var left = Math.min(readCoords[0].x, readCoords[3].x) - bufferSpace;
    var right = Math.max(readCoords[1].x, readCoords[2].x) + bufferSpace;
    var bottom = Math.max(readCoords[2].y, readCoords[3].y) + bufferSpace;
    var zoomWidth = right - left;
    var zoomHeight = bottom - top;
    canContext.drawImage(imgContext, left, top, zoomWidth, zoomHeight,
      can.width - can.width * proportion, 0, can.width * proportion, can.height * proportion);
  }
}
