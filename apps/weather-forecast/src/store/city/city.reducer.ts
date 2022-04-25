import { createReducer, on } from '@ngrx/store';
import { CityModel } from '../../models/city.model';
import { fetchCity, fetchCityFailure, fetchCitySuccess } from './city.actions';

export interface CityState {
  isLoading: boolean;
  city: CityModel;
  hasLoaded: boolean;
  cities: CityModel[];
}

export const initialState: CityState = {
  isLoading: false,
  city: {} as CityModel,
  hasLoaded: false,
  cities: []
}

export const cityReducer = createReducer(
  initialState,
  on(fetchCity, state => ({
    ...state,
    isLoading: true
  })),
  on(fetchCitySuccess, (state, action) => {
    if (state.cities.includes(action.city)) {
      return {
        ...state,
        isLoading: false,
        city: action.city,
        hasLoaded: true
      }
    }
    return {
      ...state,
      isLoading: false,
      city: action.city,
      hasLoaded: true,
      cities: [...state.cities, action.city]
    }
  }),
  on(fetchCityFailure, state => ({
    ...state,
    isLoading: false,
    hasLoaded: false
  }))
);
