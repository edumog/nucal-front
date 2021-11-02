import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AccountFacadeService } from '../services/account-facade.service';
import { User } from '@core/interfaces/models/user.interface';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  private user$ = this.storeFacade.getUser();
  constructor(private storeFacade: AccountFacadeService, private router: Router) { 
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.user$.pipe(
      tap((user: any) => {
        if(user) this.router.navigateByUrl('/inicio');
      }),
      map((user: any) => (user) ? false : true));
  }
}
