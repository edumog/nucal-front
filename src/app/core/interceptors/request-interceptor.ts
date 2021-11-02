import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '@base/app/security/services/account.service';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken: string = this.accountService.getUserToken();
    if(userToken){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${ userToken }`
      })
      req = req.clone({
        headers
      });
    }
    return next.handle(req);
  }
}
