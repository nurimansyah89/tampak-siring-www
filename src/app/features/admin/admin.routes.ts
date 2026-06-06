import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./admin.component').then((m) => m.AdminComponent),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./news/news.routes').then((m) => m.newsRoutes),
  },
  {
    path: 'cluster-map',
    loadChildren: () =>
      import('./cluster-map/cluster-map.routes').then((m) => m.clusterMapRoutes),
  },
];
