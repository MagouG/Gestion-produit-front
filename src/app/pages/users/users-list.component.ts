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
    <div class="header">
      <h2>Utilisateurs (Admin)</h2>
      <a routerLink="/users/nouveau">+ Nouvel utilisateur</a>
    </div>
    <table>
      <thead><tr><th>Email</th><th>Nom</th><th>Rôle</th><th>Actif</th><th></th></tr></thead>
      <tbody>
        <tr *ngFor="let u of users()">
          <td>{{ u.email }}</td>
          <td>{{ u.firstName }} {{ u.lastName }}</td>
          <td>{{ u.role }}</td>
          <td>{{ u.isActive ? 'Oui' : 'Non' }}</td>
          <td>
            <a [routerLink]="['/users', u.id]">Éditer</a>
            <button (click)="toggle(u)">{{ u.isActive ? 'Désactiver' : 'Activer' }}</button>
            <button (click)="remove(u.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
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
