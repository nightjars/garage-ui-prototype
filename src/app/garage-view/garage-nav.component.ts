import { Component } from '@angular/core';
import { GarageService } from '../garage.service';

@Component({
  selector: 'app-garage-nav',
  providers: [GarageService],
  templateUrl: 'garage-nav.html',
})
export class GarageNavComponent {
  garages;
  selectedGarage;

  constructor(garageService: GarageService) {
    this.garages = garageService.getGarages();
    this.selectedGarage = this.garages[0];
  }

  public selectGarage(garageName) {
    this.selectedGarage = this.garages.filter(x => x.garageName == garageName)[0];
  }
}
