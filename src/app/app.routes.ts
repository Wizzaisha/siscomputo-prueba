import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/users-page/routes/routes').then((r) => r.USER_ROUTES),
  },
];
