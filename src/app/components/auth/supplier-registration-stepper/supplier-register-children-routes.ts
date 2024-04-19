import { ErrorsComponent } from "../../errors/errors.component";
import { SupplierAddressesComponent } from "./supplier-addresses/supplier-addresses.component";
import { SupplierDetailsComponent } from "./supplier-details/supplier-details.component";

export const supplierRegisterChildrenRoutes: any[] = [
  { path: '', redirectTo: 'Details', pathMatch: 'full' },
  {
    path: 'Details',
    component: SupplierDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'Address',
    component: SupplierAddressesComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
