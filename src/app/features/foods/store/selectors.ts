import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromFood from './foods.reducer';

export const foodsFeatureKey = 'FOODS_REDUCERS';

export const selectFoodState = createFeatureSelector<fromFood.State>(foodsFeatureKey);

export const selectAllEntities = createSelector(
    selectFoodState,
    fromFood.selectAllFoods
);

export const selectFoodEntities = createSelector(
    selectFoodState,
    fromFood.selectFoodEntities
);

export const selectCurrentFoodId = createSelector(
    selectFoodState,
    fromFood.getSelectedFoodId
);

export const selectCurrentFood = createSelector(
    selectFoodState,
    fromFood.getSelectedFood
);

export const selectLoadIndicator = createSelector(
    selectFoodState, 
    fromFood.getLoadingState
);
