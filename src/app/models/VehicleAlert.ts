export class VehicleAlert {
  plate: string;
  email: string;
  id: string;
  public constructor(plate?: string, email?: string, id?: string) {
    this.plate = plate;
    this.email = email;
    this.id = id;
  }
}
