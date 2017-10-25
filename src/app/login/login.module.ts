import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [],
  providers: []
})
export class LoginModule {}
