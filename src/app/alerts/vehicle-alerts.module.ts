import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import {IMyDpOptions, IMyDateModel} from 'angular4-datepicker/src/my-date-picker/interfaces';
import { VehicleAlertListComponent } from "./vehicle-alert-list.component";
import {VehicleAlertCreateComponent} from "./vehicle-alert-create.component";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    MyDatePickerModule
  ],
  declarations: [
    VehicleAlertListComponent,
    VehicleAlertCreateComponent,
  ],
  exports: [VehicleAlertListComponent],
  providers: []
})
export class VehicleAlertsModule {}
