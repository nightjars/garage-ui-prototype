import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from '../models/Vehicle';

@Pipe({
  name: 'GarageNavFilter'
})
export class GarageNavFilterPipe implements PipeTransform {
  transform(items: Vehicle[], filter_in: boolean, filter_out: boolean, searchText: string): Vehicle[] {
    /*
    if (!items) {
      return [];
    }
    var returned = [];
    if (filter_in && filter_out) {
      returned = items;
    } else {
      for (let item of items) {
        var include = false;
        if (item.checked_in && filter_in) {
          include = true;
        }
        if (!item.checked_in && filter_out) {
          include = true;
        }
        if (include) {
          returned.push(item);
        }
      }
    }
    return returned;
    */
    return null;
  }
}
