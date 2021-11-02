import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { HttpService } from "@core/services/http/http.service";
import * as actions from './consumed-foods.actions'
import { catchError, exhaustMap, map } from "rxjs/operators";
import { setCurrentFood, setConsumptionOfTheDay, getDailyConsumptionByKey } from "./consumed-foods.actions";
import { throwError } from "rxjs";

import { IndexedDbService } from '../services/indexed-db/indexed-db.service';


@Injectable()
export class FoodsEffects {

    private endpoint: string = 'foods'

    constructor(private actions$: Actions, private http: HttpService, private dbService: IndexedDbService, public dialog: MatDialog) {

    }

    createDailyConsumption$ = createEffect(() => this.actions$.pipe(
        ofType(actions.createConsumptionOfTheDay),
        exhaustMap(action => (
            this.dbService.registerDay(action.newDailyConsumption).pipe(
                map((key) => getDailyConsumptionByKey({key})),
                catchError((error) => throwError(error))
            )
        ))
    ));

    getDailyConsumption$ = createEffect(() => this.actions$.pipe(
        ofType(actions.getDailyConsumption),
        exhaustMap(action => (
            this.dbService.getByDate(action.date, action.userId).pipe(
                map((dailyConsumption: any) => setConsumptionOfTheDay({ dailyConsumption })),
                catchError((error) => throwError(error))
            )
        ))
    ));

    getDailyConsumptionByKey$ = createEffect(() => this.actions$.pipe(
        ofType(actions.getDailyConsumptionByKey),
        exhaustMap(action => (
            this.dbService.getByKey(action.key).pipe(
                map((dailyConsumption: any) => setConsumptionOfTheDay({ dailyConsumption })),
                catchError((error) => throwError(error))
            )
        ))
    ));

    updateConsumption$ = createEffect(() => this.actions$.pipe(
        ofType(actions.updateDailyConsumption),
        exhaustMap(action => (
            this.dbService.updateDay(action.dailyConsumption).pipe(
                map((dailyConsumption: any) => setConsumptionOfTheDay({ dailyConsumption })),
                catchError((error) => throwError(error))
            )
        ))
    ));

    getFood$ = createEffect(() => this.actions$.pipe(
        ofType(actions.getFood),
        exhaustMap(action =>
            this.http.getEntityById(this.endpoint, action.foodId).pipe(
                map((food: any) => setCurrentFood({ food })),
                catchError((error) => throwError(error))
            )
        )
    ));
}