import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { UserDto } from '../../models/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Utilisateurs</h1>
        <p class="page-subtitle">Gérez les comptes et leurs accès</p>
      </div>
      <a routerLink="/users/nouveau" class="btn btn-primary">+ Nouvel utilisateur</a>
    </div>

    <div class="card" *ngIf="users().length > 0; else empty">
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Nom complet</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let u of users()">
              <td>{{ u.email }}</td>
              <td>{{ u.firstName }} {{ u.lastName }}</td>
              <td>
                <span class="role-badge" [class.admin]="u.role === 'Admin'">{{ u.role }}</span>
              </td>
              <td>
                <span class="status-badge" [class.active]="u.isActive">
                  {{ u.isActive ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td>
                <div class="actions">
                  <a [routerLink]="['/users', u.id]" class="btn btn-sm btn-secondary">Éditer</a>
                  <button class="btn btn-sm btn-secondary" (click)="toggle(u)">
                    {{ u.isActive ? 'Désactiver' : 'Activer' }}
                  </button>
                  <button class="btn btn-sm btn-danger" (click)="remove(u.id)">Supprimer</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ng-template #empty>
      <div class="empty-state">
        <div class="empty-icon">👥</div>
        <p class="empty-title">Aucun utilisateur</p>
        <p class="empty-desc">Ajoutez un utilisateur pour commencer.</p>
        <a routerLink="/users/nouveau" class="btn btn-primary">+ Nouvel utilisateur</a>
      </div>
    </ng-template>
  `,
})
export class UsersListComponent implements OnInit {
  private readonly service = inject(UserService);
  users = signal<UserDto[]>([]);

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll(1, 50).subscribe((r) => this.users.set(r.items));
  }

  toggle(u: UserDto): void {
    this.service.toggleActive(u.id).subscribe(() => this.load());
  }

  remove(id: string): void {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    this.service.delete(id).subscribe(() => this.load());
  }
}
