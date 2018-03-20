export class Vehicle {
  plate: string;
  date_time: Date;
  image: string;
  id: string;
  alerts: boolean;
  public constructor(plate: string, date_time: Date,  image: string,
                     id: string, alerts?: boolean) {
    this.plate = plate;
    this.date_time = date_time;
    this.image = 'http://garageapiserv:5000/image/' + image;
    this.id = id;
    this.alerts = alerts;
  }
}
