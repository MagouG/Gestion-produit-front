import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { CreateUser } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>{{ isEdit ? 'Éditer' : 'Nouvel' }} utilisateur</h2>
    <form (ngSubmit)="save()">
      <label>Prénom <input name="firstName" [(ngModel)]="model.firstName" required /></label>
      <label>Nom <input name="lastName" [(ngModel)]="model.lastName" required /></label>
      <label>Email <input name="email" type="email" [(ngModel)]="model.email" required [disabled]="isEdit" /></label>
      <label *ngIf="!isEdit">Mot de passe <input name="password" type="password" [(ngModel)]="model.password" required /></label>
      <label>Rôle
        <select name="role" [(ngModel)]="model.role">
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </label>
      <label>Département <input name="department" [(ngModel)]="model.department" /></label>
      <div class="actions">
        <button type="submit">Enregistrer</button>
        <button type="button" (click)="cancel()">Annuler</button>
      </div>
    </form>
  `,
})
export class UserFormComponent implements OnInit {
  private readonly service = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  isEdit = false;
  editId: string | null = null;
  model: CreateUser = {
    firstName: '', lastName: '', email: '', password: '', role: 'User', department: null,
  };

  ngOnInit(): void {
    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) {
      this.isEdit = true;
      this.service.getById(this.editId).subscribe((u) => {
        this.model = {
          firstName: u.firstName, lastName: u.lastName, email: u.email,
          password: '', role: u.role, department: u.department ?? null,
        };
      });
    }
  }

  save(): void {
    if (this.isEdit && this.editId) {
      this.service.update(this.editId, {
        firstName: this.model.firstName, lastName: this.model.lastName,
        department: this.model.department,
      }).subscribe(() => this.router.navigate(['/users']));
    } else {
      this.service.create(this.model).subscribe(() => this.router.navigate(['/users']));
    }
  }

  cancel(): void { this.router.navigate(['/users']); }
}
