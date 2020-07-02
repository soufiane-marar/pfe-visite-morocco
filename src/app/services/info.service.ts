import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient) {
  }

  public getInfos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/infos`);
  }

  public getInfo(id: string): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/infos/${id}`);
  }

  public addInfo(info: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/infos`, info);
  }

  public editInfo(info: any, id: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/infos/${id}`, info);
  }

  public deleteInfo(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/infos/${id}`);
  }
}
