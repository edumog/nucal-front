import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { SecurityEffects } from './store/security.effects';
import { SecurityReducer } from './store/security.reducer';
import { securityFeatureKey } from './store/selectors';
import { securityMetareducer } from './store/security.metareducer';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(securityFeatureKey, SecurityReducer, { metaReducers: [securityMetareducer]}),
    EffectsModule.forFeature([SecurityEffects])
  ]
})
export class SecurityModule { }
