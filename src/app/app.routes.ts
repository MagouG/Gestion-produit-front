import { Routes } from '@angular/router';
import { ProduitListComponent } from './components/produit-list/produit-list.component';
import { ProduitFormComponent } from './components/produit-form/produit-form.component';
import { authGuard } from './core/auth/auth.guard';
import { adminGuard } from './core/auth/admin.guard';

export const routes: Routes = [
  // Zone authentifiée — produits (composants existants conservés)
  {
    path: '',
    pathMatch: 'full',
    component: ProduitListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'ajouter',
    component: ProduitFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'modifier/:id',
    component: ProduitFormComponent,
    canActivate: [authGuard],
  },

  // Login
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },

  // Profil
  {
    path: 'profil',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profil/profil.component').then((m) => m.ProfilComponent),
  },

  // Zone Admin
  {
    path: 'users',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/users/users-list.component').then((m) => m.UsersListComponent),
  },
  {
    path: 'users/nouveau',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/users/user-form.component').then((m) => m.UserFormComponent),
  },
  {
    path: 'users/:id',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/users/user-form.component').then((m) => m.UserFormComponent),
  },

  // Accès refusé
  {
    path: 'forbidden',
    loadComponent: () =>
      import('./pages/forbidden/forbidden.component').then((m) => m.ForbiddenComponent),
  },

  { path: '**', redirectTo: '' },
];
