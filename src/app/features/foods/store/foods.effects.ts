import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';

import { HttpService } from '@core/services/http/http.service';
import { errorMessages, InformationDialogParameters } from '@food-categories/enums';

import {
    createFood,
    getFoods,
    getFood,
    setFoods,
    setFood,
    updateFood,
    deleteFood, 
    removeFromColletion, 
    setCurrentFood } from './foods.actions';
import { FoodEdit } from '@core/interfaces/dtos/food-edit.dto';
import { InformationDialogComponent } from '@base/app/shared/components/dialogs/information-dialog/information-dialog.component';
import { FoodWithDetails } from '@base/app/core/interfaces/dtos/food-with-details.dto';

@Injectable()
export class FoodsEffects {

    private endpoint: string = 'foods'

    constructor(private actions$: Actions, private http: HttpService, public dialog: MatDialog) {
    }

    registerFood$ = createEffect(() => this.actions$.pipe(
        ofType(createFood),
        exhaustMap(action =>
            this.http.register<FoodEdit>(action.newFood, this.endpoint).pipe(
                map((food: any) => setFood({ food })),
                tap(() => this.dialog.open(InformationDialogComponent, { data: { title: InformationDialogParameters.titleConfirmationCreation, icon: 'done' }})),
                catchError((error) => throwError(error))
            )
        )
    ));

    getFoods$ = createEffect(() => this.actions$.pipe(
        ofType(getFoods),
        mergeMap(() =>
            this.http.getAllEntities(this.endpoint).pipe(
                map((foods: any) => setFoods({ foods })),
                catchError((error) => throwError(error))
            ),
        ),
    ));

    getFood$ = createEffect(() => this.actions$.pipe(
        ofType(getFood),
        exhaustMap(action =>
            this.http.getEntityById(this.endpoint, action.foodId).pipe(
                map((food: any) => setCurrentFood({ food })),
                catchError((error) => throwError(error))
            )
        )
    ));

    updateFood$ = createEffect(() => this.actions$.pipe(
        ofType(updateFood),
        exhaustMap(action =>
            this.http.updateEntity<FoodWithDetails>(this.endpoint, action.food, action.food.id).pipe(
                map(() =>setFood({ food: { id: action.food.id, name: action.food.name, categories: action.food.categories }})),
                tap(() => this.dialog.open(InformationDialogComponent, { data: { title: InformationDialogParameters.titleConfirmationEdition, icon: 'done' }})),
                catchError((error) => {
                    this.dialog.open(
                        InformationDialogComponent,
                        { data: {
                            title: errorMessages.editError,
                            icon: 'fail',
                            message: error
                        }}
                    )
                    return throwError(error);
                })
            )
        )
    ));

    deleteFood$ = createEffect(() => this.actions$.pipe(
        ofType(deleteFood),
        exhaustMap(action =>
            this.http.deleteEntity(this.endpoint, action.id).pipe(
                map(() => removeFromColletion({ id: action.id })),
                tap(() => this.dialog.open(InformationDialogComponent, { data: { title: InformationDialogParameters.titleConfirmationDeleted, icon: 'done' }})),
                catchError(error => {
                    return throwError(error);
                })
            )    
        )
    ));
}
