import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ForecastHttpService } from '../../services/forecast-http.service';
import {
  fetchForecast,
  FetchForecast,
  FetchForecastFailure,
  fetchForecastFailure,
  fetchForecastSuccess
} from './forecast.actions';
import { catchError, debounceTime, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ForecastResponseModel } from '../../models/forecast.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitySelector } from '../city/city.selector';
import { AppState } from '../state';
import { Store } from '@ngrx/store';
import { CityModel } from '../../models/city.model';

@Injectable()
export class ForecastEffects {
  fetchForecast$ = createEffect(() => this.actions$.pipe(
    ofType(FetchForecast),
    debounceTime(200),
    withLatestFrom(this.store.select(CitySelector.SelectCities)),
    switchMap(([action, cities] : [ReturnType<typeof fetchForecast>, CityModel[]]) => {
      const city = cities.find(city => city.name.toLocaleLowerCase() === action.cityName?.toLocaleLowerCase()) as CityModel;
      if (!city) {
        return of(fetchForecastFailure({message: 'Error while fetching forecast'}));
      }
      const payload = {
        lat: (city as CityModel).lat,
        lng: (city as CityModel).lon,
        type: action.mode
      }
      return this.forecastService.getForecast(payload)
        .pipe(
          map((forecast: ForecastResponseModel) => {
            return fetchForecastSuccess({ forecast: forecast, cityName: city.name, mode: action.mode });
          }))
    }),
    catchError(() => of(fetchForecastFailure({message: 'Error while fetching forecast'})))
  ));

  fetchFailure = createEffect(() => this.actions$.pipe(
    ofType(FetchForecastFailure),
    tap((action: ReturnType<typeof fetchForecastFailure>) => this.snackBar.open(action.message, 'Error', {duration: 3000}))
  ), {dispatch: false});

  constructor(private actions$: Actions, private store: Store<AppState>, private forecastService: ForecastHttpService, private snackBar: MatSnackBar) {}
}
