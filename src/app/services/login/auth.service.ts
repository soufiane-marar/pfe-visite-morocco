import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as jwt_decode from 'jwt-decode';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  /**
   * @description check if is logged in
   * @return boolean
   */
  public get loggedIn(): boolean {
    return (localStorage.getItem(environment.token_key) !== null);
  }

  checkservertoken(): Observable<any> {
    return this.http.get(`${environment.api_url}/api/verifyAuth`);
  }

  /**
   *
   * @returns Observable
   * @param body
   */
  login(body: { username: any, password: any }): Observable<any> {
    return this.http.post(`${environment.api_url}/api/login`, body);
  }

  /**
   * @description remove token from storage to logout
   */
  logout(): void {
    localStorage.removeItem(environment.token_key);
  }

  /**
   * @description get access token from local storage
   * @returns string
   */
  getToken(): string {
    return localStorage.getItem(environment.token_key);
  }

  /**
   * @description get decoded token payload
   * @returns Object
   */
  getDecodedToken(): any {
    let token: string = localStorage.getItem(environment.token_key);

    if (!token) {
      return null;
    }

    return jwt_decode(token);
  }

  /**
   * @description save access token in local storage
   * @param token
   */
  setToken(token: string): void {
    localStorage.setItem(environment.token_key, token);
  }

  /**
   * @description get token expiration date
   * @param token
   * @returns Date
   */
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  /**
   * @description check if token is expired
   * @param token
   * @returns boolean
   */
  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
}
