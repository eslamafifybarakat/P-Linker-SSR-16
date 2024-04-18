// Modules
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

//Services
import { PublicService } from './../../../../services/generic/public.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { patterns } from './../../../../shared/configs/patterns';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MultiSelectModule,
    TranslateModule,
    DropdownModule,
    CalendarModule,
    CommonModule,
    FormsModule,
  ],
  selector: 'supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent {
  private subscriptions: Subscription[] = [];

  // Check UserName Variables
  isUserNameAvailable: boolean = false;
  isCheckUserName: boolean = false;

  // Check CompanyName Variables
  isCompanyNameAvailable: boolean = false;
  isCheckCompanyName: boolean = false;

  // Check TaxId Variables
  isTaxIdAvailable: boolean = false;
  isCheckTaxId: boolean = false;

  // Check DunsNumber Variables
  isDunsNumberAvailable: boolean = false;
  isCheckDunsNumber: boolean = false;

  // Check CrNumber Variables
  isCRNumberAvailable: boolean = false;
  isCheckCRNumber: boolean = false;

  // Check VatId Variables
  isVatIdAvailable: boolean = false;
  isCheckVatId: boolean = false;

  // Currency List Variables
  currencyList: any;
  isLoadingCurrency: boolean = false;

  // Countries List Variables
  countries: any = [];
  isLoadingCountries: boolean = false;

  // Categories Variables
  categories: any = [];
  isLoadingCategories: boolean = false;

  // OwnerShip Variables
  ownerShipData: object[] = [];
  isLoadingOwnerShipData: boolean = false;

  // Years Variables
  yearsExData: object[] = [];
  isLoadingYearsExData: boolean = false;
  maxFoundationDate: any;
  minCRValidityDate: any;

  constructor(
    private alertsService: AlertsService,
    public publicService: PublicService,
    private fb: FormBuilder,
  ) { }

  detailsForm: any = this.fb?.group({
    companyName: ['', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }],
    companyNameAr: ['', { validators: [Validators.minLength(3)], updateOn: 'blur' }],
    aliasCompanyName: ['', { validators: [Validators.minLength(3)], updateOn: 'blur' }],
    firstName: ['', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)], updateOn: 'blur' }],
    lastName: ['', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)], updateOn: 'blur' }],
    userName: ['', { validators: [Validators.minLength(3), Validators.maxLength(30)], updateOn: 'blur' }],
    country: [null, { validators: [Validators.required] }],
    vatId: ['', { validators: [Validators.required, Validators.minLength(11), Validators.maxLength(20)], updateOn: 'blur' }],
    taxId: ['', { validators: [Validators.pattern('[0-9]{9}')], updateOn: 'blur' }],
    dunsNumber: ['', { validators: [Validators.pattern('[0-9]{9}')], updateOn: 'blur' }],
    CRNumber: ['', { validators: [Validators.pattern('[0-9]{10,20}')], updateOn: 'blur' }],
    noOfEmployees: ['', { validators: [Validators.pattern('[0-9]+$')], updateOn: 'blur' }],
    foundationDate: ['', { validators: [] }],
    CRValidity: ['', { validators: [] }],
    ownerName: ['', { validators: [Validators.minLength(2), Validators.maxLength(50)], updateOn: 'blur' }],
    websiteAddress: ['', { validators: [Validators.pattern(patterns?.url)], updateOn: 'blur' }],
    capital: [null, { validators: [], updateOn: 'blur' }],
    currency: [null, { validators: [] }],
    dataActivities: [null, { validators: [Validators.required] }],
    ownerShip: [null, { validators: [] }],
    otherOwnerShipName: ['', { validators: [Validators.minLength(3), Validators.maxLength(30)], updateOn: 'blur' }],
    yearOfCurrentActivity: [null, { validators: [] }],
    isCertified: [null, { validators: [] }],
    companyDescription: ['', { validators: [Validators.minLength(50), Validators.maxLength(200)], updateOn: 'blur' }],
    descriptions: this.fb.array([]),
  },
  );
  get formControls(): any {
    return this.detailsForm?.controls;
  }

  // Start Add Description
  desc(): FormArray {
    return this.detailsForm.get("descriptions") as FormArray;
  }
  get description(): FormArray {
    return this.detailsForm.get("descriptions") as FormArray;
  }
  newDescription(description?: any): FormGroup {
    return this.fb.group({
      description: [description ? description : '', { validators: [], updateOn: 'blur' }],
    });
  }
  addDescription(description?: any): void {
    if (this.detailsForm?.value?.descriptions?.length < 8) {
      this.description.push(this.newDescription(description));
    } else {
      this.alertsService?.openToast('warn', 'warn', this.publicService?.translateTextFromJson('warning.enterMaximumGains'))
    }
  }
  removeDescription(i: number): void {
    this.description.removeAt(i);
  }
  // End Add Description


  ngOnInit(): void {
    const lastDay: any = new Date();
    lastDay?.setDate(lastDay?.getDate() - 1);
    this.maxFoundationDate = lastDay;

    const today: any = new Date();
    this.minCRValidityDate = new Date(today?.getFullYear(), today?.getMonth() + 1,
      today?.getDate());
  }

  checkCompanyNameAvailability(companyName: any): void {
    this.isCheckCompanyName = true;
    // this.supplierService?.checkCompanyNameAvailability(companyName)?.subscribe(
    //   (res: any) => {
    //     if (res) {
    //       this.isCompanyNameAvailable = false;
    //       this.isCheckCompanyName = false;
    //       this.cdr?.detectChanges();
    //     } else {
    //       this.isCompanyNameAvailable = true;
    //       if (res?.message) {
    //         res?.error?.message ? this.alertsService?.openSweetAlert('error', res?.error?.message) : '';
    //       }
    //       this.isCheckCompanyName = false;
    //     }
    //   },
    //   (err: any) => {
    //     err ? this.alertsService?.openSweetAlert('error', err?.message) : '';
    //     this.isCheckCompanyName = false;
    //   })
  }
  IsUserNameAvailable(userName: any): void {
    this.isCheckUserName = true;
    // this.supplierService?.IsUserNameAvailable(userName)?.subscribe(
    //   (res: any) => {
    //     if (res) {
    //       this.isUserNameAvailable = false;
    //       this.isCheckUserName = false;
    //       this.cdr?.detectChanges();
    //     } else {
    //       this.isUserNameAvailable = true;
    //       if (res?.message) {
    //         res?.error?.message ? this.alertsService?.openSweetAlert('error', res?.error?.message) : '';
    //       }
    //       this.isCheckUserName = false;
    //     }
    //   },
    //   (err: any) => {
    //     err ? this.alertsService?.openSweetAlert('error', err?.message) : '';
    //     this.isCheckUserName = false;
    //   })
  }
  IsVatIdAvailable(vatId: any, countryId: any): any {
    // this.isCheckVatId = true;
    // this.supplierService?.IsVatAvailable(vatId, countryId)?.subscribe(
    //   (res: any) => {
    //     if (res) {
    //       this.isVatIdAvailable = false;
    //       this.isCheckVatId = false;
    //       this.cdr.detectChanges();
    //     } else {
    //       this.isVatIdAvailable = true;
    //       if (res?.message) {
    //         res?.error?.message ? this.alertsService.openSweetAlert('error', res?.error?.message) : '';
    //       }
    //       this.isCheckVatId = false;
    //     }
    //   },
    //   (err: any) => {
    //     err ? this.alertsService.openSweetAlert('error', err?.message) : '';
    //     this.isCheckVatId = false;
    //   })
  }
  IsTaxIdAvailable(taxId: any): any {
    this.isCheckTaxId = true;
    // this.supplierService?.IsTaxIdAvailable(taxId)?.subscribe(
    //   (res: any) => {
    //     if (res) {
    //       this.isTaxIdAvailable = false;
    //       this.isCheckTaxId = false;
    //       this.cdr.detectChanges();
    //     } else {
    //       this.isTaxIdAvailable = true;
    //       if (res?.message) {
    //         res?.error?.message ? this.alertsService.openSweetAlert('error', res?.error?.message) : '';
    //       }
    //       this.isCheckTaxId = false;
    //     }
    //   },
    //   (err: any) => {
    //     err ? this.alertsService.openSweetAlert('error', err?.message) : '';
    //     this.isCheckTaxId = false;
    //   })
  }
  IsDunsNumberAvailable(dunsNumber: any): any {
    this.isCheckDunsNumber = true;
    // this.supplierService?.IsTaxIdAvailable(dunsNumber)?.subscribe(
    //   (res: any) => {
    //     if (res) {
    //       this.isDunsNumberAvailable = false;
    //       this.isCheckDunsNumber = false;
    //       this.cdr.detectChanges();
    //     } else {
    //       this.isDunsNumberAvailable = true;
    //       if (res?.message) {
    //         res?.error?.message ? this.alertsService.openSweetAlert('error', res?.error?.message) : '';
    //       }
    //       this.isCheckDunsNumber = false;
    //     }
    //   },
    //   (err: any) => {
    //     err ? this.alertsService.openSweetAlert('error', err?.message) : '';
    //     this.isCheckDunsNumber = false;
    //   })
  }
  IsCRNumberAvailable(cr: any): void {
    this.isCheckCRNumber = true;
    // this.supplierService?.IsCRNumberAvailable(cr)?.subscribe(
    //   (res: any) => {
    //     if (res) {
    //       this.isCRNumberAvailable = false;
    //       this.isCheckCRNumber = false;
    //       this.cdr.detectChanges();
    //     } else {
    //       this.isCRNumberAvailable = true;
    //       if (res?.message) {
    //         res?.error?.message ? this.alertsService.openSweetAlert('error', res?.error?.message) : '';
    //       }
    //       this.isCheckCRNumber = false;
    //     }
    //   },
    //   (err: any) => {
    //     err ? this.alertsService.openSweetAlert('error', err?.message) : '';
    //     this.isCheckCRNumber = false;
    //   })
  }
  onKeyUpEvent(type?: any): void {
    if (type == 'vatId') {
      // this.isVatIdAvailable = false;
    }
    if (type == 'taxId') {
      this.isTaxIdAvailable = false;
    }
    if (type == 'dunsNumber') {
      this.isDunsNumberAvailable = false;
    }
    if (type == 'CRNumber') {
      this.isCRNumberAvailable = false;
    }
    if (type == 'companyName') {
      this.isCompanyNameAvailable = false;
    }
    if (type == 'userName') {
      this.isUserNameAvailable = false;
    }
  }
  onKeyPress(event: KeyboardEvent) {
    if (event.keyCode === 45 || event.keyCode === 101) {
      event.preventDefault();
    }
  }
  checkCertified(event): void {
    const descriptionsArray = this.detailsForm?.get('descriptions') as FormArray;
    if (event?.target?.defaultValue == 'yes') {
      descriptionsArray.controls.forEach((control) => {
        control.get('description').setValidators(Validators.required);
        control.get('description').updateValueAndValidity();
      });
    } else {
      descriptionsArray?.controls?.forEach((control) => {
        control?.get('description')?.clearValidators();
        control?.get('description')?.updateValueAndValidity();
      });
    }
  }
  checkId(arr?: any, id?: any): void {
    return arr?.some(obj => obj?.id === id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
