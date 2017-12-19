import { Component, Input, OnInit } from '@angular/core';
import { GarageService } from '../garage.service';

@Component({
  selector: 'app-vehicle-details',
  providers: [GarageService],
  templateUrl: 'vehicle-details.html',
  styleUrls: ['./vehicle-details.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle;
  loading = true;
  displayImage = [0];
  @Input() vehicle_id: string = null;

  constructor(private garageService: GarageService) { }
  ngOnInit() {
    this.vehicle = this.garageService.getCarDetails(this.vehicle_id)
      .subscribe( data => {
        this.vehicle = data;
        this.loading = false;
    });
    console.log(this.vehicle_id);
  }
  addToDisplayList(idx) {
    this.displayImage.push(idx);
  }
}
