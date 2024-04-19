// Modules
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

//Services
import { SupplierRegisterService } from '../../../../services/supplier-register.service';
import { PublicService } from './../../../../services/generic/public.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { patterns } from './../../../../shared/configs/patterns';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription, catchError, tap } from 'rxjs';

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
  isLoadingCheckUserName: boolean = false;

  // Check CompanyName Variables
  isCompanyNameAvailable: boolean = false;
  isLoadingCheckCompanyName: boolean = false;

  // Check TaxId Variables
  isTaxIdAvailable: boolean = false;
  isLoadingCheckTaxId: boolean = false;

  // Check DunsNumber Variables
  isDunsNumberAvailable: boolean = false;
  isLoadingCheckDunsNumber: boolean = false;

  // Check CrNumber Variables
  isCRNumberAvailable: boolean = false;
  isLoadingCheckCRNumber: boolean = false;

  // Check VatId Variables
  isVatIdAvailable: boolean = false;
  isLoadingCheckVatId: boolean = false;

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
    private supplierRegisterService: SupplierRegisterService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
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

  // Start Check If Company Name Unique
  checkCompanyNameAvailability(): void {
    if (!this.formControls?.companyName?.valid) {
      return; // Exit early if Company Name is not valid
    }
    const data: string = this.detailsForm?.value?.companyName;
    this.isLoadingCheckCompanyName = true;
    let checkCompanyNameSubscription: Subscription = this.supplierRegisterService?.checkCompanyNameAvailability(data).pipe(
      tap(res => this.handleCompanyNameResponse(res)),
      catchError(err => this.handleCompanyNameError(err))
    ).subscribe();
    this.subscriptions.push(checkCompanyNameSubscription);
  }
  private handleCompanyNameResponse(res: any): void {
    if (res) {
      this.isCompanyNameAvailable = false;
    } else {
      this.isCompanyNameAvailable = true;
      this.handleCompanyNameError(res?.message);
    }
    this.isLoadingCheckCompanyName = false;
    this.cdr.detectChanges();
  }
  private handleCompanyNameError(err: any): any {
    this.isCompanyNameAvailable = true;
    this.isLoadingCheckCompanyName = false;
    this.handleError(err);
  }
  // End Check If Company Name Unique

  // Start Check If User Name Unique
  IsUserNameAvailable(): void {
    if (!this.formControls?.userName?.valid) {
      return; // Exit early if User Name is not valid
    }
    const data: string = this.detailsForm?.value?.userName;
    this.isLoadingCheckUserName = true;
    let checkUserNameSubscription: Subscription = this.supplierRegisterService?.IsUserNameAvailable(data).pipe(
      tap(res => this.handleUserNameResponse(res)),
      catchError(err => this.handleUserNameError(err))
    ).subscribe();
    this.subscriptions.push(checkUserNameSubscription);
  }
  private handleUserNameResponse(res: any): void {
    if (res) {
      this.isUserNameAvailable = false;
    } else {
      this.isUserNameAvailable = true;
      this.handleUserNameError(res?.message);
    }
    this.isLoadingCheckCompanyName = false;
    this.cdr.detectChanges();
  }
  private handleUserNameError(err: any): any {
    this.isUserNameAvailable = true;
    this.isLoadingCheckUserName = false;
    this.handleError(err);
  }
  // End Check If User Name Unique

  // Start Check If Vat Id Unique
  IsVatIdAvailable(): void {
    if (!this.formControls?.vatId?.valid) {
      return; // Exit early if Vat Id is not valid
    }
    const vatId: string = this.detailsForm?.value?.vatId;
    const countryId: number | string = this.detailsForm?.value?.country?.id
    this.isLoadingCheckVatId = true;
    let checkVatIdSubscription: Subscription = this.supplierRegisterService?.IsVatAvailable(vatId, countryId).pipe(
      tap(res => this.handleVatIdResponse(res)),
      catchError(err => this.handleVatIdError(err))
    ).subscribe();
    this.subscriptions.push(checkVatIdSubscription);
  }
  private handleVatIdResponse(res: any): void {
    if (res) {
      this.isVatIdAvailable = false;
    } else {
      this.isVatIdAvailable = true;
      this.handleVatIdError(res?.message);
    }
    this.isLoadingCheckVatId = false;
    this.cdr.detectChanges();
  }
  private handleVatIdError(err: any): any {
    this.isVatIdAvailable = true;
    this.isLoadingCheckVatId = false;
    this.handleError(err);
  }
  // End Check If Vat Id Unique

  // Start Check If Tax Id Unique
  IsTaxIdAvailable(): void {
    if (!this.formControls?.taxId?.valid) {
      return; // Exit early if Tax Id is not valid
    }
    const taxId: string = this.detailsForm?.value?.taxId;
    this.isLoadingCheckVatId = true;
    let checkTaxIdSubscription: Subscription = this.supplierRegisterService?.IsTaxIdAvailable(taxId).pipe(
      tap(res => this.handleTaxIdResponse(res)),
      catchError(err => this.handleTaxIdError(err))
    ).subscribe();
    this.subscriptions.push(checkTaxIdSubscription);
  }
  private handleTaxIdResponse(res: any): void {
    if (res) {
      this.isTaxIdAvailable = false;
    } else {
      this.isTaxIdAvailable = true;
      this.handleTaxIdError(res?.message);
    }
    this.isLoadingCheckTaxId = false;
    this.cdr.detectChanges();
  }
  private handleTaxIdError(err: any): any {
    this.isTaxIdAvailable = true;
    this.isLoadingCheckTaxId = false;
    this.handleError(err);
  }
  // End Check If Tax Id Unique

  // Start Check If Duns Number Unique
  IsDunsNumberAvailable(): void {
    if (!this.formControls?.dunsNumber?.valid) {
      return; // Exit early if Duns Number is not valid
    }
    const dunsNumber: string = this.detailsForm?.value?.dunsNumber;
    this.isLoadingCheckDunsNumber = true;
    let checkDunsNumberSubscription: Subscription = this.supplierRegisterService?.IsTaxIdAvailable(dunsNumber).pipe(
      tap(res => this.handleDunsNumberResponse(res)),
      catchError(err => this.handleDunsNumberError(err))
    ).subscribe();
    this.subscriptions.push(checkDunsNumberSubscription);
  }
  private handleDunsNumberResponse(res: any): void {
    if (res) {
      this.isDunsNumberAvailable = false;
    } else {
      this.isDunsNumberAvailable = true;
      this.handleDunsNumberError(res?.message);
    }
    this.isLoadingCheckDunsNumber = false;
    this.cdr.detectChanges();
  }
  private handleDunsNumberError(err: any): any {
    this.isDunsNumberAvailable = true;
    this.isLoadingCheckDunsNumber = false;
    this.handleError(err);
  }
  // End Check If Duns Number Unique

  // Start Check If CR Number Unique
  IsCRNumberAvailable(): void {
    if (!this.formControls?.CRNumber?.valid) {
      return; // Exit early if CR Number is not valid
    }
    const CRNumber: string = this.detailsForm?.value?.CRNumber;
    this.isLoadingCheckCRNumber = true;
    let checkCRNumberSubscription: Subscription = this.supplierRegisterService?.IsCRNumberAvailable(CRNumber).pipe(
      tap(res => this.handleCRNumberResponse(res)),
      catchError(err => this.handleCRNumberError(err))
    ).subscribe();
    this.subscriptions.push(checkCRNumberSubscription);
  }
  private handleCRNumberResponse(res: any): void {
    if (res) {
      this.isCRNumberAvailable = false;
    } else {
      this.isCRNumberAvailable = true;
      this.handleCRNumberError(res?.message);
    }
    this.isLoadingCheckCRNumber = false;
    this.cdr.detectChanges();
  }
  private handleCRNumberError(err: any): any {
    this.isCRNumberAvailable = true;
    this.isLoadingCheckCRNumber = false;
    this.handleError(err);
  }
  // End Check If CR Number Unique

  onKeyUpEvent(type?: any): void {
    if (type == 'vatId') {
      this.isVatIdAvailable = false;
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

  submit(): void {
    let detailsInfo: any = this.detailsForm?.value;
    let dataActivitiesIds: any = [];
    detailsInfo?.dataActivities?.forEach((item: any) => {
      dataActivitiesIds?.push(item?.id);
    });
    let ownerShipIds: any = [];
    detailsInfo?.ownerShip?.forEach((item: any) => {
      ownerShipIds?.push(item?.id);
    });
    let descArr: any = [];
    detailsInfo?.descriptions?.forEach((item: any) => {
      descArr?.push(item?.description);
    });
    let ownerShip: any = this.checkId(detailsInfo?.ownerShip, 5);
    let data: any = {
      companyName: detailsInfo?.companyName,
      companyNameAr: detailsInfo?.companyNameAr ? detailsInfo?.companyNameAr : null,
      firstName: detailsInfo?.firstName,
      lastName: detailsInfo?.lastName,
      userName: detailsInfo?.userName,
      commerceRecordNumber: detailsInfo?.CRNumber ? detailsInfo?.CRNumber.toString() : null,
      numberOfEmployees: detailsInfo?.noOfEmployees ? detailsInfo?.noOfEmployees : null,
      foundationDate: detailsInfo?.foundationDate ? detailsInfo?.foundationDate : null,
      commerceRecordValidityDate: detailsInfo?.CRValidity ? detailsInfo?.CRValidity : null,
      ownerName: detailsInfo?.ownerName ? detailsInfo?.ownerName : null,
      capital: detailsInfo?.capital ? detailsInfo?.capital : null,
      currencyId: detailsInfo?.currency?.id,
      categories: dataActivitiesIds,
      typeOfOwnerShipId: ownerShipIds,
      typeOfOwnerShip: ownerShip ? detailsInfo?.otherOwnerShipName : '',
      countryId: detailsInfo?.country?.id ? detailsInfo?.country?.id : null,
      yearsOnCurrentActivityId: detailsInfo?.yearOfCurrentActivity?.id ? detailsInfo?.yearOfCurrentActivity?.id : null,
      yearsOnCurrentActivity: detailsInfo?.yearOfCurrentActivity?.name ? detailsInfo?.yearOfCurrentActivity?.name : null,
      isCertified: detailsInfo?.isCertified ? detailsInfo?.isCertified == 'yes' ? true : false : null,
      vatNumber: detailsInfo?.vatId,
      taxId: detailsInfo?.taxId ? detailsInfo?.taxId?.toString() : null,
      dunsNumber: detailsInfo?.dunsNumber ? detailsInfo?.dunsNumber?.toString() : null,
      certificates: descArr,
      description: detailsInfo?.companyDescription ? detailsInfo?.companyDescription : null,
      website: detailsInfo?.websiteAddress ? detailsInfo?.websiteAddress : null,
    };
    if (this.detailsForm?.valid) {
      // this.publicService?.show_loader?.next(true);
      // this.supplierService?.saveSupplierDetails(data)?.subscribe(
      //   (res: any) => {
      //     if (res) {
      //       stepper?.next();
      //       this.refreshSupplier(true);
      //       this.publicService?.show_loader?.next(false);
      //     } else {
      //       this.publicService?.show_loader?.next(false);
      //       res?.error?.message ? this.alertsService?.openSweetAlert('error', res?.err?.message) : '';
      //     }
      //   },
      //   (err: any) => {
      //     this.publicService?.show_loader?.next(false);
      //     err ? this.alertsService?.openSweetAlert('error', err) : '';
      //   }
      // );
    }
    else {
      this.publicService?.validateAllFormFields(this.detailsForm);
    }
  }


  /* --- Handle api requests messages --- */
  private handleSuccess(msg: any): any {
    this.setMessage(msg || this.publicService.translateTextFromJson('general.successRequest'), 'success');
  }
  private handleError(err: any): any {
    this.setMessage(err || this.publicService.translateTextFromJson('general.errorOccur'), 'error');
  }
  private setMessage(message: string, type: string): void {
    this.alertsService.openToast(type, type, message);
    // this.publicService.showGlobalLoader.next(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
