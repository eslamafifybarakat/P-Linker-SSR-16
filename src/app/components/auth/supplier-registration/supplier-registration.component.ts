import { LanguageSelectorComponent } from './../../../shared/components/language-selector/language-selector.component';
import { PersonalInfoComponent } from '../registration-components/personal-info/personal-info.component';
import { AddressInfoComponent } from '../registration-components/address-info/address-info.component';
import { CompanyInfoComponent } from '../registration-components/company-info/company-info.component';
import { BasicInfoComponent } from '../registration-components/basic-info/basic-info.component';
import { PublicService } from './../../../services/generic/public.service';
import { AlertsService } from './../../../services/generic/alerts.service';
import { AuthService } from './../../../services/auth.service';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [LanguageSelectorComponent, RouterModule, TranslateModule, CommonModule, PersonalInfoComponent, BasicInfoComponent, AddressInfoComponent, CompanyInfoComponent],
  selector: 'supplier-registration',
  templateUrl: './supplier-registration.component.html',
  styleUrls: ['./supplier-registration.component.scss']
})
export class SupplierRegistrationComponent {
  currentStep: number = 1;
  personalInfo: any;
  basicInfo: any;
  addressInfo: any;
  companyInfo: any;

  constructor(
    private alertsService: AlertsService,
    private publicService: PublicService,
    private authService: AuthService,
    private location: Location,
    private router: Router
  ) { }

  back(): void {
    this.currentStep == 1 ? this.location.back() : this.currentStep -= 1;
  }

  nextStep(event: any): void {
    if (this.currentStep < 4) {
      this.currentStep = event?.nextStep;
      event.name == 'personalInfo' ? this.personalInfo = event?.personalInfo : '';
      event.name == 'basicInfo' ? this.basicInfo = event?.basicInfo : '';
      event.name == 'addressInfo' ? this.addressInfo = event?.addressInfo : '';
      event.name == 'companyInfo' ? this.companyInfo = event?.companyInfo : '';
    } else {
      event.registerNow ? this.submit() : '';
    }
    console.log(this.personalInfo);
    console.log(this.basicInfo);
    console.log(this.addressInfo);
    console.log(this.companyInfo);

  }


  submit(): void {
    const formData = this.collectFormData();

    if (!formData) return;

    this.publicService?.show_loader?.next(true);

    this.authService?.register(formData)?.subscribe(
      (res: any) => {
        console.log(res);
        if (res) {
          this.handleRegistrationSuccess();
        } else {
          this.handleRegistrationError(res);
        }
      },
      (err: any) => {
        this.handleRegistrationError(err);
      }
    );
  }

  collectFormData(): any {
    return {
      firstName: this.personalInfo.firstName,
      lastName: this.personalInfo.lastName,
      email: this.personalInfo.email,
      userName: this.basicInfo.userName,
      password: this.basicInfo.password,
      confirmPassword: this.basicInfo.confirmPassword,
      companyName: this.companyInfo.companyName,
      vatNumber: this.addressInfo.vatNumber?.toString(),
      countryId: this.addressInfo.country?.id,
      cityId: this.addressInfo.city?.id,
      address: this.companyInfo.address,
      applicationType: 1,
    };
  }

  handleRegistrationSuccess(): void {
    this.publicService?.show_loader?.next(false);
    this.router?.navigate(['/login']);
  }

  handleRegistrationError(error: any): void {
    this.publicService?.show_loader?.next(false);
    const errorMessage = error?.error?.message || error?.message || 'An error occurred';
    this.alertsService.openToast('error', 'error', errorMessage);
  }
}
