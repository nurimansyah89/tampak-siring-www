import { Routes } from '@angular/router';

export const clusterMapRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./cluster-map-management.component').then((m) => m.ClusterMapManagementComponent),
  },
];