import { createAction, props } from '@ngrx/store';
import { CityModel } from '../../models/city.model';

export const FetchCity = '[City] Fetch City';

export const FetchCitySuccess = '[City] Fetch City Success';

export const FetchCityFailure = '[City] Fetch City Failure';

export const fetchCity = createAction(FetchCity, props<{cityName: string}>());

export const fetchCitySuccess = createAction(FetchCitySuccess, props<{city: CityModel}>());

export const fetchCityFailure = createAction(FetchCityFailure, props<{message: string}>());
