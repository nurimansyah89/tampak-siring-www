import { Routes } from '@angular/router';

export const clusterMapRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./cluster-map.component').then((m) => m.ClusterMapComponent),
  },
];
