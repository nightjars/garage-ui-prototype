import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Vehicle } from './models/Vehicle';
import { HttpService } from './HttpService';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Observable } from 'rxjs/Observable';
import { SearchForm } from './models/SearchForm';

@Injectable()
export class SettingsService {
  private host = 'http://garageapiserv:5000';
  private passwordChangeUrl = this.host + '/api/user/change_password';
  private getUserListUrl = this.host + '/api/user/users';
  private modifyUserUrl = this.host + '/api/user/modify_user';
  private deleteUserUrl = this.host + '/api/user/delete_user';
  private createUserUrl = this.host + '/api/user/create_user';
  private getCamerasUrl = this.host + '/api/camera/get';
  private saveCameraUrl = this.host + '/api/camera/save';
  private setDetectionAreaUrl = this.host + '/api/camera/set_detection_area';
  private cameraImage = this.host + '/api/camera/get/image_json/';

  constructor(private _http: HttpService) {
  }
  getUserList() {
    return this._http.get(this.getUserListUrl)
      .map(res => res)
      .catch(error => {
        console.log('Unable to retrieve users - ' + error.message);
        return Observable.of(null);
      });
  }
  deleteUser(user) {
    return this._http.post(this.deleteUserUrl, user)
      .catch(error => {
        return Observable.of(null);
      });
  }
  modifyUser(user) {
    return this._http.post(this.modifyUserUrl, user)
      .map(res => res)
      .catch(error => {
        return Observable.of(null);
      });
  }
  createUser(user) {
    return this._http.post(this.createUserUrl, user)
      .catch(error => {
        return Observable.of(null);
      });
  }
  changePassword(password) {
    return this._http.post(this.passwordChangeUrl, password)
      .catch(error => {
        return Observable.of(null);
      });
  }
  getCameeras() {
    return this._http.get(this.getCamerasUrl)
      .map(res => res)
      .catch(error => {
        console.log('Unable to retrieve users - ' + error.message);
        return Observable.of(null);
      });
  }
  saveCamera(camera) {
    return this._http.post(this.saveCameraUrl, camera)
      .catch(error => {
        return Observable.of(null);
      });
  }
  setDetectionArea(x1, y1, x2, y2, camera_id) {
    let cameraSettings = {'x1': x1, 'x2': x2, 'y1': y1, 'y2': y2, 'camera_id': camera_id};
    return this._http.post(this.setDetectionAreaUrl, cameraSettings)
      .catch(error => {
        return Observable.of(null);
      });
  }
  getCameraImage(camera_id) {
    return this._http.get(this.cameraImage + camera_id)
      .catch(error => {
        return Observable.of(null);
      });
  }
}
