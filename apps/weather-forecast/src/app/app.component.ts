import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/state';
import { Store } from '@ngrx/store';
import { CitySelector } from '../store/city/city.selector';
import { Observable } from 'rxjs';
import { CityModel } from '../models/city.model';

@Component({
  selector: 'angular-task-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  public isCityLoaded$ = new Observable<boolean>();
  public city$ = new Observable<CityModel>();

  ngOnInit () {
    this.isCityLoaded$ = this.store.select(CitySelector.SelectLoadedState);
    this.city$ = this.store.select(CitySelector.SelectCity);
  }
}
