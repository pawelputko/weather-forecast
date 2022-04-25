import { createAction, props } from '@ngrx/store';
import { ForecastResponseModel, ForecastType } from '../../models/forecast.model';

export const FetchForecast = '[Forecast] Fetch Forecast';

export const FetchForecastSuccess = '[Forecast] Fetch Forecast Success';

export const FetchForecastFailure = '[Forecast] Fetch Forecast Failure';

export const fetchForecast = createAction(FetchForecast, props<{mode: ForecastType, cityName: string}>())

export const fetchForecastSuccess = createAction(FetchForecastSuccess, props<{forecast: ForecastResponseModel, cityName: string, mode: ForecastType}>());

export const fetchForecastFailure = createAction(FetchForecastFailure, props<{message: string}>());
