import { Routes } from '@angular/router';

export const residentAdminRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./resident-admin.component').then((m) => m.ResidentAdminComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./resident-new.component').then((m) => m.ResidentNewComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./resident-edit.component').then((m) => m.ResidentEditComponent),
  },
];
