import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <a routerLink="/" class="navbar-logo">GestionProduits</a>

      <ul class="navbar-links" *ngIf="auth.isLoggedIn">
        <li>
          <a routerLink="/" routerLinkActive="active"
             [routerLinkActiveOptions]="{ exact: true }">Produits</a>
        </li>
        <li>
          <a routerLink="/profil" routerLinkActive="active">Profil</a>
        </li>
        <li *ngIf="auth.isAdmin()">
          <a routerLink="/users" routerLinkActive="active">Utilisateurs</a>
        </li>
      </ul>

      <div class="navbar-account">
        <ng-container *ngIf="auth.isLoggedIn; else loggedOut">
          <span class="navbar-user">{{ auth.username }}</span>
          <button class="navbar-logout" (click)="auth.logout()">Déconnexion</button>
        </ng-container>
        <ng-template #loggedOut>
          <button class="navbar-logout" (click)="auth.login()">Connexion</button>
        </ng-template>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      height: 60px;
      padding: 0 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      background: #fff;
      border-bottom: 1px solid var(--color-border);
      box-shadow: var(--shadow);
    }

    .navbar-logo {
      font-weight: 700;
      font-size: 18px;
      color: var(--color-primary);
      text-decoration: none;
    }

    .navbar-links {
      display: flex;
      align-items: center;
      gap: 4px;
      list-style: none;
      margin: 0;
      padding: 0;
      margin-right: auto;
    }

    .navbar-links a {
      display: inline-block;
      font-size: 14px;
      font-weight: 500;
      color: var(--color-text-muted);
      text-decoration: none;
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      transition: all var(--transition);
    }

    .navbar-links a:hover {
      background: var(--color-primary-light);
      color: var(--color-primary);
    }

    .navbar-links a.active {
      color: var(--color-primary);
      background: var(--color-primary-light);
    }

    .navbar-account {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .navbar-user {
      font-size: 13px;
      color: var(--color-text-muted);
      font-weight: 500;
    }

    .navbar-logout {
      background: transparent;
      border: 1px solid var(--color-border);
      color: var(--color-text-muted);
      padding: 6px 14px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 500;
      font-family: var(--font);
      cursor: pointer;
      transition: all var(--transition);
    }

    .navbar-logout:hover {
      border-color: var(--color-danger);
      color: var(--color-danger);
    }
  `],
})
export class NavbarComponent {
  readonly auth = inject(AuthService);
}
