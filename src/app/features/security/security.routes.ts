import { Routes } from '@angular/router';

export const securityRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./security.component').then((m) => m.SecurityComponent),
  },
];
