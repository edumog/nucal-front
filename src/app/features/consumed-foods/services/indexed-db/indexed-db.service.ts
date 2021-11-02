import { Injectable } from '@angular/core';
import { DailyConsumption } from '@base/app/core/interfaces/models/daily-consumption.interface';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {

  constructor(private dbService: NgxIndexedDBService) { }

  public registerDay(dayConsumption: DailyConsumption) {
    return this.dbService.add('nucal', {
      date: dayConsumption.date,
      userId: dayConsumption.userId,
      plates: dayConsumption.plates
    })
  }
  
  public getByKey(key: number) {
    return this.dbService.getByKey('nucal', key);
  }

  public updateDay(dayComsumption: DailyConsumption) {
    return this.dbService.update('nucal', {
        id: dayComsumption.id,
        userId: dayComsumption.userId,
        date: dayComsumption.date,
        plates: dayComsumption.plates
      }).pipe(
        map((response: any) => response.find((x: any) => (x.id === dayComsumption.id && x.userId === dayComsumption.userId)))
      );
  }

  public getByDate(date: string, userId: string) {
    return this.dbService.getByIndex('nucal', 'date', date).pipe(
      map((response: any) => (response && response.userId === userId)? response : { date: '', plates: [] })
    );
  }
}
