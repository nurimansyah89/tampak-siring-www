import { Routes } from '@angular/router';

export const complaintsAdminRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./complaints-admin.component').then((m) => m.ComplaintsAdminComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./complaint-detail-admin.component').then((m) => m.ComplaintDetailAdminComponent),
  },
];
