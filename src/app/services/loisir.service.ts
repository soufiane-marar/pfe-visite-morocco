import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoisirService {

  constructor(private http: HttpClient) {
  }

  public getLoisirs(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/loisirs`);
  }

  public getLoisir(id: string): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/loisirs/${id}`);
  }

  public addLoisir(loisir: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/loisirs`, loisir);
  }

  public editLoisir(loisir: any, id: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/loisirs/${id}`, loisir);
  }

  public deleteLoisir(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/loisirs/${id}`);
  }
}
