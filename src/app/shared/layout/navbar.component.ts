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
      <div class="brand">
        <a routerLink="/">GestionProduits</a>
      </div>

      <ul class="links" *ngIf="auth.isLoggedIn">
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Produits</a></li>
        <li><a routerLink="/profil" routerLinkActive="active">Profil</a></li>
        <li *ngIf="auth.isAdmin()"><a routerLink="/users" routerLinkActive="active">Utilisateurs</a></li>
      </ul>

      <div class="account">
        <ng-container *ngIf="auth.isLoggedIn; else loggedOut">
          <span class="user">{{ auth.username }}</span>
          <button (click)="auth.logout()">Déconnexion</button>
        </ng-container>
        <ng-template #loggedOut>
          <button (click)="auth.login()">Connexion</button>
        </ng-template>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex; align-items: center; gap: 1.5rem;
      padding: .75rem 1.25rem; background: #1f2937; color: #fff;
    }
    .brand a { color: #fff; font-weight: 700; text-decoration: none; }
    .links { display: flex; gap: 1rem; list-style: none; margin: 0; padding: 0; }
    .links a { color: #cbd5e1; text-decoration: none; }
    .links a.active { color: #fff; font-weight: 600; }
    .account { margin-left: auto; display: flex; align-items: center; gap: .75rem; }
    .user { color: #cbd5e1; font-size: .9rem; }
    button { cursor: pointer; padding: .4rem .8rem; }
  `],
})
export class NavbarComponent {
  readonly auth = inject(AuthService);
}
