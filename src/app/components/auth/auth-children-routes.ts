import { SupplierRegistrationComponent } from "./supplier-registration/supplier-registration.component";
import { BuyerRegistrationComponent } from "./buyer-registration/buyer-registration.component";
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErrorsComponent } from "../errors/errors.component";
import { LoginComponent } from "./login/login.component";

export const authChildrenRoutes: any[] = [
  { path: '', redirectTo: '/Auth/Login', pathMatch: 'full' },
  {
    path: 'Login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'Supplier-Registration',
    component: SupplierRegistrationComponent,
    pathMatch: 'full'
  },
  {
    path: 'Buyer-Registration',
    component: BuyerRegistrationComponent,
    pathMatch: 'full'
  },
  {
    path: 'Forget-Password',
    component: ForgetPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'Verification-Code',
    component: VerificationCodeComponent,
    pathMatch: 'full'
  },
  {
    path: 'Reset-Password',
    component: ResetPasswordComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
