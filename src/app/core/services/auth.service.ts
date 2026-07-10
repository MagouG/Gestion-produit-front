import { Injectable, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly keycloak = inject(KeycloakService);

  get isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

  get username(): string {
    return this.keycloak.getUsername();
  }

  get roles(): string[] {
    return this.keycloak.getUserRoles(); // realm roles (User, Admin)
  }

  isAdmin(): boolean {
    return this.keycloak.isUserInRole('Admin');
  }

  login(): void {
    this.keycloak.login({ redirectUri: window.location.origin + '/' });
  }

  logout(): void {
    this.keycloak.logout(window.location.origin + '/login');
  }

  loadProfile() {
    return this.keycloak.loadUserProfile();
  }
}
