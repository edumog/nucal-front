import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { AccountFacadeService } from '@base/app/security/services/account-facade.service';
import { User } from '@core/interfaces/models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<User| undefined | null> = this.storeFacade.getUser();
  private userRoles$: Observable<Array<string>> = this.storeFacade.getUserRoles();
  public isAdministrator: boolean = false;
  
  constructor(private storeFacade: AccountFacadeService) { }

  ngOnInit(): void {
    this.checkIfIsAdministrator();
  }

  checkIfIsAdministrator() {
    this.userRoles$.subscribe((response: Array<string>) => {
      this.isAdministrator = response.includes('Admin');
    })
  }

  public handleLogoutEvent($event: boolean) {
    this.storeFacade.logout();
  }
}
