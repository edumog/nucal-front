import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ConsumedFoodsModule } from '@consumed-foods/consumed-foods.module';
import { IndexComponent } from './components/index/index.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CoreRoutingModule } from './core-routing.module';
import { SecurityModule } from '../security/security.module';
import { environment } from 'environments/environment';
import { RequestInterceptor } from './interceptors/request-interceptor';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '@app/shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { ResponseInterceptor } from './interceptors/response-interceptor';
import { AuthOptionsComponent } from './components/header/auth-options/auth-options.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';

@NgModule({
  declarations: [IndexComponent, NotFoundComponent, HeaderComponent, MainComponent, AuthOptionsComponent, NavbarComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    StoreModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    SharedModule,
    SecurityModule,
    ConsumedFoodsModule
  ],
  exports: [
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true   
    }
  ]
})
export class CoreModule { }
