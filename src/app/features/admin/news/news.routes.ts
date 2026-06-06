import { Routes } from '@angular/router';

export const newsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./news.component').then((m) => m.NewsComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./news-create.component').then((m) => m.NewsCreateComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./news-edit.component').then((m) => m.NewsEditComponent),
  },
];
