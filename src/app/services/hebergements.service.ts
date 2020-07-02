import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HebergementsService {

  constructor(private http: HttpClient) {
  }

  public getHebergements(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/hebergements`);
  }

  public getHebergement(id: string): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/hebergements/${id}`);
  }

  public addHebergement(hebergement: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/hebergements`, hebergement);
  }

  public editHebergement(hebergement: any, id: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/hebergements/${id}`, hebergement);
  }

  public deleteHebergement(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/hebergements/${id}`);
  }
}
