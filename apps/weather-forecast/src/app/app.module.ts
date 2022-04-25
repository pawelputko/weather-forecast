import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { forecastReducer } from '../store/forecast/forecast.reducer';
import { SearchBoxComponent } from '../components/search-box/search-box.component';
import { ForecastTableComponent } from '../components/forecast-table/forecast-table.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForecastEffects } from '../store/forecast/forecast.effects';
import { EffectsModule } from '@ngrx/effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { appReducers } from '../store/state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { CapitalizeFirstLetterPipe } from '../helpers/capitalize.pipe';
import { MatTableModule } from '@angular/material/table';
import { cityReducer } from '../store/city/city.reducer';
import { CityEffects } from '../store/city/city.effects';
import { RouterModule } from '@angular/router';
import { MyInterceptor } from '../interceptors/http.interceptor';

@NgModule({
  declarations: [AppComponent, SearchBoxComponent, ForecastTableComponent, CapitalizeFirstLetterPipe],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(appReducers),
    StoreModule.forFeature('forecast', forecastReducer),
    StoreModule.forFeature('city', cityReducer),
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        { path: "", component: AppComponent}
      ]
    ),
    EffectsModule.forRoot([ForecastEffects, CityEffects]),
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }
  ]
})
export class AppModule {}
