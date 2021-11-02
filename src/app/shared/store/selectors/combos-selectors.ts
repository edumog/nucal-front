import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCombos from '@shared/store/reducers/combos.reducer';

export const combosFeatureKey = 'COMBOS_REDUCER';

export const selectCombosState = createFeatureSelector<fromCombos.State>(combosFeatureKey);

export const selectFoodCategoriesCombo = createSelector(
    selectCombosState,
    fromCombos.getFoodCategoriesCombo
);

export const selectFoodsCombo = createSelector(
    selectCombosState,
    fromCombos.getFoodsCombo
);

export const isFoodCategoriesLoading = createSelector(
    selectCombosState,
    fromCombos.getLoadStatusOfFoodCategories
);

export const isFoodsLoading = createSelector(
    selectCombosState,
    fromCombos.getLoadStatusOfFoods
);