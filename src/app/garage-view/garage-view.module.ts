import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';

import { GarageNavComponent } from './garage-nav.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    GarageNavComponent
  ],
  exports: [],
  providers: []
})
export class GarageViewModule {}
