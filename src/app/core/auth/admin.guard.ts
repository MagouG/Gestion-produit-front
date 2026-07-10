import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

export const adminGuard: CanActivateFn = async () => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  if (!keycloak.isLoggedIn()) {
    await keycloak.login({ redirectUri: window.location.href });
    return false;
  }
  if (keycloak.isUserInRole('Admin')) return true;

  router.navigate(['/forbidden']);
  return false;
};
