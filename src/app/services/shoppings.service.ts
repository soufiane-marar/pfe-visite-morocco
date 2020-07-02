import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingsService {


  constructor(private http: HttpClient) {
  }

  public getShoppings(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/shoppings`);
  }

  public getShopping(id: string): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/shoppings/${id}`);
  }

  public addShopping(info: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/shoppings`, info);
  }

  public editShopping(info: any, id: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/shoppings/${id}`, info);
  }

  public deleteShopping(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/shoppings/${id}`);
  }
}
