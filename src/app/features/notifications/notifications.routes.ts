import { Routes } from '@angular/router';

const NOTIFICATIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./notifications'),
  },
];

export default NOTIFICATIONS_ROUTES;
