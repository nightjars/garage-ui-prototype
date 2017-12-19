export class Vehicle {
  plate: string;
  date_time: Date;
  image: string;
  id: string;
  public constructor(plate: string, date_time: Date,  image: string,
                     id: string) {
    this.plate = plate;
    this.date_time = date_time;
    this.image = 'http://192.168.1.99:5000/image/' + image;
    this.id = id;
  }
}
