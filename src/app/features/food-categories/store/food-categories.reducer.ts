import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { FoodCategory } from '@core/interfaces/models/food-category.interface';
import * as actions from '@food-categories/store/food-categories.actions';

export interface State extends EntityState<FoodCategory> {
    isLoading: boolean;
    selectedEntityId: number | string;
}

export const adapter: EntityAdapter<FoodCategory> = createEntityAdapter<FoodCategory>();

const initialState: State = adapter.getInitialState({
    ids: [],
    entities: {},
    selectedEntityId: '',
    isLoading: false
});

export const foodCategoryReducer = createReducer(
    initialState,
    on(actions.createFoodCategory, state => ({ ...state, isLoading: true })),
    on(actions.getFoodCategories, state => ({ ...state, isLoading: true })),
    on(actions.setFoodCategories, (state, { foodCategories }) => {
        return adapter.setAll(foodCategories, { ...state, isLoading: false })
    }),
    on(actions.getFoodCategory, state => ({ ...state, isLoading: true })),
    on(actions.setFoodCategory, (state, { foodCategory }) => {
        return adapter.setOne(foodCategory, { ...state, isLoading: false, selectedEntity: foodCategory, selectedEntityId: foodCategory.id })
    }),
    on(actions.removeFromColletion, (state, { id }) => {
        return adapter.removeOne(id, state);
    }),
    on(actions.clearStore, (state) => ({ ...state, selectedEntity: null, selectedEntityId: '' }))
);

export function reducer(state: State | undefined, action: Action) {
    return foodCategoryReducer(state, action);
}

export const getSelectedFoodCategoryId = (state: State) => state.selectedEntityId;

export const getLoadingState = (state: State) => state.isLoading;

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();

export const selectAllFoodCategories = selectAll;
export const selectFoodCategoryEntities = selectEntities;
export const selectFoodCategoriesIds = selectIds;
export const selectFoodCategoriesTotal = selectTotal;
