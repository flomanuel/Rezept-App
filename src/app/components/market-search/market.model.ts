export interface Market {
  place_id: number;
  lat: string;
  lon: string;
  address: any;
  extratags: Extratags;
}

export interface Extratags {
  level: any;
  indoor: any;
  wheelchair: any;
  opening_hours: any;

}
