import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { MeProfile } from '../../models/user.model';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Mon profil</h2>
    <ul *ngIf="me() as m">
      <li><strong>Identifiant :</strong> {{ m.sub }}</li>
      <li><strong>Email :</strong> {{ m.email }}</li>
      <li><strong>Prénom :</strong> {{ m.firstName }}</li>
      <li><strong>Nom :</strong> {{ m.lastName }}</li>
      <li><strong>Rôles :</strong> {{ m.roles.join(', ') }}</li>
    </ul>
  `,
})
export class ProfilComponent implements OnInit {
  private readonly users = inject(UserService);
  me = signal<MeProfile | null>(null);

  ngOnInit(): void {
    this.users.getMe().subscribe((m) => this.me.set(m));
  }
}
