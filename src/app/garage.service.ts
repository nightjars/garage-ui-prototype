import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Vehicle } from './models/Vehicle';
import { HttpService } from './HttpService';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Observable } from 'rxjs/Observable';

/*function vehicleize(garageData) {
  for (let garage of garageData) {
    let vehicles = [];
    for (let vehicle of garage['vehicles']) {
      vehicles.push(new Vehicle(vehicle['plate'], vehicle['time_in'], null, false, vehicle['image'],
                    vehicle['id']));
    }
    garage['vehicles'] = vehicles;
  }
  return garageData;
}*/

@Injectable()
export class GarageService {
  private vehicleListUrl = 'http://192.168.1.99:5000/api/vehicle/recent';
  private deleteUrl = 'http://192.168.1.99:5000/api/vehicle/delete';
  private getDetailsUrl = 'http://192.168.1.99:5000/api/vehicle/details';
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
}
