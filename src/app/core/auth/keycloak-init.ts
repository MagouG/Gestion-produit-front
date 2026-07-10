import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../../environments/environment';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      initOptions: {
        // check-sso : ne force pas le login au démarrage, laisse les AuthGuard décider
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
        checkLoginIframe: false,
      },
      // On utilise notre authInterceptor fonctionnel explicite (voir auth.interceptor.ts)
      // plutôt que l'intercepteur intégré, pour éviter le double header Authorization.
      enableBearerInterceptor: false,
      bearerExcludedUrls: ['/assets'],
    });
}
