import { Routes } from '@angular/router';
import { ProduitListComponent } from './components/produit-list/produit-list.component'
import { ProduitFormComponent } from './components/produit-form/produit-form.component';

export const routes: Routes = [

  {
    path: '',
    component: ProduitListComponent
  },

  {
    path: 'ajouter',
    component: ProduitFormComponent
  },

  {
    path: 'modifier/:id',
    component: ProduitFormComponent
  }

];
