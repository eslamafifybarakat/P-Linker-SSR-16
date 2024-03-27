import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { resourceDetailsDataAr, resourceDetailsDataEn } from './resource-details';
import { PublicService } from './../../../../services/generic/public.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { keys } from './../../../../shared/configs/localstorage-key';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { patterns } from './../../../../shared/configs/patterns';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule, ReactiveFormsModule, DropdownModule],
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss']
})
export class ResourceDetailsComponent {
  private unsubscribe: Subscription[] = [];
  currentLanguage: string | null = '';

  data: any;
  isLoadingCountries: boolean = false;
  countries: any = [];

  detailsForm: any = this.fb?.group({
    companyName: ['', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }],
    firstName: ['', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)], updateOn: 'blur' }],
    lastName: ['', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)], updateOn: 'blur' }],
    email: ['', { validators: [Validators.required, Validators.pattern(patterns?.email)], updateOn: 'blur' }],
    jobTitle: ['', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }],
    country: [null, { validators: [Validators.required] }],
  },
  );
  get formControls(): any {
    return this.detailsForm?.controls;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private alertsService: AlertsService,
    public publicService: PublicService,
    // private mainService: MainService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }
    this.data = this.currentLanguage == 'ar' ? resourceDetailsDataAr : resourceDetailsDataEn;
    // this.getCountries();
  }
  getCountries(): void {
    this.isLoadingCountries = true;
    // this.mainService?.getCountrys()?.subscribe(
    //   (res: any) => {
    //     if (res) {
    //       this.countries = res;
    //       this.isLoadingCountries = false;
    //     } else {
    //       res?.error?.message ? this.alertsService?.openSweetAlert('error', res?.error?.message) : '';
    //       this.isLoadingCountries = false;
    //     }
    //   },
    //   (err: any) => {
    //     err ? this.alertsService?.openSweetAlert('error', err) : '';
    //     this.isLoadingCountries = false;
    //   })
  }
  submit(): void {
    if (this.detailsForm?.valid) {
      let data: any = {
        firstName: this.detailsForm?.value?.firstName,
        lastName: this.detailsForm?.value?.lastName,
        jobTitle: this.detailsForm?.value?.jobTitle,
        email: this.detailsForm?.value?.email,
        companyName: this.detailsForm?.value?.companyName,
        countryId: this.detailsForm?.value?.country?.id,
      }
      this.publicService?.show_loader?.next(true);
      // this.mainService?.submitResourceDetails(data)?.subscribe(
      //   (res: any) => {
      //     if (res) {
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
    } else {
      this.publicService?.validateAllFormFields(this.detailsForm)
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
