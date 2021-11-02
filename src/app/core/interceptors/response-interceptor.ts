import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandler } from '@core/utilities/error-handler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar, private _router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error) => {
        const errorMessage: string = ErrorHandler.getErrorMessage(error);
        this.catchError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
  private catchError(errorMessage: string) {
    this._snackBar.open(errorMessage, '', { duration: 10000 });
    (this._router.url !== '/login')? this._router.navigateByUrl('/app/inicio') : this._router.navigateByUrl(this._router.url);
  }
}
