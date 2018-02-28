export class UpdateNote {
  note: String;
  id: String;
  public constructor(id?: String, note?: String) {
    this.note = note;
    this.id = id;
  }
}
