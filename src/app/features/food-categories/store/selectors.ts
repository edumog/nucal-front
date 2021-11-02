import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromFoodCategory from './food-categories.reducer';

export const foodcategoriesFeatureKey = 'FOOD_CATEGORIES_REDUCERS';

export const selectFoodCategoryState = createFeatureSelector<fromFoodCategory.State>(foodcategoriesFeatureKey);

export const selectAllEntities = createSelector(
    selectFoodCategoryState,
    fromFoodCategory.selectAllFoodCategories
);

export const selectFoodCategoryEntities = createSelector(
    selectFoodCategoryState,
    fromFoodCategory.selectFoodCategoryEntities
);

export const selectCurrentFoodCategoryId = createSelector(
    selectFoodCategoryState,
    fromFoodCategory.getSelectedFoodCategoryId
);

export const selectCurrentFoodCategory = createSelector(
    selectFoodCategoryState,
    selectCurrentFoodCategoryId,
    selectFoodCategoryEntities,
    (foodCategoryEntities, id) => id !== '' ? foodCategoryEntities.entities[id] : null
);

export const selectLoadIndicator = createSelector(
    selectFoodCategoryState, 
    fromFoodCategory.getLoadingState
);

