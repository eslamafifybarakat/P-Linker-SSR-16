import { SupplierService } from './../../../../services/supplier.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { PublicService } from './../../../../services/generic/public.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { patterns } from './../../../../shared/configs/patterns';
import { AuthService } from './../../../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, DropdownModule],
  selector: 'address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent {
  private subscriptions: Subscription[] = [];
  @Output() handleAddressInfo: EventEmitter<any> = new EventEmitter();

  countries: any = [];
  isLoadingCountries: boolean = false;

  cities: any = [];
  isLoadingCities: boolean = false;

  isVatNumberAvailable: boolean = false;
  isCheckVatNumber: boolean = false;

  addressInfoForm: any = this.fb?.group({
    country: [null, [Validators.required]],
    city: [null, []],
    vatNumber: ['', { validators: [Validators.required, Validators.pattern(patterns?.vatNumber)], updateOn: 'blur' }],
  });
  get formControls(): any {
    return this.addressInfoForm?.controls;
  }
  constructor(
    private supplierService: SupplierService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // this.getCountries();
  }

  // COUNTRIES
  getCountries(): void {
    this.isLoadingCountries = true;
    let countriesSubscription = this.supplierService.getCountries().subscribe(
      (res: any) => {
        this.handleCountriesSuccess(res);
      },
      (err: any) => {
        this.handleCountriesError(err);
      }
    );
    this.subscriptions.push(countriesSubscription);
  }
  handleCountriesSuccess = (res: any) => {
    if (res) {
      this.countries = res;
      this.isLoadingCountries = false;
    } else {
      this.handleCountriesError(res.error);
    }
    this.isLoadingCountries = false;
    this.cdr.detectChanges();
  };
  handleCountriesError = (err: any) => {
    if (err) {
      this.alertsService.openToast('error', 'error', err.message);
    }
    this.isLoadingCountries = false;
  };

  // CITY
  getCitiesByCountryId(event: any): void {
    this.addressInfoForm?.controls['city'].reset();
    if (event) {
      this.isLoadingCities = true;
      let citiesSubscription = this.supplierService.getCitiesByCountryId(event?.value?.id).subscribe(
        (res: any) => {
          this.handleCitiesSuccess(res);
        },
        (err: any) => {
          this.handleCitiesError(err);
        }
      );
      this.subscriptions.push(citiesSubscription);
    }
  }
  handleCitiesSuccess = (res: any) => {
    if (res) {
      this.cities = res;
      this.isLoadingCities = false;
    } else {
      this.handleCitiesError(res.error);
    }
    this.isLoadingCities = false;
    this.cdr.detectChanges();
  };
  handleCitiesError = (err: any) => {
    if (err) {
      this.alertsService.openToast('error', 'error', err.message);
    }
    this.isLoadingCities = false;
  };

  // VAT NUMBER AVAILABLE
  IsVatNumberAvailable(vatNumber: string, country?: any): void {
    this.isCheckVatNumber = true;
    let emailSubscription = this.authService.IsVatAvailableRegister(vatNumber, country?.id).subscribe(
      (res: any) => {
        this.handleSuccess(res);
      },
      (err: any) => {
        this.handleError(err);
      }
    );
    // Clean up the subscription on component destroy
    if (emailSubscription) {
      this.subscriptions.push(emailSubscription);
    }
  }
  handleSuccess = (res: any) => {
    if (res.code === 200) {
      this.isVatNumberAvailable = res.data === true;
    } else {
      this.isVatNumberAvailable = false;
      if (res.message) {
        res.error?.message ? this.alertsService.openToast('error', 'error', res.error.message) : '';
      }
    }
    this.isCheckVatNumber = false;
    this.cdr.detectChanges();
  };
  handleError = (err: any) => {
    if (err) {
      this.alertsService.openToast('error', 'error', err.message);
    }
    this.isCheckVatNumber = false;
  };
  onKeyUpEvent(): void {
    this.isCheckVatNumber = false;
  }

  continue(): void {
    if (this.addressInfoForm?.valid) {
      this.handleAddressInfo.emit({ name: 'addressInfo', addressInfo: this.addressInfoForm.value, nextStep: 4 });
    } else {
      this.publicService?.validateAllFormFields(this.addressInfoForm);
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
