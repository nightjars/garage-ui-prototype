import { Component, Input, OnInit } from '@angular/core';
import { GarageService } from '../garage.service';
import { FormsModule } from '@angular/forms';
import {SearchForm} from '../models/SearchForm';
import {AuthService} from "../auth.service";
import { Router } from "@angular/router";
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import {IMyDpOptions, IMyDateModel} from 'angular4-datepicker/src/my-date-picker/interfaces';
import {VehicleAlert} from "../models/VehicleAlert";

@Component({
  selector: 'app-vehicle-alert-list',
  providers: [GarageService],
  templateUrl: 'vehicle-alert-list.html',
  styleUrls: ['../garage-view/vehicle-details.css']
})
export class VehicleAlertListComponent implements OnInit {
  alertList = null;
  @Input() plate: string;
  constructor(private garageService: GarageService, public auth: AuthService,
              private router: Router) {
  }
  public ngOnInit() {
    this.garageService.getAlerts(this.plate)
      .subscribe(data => {
        if (data != null) {
          this.alertList = data;
        } else {
          if (!this.auth.isLoggedIn()) {
            console.log('No data returned, redirect.');
            this.router.navigateByUrl('/Login');
          }
        }
      });
  }
  public deleteAlert(alert: VehicleAlert) {
    this.garageService.deleteAlert(alert)
      .subscribe( data => {
        console.log(data);
        this.ngOnInit();
      });
  }
}
