import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { TestInterceptor } from './core/interceptors/test.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  // provideHttpClient(withInterceptors([authInterceptor]))
    // provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TestInterceptor,
      multi: true
    }
  ]
};
