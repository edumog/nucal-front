import { createAction, props } from '@ngrx/store';

import { FoodCategory } from '@app/core/interfaces/models/food-category.interface';
import { FoodCategoryEditDTO } from '@core/interfaces/dtos/food-category.edit.dto';

export const actionTypes = {
    createFoodCategory: 'Create new food category',
    getFoodCategories: 'Get food categories',
    setFoodCategories: 'Set food categories on store',
    getFoodCategory: 'Get food category',
    setFoodCategory: 'Set food category on store',
    update: 'Food category update',
    delete: 'Food category delete',
    removeFromCollection: 'Remove from collection',
    clearStore: 'Clear store'
}

export const createFoodCategory = createAction(
    actionTypes.createFoodCategory,
    props<{ newFoodCategory: FoodCategoryEditDTO }>()
);

export const getFoodCategory = createAction(
    actionTypes.getFoodCategory,
    props<{ foodCategoryId: string }>()
);

export const setFoodCategory = createAction(
    actionTypes.setFoodCategory,
    props<{ foodCategory: FoodCategory }>()
);

export const getFoodCategories = createAction(
    actionTypes.getFoodCategories
);

export const setFoodCategories = createAction(
    actionTypes.setFoodCategories,
    props<{ foodCategories: any[] }>()
);

export const updateFoodCategory = createAction(
    actionTypes.update,
    props<{ foodCategory: FoodCategory }>()
);

export const deleteFoodCategory = createAction(
    actionTypes.delete,
    props<{ id: string }>()
);

export const removeFromColletion = createAction(
    actionTypes.removeFromCollection,
    props<{ id: string }>()
);

export const clearStore = createAction(
    actionTypes.clearStore
);