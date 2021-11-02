import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FoodCategoryEditDTO } from '@core/interfaces/dtos/food-category.edit.dto';
import { selectAllEntities, selectCurrentFoodCategory, selectLoadIndicator } from '@food-categories/store/selectors';
import { FoodCategory } from '@core/interfaces/models/food-category.interface';
import * as fromRoot from '@core/store/index';
import { clearStore, createFoodCategory, deleteFoodCategory, getFoodCategories, getFoodCategory, updateFoodCategory } from '@food-categories/store/food-categories.actions';

@Injectable({
  providedIn: 'root'
})
export class FoodCategoriesFacade {

  private _foodCategories$: Observable<FoodCategory[]> = this.store.select(selectAllEntities);
  public getFoodCategories() { return this._foodCategories$};
  private _currentFoodCategory$: Observable<FoodCategory | undefined | null> = this.store.select(selectCurrentFoodCategory);
  public getCurrentFoodCategory() { return this._currentFoodCategory$ };
  private _isLoading$: Observable<any> = this.store.select(selectLoadIndicator);
  public getLoadState() { return this._isLoading$ };

  constructor(private store: Store<fromRoot.mainState>) { }

  public createFoodCategory(foodCategory: FoodCategoryEditDTO) {
    this.store.dispatch(createFoodCategory({ newFoodCategory: foodCategory }));
  }
  
  public loadFoodCategories(): void {
    this.store.dispatch(getFoodCategories());
  }

  public loadFoodCategory(id: string): void {
    this.store.dispatch(getFoodCategory({ foodCategoryId: id }));
  }

  public updateFoodCategory(foodCategory: FoodCategory) {
    this.store.dispatch(updateFoodCategory({ foodCategory}));
  }

  public deleteFoodCategory(id: string) {
    this.store.dispatch(deleteFoodCategory({ id }));
  }

  public clearStore(): void {
    this.store.dispatch(clearStore());
  }
}
