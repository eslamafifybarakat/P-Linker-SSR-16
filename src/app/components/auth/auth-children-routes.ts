import { SupplierRegistrationComponent } from "./supplier-registration/supplier-registration.component";
import { BuyerRegistrationComponent } from "./buyer-registration/buyer-registration.component";
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErrorsComponent } from "../errors/errors.component";
import { LoginComponent } from "./login/login.component";

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
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'verification-code',
    component: VerificationCodeComponent,
    pathMatch: 'full'
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
