import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: '**',  // Ruta wildcard para redirigir a 'home' si no se encuentra ninguna ruta
    redirectTo: 'home',
  },
];
