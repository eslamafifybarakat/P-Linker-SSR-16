// Modules
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

// Components
import { AddNewContactModalComponent } from './add-new-contact-modal/add-new-contact-modal.component';

//Services
import { SupplierRegisterService } from '../../../../services/supplier-register.service';
import { PublicService } from './../../../../services/generic/public.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { patterns } from './../../../../shared/configs/patterns';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription, catchError, tap } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    DropdownModule,
    CommonModule,
    FormsModule,
  ],
  selector: 'app-supplier-contact-info',
  templateUrl: './supplier-contact-info.component.html',
  styleUrls: ['./supplier-contact-info.component.scss']
})
export class SupplierContactInfoComponent {
  private subscriptions: Subscription[] = [];

  isSupplierDataReturn: boolean = false;
  supplierData: any;

  countries: any = [];
  isLoadingCountries: boolean = false;
  phoneTypes: any = [
    { id: 1, name: 'Land' },
    { id: 2, name: 'Phone' }
  ];
  branches: any = [];

  constructor(
    private supplierRegisterService: SupplierRegisterService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  contactInformationForm: any = this.fb?.group({
    contactInfo: this.fb.array([]),
  })
  get contactInformationFormControls(): any {
    return this.contactInformationForm?.controls;
  }

  ngOnInit(): void {
    this.addContactInfo();
  }

  // Start Contact Card Form Array
  contact(): FormArray {
    return this.contactInformationForm.get("contactInfo") as FormArray;
  }
  get contactInfo(): FormArray {
    return this.contactInformationForm.get("contactInfo") as FormArray;
  }
  newContactInfo(cardTitle?: any, id?: any): FormGroup {
    return this.fb.group({
      finance: this.fb?.group({
        id: [id ? id : 0, []],
        cardTitle: [cardTitle, { validators: [Validators.required], updateOn: 'blur' }],
        isReset: [false, []],
        name: ['', { validators: [Validators.minLength(6), Validators.maxLength(60)], updateOn: 'blur' }],
        financePhone: this.fb.array([]),
        fax: [null, { validators: [], updateOn: 'blur' }],
        countryCode: [{
          "id": 1,
          "name": "Egypt",
          "nameAr": "مصر",
          "countryCode": "+20",
          "flag": "./assets/images/flags/egypt.png",
          "landNumber": 9,
          "phoneNumber": 10,
          "boxNumber": 10,
          "postalCode": 5,
          "isBoxNumberAcceptString": true,
          "isPostalCodeAcceptString": true,
          "isLocal": false
        }, { validators: [] }],
        branch: [null, { validators: [] }],
        email: ['', { validators: [Validators.pattern(patterns?.email)], updateOn: 'blur' }],
      }),
    });

  }
  addContactInfo(cardTitle?: any): void {
    if (this.contactInformationForm.value.contactInfo.length < 3) {
      const contactGroup: any = this.newContactInfo(cardTitle);
      contactGroup.get('finance.financePhone')?.push(this.newFinancePhone());
      this.contactInfo?.push(contactGroup);
    } else {
      this.alertsService?.openToast('warn', 'warn', this.publicService?.translateTextFromJson('enterMaximum'));
    }
    this.cdr.detectChanges();
  }
  removeContactInfo(i: number): void {
    this.contactInfo?.removeAt(i);
  }
  // End Contact Card Form Array

  // Start Phone Form Array
  finance(contactIndex: number): FormArray {
    return this.contactInfo?.at(contactIndex)?.get("finance.financePhone") as FormArray;

    // return this.contactInformationForm.get("finance.financePhone") as FormArray;
  }
  get financePhone(): FormArray {
    return this.contactInformationForm.get("finance.financePhone") as FormArray;
  }
  newFinancePhone(phone?: any, countryCode?: any, phoneType?: any, id?: any): FormGroup {
    return this.fb.group({
      id: [id ? id : 0, { validators: [] }],
      phone: [phone ? phone : null, { validators: [], updateOn: 'blur' }],
      countryCode: [countryCode ? countryCode : {
        "id": 1,
        "name": "Egypt",
        "nameAr": "مصر",
        "countryCode": "+20",
        "flag": "./assets/images/flags/egypt.png",
        "landNumber": 9,
        "phoneNumber": 10,
        "boxNumber": 10,
        "postalCode": 5,
        "isBoxNumberAcceptString": true,
        "isPostalCodeAcceptString": true,
        "isLocal": false
      }, { validators: [] }],
      phoneType: [phoneType ? phoneType : this.phoneTypes[1], { validators: [] }],
    });
  }
  addFinancePhone(contactIndex?: any, financePhone?: any): void {
    if (this.contactInformationForm?.value?.contactInfo[contactIndex]?.finance?.financePhone?.length < 3) {
      this.finance(contactIndex)?.push(this.newFinancePhone(financePhone, this.countries[0], this.phoneTypes[1]));
    } else {
      this.alertsService?.openToast('warn', 'warn', this.publicService?.translateTextFromJson('enterMaximum'));
    }
    console.log(this.contactInformationForm?.value?.finance?.financePhone);
    this.cdr?.detectChanges();
  }
  removeFinancePhone(i: number): void {
    const contactInfoArray = this.contactInformationForm.get('contactInfo') as FormArray;
    contactInfoArray?.controls?.forEach((control: FormGroup) => {
      const financePhoneArray = control.get('finance.financePhone') as FormArray;
      financePhoneArray?.removeAt(i);
    });
  }
  // End Phone Form Array

  // Add New Contact Info
  addNewContact(): void {
    const ref = this.dialogService?.open(AddNewContactModalComponent, {
      header: this.publicService?.translateTextFromJson('supplierRegister.addNew'),
      width: '40%',
      dismissableMask: false,
      styleClass: 'add-edit-dialog',
    });

    ref?.onClose?.subscribe((res: any) => {
      if (res?.addName) {
        console.log(res?.data);
        this.addContactInfo(res?.data?.name);
      }
    });
  }

  // Reset Contact Info
  resetFinanceFormGroup(index: number) {
    const financeGroup = this.contactInfo.controls[index].get('finance') as FormGroup;
    financeGroup.reset();
    financeGroup.patchValue({ isReset: true });
    financeGroup.patchValue({
      countryCode: {
        "id": 1,
        "name": "Egypt",
        "nameAr": "مصر",
        "countryCode": "+20",
        "flag": "./assets/images/flags/egypt.png",
        "landNumber": 9,
        "phoneNumber": 10,
        "boxNumber": 10,
        "postalCode": 5,
        "isBoxNumberAcceptString": true,
        "isPostalCodeAcceptString": true,
        "isLocal": false
      },
      phoneType: this.phoneTypes[1]
    });

    const financePhoneArray = financeGroup.get('financePhone') as FormArray;
    financePhoneArray.clear();
    financePhoneArray.push(this.newFinancePhone());

    this.cdr?.detectChanges();
  }

  // Start Get Counties
  getCountries(): void {
    this.isLoadingCountries = true;
    let getCountriesSubscription: Subscription = this.supplierRegisterService?.getCountries().pipe(
      tap(res => this.handleCountriesResponse(res)),
      catchError(err => this.handleCountriesError(err))
    ).subscribe();
    this.subscriptions.push(getCountriesSubscription);
  }
  private handleCountriesResponse(res: any): void {
    if (res) {
      this.countries = res;
      if (this.isSupplierDataReturn) {
        this.processSupplierDataAddress();
      }
    } else {
      this.handleCountriesError(res?.message);
    }
    this.isLoadingCountries = false;
    this.cdr.detectChanges();
  }
  private processSupplierDataAddress(): void {
    while (this.contactInfo?.length !== 0) {
      this.contactInfo?.removeAt(0);
    }
    if (this.supplierData?.contacts?.length > 0) {
      for (const contact of this.supplierData?.contacts) {
        let branch: any = null;
        this.branches?.forEach((item: any) => {
          if (item?.id == contact?.addressId) {
            branch = item;
          }
        });
        const contactGroup = this.newContactInfo();
        contactGroup?.get('finance.id')?.setValue(contact?.id);
        contactGroup?.get('finance.cardTitle')?.setValue(contact?.contactType);
        contactGroup?.get('finance.name')?.setValue(contact?.name);
        contactGroup?.get('finance.fax')?.setValue(contact?.fax);
        contactGroup?.get('finance.email')?.setValue(contact?.email);
        contactGroup?.get('finance.branch')?.setValue(branch);
        this.countries?.forEach((item: any) => {
          if (item?.id == contact?.faxCountryId) {
            contactGroup?.get('finance.countryCode')?.setValue(item);
          }
        });
        const financePhoneArray = contactGroup?.get('finance.financePhone') as FormArray;
        financePhoneArray?.clear();

        for (const phone of contact?.contactPhones) {
          this.countries?.forEach((item: any) => {
            if (item?.id == phone?.countryId) {
              const phoneGroup = this.fb.group({
                id: new FormControl(phone?.id),
                countryCode: new FormControl(item),
                phone: new FormControl(phone?.phone),
                phoneType: new FormControl(phone?.numberTypeId == 1 ? this.phoneTypes[0] : this.phoneTypes[1]),
              });
              financePhoneArray.push(phoneGroup);
            }
          });
        }
        this.contactInfo.push(contactGroup);
      }
    } else {
      this.addContactInfo('Main Contact');
    }
  }
  private handleCountriesError(err: any): any {
    this.isLoadingCountries = false;
    this.handleError(err);
  }
  // End  Get Counties

  // Go Back
  goBack(): void {
    this.router.navigate(['/Supplier-Register/Contact-Info']);
  }

  // Start Add Supplier Contacts
  submit(): void {
    if (this.contactInformationForm?.valid) {
      const data = this.extractFormData();
      this.saveSupplierContacts(data);
    } else {
      this.publicService?.validateAllFormFields(this.contactInformationForm);
    }
  }
  private extractFormData(): any {
    let contacts: any = [];
    this.contactInformationForm?.value?.contactInfo?.forEach((item: any) => {
      let phones: any = [];
      item?.finance?.financePhone?.forEach((element: any) => {
        phones?.push({
          id: element?.id,
          countryId: element?.countryCode?.id,
          phone: element?.phone,
          numberTypeId: element?.phoneType?.id
        })
      });
      contacts?.push({
        id: item?.finance?.id,
        contactType: item?.finance?.cardTitle,
        name: item?.finance?.name,
        addressId: item?.finance?.branch?.id,
        email: item?.finance?.email,
        fax: item?.finance?.fax,
        faxCountryId: item?.finance?.countryCode?.id,
        phones: phones
      })
    });
    return {
      contacts: contacts
    }
  }
  private saveSupplierContacts(data: any): void {
    this.publicService?.showGlobalLoader?.next(true);
    let subscribeSaveSupplierContacts: Subscription = this.supplierRegisterService?.saveSupplierContacts(data).pipe(
      tap(res => this.handleSaveSupplierContactsSuccess(res)),
      catchError(err => this.handleError(err))
    ).subscribe();
    this.subscriptions.push(subscribeSaveSupplierContacts);
  }
  private handleSaveSupplierContactsSuccess(response: any): void {
    this.publicService?.showGlobalLoader?.next(false);
    if (response) {
      this.handleSuccess(response?.message);
      this.router.navigate(['/Supplier-Register/Bank-Info']);
    } else {
      this.handleError(response?.message);
    }
  }
  // End Add Supplier Contacts

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
