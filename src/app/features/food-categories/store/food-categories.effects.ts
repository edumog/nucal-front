import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';

import { HttpService } from '@core/services/http/http.service';
import { errorMessages, InformationDialogParameters } from '@food-categories/enums';

import {
    createFoodCategory,
    getFoodCategories,
    getFoodCategory,
    setFoodCategories,
    setFoodCategory,
    updateFoodCategory,
    deleteFoodCategory, 
    removeFromColletion } from './food-categories.actions';
import { FoodCategoryEditDTO } from '@core/interfaces/dtos/food-category.edit.dto';
import { InformationDialogComponent } from '@base/app/shared/components/dialogs/information-dialog/information-dialog.component';

@Injectable()
export class FoodCategoriesEffects {

    private endpoint: string = 'foodCategories'

    constructor(private actions$: Actions, private http: HttpService, public dialog: MatDialog) {
    }

    registerFoodCategory$ = createEffect(() => this.actions$.pipe(
        ofType(createFoodCategory),
        exhaustMap(action =>
            this.http.register<FoodCategoryEditDTO>(action.newFoodCategory, this.endpoint).pipe(
                map((foodCategory: any) => setFoodCategory({ foodCategory })),
                tap(() => this.dialog.open(InformationDialogComponent, { data: { title: InformationDialogParameters.titleConfirmationCreation, icon: 'done' }})),
                catchError((error) => throwError(error))
            )
        )
    ));

    getFoodCategories$ = createEffect(() => this.actions$.pipe(
        ofType(getFoodCategories),
        mergeMap(() =>
            this.http.getAllEntities(this.endpoint).pipe(
                map((foodCategories: any) => setFoodCategories({ foodCategories })),
                catchError((error) => throwError(error))
            ),
        ),
    ));

    getFoodCategory$ = createEffect(() => this.actions$.pipe(
        ofType(getFoodCategory),
        exhaustMap(action =>
            this.http.getEntityById(this.endpoint, action.foodCategoryId).pipe(
                map((foodCategory: any) => setFoodCategory({ foodCategory })),
                catchError((error) => throwError(error))
            )
        )
    ));

    updateFoodCategory$ = createEffect(() => this.actions$.pipe(
        ofType(updateFoodCategory),
        exhaustMap(action =>
            this.http.updateEntity<FoodCategoryEditDTO>(this.endpoint, action.foodCategory, action.foodCategory.id).pipe(
                map(() => getFoodCategory({ foodCategoryId: action.foodCategory.id })),
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

    deleteFoodCategory$ = createEffect(() => this.actions$.pipe(
        ofType(deleteFoodCategory),
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
