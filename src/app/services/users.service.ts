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

  public readonly roles: Role[] = [
    {libelle: 'admin'},
    {libelle: 'user'},
    {libelle: 'tourist'}
  ];

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

  public changePassword(pwd1: string, pwd2: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/user/changePwd`,
      {
        new_password: pwd1,
        new_password2: pwd2
      }
    );
  }

  public removeFromArray<T>(item: T, array: T[]): T[] {

    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }
}
