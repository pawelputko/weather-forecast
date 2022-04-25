import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ForecastModel, ForecastType } from '../../models/forecast.model';
import { filter, Observable } from 'rxjs';
import { ForecastSelector } from '../../store/forecast/forecast.selector';
import { ForecastState } from '../../store/forecast/forecast.reducer';
import { fetchForecast } from '../../store/forecast/forecast.actions';
import { getTableData } from '../../helpers/data.parser';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../services/data.service';
import { CityModel } from '../../models/city.model';
import { TableDataModel } from '../../models/table-data.model';

const DAILY_HEADER = ['City Name', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const HOURLY_HEADER = ['City Name', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'];

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'wf-forecast-table',
  templateUrl: './forecast-table.component.html',
  styleUrls: ['./forecast-table.component.scss']
})
export class ForecastTableComponent implements OnInit {
  constructor(private store: Store<ForecastState>, private dataService: DataService) {}

  @Input()
  city: CityModel | null = {} as CityModel;

  public forecast$ = new Observable<ForecastModel[]>();
  public isLoading$ = new Observable<boolean>();

  public mode = ForecastType.daily;
  public typeEnum = ForecastType;
  public tableHeader: string[] = [];
  public dataSource = new MatTableDataSource<TableDataModel>();

  ngOnInit(): void {
    this.tableHeader = DAILY_HEADER;
    this.store.dispatch(fetchForecast({mode: this.mode, cityName: this.city?.name as string}));

    this.isLoading$ = this.store.select(ForecastSelector.SelectLoadingState);
    this.forecast$ = this.store.select(ForecastSelector.SelectForecast);

    const tableData: TableDataModel[] = [];
    this.forecast$.pipe(
      filter(data => !!data.length)
    ).subscribe(data => {
      const existingRow = tableData.find(item => item.data[0] === this.city?.name);
      if (existingRow) {
        existingRow.data = [this.city?.name as string, ...getTableData(data, this.mode, this.city?.name as string)]
      } else {
        const tableRow = {
          data: [this.city?.name as string, ...getTableData(data, this.mode, this.city?.name as string)]
        }
        tableData.push(tableRow)
        this.dataSource.data = tableData;
      }
    });
  }

  toggleMode(): void {
    this.mode = this.mode === ForecastType.hourly ? ForecastType.daily : ForecastType.hourly;
    this.tableHeader = this.mode === ForecastType.daily ? DAILY_HEADER : HOURLY_HEADER;
    this.dataService.updateValue(this.mode);

    this.forecast$.subscribe((data) => {
      this.dataSource.data.forEach(row => {
        const cityData = data.find(item => item[row.data[0]]);
        if (cityData && cityData[row.data[0]][this.typeEnum[this.mode]]) {
          row.data = [row.data[0], ...getTableData(data, this.mode, row.data[0] as string)];
        } else {
          this.store.dispatch(fetchForecast({mode: this.mode, cityName: row.data[0] as string}));
        }
      })
    })
  }
}
