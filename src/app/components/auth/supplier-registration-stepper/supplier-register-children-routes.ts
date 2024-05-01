import { SupplierContactInfoComponent } from "./supplier-contact-info/supplier-contact-info.component";
import { SupplierCustomerRefComponent } from "./supplier-customer-ref/supplier-customer-ref.component";
import { SupplierAttachmentsComponent } from "./supplier-attachments/supplier-attachments.component";
import { SupplierCompaniesComponent } from "./supplier-companies/supplier-companies.component";
import { SupplierAddressesComponent } from "./supplier-addresses/supplier-addresses.component";
import { SupplierBankInfoComponent } from "./supplier-bank-info/supplier-bank-info.component";
import { SupplierDetailsComponent } from "./supplier-details/supplier-details.component";
import { ErrorsComponent } from "../../errors/errors.component";

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
  {
    path: 'Contact-Info',
    component: SupplierContactInfoComponent,
    pathMatch: 'full'
  },
  {
    path: 'Bank-Info',
    component: SupplierBankInfoComponent,
    pathMatch: 'full'
  },
  {
    path: 'Customer-Ref',
    component: SupplierCustomerRefComponent,
    pathMatch: 'full'
  },
  {
    path: 'Companies',
    component: SupplierCompaniesComponent,
    pathMatch: 'full'
  },
  {
    path: 'Attachments',
    component: SupplierAttachmentsComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
