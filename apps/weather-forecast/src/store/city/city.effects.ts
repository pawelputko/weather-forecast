import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CityModel } from '../../models/city.model';
import { Injectable } from '@angular/core';
import { ForecastHttpService } from '../../services/forecast-http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fetchCity, FetchCity, fetchCityFailure, FetchCityFailure, fetchCitySuccess } from './city.actions';

@Injectable()
export class CityEffects {
  fetchCity$ = createEffect(() => this.actions$.pipe(
    ofType(FetchCity),
    switchMap((action: ReturnType<typeof fetchCity>) => this.forecastService.getCity(action.cityName)
      .pipe(
        map((city: CityModel[]) => {
          if (city.length) {
            return fetchCitySuccess({city: city[0]});
          }
          return fetchCityFailure({message: 'City not found'});
        }),
        catchError(() => of(fetchCityFailure({message: 'Error while fetching city'})))
      ))
  ));

  fetchFailure = createEffect(() => this.actions$.pipe(
    ofType(FetchCityFailure),
    tap((action: ReturnType<typeof fetchCityFailure>) => this.snackBar.open(action.message, 'Error', {duration: 3000}))
  ), {dispatch: false});

  constructor(private actions$: Actions, private forecastService: ForecastHttpService, private snackBar: MatSnackBar) {}
}
