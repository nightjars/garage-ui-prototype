import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class HttpService {

  constructor(private http: Http, private auth: AuthService, private router: Router) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'JWT ' +
      this.auth.getToken());
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, { headers: headers })
      .map((res: Response) => { return res.json(); })
      .catch((error: any) => {
        this.auth.logOut();
        console.log("Session invalid, cleared token.");
        return Observable.throw(new Error(error));
      });
  }
  params_get(url, param) {
    let params = new URLSearchParams();
    for (var key in param) {
      if (param.hasOwnProperty(key)) {
        let val = param[key];
        params.set(key, val);
      }
    }
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, { headers: headers, search: params })
      .map((res: Response) => { return res.json(); })
      .catch((error: any) => {
        this.auth.logOut();
        console.log("Session invalid, cleared token.");
        return Observable.throw(new Error(error));
      });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    }).catch((error: any) => {
      this.auth.logOut();
      console.log("Session invalid, cleared token.");
      return Observable.throw(new Error(error));
    });
  }
  getNoJson(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, { headers: headers })
      .map((res: Response) => { return res; })
      .catch((error: any) => {
        this.auth.logOut();
        console.log("Session invalid, cleared token.");
        return Observable.throw(new Error(error));
      });
  }
}
