import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/components/main-layout'),
    children: [
      {
        path: 'notifications',
        loadChildren: () => import('./features/notifications/notifications.routes'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
