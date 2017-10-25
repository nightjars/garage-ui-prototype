import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GarageNavComponent } from './garage-view/garage-nav.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';

export const routing = RouterModule.forRoot([
  {path: '', component: GarageNavComponent},
  {path: 'GarageView', component: GarageNavComponent},
  {path: 'Login', component: LoginComponent}
]);
