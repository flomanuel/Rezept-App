export interface Market {
  place_id: number;
  lat: string;
  lon: string;
  address: any;
  display_name: string;
  index: number;
  distance: number;
  extratags: Extratags;
}

export interface Extratags {
  level: string;
  indoor: string;
  wheelchair: string;
  opening_hours: string;
}
