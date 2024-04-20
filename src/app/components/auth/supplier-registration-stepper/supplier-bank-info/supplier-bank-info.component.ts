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
  selector: 'app-supplier-bank-info',
  templateUrl: './supplier-bank-info.component.html',
  styleUrls: ['./supplier-bank-info.component.scss']
})
export class SupplierBankInfoComponent {
  private subscriptions: Subscription[] = [];

  isSupplierDataReturn: boolean = false;
  supplierData: any;
  supplierId: number = null;

  isEnterBankName: boolean = false;

  // Currency List Variables
  currencyList: any;
  isLoadingCurrency: boolean = false;

  supplierBanks: any = [];

  constructor(
    private supplierRegisterService: SupplierRegisterService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  bankInformationForm: any = this.fb?.group({
    bankName: ['', { validators: [Validators.minLength(2), Validators.maxLength(75)], updateOn: 'blur' }],
    branchName: ['', { validators: [Validators.minLength(2), Validators.maxLength(75)], updateOn: 'blur' }],
    accountNo: ['', { validators: [], updateOn: 'blur' }],
    iban: [null, { validators: [Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{14,34}$/)], updateOn: 'blur' }],
    swiftCode: ['', { validators: [Validators.minLength(8), Validators.maxLength(11)], updateOn: 'blur' }],
    currency: [null, { validators: [], updateOn: 'blur' }],
  })
  get bankInformationFormControls(): any {
    return this.bankInformationForm?.controls;
  }

  ngOnInit(): void {
    this.getCurrencies();

    this.bankInformationForm?.get('bankName')?.valueChanges?.pipe(distinctUntilChanged()).subscribe((res: any) => {
      if (this.bankInformationFormControls?.bankName?.valid) {
        this.isEnterBankName = true;
        this.publicService?.addAllValidators(this.bankInformationForm, 'bankName', 2, 75);
        this.publicService?.addAllValidators(this.bankInformationForm, 'branchName', 2, 75);
        this.publicService?.addAllValidators(this.bankInformationForm, 'accountNo');
        this.publicService?.addAllValidators(this.bankInformationForm, 'currency');
        this.publicService?.addValidatorsWithPattern(this.bankInformationForm, 'iban', /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{14,34}$/);
        this.publicService?.addAllValidators(this.bankInformationForm, 'swiftCode', 8, 11);
      }
    });
  }

  // Start Get Currencies
  getCurrencies(): void {
    this.isLoadingCurrency = true;
    let getCurrenciesSubscription: Subscription = this.supplierRegisterService?.getCurrencies().pipe(
      tap(res => this.handleCurrenciesResponse(res)),
      catchError(err => this.handleCurrenciesError(err))
    ).subscribe();
    this.subscriptions.push(getCurrenciesSubscription);
  }
  private handleCurrenciesResponse(res: any): void {
    if (res) {
      this.currencyList = res;
    } else {
      this.handleCurrenciesError(res?.message);
    }
    this.isLoadingCurrency = false;
    this.cdr.detectChanges();
  }
  private handleCurrenciesError(err: any): any {
    this.isLoadingCurrency = false;
    this.handleError(err);
    this.currencyList = [
      { id: 1, code: 'usd' }
    ]
  }
  // End  Get Currencies

  // Start Table Actions
  addBank(): void {
    if (this.bankInformationForm?.valid && this.bankInformationForm?.value?.bankName != null) {
      let formInfo: any = this.bankInformationForm?.value;
      this.supplierBanks?.push({
        id: 0,
        bankName: formInfo?.bankName,
        branchName: formInfo?.branchName,
        accountNo: formInfo?.accountNo,
        iban: formInfo?.iban,
        swiftCode: formInfo?.swiftCode,
        accountCurrency: formInfo?.currency?.code,
        currencyId: formInfo?.currency?.id
      });
      this.resetBankInfo();
    } else {
      this.publicService?.validateAllFormFields(this.bankInformationForm);
    }
  }
  deleteBank(index: any): void {
    this.supplierBanks?.splice(index, 1);
  }
  resetBankInfo(): void {
    this.bankInformationForm?.reset();
    this.isEnterBankName = false;
    this.publicService?.addNotRequiredValidators(this.bankInformationForm, ['bankName'], 2, 75);
    this.publicService?.addNotRequiredValidators(this.bankInformationForm, ['branchName'], 2, 75);
    this.publicService?.addNotRequiredValidators(this.bankInformationForm, ['accountNo']);
    this.publicService?.addNotRequiredValidators(this.bankInformationForm, ['currency']);
    this.publicService?.addNotRequiredValidators(this.bankInformationForm, ['iban'], null, null, '^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{14,34}$');
    this.publicService?.addNotRequiredValidators(this.bankInformationForm, ['swiftCode'], 8, 11);
  }
  // End Table Actions

  // Go Back
  goBack(): void {
    this.router.navigate(['/Supplier-Register/Contact-Info']);
  }

  // Start Add Supplier Bank Information
  submit(): void {
    if (this.bankInformationForm?.valid) {
      const data = this.extractFormData();
      this.saveSupplierBankInfo(data);
    } else {
      this.publicService?.validateAllFormFields(this.bankInformationForm);
    }
  }
  private extractFormData(): any {
    let banks: any = [];
    this.supplierBanks?.forEach((item: any) => {
      banks?.push({
        id: item?.id,
        swiftCode: item?.swiftCode,
        iban: item?.iban,
        accountCurrency: item?.accountCurrency,
        bankName: item?.bankName,
        branchName: item?.branchName,
        accountNo: item?.accountNo?.toString(),
        currencyId: item?.currencyId
      })
    });
    return {
      supplierId: this.supplierId,
      banks: banks
    }
  }
  private saveSupplierBankInfo(data: any): void {
    this.publicService?.showGlobalLoader?.next(true);
    let subscribeSaveSupplierBankInfo: Subscription = this.supplierRegisterService?.saveSupplierBanks(data).pipe(
      tap(res => this.handleSaveSupplierBankInfoSuccess(res)),
      catchError(err => this.handleError(err))
    ).subscribe();
    this.subscriptions.push(subscribeSaveSupplierBankInfo);
  }
  private handleSaveSupplierBankInfoSuccess(response: any): void {
    this.publicService?.showGlobalLoader?.next(false);
    if (response) {
      this.handleSuccess(response?.message);
      this.router.navigate(['/Supplier-Register/Customer-Ref']);
    } else {
      this.handleError(response?.message);
    }
  }
  // End Add Supplier Bank Information

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
