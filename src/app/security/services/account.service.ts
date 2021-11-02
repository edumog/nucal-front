import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { environment } from '@base/environments/environment'
import { User } from '@core/interfaces/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public keepLoggedIn: boolean = (localStorage.getItem('rft')) ? true : false;
  public shouldTokenBeRefreshed: boolean = true;
  private url = `${environment.base_url}account/refresh-token`;

  constructor(private http: HttpClient) { }

  public setTokenRefresh(shouldTokenBeRefreshed: boolean) {
    this.shouldTokenBeRefreshed = shouldTokenBeRefreshed;
  }

  public userTokenExpired(): boolean {
    const user: User = this.parseUser(localStorage.getItem('usr'));
    const expiration = user? new Date(user.token.expiration) : new Date();
    const expirationUtc = Date.UTC(expiration.getFullYear(), expiration.getMonth(), expiration.getDate(), expiration.getHours(), expiration.getMinutes(), expiration.getSeconds(), expiration.getMilliseconds());
    const currenDate = new Date();
    const currentUtc = Date.UTC(currenDate.getFullYear(), currenDate.getMonth(), currenDate.getDate(), currenDate.getHours(), currenDate.getMinutes(), currenDate.getSeconds(), currenDate.getMilliseconds());
    return (user) ? (currentUtc >= expirationUtc) : false;
  }

  public getUserToken(): string{
    let user: User = this.userOnStorage();
    return user? user.token.token : '';
  }
  private userOnStorage(): User {
    let user: User = this.parseUser(localStorage.getItem('usr'));
    return user? user : this.parseUser(sessionStorage.getItem('usr'));
  }

  public refreshToken() {
    let user: User = { ...this.parseUser(localStorage.getItem('usr'))};
    const refreshToken = this.parseUser(localStorage.getItem('rft'));
    return this.http.post(this.url, { userId: user.id, refreshToken: refreshToken.value }).pipe(
      tap((response: any) => {
        let user = { ...this.parseUser(localStorage.getItem('usr')), token: response.userToken };
        this.saveOnStorage(user, response.userRoles, { value: response.refreshToken });
      })
    );
  }

  private parseUser = (user: string | null): User | any => JSON.parse(user!);

  public saveOnStorage(user: User, userRoles: Array<string>, refreshToken: { value: string }) {
    refreshToken? this.saveOnLocalStorage(user, userRoles, refreshToken) : this.saveOnSessionStorage(user, userRoles, refreshToken);
  }
  private saveOnLocalStorage(user: User, userRoles: Array<string>, refreshToken: { value: string }) {
    this.setOnLocalStorage('usr', user);
    this.setOnLocalStorage('rft', refreshToken);
    this.setOnLocalStorage('usrRoles', userRoles);
  }
  private setOnLocalStorage(key: string, value: any) {
    if(value)
      localStorage.setItem(key, JSON.stringify(value));
  }
  private saveOnSessionStorage(user: User, userRoles: Array<string>, refreshToken: { value: string }) {
    this.setOnSessionStorage('usr', user);
    this.setOnSessionStorage('rft', refreshToken);
    this.setOnSessionStorage('usrRoles', userRoles);
  }
  private setOnSessionStorage(key: string, value: any) {
    if(value)
      sessionStorage.setItem(key, JSON.stringify(value));
  }

  public cleanStorage() {
    this.cleanLocalStorage();
    this.cleanSessionStorage();     
  }
  private cleanLocalStorage() {
    localStorage.removeItem('usr');
    localStorage.removeItem('rft');
    localStorage.removeItem('usrRoles');
  }
  private cleanSessionStorage() {
    sessionStorage.removeItem('usr');
    sessionStorage.removeItem('rft');
    sessionStorage.removeItem('usrRoles');
  }
}
