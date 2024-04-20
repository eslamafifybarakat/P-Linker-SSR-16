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
  selector: 'app-supplier-addresses',
  templateUrl: './supplier-addresses.component.html',
  styleUrls: ['./supplier-addresses.component.scss']
})
export class SupplierAddressesComponent {
  private subscriptions: Subscription[] = [];

  isSupplierDataReturn: boolean = false;
  supplierData: any;

  addressForm: any = this.fb?.group({
    addresses: this.fb?.array([]),
  })
  get addressFormControls(): any {
    return this.addressForm?.controls;
  }

  // Countries List Variables
  countries: any = [];
  isLoadingCountries: boolean = false;

  cityArray: any = [];
  currentCityIndex: any = 0;
  isLoadingCities: boolean = false;

  constructor(
    private supplierRegisterService: SupplierRegisterService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
  ) { }
  supplierAddress(): FormArray {
    return this.addressForm.get("addresses") as FormArray;
  }
  get address(): FormArray {
    return this.addressForm.get("addresses") as FormArray;
  }
  newAddress(item?: any): FormGroup {
    return this.fb.group({
      id: [item?.id ? item?.id : 0, []],
      title: [item?.title ? item?.title : '', { validators: [Validators?.minLength(2)], updateOn: 'blur' }],
      poBox: [item?.poBox ? item?.poBox : '', { validators: [], updateOn: 'blur' }],
      postalCode: [item?.postalCode ? item?.postalCode : '', { validators: [], updateOn: 'blur' }],
      city: [item?.city ? item?.city : null, []],
      country: [item?.country ? item?.country : null, []],
      addressLine1: [item?.addressLine1 ? item?.addressLine1 : '', { validators: [Validators.minLength(4), Validators.maxLength(100)], updateOn: 'blur' }],
      addressLine2: [item?.addressLine2 ? item?.addressLine2 : '', { validators: [Validators.minLength(4), Validators.maxLength(100)], updateOn: 'blur' }]
    });
  }
  addAddress(item?: any): void {
    if (this.addressForm?.value?.addresses?.length < 3) {
      this.address?.push(this.newAddress(item));
    } else {
      this.alertsService?.openToast('warn', 'warn', this.publicService?.translateTextFromJson('maxAddress'))
    }
  }
  removeAddress(i: number): void {
    this.address.removeAt(i);
    this.cityArray?.forEach((element: any, Index: any) => {
      if (i == Index) {
        this.cityArray?.splice(Index, 1);
      }
    });
  }


  ngOnInit(): void {
    this.getCountries();
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
        this.supplierData?.address?.forEach((item: any, index: any) => {
          this.getCitiesByCountryId(item?.countryId, index, true);
        });
      }
    } else {
      this.handleCountriesError(res?.message);
    }
    this.isLoadingCountries = false;
    this.cdr.detectChanges();
  }
  private handleCountriesError(err: any): any {
    this.isLoadingCountries = false;
    this.handleError(err);
    this.countries = [
      { id: 1, name: 'country1', flag: '' }
    ];
    this.addAddress();
  }
  onChangeCountry(index?: any): void {
    this.addressForm?.controls?.addresses?.at(index)?.get('city')?.reset();
    this.addressForm?.controls?.addresses?.at(index)?.get('poBox')?.reset();
    this.addressForm?.controls?.addresses?.at(index)?.get('postalCode')?.reset();

    this.currentCityIndex = index;
    this.getCitiesByCountryId(this.addressForm?.controls?.addresses?.at(index).get('country')?.value?.id, index, false);
  }
  // End  Get Counties

  // Start Get Cities By Id
  getCitiesByCountryId(id: any, index: any, isDoPatch?: boolean): void {
    this.isLoadingCities = true;
    let getCitiesSubscription: Subscription = this.supplierRegisterService?.getCitiesByCountryId(id).pipe(
      tap(res => this.handleCitiesResponse(res, index, isDoPatch)),
      catchError(err => this.handleCitiesError(err))
    ).subscribe();
    this.subscriptions.push(getCitiesSubscription);
  }
  private handleCitiesResponse(res: any, index: number, isDoPatch?: boolean): void {
    if (res) {
      const cities: any[] = res;
      this.updateCityArray(cities, index);
      if (isDoPatch) {
        this.clearAddressForm();
      }
      if (this.cityArray[index]?.length <= 0) {
        this.resetCityField(index);
      }
      if (isDoPatch) {
        this.processSupplierDataAddress(index);
      }
    } else {
      this.handleCitiesError(res?.message);
    }
    this.isLoadingCities = false;
    this.cdr.detectChanges();
  }
  // Update Cities Array
  updateCityArray(cities: any[], index: number): void {
    if (this.cityArray[index]) {
      this.cityArray[index] = cities;
    } else {
      this.cityArray?.push(cities);
    }
  }
  //Clear Address Form
  clearAddressForm(): void {
    while (this.address?.length !== 0) {
      this.address?.removeAt(0);
    }
  }
  //Reset Address Form
  resetCityField(index: number): void {
    this.addressForm?.controls?.address?.at(index)?.get('city')?.setValue(null);
  }
  processSupplierDataAddress(index: number): void {
    if (this.supplierData?.address?.length > 0 && index == this.supplierData?.address?.length - 1) {
      const address: any[] = [];
      this.supplierData?.address?.forEach((item: any, index: any) => {
        let city: any = null;
        this.cityArray[index]?.forEach((element: any) => {
          if (element?.id == item?.cityId) {
            city = element;
          }
        });
        this.countries?.forEach((country: any) => {
          if (item?.countryId == country?.id) {
            address?.push({
              id: item?.id,
              title: item?.title,
              poBox: item?.poBox,
              postalCode: item?.postalCode,
              addressLine1: item?.addressLine1,
              addressLine2: item?.addressLine2,
              city: city,
              country: country
            });
          }
        });
      });
      address?.forEach((item: any) => {
        this.supplierAddress()?.push(this.newAddress(item));
      });
    } else {
      this.addAddress();
    }
  }
  private handleCitiesError(err: any): any {
    this.isLoadingCities = false;
    this.handleError(err);
  }
  // End  Get Cities By Id

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
