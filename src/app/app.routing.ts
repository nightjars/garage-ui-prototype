import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GarageNavComponent } from './garage-view/garage-nav.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth_guard';
import {GarageSearchComponent} from "./garage-view/garage-search.component";
import { AppComponent } from './app.component';
import {SettingsComponent} from "./settings/settings.component";
import {VehicleAlertListComponent} from "./alerts/vehicle-alert-list.component";

export const routing = RouterModule.forRoot([
  {path: '', component: GarageNavComponent, canActivate: [AuthGuard] },
  {path: 'GarageView', component: GarageNavComponent, canActivate: [AuthGuard] },
  {path: 'GarageSearch', component: GarageSearchComponent, canActivate: [AuthGuard] },
  {path: 'Login', component: LoginComponent},
  {path: 'Settings', component: SettingsComponent, canActivate: [AuthGuard] },
  {path: 'VehicleAlerts', component: VehicleAlertListComponent, canActivate: [AuthGuard]}
]);
