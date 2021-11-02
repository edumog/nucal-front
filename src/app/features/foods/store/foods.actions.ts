import { createAction, props } from '@ngrx/store';

import { Food } from '@app/core/interfaces/models/food.interface';
import { FoodEdit } from '@core/interfaces/dtos/food-edit.dto';
import { FoodWithDetails } from '@base/app/core/interfaces/dtos/food-with-details.dto';

export const actionTypes = {
    createFood: 'Create a new food',
    getFoods: 'Get foods',
    setFoods: 'Set foods',
    getFood: 'Get food',
    setFood: 'Set food',
    setCurrentFood: 'Set current food',
    removeCurrentFood: 'Remove current food',
    update: 'Food update',
    delete: 'Food delete',
    removeFromCollection: 'Remove from collection',
    clearStore: 'Clear store'
}

export const createFood = createAction(
    actionTypes.createFood,
    props<{ newFood: FoodEdit }>()
);

export const getFood = createAction(
    actionTypes.getFood,
    props<{ foodId: string }>()
);

export const setFood = createAction(
    actionTypes.setFood,
    props<{ food: Food }>()
);

export const setCurrentFood = createAction(
    actionTypes.setCurrentFood,
    props<{ food: FoodWithDetails }>()
);

export const removeCurrentFood = createAction(
    actionTypes.removeCurrentFood
);

export const getFoods = createAction(
    actionTypes.getFoods
);

export const setFoods = createAction(
    actionTypes.setFoods,
    props<{ foods: Food[] }>()
);

export const updateFood = createAction(
    actionTypes.update,
    props<{ food: FoodWithDetails }>()
);

export const deleteFood = createAction(
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