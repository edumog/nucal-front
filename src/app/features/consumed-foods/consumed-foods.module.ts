import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@base/app/shared/shared.module';
import { ConsumedFoodsComponent } from './consumed-foods/consumed-foods.component';
import { FoodSelectionComponent } from './consumed-foods/food-selection/food-selection.component';
import { NutritionalInformationComponent } from './consumed-foods/nutritional-information/nutritional-information.component';
import { SecurityModule } from '@security/security.module';
import { dbConfig } from './services/indexed-db/indexed-db-config';
import { consumedFoodsFeatureKey } from './store/selectors';
import { consumedFoodReducer } from './store/consumed-foods.reducer';
import { FoodsEffects } from './store/consumed-foods.effects';
import { FilterFoodsPipe } from './pipes/filter-foods.pipe';
import { ResultComponent } from './consumed-foods/result/result.component';
import { TablesComponent } from './consumed-foods/tables/tables.component';
import { ConsumedFormComponent } from './consumed-foods/consumed-form/consumed-form.component';


@NgModule({
  declarations: [ConsumedFoodsComponent, FilterFoodsPipe, FoodSelectionComponent, NutritionalInformationComponent, ResultComponent, TablesComponent, ConsumedFormComponent],
  imports: [
    CommonModule,
    SecurityModule,
    SharedModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    StoreModule.forFeature(consumedFoodsFeatureKey, consumedFoodReducer),
    EffectsModule.forFeature([FoodsEffects]),
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  exports: [ConsumedFoodsComponent]
})
export class ConsumedFoodsModule { }
