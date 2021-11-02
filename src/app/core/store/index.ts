import { InjectionToken } from "@angular/core";
import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromConsumedFoods from '@consumed-foods/store/consumed-foods.reducer';
import * as fromFood from '@foods/store/foods.reducer';
import * as fromFoodCategory from '@food-categories/store/food-categories.reducer';
import * as fromSecurity from '@security/store/security.reducer';


export interface mainState {
    consumedFoods: fromConsumedFoods.State,
    food: fromFood.State,
    foodCategory: fromFoodCategory.State,
    security: fromSecurity.State
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<mainState, Action>>(
    'ROOT_REDUCERS_TOKEN',
    {
        factory: () => ({
            consumedFoods: fromConsumedFoods.reducer,
            food: fromFood.reducer,
            foodCategory: fromFoodCategory.reducer,
            security: fromSecurity.reducer
        })
    }
);