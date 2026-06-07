import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./users-new.component').then((m) => m.UsersNewComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./users-edit.component').then((m) => m.UsersEditComponent),
  },
];
