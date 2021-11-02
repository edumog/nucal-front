import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { FoodWithDetails } from '@base/app/core/interfaces/dtos/food-with-details.dto';
import { Food } from '@core/interfaces/models/food.interface';
import * as actions from '@foods/store/foods.actions';

export interface State extends EntityState<Food> {
    isLoading: boolean;
    selectedEntity: FoodWithDetails | undefined | null,
    selectedEntityId: number | string;
}

export const adapter: EntityAdapter<Food> = createEntityAdapter<Food>();

const initialState: State = adapter.getInitialState({
    ids: [],
    entities: {},
    selectedEntity: null,
    selectedEntityId: '',
    isLoading: false
});

export const foodReducer = createReducer(
    initialState,
    on(actions.createFood, state => ({ ...state, isLoading: true })),
    on(actions.getFoods, state => ({ ...state, isLoading: true })),
    on(actions.setFoods, (state, { foods }) => {
        return adapter.setAll(foods, { ...state, isLoading: false })
    }),
    on(actions.getFood, state => ({ ...state, isLoading: true })),
    on(actions.setFood, (state, { food }) => {
        return adapter.setOne(food, { ...state, isLoading: false })
    }),
    on(actions.setCurrentFood, (state, { food }) => ({ ...state, isLoading:false, selectedEntity: food, selectedEntityId: food.id })),
    on(actions.removeCurrentFood, (state) => ({ ...state, selectedEntity: null, selectedEntityId: '' })),
    on(actions.removeFromColletion, (state, { id }) => {
        return adapter.removeOne(id, state);
    }),
    on(actions.clearStore, (state) => ({ ...state, selectedEntity: null, selectedEntityId: '' }))
);

export function reducer(state: State | undefined, action: Action) {
    return foodReducer(state, action);
}

export const getSelectedFoodId = (state: State) => state.selectedEntityId;

export const getSelectedFood = (state: State) => state.selectedEntity;

export const getLoadingState = (state: State) => state.isLoading;

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();

export const selectAllFoods = selectAll;
export const selectFoodEntities = selectEntities;
export const selectFoodsIds = selectIds;
export const selectFoodsTotal = selectTotal;
