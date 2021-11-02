import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from "@core/store/index";
import * as actions from '../store/consumed-foods.actions'
import * as fromSelectors from '../store/selectors'
import { FoodWithDetails } from '@core/interfaces/dtos/food-with-details.dto';
import { DailyConsumption } from '@base/app/core/interfaces/models/daily-consumption.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsumedFoodsFacadeService {

  private _isLoading$: Observable<boolean> = this.store.select(fromSelectors.selectLoadIndicator);
  public getLoadState$() { return this._isLoading$ };

  private _currentFood$: Observable<FoodWithDetails | undefined | null> = this.store.select(fromSelectors.selectCurrentFood);
  public getCurrentFood$() { return this._currentFood$ };

  private _currentConsumption$: Observable<DailyConsumption> = this.store.select(fromSelectors.selectDailyConsumption);
  public getCurrentConsumption$() { return this._currentConsumption$ };

  constructor(private store: Store<fromRoot.mainState>) { }

  public createConsumption(newDailyConsumption: DailyConsumption) {
    this.store.dispatch(actions.createConsumptionOfTheDay({ newDailyConsumption }))
  }
  
  public getCurrentConsumption(userId: string) {
    this.store.dispatch(actions.getDailyConsumption({ date: new Date().toDateString(), userId }))
  }

  public getFood(foodId: string) {
    this.store.dispatch(actions.getFood({ foodId }))
  }

  public updateConsumption(dailyConsumption: DailyConsumption) {
    this.store.dispatch(actions.updateDailyConsumption({ dailyConsumption }));
  }

  public cleanCurrent() {
    this.store.dispatch(actions.removeCurrentFood());
  }
}
