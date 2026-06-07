import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./admin.component').then((m) => m.AdminComponent),
  },
  {
    path: 'finance',
    loadChildren: () =>
      import('./finance/finance.routes').then((m) => m.financeRoutes),
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
  {
    path: 'residents',
    loadChildren: () =>
      import('./residents/resident.routes').then((m) => m.residentAdminRoutes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.routes').then((m) => m.settingsRoutes),
  },
  {
    path: 'security',
    loadChildren: () =>
      import('./security/security.routes').then((m) => m.securityRoutes),
  },
  {
    path: 'complaints',
    loadChildren: () =>
      import('./complaints/complaints-admin.routes').then((m) => m.complaintsAdminRoutes),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.routes').then((m) => m.usersRoutes),
  },
];
