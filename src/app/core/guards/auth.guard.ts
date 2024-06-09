import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('GUARDS');

  const router = inject(Router);

  // const token = localStorage.getItem('access_token') || '';
  const token = localStorage.getItem('access_token');

  if (token && token.length > 0) {
    return true
  } else {
    // router.navigate(['/auth/login']);
    // return false;
    return router.createUrlTree(['/auth/login']);
  }

};
