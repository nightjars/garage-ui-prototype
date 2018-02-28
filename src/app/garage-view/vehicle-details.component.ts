import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { GarageService } from '../garage.service';
import { AuthService } from "../auth.service";
import { UpdateNote } from "../models/UpdateNote";
import { VehicleAlertsModule } from "../alerts/vehicle-alerts.module";
import { VehicleAlertListComponent } from "../alerts/vehicle-alert-list.component";

@Component({
  selector: 'app-vehicle-details',
  providers: [GarageService],
  templateUrl: 'vehicle-details.html',
  styleUrls: ['./vehicle-details.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle;
  loading = true;
  displayImage = [0];
  @Input() vehicle_id: string = null;
  updateNote = new UpdateNote();
  @Output() onCloseDetails = new EventEmitter();

  constructor(private garageService: GarageService, public auth: AuthService) { }
  ngOnInit() {
    this.vehicle = this.garageService.getCarDetails(this.vehicle_id)
      .subscribe( data => {
        this.vehicle = data;
        this.loading = false;
        this.updateNote.id = this.vehicle.id;
        this.updateNote.note = this.vehicle.note;
    });
  }
  addToDisplayList(idx) {
    this.displayImage.push(idx);
  }
  removeFromDisplayList(idx) {
    var array_idx = this.displayImage.indexOf(idx);
    this.displayImage.splice(array_idx, 1);
  }
  onUpdateNote() {
    this.garageService.updateNote(this.updateNote)
      .subscribe( data => {
        // do nothing
      });
    this.onCloseDetails.emit();
  }
}
