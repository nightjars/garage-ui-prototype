import {Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { GarageService } from '../garage.service';
import { AuthService } from "../auth.service";
import { UpdateNote } from "../models/UpdateNote";
import { VehicleAlertsModule } from "../alerts/vehicle-alerts.module";
import { VehicleAlertListComponent } from "../alerts/vehicle-alert-list.component";

@Component({
  selector: 'app-event-details',
  providers: [GarageService],
  templateUrl: 'event-details.html',
  styleUrls: ['./vehicle-details.css']
})
export class EventDetailsComponent implements OnInit {
  event;
  loading = true;
  @Input() event_id: string = null;
  changePlate: string = null;
  @Output() onClose = new EventEmitter();
  @ViewChild('carImgCanvas') carCanvas: ElementRef;
  @ViewChild('carImg') carImage: ElementRef;

  constructor(private garageService: GarageService, public auth: AuthService) { }
  ngOnInit() {
    this.event = this.garageService.getEvent(this.event_id)
      .subscribe( data => {
        this.event = data;
        this.loading = false;
        console.log(this.event);
      });
  }
  onChangePlate() {
  }
  drawRect() {
    var drawImgWidth = window.screen.width * .65;
    var can = (<HTMLCanvasElement>this.carCanvas.nativeElement);
    var canContext = can.getContext('2d');
    var imgContext = (<HTMLImageElement>this.carImage.nativeElement);
    var readCoords = this.event.raw_data.results[0].coordinates;

    var drawImgRatio = drawImgWidth / imgContext.width;
    can.width = drawImgWidth;
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
  }
}
