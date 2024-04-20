// Modules
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

//Services
import { SupplierRegisterService } from '../../../../services/supplier-register.service';
import { PublicService } from './../../../../services/generic/public.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { patterns } from './../../../../shared/configs/patterns';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription, catchError, tap } from 'rxjs';
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

  countries: any = [];
  isLoadingCountries: boolean = false;
  phoneTypes: any = [
    { id: 1, name: 'Land' },
    { id: 2, name: 'Phone' }
  ];
  constructor(
    private supplierRegisterService: SupplierRegisterService,
    private alertsService: AlertsService,
    public publicService: PublicService,
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


  addNewContact(): void {
    // const ref = this.dialogService?.open(AddNewContactModalComponent, {
    //   header: this.publicService?.translateTextFromJson('addNew'),
    //   width: '40%',
    //   dismissableMask: false,
    //   styleClass: 'add-edit-dialog',
    // });

    // ref?.onClose?.subscribe((res: any) => {
    //   if (res?.addName) {
    //     console.log(res?.data);
    //     this.addContactInfo(res?.data?.name);
    //   }
    // });
  }
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
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
