import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GarageNavComponent } from './garage-view/garage-nav.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth_guard';
import { AppComponent } from './app.component';
import {SettingsComponent} from "./settings/settings.component";

export const routing = RouterModule.forRoot([
  {path: '', component: GarageNavComponent, canActivate: [AuthGuard] },
  {path: 'GarageView', component: GarageNavComponent, canActivate: [AuthGuard] },
  {path: 'Login', component: LoginComponent},
  {path: 'Settings', component: SettingsComponent, canActivate: [AuthGuard] }
]);
