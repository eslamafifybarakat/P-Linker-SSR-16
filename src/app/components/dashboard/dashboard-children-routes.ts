
// import { PermissionGuard } from './../../services/authentication/guards/permission.guard';
import { EditClientComponent } from "./clients/edit-client/edit-client.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { usersChildrenRoutes } from "./clients/users-children-routes";
import { ErrorsComponent } from "../errors/errors.component";

export const dashBoardChildrenRoutes: any[] = [
  { path: '', redirectTo: 'Statistics', pathMatch: 'full' },
  {
    path: 'Clients',
    // canActivate: [PermissionGuard],
    data: {
      permission: 'Pages.Client.List',
      title: 'Appointments'
    },
    loadComponent: () =>
      import('./clients/users.component').then(
        (c) => c.UsersComponent
      ),
    children: usersChildrenRoutes
  },
  {
    path: 'Statistics',
    component: StatisticsComponent,
    pathMatch: 'full'
  },
  {
    path: 'Clients/:id',
    component: EditClientComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
