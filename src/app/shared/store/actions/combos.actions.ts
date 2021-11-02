import { createAction, props } from "@ngrx/store";

import { Combobox } from "@core/interfaces/dtos/combobox.dto";
import { FoodsCombo } from "@core/interfaces/dtos/food-categories-combobox.dto";

export const actionTypes = {
    getFoodCategories: 'Get food categories',
    setFoodCategories: 'Set food categories',
    getComboFoods: 'Get combo foods',
    setFoods: 'Set foods'
}

export const getFoodCategories = createAction(actionTypes.getFoodCategories);

export const setFoodCategories = createAction(
    actionTypes.setFoodCategories,
    props<{ foodCategories: Combobox[] }>()
);

export const getFoods = createAction(actionTypes.getComboFoods);

export const setFoods = createAction(
    actionTypes.setFoods,
    props<{ foods: FoodsCombo[] }>()
);
