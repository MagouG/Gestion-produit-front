import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-logo">GP</div>
        <h1 class="login-title">GestionProduits</h1>
        <p class="login-subtitle">Connectez-vous pour accéder à votre espace</p>
        <button class="btn btn-primary btn-login" (click)="auth.login()">
          Se connecter
        </button>
        <p class="login-note">
          Vous serez redirigé vers notre portail d'authentification sécurisé.
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  readonly auth = inject(AuthService);
}
