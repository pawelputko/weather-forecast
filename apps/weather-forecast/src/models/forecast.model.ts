export interface ForecastModel {
  [k: string]: {
    daily?: DailyForecast,
    hourly?: HourlyForecast
  }
}

export interface ForecastResponseModel {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: string;
  hourly?: HourlyForecast[];
  daily?: DailyForecast[];
}

export interface HourlyForecast extends Forecast {
  dt: number;
  temp: number;
  feels_like: number;
  visibility: number;
}

export interface DailyForecast extends Forecast {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temp;
  feels_like: Omit<Temp, 'max' | 'min'>;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Forecast {
  dt: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  pop: number
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string
}

export enum ForecastType {
  hourly = 'daily',
  daily = 'hourly'
}
