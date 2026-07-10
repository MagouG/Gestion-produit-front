import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(KeycloakService);

  // Ne toucher qu'aux appels vers notre API
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  // Rafraîchit le token s'il expire dans moins de 30 s, puis ajoute le header
  return from(keycloak.updateToken(30)).pipe(
    switchMap(async () => {
      const token = await keycloak.getToken();
      const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;
      return authReq;
    }),
    switchMap((authReq) => next(authReq))
  );
};
