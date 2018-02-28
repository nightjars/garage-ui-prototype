import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { GarageService } from '../garage.service';
import { FormsModule } from '@angular/forms';
import {SearchForm} from '../models/SearchForm';
import {AuthService} from "../auth.service";
import { Router } from "@angular/router";
import {VehicleAlert} from "../models/VehicleAlert";

@Component({
  selector: 'app-vehicle-alert-create',
  providers: [GarageService],
  templateUrl: 'vehicle-alert-create.html',
  styleUrls: ['../garage-view/vehicle-details.css']
})
export class VehicleAlertCreateComponent implements OnInit {
  model: VehicleAlert = new VehicleAlert();
  @Output() onAlertCreated = new EventEmitter();
  @Input() plate = null;
  plateReadOnly = false;
  constructor(private garageService: GarageService, public auth: AuthService) {}
  onAlertCreate() {
    this.garageService.createAlert(this.model)
      .subscribe(a => {
        console.log("alert create: " + a);
        this.onAlertCreated.emit();
        this.model = new VehicleAlert();
        this.ngOnInit();
      });
  }
  plateCap() {
    this.model.plate = this.model.plate.toUpperCase();
  }
  ngOnInit() {
    console.log(this.plate);
    console.log(this.plateReadOnly);
    if (this.plate != null) {
      this.plateReadOnly = true;
      this.model.plate = this.plate;
    }
  }
}
