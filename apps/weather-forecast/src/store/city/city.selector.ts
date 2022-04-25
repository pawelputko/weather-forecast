import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CityState } from './city.reducer';

export class CitySelector {
  static readonly feature = createFeatureSelector<CityState>('city');

  static readonly SelectCity = createSelector(
    CitySelector.feature,
    state => state.city
  );

  static readonly SelectCities = createSelector(
    CitySelector.feature,
    state => state.cities
  );

  static readonly SelectLoadingState = createSelector(
    CitySelector.feature,
    state => state.isLoading
  );

  static readonly SelectLoadedState = createSelector(
    CitySelector.feature,
    state => state.hasLoaded
  );
}
