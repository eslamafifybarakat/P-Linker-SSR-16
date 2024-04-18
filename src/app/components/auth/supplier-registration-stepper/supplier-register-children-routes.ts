import { ErrorsComponent } from "../../errors/errors.component";
import { SupplierDetailsComponent } from "./supplier-details/supplier-details.component";

export const supplierRegisterChildrenRoutes: any[] = [
  { path: '', redirectTo: 'Details', pathMatch: 'full' },
  {
    path: 'Details',
    component: SupplierDetailsComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
