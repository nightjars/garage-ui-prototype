import { Component, Input, OnInit } from '@angular/core';
import { GarageService } from '../garage.service';
import { FormsModule } from '@angular/forms';
import {SearchForm} from '../models/SearchForm';
import {AuthService} from "../auth.service";
import { Router } from "@angular/router";
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import {IMyDpOptions, IMyDateModel} from 'angular4-datepicker/src/my-date-picker/interfaces';

@Component({
  selector: 'app-garage-search',
  providers: [GarageService],
  templateUrl: 'garage-search.html',
  styleUrls: ['./vehicle-details.css']
})
export class GarageSearchComponent {
  searchModel: SearchForm = new SearchForm();
  searchResults: Array<Object> = null;
  start_date_picker: any = null;
  end_date_picker: any = null;
  details = null;
  constructor(private garageService: GarageService, private auth: AuthService,
              private router: Router) {
  }
  onSearch() {
    this.searchResults = null;
    if (this.start_date_picker != null) {
      this.searchModel.start_date = this.start_date_picker.formatted;
    }
    if (this.end_date_picker != null) {
      this.searchModel.end_date = this.end_date_picker.formatted;
    }
    this.garageService.searchEvents(this.searchModel)
      .subscribe(data => {
        this.searchResults = data['results'];
        if (!this.auth.isLoggedIn()) {
          console.log('No data returned, redirect.');
          this.router.navigateByUrl('/Login');
        }
      });
  }
  public setDetails(vehicle) {
    console.log(vehicle);
    if (vehicle != null) {
      this.details = vehicle.id;
    } else {
      this.details = null;
    }
  }
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'mm.dd.yyyy',
  };
}
