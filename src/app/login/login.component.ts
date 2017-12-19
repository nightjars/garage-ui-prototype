import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  template: `
    <div class = "container">
      {{ message }}
      <div class="row">
        <div class="col-sm-4">
          <form (ngSubmit)="onLogin()" novalidate class="form-signin">
            <h5 class="form-signin-heading">Please Sign In</h5>
            <hr class="colorgraph"><br>
  
            <input type="text" class="form-control" [(ngModel)]="user.username" 
                   name="Username" placeholder="Username" required="" autofocus="" />
            <input type="password" class="form-control" [(ngModel)]="user.password"
                   name="Password" placeholder="Password" required=""/>
            <br>
            <button class="btn btn-lg btn-primary btn-block"  name="Submit" value="Login" type="Submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  user: User = new User();
  message: string = "";
  constructor(private auth: AuthService, private router: Router) {
    auth.logOut();
  }
  onLogin(router: Router): void {
    this.message = "";
    this.auth.login(this.user).toPromise()
      .then(resp => {
        console.log("auth response");
        console.log(resp);
        if (!resp) {
          this.message = "Bad username or password, try again.";
        } else {
          this.router.navigate(['']);
        }
      });
  }
}
