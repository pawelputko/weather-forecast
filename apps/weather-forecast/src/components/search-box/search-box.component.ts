import { Component, OnDestroy } from '@angular/core';
import { AppState } from '../../store/state';
import { Store } from '@ngrx/store';
import { fetchCity } from '../../store/city/city.actions';
import { fetchForecast } from '../../store/forecast/forecast.actions';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'wf-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnDestroy{
  constructor(private store: Store<AppState>, private dataService: DataService) {}
  public cityName = '';

  subscription$ = new Subscription();

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  getCity(): void {
    this.store.dispatch(fetchCity({cityName: this.cityName}));

    this.subscription$ = this.dataService.mode$.subscribe(data => {
      this.store.dispatch(fetchForecast({mode: data, cityName: this.cityName}));
    });
  }
}
