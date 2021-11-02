import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FoodEdit } from '@core/interfaces/dtos/food-edit.dto';
import { Food } from '@core/interfaces/models/food.interface';
import { clearStore, createFood, deleteFood, getFood, getFoods, removeCurrentFood, updateFood } from '../store/foods.actions';

import * as fromRoot from '@core/store/index';
import * as fromSelectors from '../store/selectors'
import { FoodWithDetails } from '@base/app/core/interfaces/dtos/food-with-details.dto';

@Injectable({
  providedIn: 'root'
})
export class FoodFacadeService {

  private _foods$: Observable<Food[]> = this.store.select(fromSelectors.selectAllEntities);
  public getFoods() { return this._foods$};
  private _currentFood$: Observable<FoodWithDetails | undefined | null> = this.store.select(fromSelectors.selectCurrentFood);
  public getCurrentFood() { return this._currentFood$ };
  private _isLoading$: Observable<boolean> = this.store.select(fromSelectors.selectLoadIndicator);
  public getLoadState() { return this._isLoading$ };

  constructor(private store: Store<fromRoot.mainState>) { }

  public createFood(food: FoodEdit) {
    this.store.dispatch(createFood({ newFood: food }));
  }
  
  public loadFoods(): void {
    this.store.dispatch(getFoods());
  }

  public loadFood(id: string): void {
    this.store.dispatch(getFood({ foodId: id }));
  }

  public removeCurrentFood(): void {
    this.store.dispatch(removeCurrentFood());
  }

  public updateFood(food: FoodWithDetails) {
    this.store.dispatch(updateFood({ food }));
  }

  public deleteFood(id: string) {
    this.store.dispatch(deleteFood({ id }));
  }

  public clearStore(): void {
    this.store.dispatch(clearStore());
  }
}
