import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-settings-users',
  templateUrl: 'users.html'
})
export class UsersComponent {
  constructor(private auth: AuthService, private router: Router) {
  }
}
