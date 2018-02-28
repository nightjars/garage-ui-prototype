export class SearchForm {
  start_date: String;
  end_date: String;
  plate_substring: String;
  note: String;
  include_thumbnails: Boolean;
  public constructor(start_date?: String, end_date?: String) {
    this.start_date = start_date;
    this.end_date = end_date;
  }
}
