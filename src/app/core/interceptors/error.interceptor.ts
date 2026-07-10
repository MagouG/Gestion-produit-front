import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const keycloak = inject(KeycloakService);

  return next(req).pipe(
    catchError((err) => {
      switch (err.status) {
        case 401:
          // Token invalide/expiré → relancer le login Keycloak
          keycloak.login({ redirectUri: window.location.href });
          break;
        case 403:
          router.navigate(['/forbidden']);
          break;
        case 501:
          console.warn('Endpoint non encore implémenté côté API :', req.url);
          break;
      }
      return throwError(() => err);
    })
  );
};
