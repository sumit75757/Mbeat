import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private router :Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap(() => {},
    (err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
       localStorage.clear()
       this.router.navigate(['auth']);
      }
      else{
        return;
      }
    }
  }));
  }
}
