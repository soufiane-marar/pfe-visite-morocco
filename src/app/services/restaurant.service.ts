import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) {
  }

  public getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/restaurants`);
  }

  public getRestaurant(id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/restaurants/${id}`);
  }

  public addRestaurant(hebergement: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/restaurants`, hebergement);
  }

  public editRestaurant(hebergement: any, id: number): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/restaurants/${id}`, hebergement);
  }

  public deleteRestaurant(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/restaurants/${id}`);
  }
}
