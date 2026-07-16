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
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ isEdit ? 'Modifier un utilisateur' : 'Nouvel utilisateur' }}</h1>
        <p class="page-subtitle">
          {{ isEdit ? 'Modifiez les informations du compte' : 'Créez un nouveau compte utilisateur' }}
        </p>
      </div>
    </div>

    <div class="card" style="max-width: 600px">
      <div class="card-body" style="padding: 24px">
        <form (ngSubmit)="save()">

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Prénom</label>
              <input name="firstName" class="form-input" [(ngModel)]="model.firstName" required />
            </div>
            <div class="form-group">
              <label class="form-label">Nom</label>
              <input name="lastName" class="form-input" [(ngModel)]="model.lastName" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input name="email" type="email" class="form-input"
                   [(ngModel)]="model.email" required [disabled]="isEdit" />
          </div>

          <div class="form-group" *ngIf="!isEdit">
            <label class="form-label">Mot de passe</label>
            <input name="password" type="password" class="form-input"
                   [(ngModel)]="model.password" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Rôle</label>
              <select name="role" class="form-input" [(ngModel)]="model.role">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Département</label>
              <input name="department" class="form-input" [(ngModel)]="model.department" />
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" (click)="cancel()">Annuler</button>
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </div>

        </form>
      </div>
    </div>
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
