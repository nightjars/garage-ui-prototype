import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { SettingsComponent } from './settings.component';
import { PasswordChangeComponent } from './password-change.component';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    SettingsComponent,
    PasswordChangeComponent,
    UsersComponent
  ],
  exports: [],
  providers: []
})
export class SettingsModule {}