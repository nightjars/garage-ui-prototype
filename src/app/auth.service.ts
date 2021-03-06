import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  private host = 'http://garageapiserv:5000';
  public token: string;
  private BASE_URL: string = this.host + '/auth';
  private permissions_url: string = this.host + '/api/user/user_permissions';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }
  login(user): Observable<boolean> {
    let url: string = `${this.BASE_URL}`;
    let cred_user = {'username': user.username, 'password': user.password}
    return this.http.post(url, cred_user, {headers: this.headers})
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
  getWriteAccess(): boolean {
    if (this.isLoggedIn()) {
      return JSON.parse(localStorage.getItem('currentUser'))['writeAccess'];
    }
    return false;
  }
  getAdminAccess(): boolean {
    if (this.isLoggedIn()) {
      return JSON.parse(localStorage.getItem('currentUser'))['adminAccess'];
    }
    return false;
  }
  setAccess(): void {
    if (this.isLoggedIn()) {
      let headers = new Headers();
      headers.append('Authorization', 'JWT ' + this.getToken());
      this.http.get(this.permissions_url, {headers: headers})
        .map(res => res.json())
        .subscribe( response => {
          let user = JSON.parse(localStorage.getItem('currentUser'));
          user['writeAccess'] = response['writeAccess'];
          user['adminAccess'] = response['adminAccess'];
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(user);
        });
    }
  }
}
