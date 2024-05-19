import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const isLoggedOutGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return new Promise((resolve, reject) => {
    auth.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        resolve(router.createUrlTree(['/']));
      } else {
        resolve(true);
      }
    });
  });
};
