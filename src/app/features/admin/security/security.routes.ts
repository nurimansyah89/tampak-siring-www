import { Routes } from '@angular/router';

export const securityRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./security.component').then((m) => m.SecurityComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./security-new.component').then((m) => m.SecurityNewComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./security-edit.component').then((m) => m.SecurityEditComponent),
  },
];
