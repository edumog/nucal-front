import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodCategoriesComponent } from './food-categories/food-categories.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: FoodCategoriesComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodCategoriesRoutingModule { }
