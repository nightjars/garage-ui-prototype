import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Vehicle } from './models/Vehicle';
import { HttpService } from './HttpService';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Observable } from 'rxjs/Observable';
import { SearchForm } from './models/SearchForm';
import {UpdateNote} from "./models/UpdateNote";
import * as url from "url";
import {VehicleAlert} from "./models/VehicleAlert";

@Injectable()
export class GarageService {
  private vehicleListUrl = 'http://192.168.1.99:5000/api/vehicle/recent';
  private deleteUrl = 'http://192.168.1.99:5000/api/vehicle/delete';
  private getDetailsUrl = 'http://192.168.1.99:5000/api/vehicle/details';
  private getSearchUrl = 'http://192.168.1.99:5000/api/vehicle/search';
  private updateNoteUrl = 'http://192.168.1.99:5000/api/vehicle/set_note';
  private getAlertsUrl = 'http://192.168.1.99:5000/api/vehicle/alert/get';
  private createAlertUrl = 'http://192.168.1.99:5000/api/vehicle/alert/create';
  private deleteAlertUrl = 'http://192.168.1.99:5000/api/vehicle/alert/delete';
  constructor(private _http: HttpService) {
  }
  getVehicleList() {
    return this._http.get(this.vehicleListUrl)
      .map(res => res)
      .catch(error => {
        console.log('Unable to retrieve vehicles - ' + error.message);
        return Observable.of(null);
      });
  }
  deleteCar(vehicle) {
    return this._http.post(this.deleteUrl, vehicle)
      .catch(error => {
        return Observable.of(null);
      });
  }
  getCarDetails(vehicle) {
    return this._http.get(this.getDetailsUrl + '/' + vehicle)
      .map(res => res)
      .catch(error => {
        return Observable.of(null);
      });
  }
  searchEvents(searchCriteria: SearchForm) {
    return this._http.params_get(this.getSearchUrl, searchCriteria)
      .map(res => res)
      .catch(error => {
        return Observable.of(null);
      });
  }
  updateNote(updatedNote: UpdateNote) {
    return this._http.post(this.updateNoteUrl, updatedNote)
      .catch(error => {
        return Observable.of(null);
      });
  }
  getAlerts(plate = null) {
    let urlGet = this.getAlertsUrl;
    if (plate != null) {
      urlGet += '/' + plate;
    }
    return this._http.get(urlGet)
      .map(res => res)
      .catch(error => {
        return Observable.of(null);
      });
  }
  createAlert(alert: VehicleAlert) {
    return this._http.post(this.createAlertUrl, alert)
      .catch(error => {
        console.log(error);
        return Observable.of(null);
      });
  }
  deleteAlert(alert: VehicleAlert) {
    return this._http.post(this.deleteAlertUrl, alert)
      .catch(error => {
        return Observable.of(null);
      });
  }
}
