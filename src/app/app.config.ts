import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { TestInterceptor } from './core/interceptors/test.interceptor';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  // importProvidersFrom(BrowserModule),
  importProvidersFrom(BrowserAnimationsModule), // 'BrowserAnimationsModule', ya contiene 'BrowserModule' https://stackoverflow.com/questions/39286667/browsermodule-has-already-been-loaded-error
  // importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
  // provideHttpClient(withInterceptors([authInterceptor]))
    // provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TestInterceptor,
      multi: true
    }
  ]
};
