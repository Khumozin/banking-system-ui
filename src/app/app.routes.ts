import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/components/main-layout'),
    children: [
      {
        path: 'accounts',
        loadChildren: () => import('./features/accounts/accounts.routes'),
      },
      {
        path: 'transactions',
        loadChildren: () => import('./features/transactions/transactions.routes'),
      },
      {
        path: 'notifications',
        loadChildren: () => import('./features/notifications/notifications.routes'),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'notifications'
      }
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
