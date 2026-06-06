import { Routes } from '@angular/router';

export const residentRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./residents.component').then((m) => m.ResidentsComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./resident-detail/resident-detail.component').then((m) => m.ResidentDetailComponent),
  },
];
