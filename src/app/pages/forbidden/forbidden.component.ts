import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="empty-state" style="margin-top: 80px">
      <div class="empty-icon">🔒</div>
      <p class="empty-title">Accès refusé</p>
      <p class="empty-desc">
        Vous n'avez pas les droits nécessaires pour accéder à cette page.
      </p>
      <a routerLink="/" class="btn btn-primary">Retour aux produits</a>
    </div>
  `,
})
export class ForbiddenComponent {}
