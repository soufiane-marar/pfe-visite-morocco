import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {City} from '../interfaces/City';
import {Categorie} from '../interfaces/Categorie';

@Injectable({
  providedIn: 'root'
})
export class EndroitService {

  constructor(private http: HttpClient) {
  }

  public getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.api_url}/cities`);
  }

  public getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${environment.api_url}/categories`);
  }

  public getCity(id: number, cities: City[]): City {

    for (let i = 0; i < cities.length; i++) {
      if (cities[i].id == id) {
        return cities[i];
      }
    }
    return null;
  }

  public getCategorie(id: number, categorie: Categorie[]): Categorie {

    for (let i = 0; i < categorie.length; i++) {
      if (categorie[i].id == id) {
        return categorie[i];
      }
    }
    return null;
  }

  public removeFromArray<T>(item: T, array: T[]): T[] {

    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

}
