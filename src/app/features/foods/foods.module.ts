import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { EditModalComponent } from './foods/edit-modal/edit-modal.component';
import { FoodsComponent } from './foods/foods.component';
import { FoodsRoutingModule } from './foods-routing.module';
import { SharedModule } from '@shared/shared.module';
import { foodsFeatureKey } from './store/selectors';
import { foodReducer } from './store/foods.reducer';
import { FoodsEffects } from './store/foods.effects';

@NgModule({
  declarations: [FoodsComponent, EditModalComponent],
  imports: [
    CommonModule,
    FoodsRoutingModule,
    SharedModule,
    StoreModule.forFeature(foodsFeatureKey, foodReducer),
    EffectsModule.forFeature([FoodsEffects])
  ]
})
export class FoodsModule { }
