import { ErrorsComponent } from "../errors/errors.component";
import { BuyerRegistrationComponent } from "./buyer-registration/buyer-registration.component";
import { LoginComponent } from "./login/login.component";
import { SupplierRegistrationComponent } from "./supplier-registration/supplier-registration.component";

export const authChildrenRoutes: any[] = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'supplier-registration',
    component: SupplierRegistrationComponent,
    pathMatch: 'full'
  },
  {
    path: 'buyer-registration',
    component: BuyerRegistrationComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
