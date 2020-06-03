import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../interfaces/User';
import {Role} from '../interfaces/Role';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api_url}/users`);
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.api_url}/users/${id}`);
  }

  public addUser(user: User): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/users`, user);
  }

  public editUser(user: User, id: number): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/users/${id}`, user);
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/users/${id}`);
  }

  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.api_url}/roles`);
  }

  public getRole(id: number, roles: Role[]): Role {

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].id == id) {
        return roles[i];
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
