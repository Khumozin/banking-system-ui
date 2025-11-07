import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/components/main-layout'),
    children: [
      {
        path: 'accounts',
        loadChildren: () => import('./features/accounts/accounts.routes'),
        data: {
          breadcrumb: 'Accounts',
        },
      },
      {
        path: 'transactions',
        loadChildren: () => import('./features/transactions/transactions.routes'),
        data: {
          breadcrumb: 'Transactions',
        },
      },
      {
        path: 'notifications',
        loadChildren: () => import('./features/notifications/notifications.routes'),
        data: {
          breadcrumb: 'Notifications',
        },
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
