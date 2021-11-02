import { HttpClient } from '@angular/common/http';
import { environment } from '@base/environments/environment'
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = `${environment.base_url}`;
  private httpOptions: any;

  constructor(private http: HttpClient) { }

  public register<T>(entitie: T, endpoint: string) {
    const url = this.baseUrl + endpoint;
    return this.http.post(url, entitie);
  }

  public getAllEntities(endpoint: string) {
    const url = this.baseUrl + endpoint;
    return this.http.get(url);
  }

  public getEntityById(endpoint: string, id: string) {
    const url = `${ this.baseUrl }${ endpoint }/${ id }`;
    return this.http.get(url);
  }

  public updateEntity<T>(endpoint: string, entitie: T, id: string, ) {
    const url = `${ this.baseUrl }${ endpoint }/${ id }`;
    return this.http.put(url, entitie, this.httpOptions);
  }

  public deleteEntity(endpoint: string, id: string) {
    const url = `${ this.baseUrl }${ endpoint }/${ id }`;
    return this.http.delete(url);
  }
}
