import { createAction, props } from '@ngrx/store';

import { DailyConsumption } from '@base/app/core/interfaces/models/daily-consumption.interface';
import { FoodWithDetails } from '@base/app/core/interfaces/dtos/food-with-details.dto';

export const actionTypes = {
    createConsumptionOfTheDay: 'Create consumption of the day',
    getDailyConsumption: 'Get daily consumption',
    getDailyConsumptionByKey: 'Get daily consumption by key',
    setConsumedFoods: 'Set consumed foods',
    getFood: 'Get food',
    setConsumptionOfTheDay: 'Set consumption of the day',
    setCurrentFood: 'Set current consumed food',
    removeCurrentConsumedFood: 'Remove current consumed food',
    update: 'ConsumedFood update',
    delete: 'ConsumedFood delete',
    removeFromCollection: 'Remove from collection',
    removeCurrentFood: 'Remove current food',
    clearStore: 'Clear store'
}

export const createConsumptionOfTheDay = createAction(
    actionTypes.createConsumptionOfTheDay,
    props<{ newDailyConsumption: DailyConsumption }>()
);

export const getFood = createAction(
    actionTypes.getFood,
    props<{ foodId: string }>()
);

export const setConsumptionOfTheDay = createAction(
    actionTypes.setConsumptionOfTheDay,
    props<{ dailyConsumption: DailyConsumption }>()
);

export const setCurrentFood = createAction(
    actionTypes.setCurrentFood,
    props<{ food: FoodWithDetails }>()
);

export const removeCurrentConsumedFood = createAction(
    actionTypes.removeCurrentConsumedFood
);

export const getDailyConsumption = createAction(
    actionTypes.getDailyConsumption,
    props<{ date: string, userId: string }>()
);

export const getDailyConsumptionByKey = createAction(
    actionTypes.getDailyConsumptionByKey,
    props<{ key: number }>()
)

// export const setConsumedFoods = createAction(
//     actionTypes.setConsumedFoods,
//     props<{ consumedFoods: ConsumedFood[] }>()
// );

export const updateDailyConsumption = createAction(
    actionTypes.update,
    props<{ dailyConsumption: DailyConsumption }>()
);

export const deleteConsumedFood = createAction(
    actionTypes.delete,
    props<{ id: string }>()
);

export const removeFromColletion = createAction(
    actionTypes.removeFromCollection,
    props<{ id: string }>()
);

export const removeCurrentFood = createAction(
    actionTypes.removeCurrentFood
);

export const clearStore = createAction(
    actionTypes.clearStore
);