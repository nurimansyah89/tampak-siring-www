import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'cluster-map',
    loadChildren: () =>
      import('./features/cluster-map/cluster-map.routes').then((m) => m.clusterMapRoutes),
  },
  {
    path: 'residents',
    loadChildren: () =>
      import('./features/residents/residents.routes').then((m) => m.residentRoutes),
  },
  {
    path: 'security',
    loadChildren: () =>
      import('./features/security/security.routes').then((m) => m.securityRoutes),
  },
  {
    path: 'complaints',
    loadChildren: () =>
      import('./features/complaints/complaints.routes').then((m) => m.complaintRoutes),
  },
  {
    path: 'finance',
    loadChildren: () =>
      import('./features/finance/finance.routes').then((m) => m.financeRoutes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.adminRoutes),
  },
  {
    path: 'me',
    loadComponent: () =>
      import('./features/me/me.component').then((m) => m.MeComponent),
  },
  {
    path: 'me/finance',
    loadComponent: () =>
      import('./features/my-finance/my-finance.component').then((m) => m.MyFinanceComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
