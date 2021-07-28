import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(private ls: LoginService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        console.log('Username ou de mot passe incorrect');
        // this.router.navigate(['login']);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
