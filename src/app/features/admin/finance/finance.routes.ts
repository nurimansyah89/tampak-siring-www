import { Routes } from '@angular/router';

export const financeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./finance.component').then((m) => m.FinanceComponent),
  },
  {
    path: ':id/detail',
    loadComponent: () =>
      import('./finance-detail.component').then((m) => m.FinanceDetailComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./finance-form.component').then((m) => m.FinanceFormComponent),
  },
];
