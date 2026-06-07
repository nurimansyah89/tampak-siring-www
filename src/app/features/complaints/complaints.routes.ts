import { Routes } from '@angular/router';

export const complaintRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./complaints.component').then((m) => m.ComplaintsComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./complaint-detail/complaint-detail.component').then((m) => m.ComplaintDetailComponent),
  },
];
