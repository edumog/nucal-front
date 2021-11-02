import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CreateUserDTO } from '@core/interfaces/dtos/create-user-dto';
import * as fromRoot from '@core/store/index';

import { createUser, login, logout } from '@security/store/security.actions';
import { Observable } from 'rxjs';

import { Login } from '@core/interfaces/dtos/login.dto';
import { User } from '@core/interfaces/models/user.interface';
import { selectUser, selectUserRoles } from '../store/selectors';



@Injectable({
  providedIn: 'root'
})
export class AccountFacadeService {

  private _user$: Observable<User | undefined | null> = this.store.select(selectUser);
  public getUser() { return this._user$ };
  private _userRoles$: Observable<Array<string>> = this.store.select(selectUserRoles)
  public getUserRoles() { return this._userRoles$ }

  constructor(private store: Store<fromRoot.mainState>) { }

  public createUser(newUser: CreateUserDTO) {
    this.store.dispatch(createUser({ newUser }));
  }

  public login(credentials: Login) {
    this.store.dispatch(login({ credentials }));
  }

  public logout() { 
    this.store.dispatch(logout());
  }
}
