import { Route } from '@angular/router';

export const USER_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../users-page.component').then((c) => c.UsersPageComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../components/users-table/users-table.component').then(
            (c) => c.UsersTableComponent
          ),
      },
      //   {
      //     path: ':id',
      //     loadComponent: () =>
      //       import('../components/user-details/user-details.component').then(
      //         (c) => c.UserDetailsComponent
      //       ),
      //   },
    ],
  },
];
