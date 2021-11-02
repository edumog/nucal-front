import { createAction, props } from '@ngrx/store';

import { CreateUserDTO } from '@core/interfaces/dtos/create-user-dto';
import { User } from '@base/app/core/interfaces/models/user.interface';
import { Login } from '@core/interfaces/dtos/login.dto';
import { Token } from '@base/app/core/interfaces/models/token.interface';

export const actionTypes = {
    registerUser: 'Register new user',
    login: 'Login',
    logout: 'Logout',
    setUserOnStore: 'Set user on store',
    setUserOnStorage: 'Set user on local storage'
}

export const createUser = createAction(
    actionTypes.registerUser,
    props<{ newUser: CreateUserDTO }>()
);

export const login = createAction(
    actionTypes.login,
    props<{ credentials: Login }>()
);

export const logout = createAction(actionTypes.logout);

export const setUser = createAction(
    actionTypes.setUserOnStore,
    props<{ loggedUser: User, userRoles: Array<string> }>()
);

export const setUserOnStorage = createAction(
    actionTypes.setUserOnStorage,
    props<{ user: User, userRoles: Array<string>, refreshToken: string }>()
);