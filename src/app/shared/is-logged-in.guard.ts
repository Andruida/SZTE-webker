import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return new Promise((resolve, reject) => {
    auth.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        resolve(true);
      } else {
        resolve(router.createUrlTree(['/login']));
      }
    });
  });
};
