import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) {
  }

  public getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/events`);
  }

  public getEvent(id: string): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/events/${id}`);
  }

  public addEvent(info: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/events`, info);
  }

  public editEvent(info: any, id: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/events/${id}`, info);
  }

  public deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/events/${id}`);
  }
}
