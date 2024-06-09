import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/internal/Observable';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router'
import { Injectable } from '@angular/core';

// Sino estuviera este decorador no funciona constructor(private router: Router), sale error
@Injectable({
  providedIn: 'root'
})

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

    // return next.handle(peticion)
    // return next.handle(peticion).pipe(tap(() => {}, // El operador tap no tiene una firma que maneje errores directamente
    //   (error: any) => {
    //     if (error instanceof HttpErrorResponse) {
    //       if (error.status !== 401) {
    //         return;
    //       }

    //       localStorage.removeItem('access_token');

    //       this.router.navigate(['auth/login']);
    //     }
    //   }
    //   ))

    // En su lugar, deberías usar tap para efectos secundarios en las emisiones de datos y catchError para manejar errores.
    return next.handle(peticion).pipe(
      tap(() => {
        // Aquí puedes realizar efectos secundarios en las emisiones exitosas
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('access_token');
          this.router.navigate(['auth/login']);
        }
        return throwError(() => error);
      })
    );

    // return next.handle(peticion).pipe(
    //   catchError((err: HttpErrorResponse) => {

    //     if (err.status === 401) {
    //       this.router.navigateByUrl('auth/login');
    //     }

    //     return throwError( err );

    //   })
    // );

  }

};
