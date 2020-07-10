import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {AlertBoxService} from './alert-box.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private alertBoxService: AlertBoxService) {
  }

  /**
   * @description add necessary headers to request
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: string = localStorage.getItem(environment.token_key);

    if (token) {
      request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    }

    request = request.clone({headers: request.headers.set('Accept', 'application/json')});

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          /*if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
          }*/
          return event;
        },
        catchError((error: HttpErrorResponse) => {

          return throwError(error);
        })));
  }
}
