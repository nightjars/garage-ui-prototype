import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';

import { GarageNavComponent } from './garage-nav.component';
import { GarageNavFilterPipe } from './garage-nav-filter.pipe';
import {VehicleDetailsComponent} from "./vehicle-details.component";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    GarageNavComponent,
    VehicleDetailsComponent,
    GarageNavFilterPipe
  ],
  exports: [],
  providers: []
})
export class GarageViewModule {}
