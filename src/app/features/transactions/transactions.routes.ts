import { Routes } from '@angular/router';

const TRANSACTIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./transactions'),
  },
];

export default TRANSACTIONS_ROUTES;
