import { ActionReducer } from '@ngrx/store';


export function securityMetareducer(reducer: ActionReducer<any>) {
    return function (state: any, action: any): ActionReducer<any> {
        const loggedUser = JSON.parse(localStorage.getItem('usr')!);
        const refreshToken = localStorage.getItem('rft');
        const userRoles = localStorage.getItem('usrRoles');
        return (loggedUser && refreshToken) ? reducer(getLoggedUser(loggedUser, userRoles), action) : reducer(state, action);
    }
}

function getLoggedUser(loggedUser: any, userRoles: any): any {
    return {
        isLoading: false,
        loggedUser: {
            id: loggedUser.id,
            userName: loggedUser.userName,
            firstName: loggedUser.firstName,
            lastName: loggedUser.lastName,
            email: loggedUser.emal,
            token: loggedUser.token
        },
        userRoles
    }
}
