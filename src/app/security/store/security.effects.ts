import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { HttpService } from "@core/services/http/http.service";
import { createUser, login, logout, setUser, setUserOnStorage } from '@security/store/security.actions';
import { catchError, exhaustMap, switchMap, tap } from "rxjs/operators";
import { CreateUserDTO } from "@base/app/core/interfaces/dtos/create-user-dto";
import { throwError } from "rxjs";
import { Login } from "@core/interfaces/dtos/login.dto";
import { AccountService } from "../services/account.service";
import { Router } from "@angular/router";

@Injectable()
export class SecurityEffects {

    private registerEndpoint: string = 'account/register';
    private loginEndpoint: string = 'account/login';

    constructor(
        private actions$: Actions, 
        private http: HttpService, 
        public dialog: MatDialog,
        private accountService: AccountService, 
        private router: Router
    ) { }

    createUser$ = createEffect(() => this.actions$.pipe(
        ofType(createUser),
        exhaustMap(action =>
            this.http.register<CreateUserDTO>(action.newUser, this.registerEndpoint).pipe(
                switchMap((response: any) => [
                    setUser({ loggedUser: response, userRoles: response.userRoles }),
                    setUserOnStorage({ ...response })
                ]),
                tap(() => this.router.navigate(['inicio'])),
                catchError((error) => throwError(error))
            )
        )
    ));

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        exhaustMap(action => 
            this.http.register<Login>(action.credentials, this.loginEndpoint).pipe(
                tap(() => this.router.navigate(['app/inicio'])),
                switchMap((response: any) => [
                    setUser({ loggedUser: { ...response.user }, userRoles: response.userRoles }),
                    setUserOnStorage({ ...response })
                ]),
                catchError((error) => throwError(error))
            )
        )
    ));

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(logout),
        tap(() => {
            this.accountService.cleanStorage();
            this.router.navigate(['app/inicio'])
        })
    ), { dispatch: false });

    setUserOnStorage$ = createEffect(() => this.actions$.pipe(
        ofType(setUserOnStorage),
        tap((action: any) => this.accountService.saveOnStorage(action.user, action.userRoles, { value: action.refreshToken }))
    ), { dispatch: false });
}