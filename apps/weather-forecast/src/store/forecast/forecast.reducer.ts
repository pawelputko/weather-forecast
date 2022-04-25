import { ForecastModel, ForecastType } from '../../models/forecast.model';
import { createReducer, on } from '@ngrx/store';
import {
  fetchForecast,
  fetchForecastFailure,
  fetchForecastSuccess
} from './forecast.actions';

export interface ForecastState {
  isLoading: boolean;
  forecast: ForecastModel[];
  hasLoaded: boolean;
}

export const initialState: ForecastState = {
  isLoading: false,
  forecast: [],
  hasLoaded: false
}

export const forecastReducer = createReducer(
  initialState,
  on(fetchForecast, state => ({
    ...state,
    isLoading: true
  })),
  on(fetchForecastSuccess, (state, action) => {
    const existingForecast = state.forecast.find(item => item[action.cityName]);
    if (existingForecast) {
      const copyForecast = [...state.forecast];
      const copyCityForecast = Object.assign({}, existingForecast)
      copyCityForecast[action.cityName] = {...copyCityForecast[action.cityName], [ForecastType[action.mode]]: action.forecast[ForecastType[action.mode]]};

      copyForecast[copyForecast.indexOf(existingForecast)] = copyCityForecast;

      return {
        ...state,
        isLoading: false,
        forecast: [...copyForecast],
        hasLoaded: true
      }
    }
    const newForecast = [{
      [action.cityName]: {
        [ForecastType[action.mode]]: action.forecast[ForecastType[action.mode]]
      }
    }]
    return {
      ...state,
      isLoading: false,
      forecast: [...state.forecast, ...newForecast],
      hasLoaded: true
    }
  }),
  on(fetchForecastFailure, state => ({
    ...state,
    isLoading: false
  }))
);
