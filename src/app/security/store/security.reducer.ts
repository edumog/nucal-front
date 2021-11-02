import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { User } from '@core/interfaces/models/user.interface';
import * as actions from '@security/store/security.actions';

export interface State {
    loggedUser: User | null;
    userRoles: Array<string>;
    isLoading: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: State = adapter.getInitialState({
    loggedUser: null,
    userRoles: [],
    isLoading: false
});

export const SecurityReducer = createReducer(
    initialState,
    on(actions.setUser, (state, { loggedUser, userRoles }) => ({ ...state, loggedUser: loggedUser, userRoles })),
    on(actions.logout, (state) => ({ loggedUser: null, userRoles: [], isLoading: false }))
);

export function reducer(state: State | undefined, action: Action) {
    return SecurityReducer(state, action);
}

export const getCurrentUser = (state: State) => state.loggedUser;

export const getLoadingState = (state: State) => state.isLoading;

export const getUserRoles = (state: State) => state.userRoles;

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();

export const selectAllUsers = selectAll;
export const selectUserEntities = selectEntities;
export const selectUsersIds = selectIds;
export const selectUsersTotal = selectTotal;