
// import { PermissionGuard } from './../../../services/authentication/guards/permission.guard';
import { RecordDetailsComponent } from "../records/record-details/record-details.component";
import { EditClientComponent } from "./edit-client/edit-client.component";
import { ErrorsComponent } from "../../errors/errors.component";
import { UsersListComponent } from "./users-list/users-list.component";


export const usersChildrenRoutes: any[] = [
  { path: '', redirectTo: 'List', pathMatch: 'full' },
  {
    path: 'List',
    component: UsersListComponent,
    // canActivate: [PermissionGuard],
    data: {
      permission: 'Pages.Client.List',
      title: 'Appointments'
    },
    pathMatch: 'full'
  },
  {
    path: 'Details/:id',
    component: EditClientComponent,
    pathMatch: 'full'
  },
  {
    path: 'Record-Details/:id',
    component: RecordDetailsComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
