import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login">
      <h1>GestionProduits</h1>
      <p>Connectez-vous pour accéder à l'application.</p>
      <button (click)="auth.login()">Se connecter avec Keycloak</button>
    </div>
  `,
  styles: [`
    .login { max-width: 360px; margin: 15vh auto; text-align: center; }
    button { padding: .75rem 1.5rem; cursor: pointer; }
  `],
})
export class LoginComponent {
  readonly auth = inject(AuthService);
}
