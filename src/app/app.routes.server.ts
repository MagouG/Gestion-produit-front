import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server
  },
  {
    path: 'ajouter',
    renderMode: RenderMode.Server
  },
  {
    path: 'modifier/:id',
    renderMode: RenderMode.Server
  }
];
