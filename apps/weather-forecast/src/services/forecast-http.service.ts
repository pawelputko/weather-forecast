import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { CityModel } from '../models/city.model';
import { environment } from '../environments/environment';
import { ForecastModel, ForecastResponseModel, ForecastType } from '../models/forecast.model';

@Injectable({providedIn: 'root'})
export class ForecastHttpService {
  constructor(private httpClient: HttpClient) {}

  getCity(query: string): Observable<CityModel[]> {
    return this.httpClient.get<CityModel[]>(`${environment.cityUrl}?q=${query}&limit=1&appid=${environment.APP_ID}`).pipe(
      map((response: CityModel[]) => response),
      catchError(e => throwError(e))
    );
  }

  getForecast(params: {lat: number, lng: number, type: ForecastType}): Observable<ForecastResponseModel> {
    const url = `${environment.forecastUrl}?lat=${params.lat}&lon=${params.lng}&units=metric&exclude=current,minutely,${params.type},alerts&appid=${environment.APP_ID}`;
    return this.httpClient.get<ForecastResponseModel>(url).pipe(
      map((response: ForecastResponseModel) => response),
      catchError(e => throwError(e))
    );
  }
}
