import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreRoutingModule } from '@core/core-routing.module';
import { paths } from '@core/enums';
import { LoginComponent } from './security/auth/login/login.component';
import { RegisterComponent } from './security/auth/register/register.component';
import { LoginGuard } from './security/guards/login.guard';

const routes: Routes = [
  { path: paths.login, component: LoginComponent, canActivate: [LoginGuard] },
  { path: paths.register, component: RegisterComponent, canActivate: [LoginGuard] },
  {
    path: 'app',
    loadChildren: () => import('@core/core.module').then(module => module.CoreModule)
  },
  { path: '', redirectTo: `app/${ paths.home }`, pathMatch: 'full'},
  { path: '**', redirectTo: `app/${ paths.notFound }`, pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CoreRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
