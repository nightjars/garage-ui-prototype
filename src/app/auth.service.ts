import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  public token: string;
  private BASE_URL: string = 'http://192.168.1.99:5000/auth';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }
  login(user): Observable<boolean> {
    let url: string = `${this.BASE_URL}`;
    return this.http.post(url, user, {headers: this.headers})
      .map((response: Response) => {
         console.log(response);
        let token = response.json() && response.json().access_token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            token: token
          }));
          return true;
        } else {
          return false;
        }
      }).catch((error: any) => {
        this.logOut();
        return Observable.of(false);
      });
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') != null;
  }
  logOut() {
    localStorage.removeItem('currentUser');
  }
  getToken(): string {
    if (this.isLoggedIn()) {
      return JSON.parse(localStorage.getItem('currentUser'))['token'];
    } else {
      return '';
    }
  }
}