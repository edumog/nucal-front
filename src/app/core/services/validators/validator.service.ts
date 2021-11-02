import { environment } from '@base/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AccountService } from '@base/app/security/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  private baseUrl = `${environment.base_url}`;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  public getByName(endpoint: string, name: string) {
    const url = `${ this.baseUrl }${ endpoint }/getByName/${ name }`;
    this.accountService.setTokenRefresh(false);
    return this.http.get(url);
  }
}
