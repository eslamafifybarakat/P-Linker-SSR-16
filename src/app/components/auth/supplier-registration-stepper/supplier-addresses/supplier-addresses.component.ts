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


  onChangeCountry(index?: any): void {
    this.addressForm?.controls?.addresses?.at(index)?.get('city')?.reset();
    this.addressForm?.controls?.addresses?.at(index)?.get('poBox')?.reset();
    this.addressForm?.controls?.addresses?.at(index)?.get('postalCode')?.reset();

    this.currentCityIndex = index;
    this.getCitysByCountryId(this.addressForm?.controls?.addresses?.at(index).get('country')?.value?.id, index, false);
  }
  getCitysByCountryId(id: any, index: any, isDoPatch?: boolean): void {
    // this.isLoadingCities = true;
    // this.authService?.getCitysByCountryId(id)?.subscribe(
    //   (res: any) => {
    //     if (res) {
    //       let arr: any = [];
    //       arr = res;
    //       this.cityArray[index] ? this.cityArray[index] = arr : this.cityArray?.push(arr);
    //       this.isLoadingCities = false;
    //       if (isDoPatch) {
    //         while (this.address?.length !== 0) {
    //           this.address?.removeAt(0);
    //         }
    //       }
    //       if (this.cityArray[index]?.length <= 0) {
    //         this.addressForm?.controls?.address?.at(index)?.get('city')?.setValue(null);
    //       }
    //       if (isDoPatch) {
    //         if (this.supplierData?.address?.length > 0) {
    //           if (index == this.supplierData?.address?.length - 1) {
    //             let address = [];
    //             this.supplierData?.address?.forEach((item: any, index: any) => {
    //               let city: any = null;
    //               this.cityArray[index]?.forEach((element: any) => {
    //                 if (element?.id == item?.cityId) {
    //                   city = element;
    //                 }
    //               });
    //               this.countries?.forEach((country: any) => {
    //                 if (item?.countryId == country?.id) {
    //                   address?.push({
    //                     id: item?.id,
    //                     title: item?.title,
    //                     poBox: item?.poBox,
    //                     postalCode: item?.postalCode,
    //                     addressLine1: item?.addressLine1,
    //                     addressLine2: item?.addressLine2,
    //                     city: city,
    //                     country: country
    //                   })
    //                 }
    //               });
    //             });
    //             address?.forEach((item: any) => {
    //               this.supplierAddress()?.push(this.newAddress(item));
    //             });
    //           }
    //         } else {
    //           this.addAddress();
    //         }
    //       } else {
    //         res?.error?.message ? this.alertsService?.openSweetAlert('error', res?.error?.message) : '';
    //         this.isLoadingCities = false;
    //       }
    //     }
    //   },
    //   (err: any) => {
    //     err ? this.alertsService?.openSweetAlert('error', err) : '';
    //     this.isLoadingCities = false;
    //   })
  }
}
