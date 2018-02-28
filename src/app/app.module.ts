import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GarageViewModule } from './garage-view/garage-view.module';
import { LoginModule } from './login/login.module';
import { routing } from './app.routing';
import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth_guard';
import { HttpService } from './HttpService';
import { SettingsModule } from './settings/settings.module';
import { VehicleAlertsModule } from "./alerts/vehicle-alerts.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    GarageViewModule,
    HttpModule,
    LoginModule,
    FormsModule,
    SettingsModule,
    routing,
    VehicleAlertsModule
  ],
  providers: [AuthService, AuthGuard, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
