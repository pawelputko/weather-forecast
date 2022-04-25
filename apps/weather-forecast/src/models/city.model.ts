export interface CityModel {
  name: string;
  local_names: { [k: string]: string };
  lat: number;
  lon: number;
  country: string;
  state: string;
}
