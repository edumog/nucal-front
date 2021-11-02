import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '@base/app/security/services/account.service';
import { AccountFacadeService } from '@base/app/security/services/account-facade.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService, private store: AccountFacadeService) { }

  private refreshingToken: boolean = false;

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.accountService.keepLoggedIn && this.accountService.userTokenExpired() && this.accountService.shouldTokenBeRefreshed) {
      return this.refreshToken(req, next);
    }else this.accountService.setTokenRefresh(true);
    return next.handle(req);
  }
  private refreshToken(req: HttpRequest<unknown>, next: HttpHandler) {
    if(!this.refreshingToken && this.accountService.keepLoggedIn && this.accountService.userTokenExpired()) {
      this.refreshingToken = true;
      return this.accountService.refreshToken().pipe(
        tap(() => this.refreshingToken = false),
        switchMap(() => next.handle(req)),
        catchError((error) => {
          this.store.logout();
          return throwError(error)
        })
      );
    }
    return next.handle(req);
  }
}
