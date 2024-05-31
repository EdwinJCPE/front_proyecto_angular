import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/internal/Observable';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router'

export class TestInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('------ INTERCEPTOR 2 ------');

    // return next.handle(req);

    const token = localStorage.getItem('access_token');

    const peticion = req.clone({
      setHeaders: {
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

      return next.handle(peticion).pipe(
        catchError((err: HttpErrorResponse) => {

          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }

          return throwError( err );

        })
      );
  }

};
