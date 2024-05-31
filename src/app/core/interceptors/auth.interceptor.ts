import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('------ INTERCEPTOR 1------')

  return next(req);

  // const authToken = '224|Jn2kZ5Yuw5CTfjkJxZ9nP3mE0KsWGfuyjRO8QAdWb512bd12';

  // console.log('------ INTERCEPTOR 1------')

  // const authReq = req.clone({
  //   setHeaders: {
  //     Authorization: `Bearer ${authToken}`
  //   }
  // });

  // return next(authReq);
};
