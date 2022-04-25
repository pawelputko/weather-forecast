import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ForecastType } from '../models/forecast.model';

@Injectable({providedIn: 'root'})
export class DataService {
  mode$ = new BehaviorSubject(ForecastType.daily);

  updateValue(value: ForecastType) {
    this.mode$.next(value);
  }
}
