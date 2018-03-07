import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';

import { GarageNavComponent } from './garage-nav.component';
import { GarageNavFilterPipe } from './garage-nav-filter.pipe';
import {VehicleDetailsComponent} from "./vehicle-details.component";
import {GarageSearchComponent} from "./garage-search.component";
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import {IMyDpOptions, IMyDateModel} from 'angular4-datepicker/src/my-date-picker/interfaces';
import {VehicleAlertsModule} from "../alerts/vehicle-alerts.module";
import {EventDetailsComponent} from "./event-details.component";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    MyDatePickerModule,
    VehicleAlertsModule
  ],
  declarations: [
    GarageNavComponent,
    VehicleDetailsComponent,
    GarageNavFilterPipe,
    GarageSearchComponent,
    EventDetailsComponent
  ],
  exports: [],
  providers: []
})
export class GarageViewModule {}
