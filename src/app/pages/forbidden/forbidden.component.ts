import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="forbidden">
      <h1>403</h1>
      <p>Accès refusé — vous n'avez pas les droits nécessaires pour cette page.</p>
      <a routerLink="/">Retour aux produits</a>
    </div>
  `,
  styles: [`
    .forbidden { max-width: 420px; margin: 15vh auto; text-align: center; }
    h1 { font-size: 3rem; margin: 0; }
  `],
})
export class ForbiddenComponent {}
