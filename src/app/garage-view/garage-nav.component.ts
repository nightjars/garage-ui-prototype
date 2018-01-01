import {Component, OnDestroy, OnInit} from '@angular/core';
import { GarageService } from '../garage.service';
import { GarageNavFilterPipe } from './garage-nav-filter.pipe';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Subscription } from "rxjs/Subscription";
import { VehicleDetailsComponent } from "./vehicle-details.component"

@Component({
  selector: 'app-garage-nav',
  providers: [GarageService],
  templateUrl: 'garage-nav.html',
})
export class GarageNavComponent implements OnInit, OnDestroy {
  garageService;
  vehicleList;
  details;
  loading = true;
  auto_poll = new Subscription();

  constructor(garageService: GarageService, public auth: AuthService, private router: Router) {
    this.garageService = garageService;
    this.details = null;
    this.fetchData();
    this.auto_poll = Observable.timer(2000)
      .subscribe(() => this.fetchData());
  }
  public ngOnInit() {
    this.refresh_subscribe();
  }
  public ngOnDestroy(): void {
    this.auto_poll.unsubscribe();
  }
  public refresh_subscribe():void {
    let timer = Observable.interval(5000);
    this.auto_poll = timer.subscribe( t => {
      this.fetchData();
    });
  }
  private fetchData() {
    this.garageService.getVehicleList()
      .subscribe(data => {
        console.log(data);
        if (data != null) {
          this.loading = false;
          this.vehicleList = data.vehicles;
        } else {
          console.log('No data returned, check auth.');
          if (!this.auth.isLoggedIn()) {
            console.log('No data returned, redirect.');
            this.router.navigateByUrl('/Login');
          }
        }
      });
  }
  public setDetails(vehicle) {
    if (vehicle != null) {
      this.details = vehicle.id;
    } else {
      this.details = null;
    }
  }
  public deleteVehicle(vehicle) {
    this.garageService.deleteCar(vehicle)
      .subscribe(data => {
        this.fetchData();
      });
  }
}
