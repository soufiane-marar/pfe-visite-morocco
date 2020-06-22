import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Categorie} from '../interfaces/Categorie';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  public getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${environment.api_url}/categories`);
  }

  public getCategorie(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${environment.api_url}/categories/${id}`);
  }

  public addCategorie(info: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${environment.api_url}/categories`, info);
  }

  public editCategorie(info: any, id: number): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/categories/${id}`, info);
  }

  public deleteCategorie(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/categories/${id}`);
  }
}
