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
  private host = 'http://garageapiserv:5000';
  private vehicleListUrl = this.host + '/api/vehicle/recent';
  private deleteUrl = this.host + '/api/vehicle/delete';
  private getDetailsUrl = this.host + '/api/vehicle/details';
  private getSearchUrl = this.host + '/api/vehicle/search';
  private updateNoteUrl = this.host + '/api/vehicle/set_note';
  private getAlertsUrl = this.host + '/api/vehicle/alert/get';
  private createAlertUrl = this.host + '/api/vehicle/alert/create';
  private deleteAlertUrl = this.host + '/api/vehicle/alert/delete';
  private eventGetUrl = this.host + '/api/vehicle/get_event/';
  private correctPlateUrl = this.host + '/api/vehicle/correct_plate';
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
  getEvent(event = null, event_id = null) {
    var id = null;
    if (event == null || event_id != null) {
      id = event_id;
    } else  {
      id = event.id;
    }
    return this._http.get(this.eventGetUrl + id)
      .catch(error => {
        return Observable.of(null);
      });
  }
  changePlate(eventId, newPlate) {
    var plateChange = {'id': eventId, 'plate': newPlate};
    return this._http.post(this.correctPlateUrl, plateChange)
      .catch(error => {
        return Observable.of(null);
      });
  }
}
