import { createReducer, on } from "@ngrx/store"

import { Combobox } from "@core/interfaces/dtos/combobox.dto";
import { FoodsCombo } from "@core/interfaces/dtos/food-categories-combobox.dto";

import * as actions from "@shared/store/actions/combos.actions"

export interface State {
    foodCategories: Combobox[] | null,
    foods: FoodsCombo[] | null,
    isFoodCategoriesLoading: boolean,
    isFoodsLoading: boolean
}

const initialState: State = {
    foodCategories: null,
    foods: null,
    isFoodCategoriesLoading: false,
    isFoodsLoading: false
}

export const combosReducer = createReducer(
    initialState,
    on(actions.getFoodCategories, state => ({ ...state, isFoodCategoriesLoading: true })),
    on(actions.setFoodCategories, (state, { foodCategories }) => ({ ...state, foodCategories, isFoodCategoriesLoading: false })),
    on(actions.getFoods, state => ({ ...state, isFoodsLoading: true })),
    on(actions.setFoods, (state, { foods }) => ({ ...state, foods, isFoodsLoading: false }))
)

export const getFoodCategoriesCombo = (state: State) => state.foodCategories;
export const getLoadStatusOfFoodCategories = (state: State) => state.isFoodCategoriesLoading;

export const getFoodsCombo = (state: State) => state.foods;
export const getLoadStatusOfFoods = (state: State) => state.isFoodsLoading;
