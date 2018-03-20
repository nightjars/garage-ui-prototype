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
    this.loading = true;
    this.event = this.garageService.getEvent(null, this.event_id)
      .subscribe( data => {
        this.event = data;
        this.changePlate = this.event.plate;
        this.loading = false;
      });
  }
  onChangePlate() {
    if (this.changePlate != this.event.plate) {
      this.garageService.changePlate(this.event_id, this.changePlate.toUpperCase())
        .subscribe(data => {
          this.onClose.emit();
        });
    }
  }
}
