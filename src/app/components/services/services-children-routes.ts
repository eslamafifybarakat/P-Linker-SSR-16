import { OfficesPageComponent } from "./offices-page/offices-page.component";
import { ErrorsComponent } from "../errors/errors.component";

export const servicesChildrenRoutes: any[] = [
  { path: '', redirectTo: '/Services/Offices', pathMatch: 'full' },
  {
    path: 'Offices',
    component: OfficesPageComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
