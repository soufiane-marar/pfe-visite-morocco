import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CulturesService {

  constructor(private http: HttpClient) {
  }

  public getCultures(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/cultures`);
  }

  public getCulture(id: string): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/cultures/${id}`);
  }

  public addCulture(info: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/cultures`, info);
  }

  public editCulture(info: any, id: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/cultures/${id}`, info);
  }

  public deleteCulture(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/cultures/${id}`);
  }
}
