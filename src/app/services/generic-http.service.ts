import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOptions } from './query-options';
import { AppGlobals } from '../shared/app.global';

@Injectable({
  providedIn: 'root'
})

export class Resource {
  public Id: number ;
}

export interface Serializer {
  fromJson(json: any): Resource;
  toJson(resource: Resource): any;
}

export class GenericHttpService<T extends Resource> {
  constructor(
    private appGlobals: AppGlobals,
    private httpClient: HttpClient,
    private serializer: Serializer) {}
  public create(item: T, endpoint: string): Observable<T> {
    return this.httpClient
      .post<T>(`${this.appGlobals.apiUrl}/${endpoint}`, this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }
  public update(item: T, endpoint: string): Observable<T> {
    return this.httpClient
      .put<T>(`${this.appGlobals.apiUrl}/${endpoint}/${item.Id}`, this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }
  public read(id: number, endpoint: string): Observable<T> {
    return this.httpClient
      .get(`${this.appGlobals.apiUrl}/${endpoint}/${id}`)
      .pipe(map((data: any) => this.serializer.fromJson(data) as T));
  }
  public list(queryOptions: QueryOptions, endpoint: string): Observable<T[]> {
    return this.httpClient
      .get(`${this.appGlobals.apiUrl}/${endpoint}?${queryOptions.toQueryString()}`)
      .pipe(map((data: any) => this.convertData(data.items)));
  }
  public getAll(endpoint: string): Observable<T[]> {
    return this.httpClient
      .get(`${this.appGlobals.apiUrl}/${endpoint}`)
      .pipe(map((data: any) => this.convertData(data.items)));
  }
  public delete(id: number, endpoint: string) {
    return this.httpClient
      .delete(`${this.appGlobals.apiUrl}/${endpoint}/${id}`);
  }
  private convertData(data: any): T[] {
    return data.map(item => this.serializer.fromJson(item));
  }
}
