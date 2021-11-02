import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { paths } from '@core/enums';
import * as fromRoot from '@core/store/index';
import { selectUserRoles } from '@security/store/selectors';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private userRoles$: Observable<Array<string>> = this.store.select(selectUserRoles);

  constructor(private store: Store<fromRoot.mainState>, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userRoles$.pipe(
      map(((userRoles: Array<string>) => {
        const isAdministrator: boolean = userRoles.includes('Admin') ? true : this.denyAccess();
        return isAdministrator;
      }))
    );
  }
  private denyAccess(): boolean {
    this.router.navigate([`app/${ paths.home }`]);
    return false;
  }
}
