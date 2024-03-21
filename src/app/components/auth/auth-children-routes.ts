import { ErrorsComponent } from "../errors/errors.component";
import { LoginComponent } from "./login/login.component";

export const authChildrenRoutes: any[] = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
