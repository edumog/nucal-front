import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSecurity from '@security/store/security.reducer';

export const securityFeatureKey = 'SECURITY_REDUCER';

export const selectSecurityState = createFeatureSelector<fromSecurity.State>(securityFeatureKey);

export const selectUser = createSelector(
    selectSecurityState,
    fromSecurity.getCurrentUser
);

export const selectUserRoles = createSelector(
    selectSecurityState,
    fromSecurity.getUserRoles
);

export const selecLoadingState = createSelector(
    selectSecurityState,
    fromSecurity.getLoadingState
)
