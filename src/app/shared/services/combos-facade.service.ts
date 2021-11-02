import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Combobox } from '@core/interfaces/dtos/combobox.dto';

import { getFoodCategories, getFoods } from '@shared/store/actions/combos.actions';
import { isFoodsLoading, isFoodCategoriesLoading, selectFoodCategoriesCombo, selectFoodsCombo } from '@shared/store/selectors/combos-selectors';
import * as fromRoot from '@core/store/index';
import { FoodsCombo } from '@base/app/core/interfaces/dtos/food-categories-combobox.dto';

@Injectable({
  providedIn: 'root'
})
export class CombosFacadeService {

  private _foodCategoriesCombo$: Observable<Combobox[] | null> = this.store.select(selectFoodCategoriesCombo);
  public getFoodCategoriesCombo$() { return this._foodCategoriesCombo$ };
  private _isFoodCategoriesLoading: Observable<boolean> = this.store.select(isFoodCategoriesLoading);
  public getLoadingIndicatorFoodCategories(): Observable<boolean>  { return this._isFoodCategoriesLoading }

  private _foodsCombo$: Observable<FoodsCombo[] | null> = this.store.select(selectFoodsCombo);
  public getFoodsCombo$() { return this._foodsCombo$ };
  private _isFoodsLoading: Observable<boolean> = this.store.select(isFoodsLoading);
  public getLoadingIndicatorFoods(): Observable<boolean> { return this._isFoodsLoading }

  constructor(private store: Store<fromRoot.mainState>) { }
  
  public getFoodCategoriesCombo() {
    this.store.dispatch(getFoodCategories());
  }

  public getFoodsCombo() {
    this.store.dispatch(getFoods());
  }
}
