import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { CityModel } from '../models/city.model';
import { environment } from '../environments/environment';
import { ForecastResponseModel, ForecastType } from '../models/forecast.model';

@Injectable({providedIn: 'root'})
export class ForecastHttpService {
  constructor(private httpClient: HttpClient) {}

  getCity(query: string): Observable<CityModel[]> {
    return this.httpClient.get<CityModel[]>(`${environment.cityUrl}`, {
      params: {
        q: query,
        limit: 1
      }
    }).pipe(
      map((response: CityModel[]) => response),
      catchError(e => throwError(e))
    );
  }

  getForecast(params: {lat: number, lng: number, type: ForecastType}): Observable<ForecastResponseModel> {
    return this.httpClient.get<ForecastResponseModel>(`${environment.forecastUrl}`, {
      params: {
        lat: params.lat,
        lon: params.lng,
        units: 'metric',
        exclude: `current,minutely,${params.type},alerts`,
        mode: ForecastType[params.type]
      }
    }).pipe(
      map((response: ForecastResponseModel) => response),
      catchError(e => throwError(e))
    );
  }
}
