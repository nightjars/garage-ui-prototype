import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { GarageService } from '../garage.service';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Subscription } from "rxjs/Subscription";
import {SettingsService} from "../settings.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-live-camera',
  providers: [GarageService],
  template: `<div *ngIf="displayImage"><img [src]="image" width="100%"></div>`,
  styleUrls: ['../garage-view/vehicle-details.css']
})
export class LiveCameraComponent implements OnInit, OnDestroy {
  image = null;
  displayImage: boolean = false;
  auto_poll = new Subscription();
  @Input() camera_id: string;
  constructor(public settingsService: SettingsService, public auth: AuthService,
              private router: Router, private sanitizer: DomSanitizer) {
  }
  public ngOnInit() {
    this.refresh_subscribe();
    this.fetchData();
  }
  public ngOnDestroy(): void {
    this.auto_poll.unsubscribe();
  }
  public refresh_subscribe():void {
    let timer = Observable.interval(400);
    this.auto_poll = timer.subscribe( t => {
      this.fetchData();
    });
  }
  private fetchData() {
    this.settingsService.getCameraImage(this.camera_id)
      .subscribe(data => {
        this.image = this.sanitizer.bypassSecurityTrustUrl('data:image/JPEG;base64,' + data.image.$binary);
        this.displayImage = true;
      });
  }
}
