import { DailyForecast, ForecastModel, ForecastType, HourlyForecast } from '../models/forecast.model';
import * as moment from 'moment';

const Hours = [0, 3, 6, 9, 12, 15, 18, 21];

export const getTableData = (data: ForecastModel[], mode: ForecastType, cityName: string): (string | number)[] => {
  const cityData = (data.find(item => item[cityName]) as any )[cityName];
  if (mode === ForecastType.daily) {
    let newData = [];
    for (let i = 0; i < 7; i++) {
      const dailyData = cityData.daily?.find((item: DailyForecast) => moment.unix(item.dt).day() === i);
      newData.push(dailyData);
    }
    // move sunday at the end of table
    const [first, ...rest] = newData;
    newData = [...rest, first]
    return newData.map(forecast => forecast.temp.day.toFixed());
  }
  const specificHours = cityData.hourly.filter((item: HourlyForecast) => Hours.includes(moment.unix(item.dt).hour()));
  const indexOf3am = specificHours.indexOf(specificHours.find((item: HourlyForecast) => moment.unix(item.dt).hour() === 3));
  const filtered = specificHours.slice(indexOf3am, indexOf3am + 8);

  return filtered.map((item: HourlyForecast) => item.temp.toFixed());
}
