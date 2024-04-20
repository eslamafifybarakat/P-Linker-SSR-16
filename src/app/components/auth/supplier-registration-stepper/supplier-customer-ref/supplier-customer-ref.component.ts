// Modules
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

//Services
import { SupplierRegisterService } from '../../../../services/supplier-register.service';
import { PublicService } from './../../../../services/generic/public.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { Subscription, catchError, distinctUntilChanged, tap } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    DropdownModule,
    TooltipModule,
    CommonModule,
    TableModule,
    FormsModule,
  ],
  selector: 'app-supplier-customer-ref',
  templateUrl: './supplier-customer-ref.component.html',
  styleUrls: ['./supplier-customer-ref.component.scss']
})
export class SupplierCustomerRefComponent {
  private subscriptions: Subscription[] = [];

  isSupplierDataReturn: boolean = false;
  supplierData: any;
  supplierId: number = null;

  isEnterCustomerName: boolean = false;
  isEnterAddressName: boolean = false;
  isEnterProductName: boolean = false;

  customerReferences: any = [];

  constructor(
    private supplierRegisterService: SupplierRegisterService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  customerReferencesForm: FormGroup = this.fb.group({
    customerName: ['', { validators: [Validators.minLength(2), Validators.maxLength(60)], updateOn: 'blur' }],
    address: ['', { validators: [Validators.minLength(4), Validators.maxLength(100)], updateOn: 'blur' }],
    product: ['', { validators: [Validators.minLength(2), Validators.maxLength(100)], updateOn: 'blur' }]
  });
  get customerReferencesFormControls(): any {
    return this.customerReferencesForm?.controls;
  }

  ngOnInit(): void {
    this.customerReferencesForm?.get('customerName').valueChanges.pipe(distinctUntilChanged())?.subscribe((value: any) => {
      if (this.customerReferencesFormControls?.customerName?.valid) {
        this.isEnterCustomerName = true;
        this.publicService?.addAllValidators(this.customerReferencesForm, 'customerName', 2, 60);
        this.publicService?.addAllValidators(this.customerReferencesForm, 'product', 2, 100);
        this.publicService?.addAllValidators(this.customerReferencesForm, 'address', 4, 100);
      }
    });
  }

  // Start Customer Reference Actions
  addCustomerReference(): void {
    if (this.customerReferencesForm?.valid && this.customerReferencesForm?.value?.customerName != null) {
      let formInfo = this.customerReferencesForm?.value;
      this.customerReferences?.push({
        id: 0,
        name: formInfo?.customerName,
        product: formInfo?.product,
        address: formInfo?.address,
      });
      this.resetCustomerRef();
    } else {
      this.publicService?.validateAllFormFields(this.customerReferencesForm);
    }
  }
  deleteCustomer(index: any): void {
    this.customerReferences?.splice(index, 1);
  }
  resetCustomerRef(): void {
    this.customerReferencesForm?.reset();
    this.isEnterCustomerName = false;
    this.publicService?.addNotRequiredValidators(this.customerReferencesForm, ['customerName'], 2, 60);
    this.publicService?.addNotRequiredValidators(this.customerReferencesForm, ['product'], 2, 100);
    this.publicService?.addNotRequiredValidators(this.customerReferencesForm, ['address'], 4, 100);
  }
  // End Customer Reference Actions

  // Go Back
  goBack(): void {
    this.router.navigate(['/Supplier-Register/Bank-Info']);
  }

  // Start Add Supplier Customer Reference
  submit(): void {
    if (this.customerReferencesForm?.valid) {
      const data = this.extractFormData();
      this.saveSupplierCustomerReference(data);
    } else {
      this.publicService?.validateAllFormFields(this.customerReferencesForm);
    }
  }
  private extractFormData(): any {
    let customerReferences: any = [];
    customerReferences = this.customerReferences;
    return {
      supplierId: this.supplierId,
      customerReferences: customerReferences
    }
  }
  private saveSupplierCustomerReference(data: any): void {
    this.publicService?.showGlobalLoader?.next(true);
    let subscribeSaveSupplierCustomerReference: Subscription = this.supplierRegisterService?.saveSupplierCustomerReference(data).pipe(
      tap(res => this.handleSaveSupplierCustomerReferenceSuccess(res)),
      catchError(err => this.handleError(err))
    ).subscribe();
    this.subscriptions.push(subscribeSaveSupplierCustomerReference);
  }
  private handleSaveSupplierCustomerReferenceSuccess(response: any): void {
    this.publicService?.showGlobalLoader?.next(false);
    if (response) {
      this.handleSuccess(response?.message);
      this.router.navigate(['/Supplier-Register/Companies']);
    } else {
      this.handleError(response?.message);
    }
  }
  // End Add Supplier Customer Reference

  /* --- Handle api requests messages --- */
  private handleSuccess(msg: any): any {
    this.setMessage(msg || this.publicService.translateTextFromJson('general.successRequest'), 'success');
  }
  private handleError(err: any): any {
    this.setMessage(err || this.publicService.translateTextFromJson('general.errorOccur'), 'error');
  }
  private setMessage(message: string, type: string): void {
    this.alertsService.openToast(type, type, message);
    this.publicService.showGlobalLoader.next(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
