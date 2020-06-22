import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {City} from '../interfaces/City';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) {
  }

  public getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.api_url}/cities`);
  }

  public getCity(id: number): Observable<City> {
    return this.http.get<City>(`${environment.api_url}/cities/${id}`);
  }

  public addCity(info: City): Observable<City> {
    return this.http.post<City>(`${environment.api_url}/cities`, info);
  }

  public editCity(info: City, id: number): Observable<City> {
    return this.http.put<City>(`${environment.api_url}/cities/${id}`, info);
  }

  public deleteCity(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/cities/${id}`);
  }
}
