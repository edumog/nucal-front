import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { throwError } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";

import { HttpService } from "@core/services/http/http.service";
import { getFoods, getFoodCategories, setFoods, setFoodCategories } from '@shared/store/actions/combos.actions';


@Injectable()
export class CombosEffects { 
    
    private foodCategoriesEndpoint: string = 'foodCategories';
    private foodsEndPoint: string = 'foods/getWithCategories';

    constructor(private actions$: Actions, private http: HttpService) {
    }

    getFoodCategories$ = createEffect(() => this.actions$.pipe(
        ofType(getFoodCategories),
        mergeMap(() =>
            this.http.getAllEntities(this.foodCategoriesEndpoint).pipe(
                map((foodCategories: any) => setFoodCategories({ foodCategories })),
                catchError((error) => throwError(error))
            ),
        ),
    ));

    getFoods$ = createEffect(() => this.actions$.pipe(
        ofType(getFoods),
        mergeMap(() => 
            this.http.getAllEntities(this.foodsEndPoint).pipe(
                map((foods: any) => setFoods({ foods })),
                catchError((error) => throwError(error))
            )
        )
    ));
}