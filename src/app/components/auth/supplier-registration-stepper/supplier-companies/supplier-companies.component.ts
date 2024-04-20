// Modules
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

//Services
import { SupplierRegisterService } from '../../../../services/supplier-register.service';
import { PublicService } from './../../../../services/generic/public.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { Subscription, catchError, distinctUntilChanged, tap } from 'rxjs';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
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
  selector: 'app-supplier-companies',
  templateUrl: './supplier-companies.component.html',
  styleUrls: ['./supplier-companies.component.scss']
})
export class SupplierCompaniesComponent {
  private subscriptions: Subscription[] = [];

  isSupplierDataReturn: boolean = false;
  supplierData: any;
  supplierId: number = null;

  isEnterName: boolean = false;

  // Types Of Business Variables
  typesOfBusiness: any = [];
  isLoadingTypesOfBusiness: boolean = false;

  companies: any = [];

  constructor(
    private supplierRegisterService: SupplierRegisterService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  parentCompaniesForm: any = this.fb?.group({
    name: ['', { validators: [Validators.minLength(6), Validators.maxLength(60)], updateOn: 'blur' }],
    address: ['', { validators: [Validators.minLength(4), Validators.maxLength(100)], updateOn: 'blur' }],
    relationType: [null, { validators: [] }],
    typeOfBusiness: [null, { validators: [] }]
  })
  get parentCompaniesFormControls(): any {
    return this.parentCompaniesForm?.controls;
  }

  ngOnInit(): void {
    this.getTypesOfBusiness();

    this.parentCompaniesForm?.get('name').valueChanges?.pipe(distinctUntilChanged())?.subscribe((value: any) => {
      if (this.parentCompaniesFormControls?.name?.valid) {
        this.isEnterName = true;
        this.publicService?.addAllValidators(this.parentCompaniesForm, 'name', 6, 60);
        this.publicService?.addAllValidators(this.parentCompaniesForm, 'typeOfBusiness');
        this.publicService?.addAllValidators(this.parentCompaniesForm, 'address', 4, 100);
        this.publicService?.addAllValidators(this.parentCompaniesForm, 'relationType');
      }
    });
  }

  // Start Get Type Of Business
  getTypesOfBusiness(): void {
    this.isLoadingTypesOfBusiness = true;
    let getTypesOfBusinessSubscription: Subscription = this.supplierRegisterService?.getTypesOfBusiness().pipe(
      tap(res => this.handleTypesOfBusinessResponse(res)),
      catchError(err => this.handleTypesOfBusinessError(err))
    ).subscribe();
    this.subscriptions.push(getTypesOfBusinessSubscription);
  }
  private handleTypesOfBusinessResponse(res: any): void {
    if (res) {
      this.typesOfBusiness = res;
    } else {
      this.handleTypesOfBusinessError(res?.message);
    }
    this.isLoadingTypesOfBusiness = false;
    this.cdr.detectChanges();
  }
  private handleTypesOfBusinessError(err: any): any {
    this.isLoadingTypesOfBusiness = false;
    this.handleError(err);
    this.typesOfBusiness = [
      { id: 1, name: 'type 1' }
    ]
  }
  // End  Get Type Of Business

  // Go Back
  goBack(): void {
    this.router.navigate(['/Supplier-Register/Customer-Ref']);
  }

  // Start Companies Actions
  addParentCompany(): void {
    if (this.parentCompaniesForm?.valid && this.parentCompaniesForm?.value?.name != null) {
      let formInfo = this.parentCompaniesForm?.value;
      this.companies?.push({
        id: 0,
        relationType: formInfo?.relationType,
        name: formInfo?.name,
        typeOfBusiness: formInfo?.typeOfBusiness?.name,
        address: formInfo?.address,
      });
      this.resetParentCompanies();
    } else {
      this.publicService?.validateAllFormFields(this.parentCompaniesForm);
    }
  }
  deleteCompany(index: any): void {
    this.companies?.splice(index, 1);
  }
  resetParentCompanies(): void {
    this.parentCompaniesForm?.reset();
    this.isEnterName = false;
    this.publicService?.addNotRequiredValidators(this.parentCompaniesForm, ['name'], 6, 60);
    this.publicService?.addNotRequiredValidators(this.parentCompaniesForm, ['typeOfBusiness']);
    this.publicService?.addNotRequiredValidators(this.parentCompaniesForm, ['address'], 4, 100);
    this.publicService?.addNotRequiredValidators(this.parentCompaniesForm, ['relationType']);
  }
  // End Companies Actions

  // Start Add Supplier Companies
  submit(): void {
    if (this.parentCompaniesForm?.valid) {
      const data = this.extractFormData();
      this.saveSupplierCompanies(data);
    } else {
      this.publicService?.validateAllFormFields(this.parentCompaniesForm);
    }
  }
  private extractFormData(): any {
    let relatedCompanies: any = [];
    this.companies?.forEach((item: any) => {
      relatedCompanies?.push({
        id: item?.id,
        name: item?.name,
        address: item?.address,
        relationType: item?.relationType == 'company' ? 1 : item?.relationType == 'subsidiary' ? 2 : 3,
        typeOfBusiness: item?.typeOfBusiness
      })
    });
    let data: any = {
      supplierId: this.supplierId,
      relatedCompanies: relatedCompanies
    }
  }
  private saveSupplierCompanies(data: any): void {
    this.publicService?.showGlobalLoader?.next(true);
    let subscribeSaveSupplierCompanies: Subscription = this.supplierRegisterService?.saveSupplierBanks(data).pipe(
      tap(res => this.handleSaveSupplierCompaniesSuccess(res)),
      catchError(err => this.handleError(err))
    ).subscribe();
    this.subscriptions.push(subscribeSaveSupplierCompanies);
  }
  private handleSaveSupplierCompaniesSuccess(response: any): void {
    this.publicService?.showGlobalLoader?.next(false);
    if (response) {
      this.handleSuccess(response?.message);
      this.router.navigate(['/Supplier-Register/Attachments']);
    } else {
      this.handleError(response?.message);
    }
  }
  // End Add Supplier Companies

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
