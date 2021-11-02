import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as actions from '@consumed-foods/store/consumed-foods.actions';
import { FoodWithDetails } from '@core/interfaces/dtos/food-with-details.dto';
import { DailyConsumption } from '@base/app/core/interfaces/models/daily-consumption.interface';
import { Action, createReducer, on } from '@ngrx/store';

export interface State extends EntityState<DailyConsumption> {
    isLoading: boolean;
    selectedEntity: FoodWithDetails | undefined | null;
    selectedEntityId: number | string;
    dailyConsumption: DailyConsumption;
}

export const adapter: EntityAdapter<DailyConsumption> = createEntityAdapter<DailyConsumption>();

export const initialState: State = adapter.getInitialState({
    entities: {},
    isLoading: false,
    selectedEntity: null,
    selectedEntityId: '',
    dailyConsumption: { date: '', plates: [], userId: '' }
});

export const consumedFoodReducer = createReducer(
    initialState,
    on(actions.createConsumptionOfTheDay, (state) => ({ ...state, isLoading: true })),
    on(actions.setConsumptionOfTheDay, (state, { dailyConsumption }) => ({
        ...state,
        dailyConsumption,
        isLoading: false
    })),
    on(actions.getFood, (state) => ({ ...state, isLoading: true })),
    on(actions.setCurrentFood, (state, { food }) => ({ 
        ...state, 
        selectedEntityId: food.id, 
        selectedEntity: food, 
        isLoading: false 
    })),
    on(actions.removeCurrentFood, (state) => ({
        ...state,
        selectedEntityId: '',
        selectedEntity: null
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return consumedFoodReducer(state, action);
}

export const getLoadingState = (state: State) => state.isLoading;

export const getSelectedFood = (state: State) => state.selectedEntity;

export const getDailyConsumption = (state: State) => state.dailyConsumption;