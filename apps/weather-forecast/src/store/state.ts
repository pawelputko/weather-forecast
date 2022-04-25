import { combineReducers } from '@ngrx/store';

import { forecastReducer, ForecastState } from './forecast/forecast.reducer';
import { cityReducer, CityState } from './city/city.reducer';

export interface AppState {
  forecast: ForecastState,
  city: CityState
}

export const appReducers = combineReducers({
  forecast: forecastReducer,
  city: cityReducer
});
