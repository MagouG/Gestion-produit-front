import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { MeProfile } from '../../models/user.model';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Mon profil</h1>
        <p class="page-subtitle">Informations de votre compte</p>
      </div>
    </div>

    <div class="card" style="max-width: 500px">
      <div class="card-body" style="padding: 24px">
        <div *ngIf="me() as m">

          <div class="profile-avatar">{{ getInitials(m) }}</div>

          <div class="profile-info-list">
            <div class="profile-info-item">
              <span class="profile-info-label">Email</span>
              <span class="profile-info-value">{{ m.email }}</span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">Prénom</span>
              <span class="profile-info-value">{{ m.firstName || '—' }}</span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">Nom</span>
              <span class="profile-info-value">{{ m.lastName || '—' }}</span>
            </div>
            <div class="profile-info-item">
              <span class="profile-info-label">Rôle</span>
              <span class="profile-info-value">
                <span class="role-badge" [class.admin]="m.roles.includes('Admin')">
                  {{ m.roles.join(', ') }}
                </span>
              </span>
            </div>
          </div>

        </div>
        <div *ngIf="!me()">
          <p class="text-muted">Chargement...</p>
        </div>
      </div>
    </div>
  `,
})
export class ProfilComponent implements OnInit {
  private readonly users = inject(UserService);
  me = signal<MeProfile | null>(null);

  ngOnInit(): void {
    this.users.getMe().subscribe((m) => this.me.set(m));
  }

  getInitials(m: MeProfile): string {
    const f = m.firstName?.[0] ?? '';
    const l = m.lastName?.[0] ?? '';
    return (f + l).toUpperCase() || m.email[0].toUpperCase();
  }
}
