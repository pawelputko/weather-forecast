import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ForecastState } from './forecast.reducer';

export class ForecastSelector {
  static readonly feature = createFeatureSelector<ForecastState>('forecast');

  static readonly SelectForecast = createSelector(
    ForecastSelector.feature,
    state => state.forecast
  );

  static readonly SelectLoadingState = createSelector(
    ForecastSelector.feature,
    state => state.hasLoaded
  );
}
