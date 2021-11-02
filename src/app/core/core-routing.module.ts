import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { paths } from '@core/enums';
import { IndexComponent } from './components/index/index.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [{
  path: 'app',
  component: MainComponent,
  children: [
    { 
      path: paths.foods,
      canActivate: [AdminGuard],
      loadChildren: () => import('@foods/foods.module')
      .then(module => module.FoodsModule) 
    },
    {
      path: paths.foodCategories,
      canActivate: [AdminGuard],
      loadChildren: () => import('@food-categories/food-categories.module')
        .then(module => module.FoodCategoriesModule)
    },
    { path: paths.home, component: IndexComponent },
    { path: paths.notFound, component: NotFoundComponent },
    { path: '', redirectTo: paths.home, pathMatch: 'full' },
    { path: '**', redirectTo: paths.notFound, pathMatch: 'full' },
  ]
}]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
