// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// Components
import { EditModalComponent } from './food-categories/edit-modal/edit-modal.component';
import { FoodCategoriesComponent } from './food-categories/food-categories.component';
// Custom
import { FoodCategoriesRoutingModule } from './food-categories-routing.module';
import { foodcategoriesFeatureKey } from './store/selectors';
import { FoodCategoriesEffects } from './store/food-categories.effects';
import { foodCategoryReducer } from './store/food-categories.reducer';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [EditModalComponent, FoodCategoriesComponent],
  imports: [
    CommonModule,
    FoodCategoriesRoutingModule,
    SharedModule,
    StoreModule.forFeature(foodcategoriesFeatureKey, foodCategoryReducer),
    EffectsModule.forFeature([FoodCategoriesEffects])
  ]
})
export class FoodCategoriesModule { }
