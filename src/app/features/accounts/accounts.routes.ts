import { Routes } from '@angular/router';

const ACCOUNTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./accounts'),
  },
];

export default ACCOUNTS_ROUTES;
