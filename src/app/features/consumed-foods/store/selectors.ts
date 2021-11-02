import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as reducer from './consumed-foods.reducer'

export const consumedFoodsFeatureKey = 'CONSUMED_FOODS_REDUCERS';

export const selectConsumedFoodState = createFeatureSelector<reducer.State>(consumedFoodsFeatureKey);

export const selectLoadIndicator = createSelector(
    selectConsumedFoodState,
    reducer.getLoadingState
);

export const selectCurrentFood = createSelector(
    selectConsumedFoodState,
    reducer.getSelectedFood
);

export const selectDailyConsumption = createSelector(
    selectConsumedFoodState,
    reducer.getDailyConsumption
);
