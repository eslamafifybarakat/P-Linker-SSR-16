import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { PublicService } from './../../../../services/generic/public.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { AuthService } from './../../../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, CheckboxModule],
  selector: 'company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent {
  private subscriptions: Subscription[] = [];
  @Output() handleCompanyInfo: EventEmitter<any> = new EventEmitter();

  isCompanyNameAvailable: boolean = false;
  isCheckCompanyName: boolean = false;

  companyInfoForm: any = this.fb?.group({
    companyName: ['', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }],
    address: ['', { validators: [Validators.minLength(4)], updateOn: 'blur' }],
    terms: [null, []],
  });
  get formControls(): any {
    return this.companyInfoForm?.controls;
  }

  constructor(
    private alertsService: AlertsService,
    public publicService: PublicService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) { }

  checkCompanyNameAvailability(username: string): void {
    this.isCheckCompanyName = true;
    if (this.authService) {
      let usernameSubscription = this.authService.checkCompanyNameAvailability(username).subscribe(
        (res: any) => {
          this.handleSuccess(res);
        },
        (err: any) => {
          this.handleError(err);
        }
      );
      // Clean up the subscription on component destroy
      if (usernameSubscription) {
        this.subscriptions.push(usernameSubscription);
      }
    }

  }
  handleSuccess = (res: any) => {
    if (res.code === 200) {
      this.isCompanyNameAvailable = res.data === true;
    } else {
      this.isCompanyNameAvailable = false;
      if (res.message) {
        res.error?.message ? this.alertsService.openToast('error', 'error', res.error.message) : '';
      }
    }
    this.isCheckCompanyName = false;
    this.cdr.detectChanges();
  };
  handleError = (err: any) => {
    if (err) {
      this.alertsService.openToast('error', 'error', err.message);
    }
    this.isCheckCompanyName = false;
  };
  onKeyUpEvent(): void {
    this.isCheckCompanyName = false;
  }

  submit(): void {
    if (this.companyInfoForm?.valid) {
      this.handleCompanyInfo.emit({ name: 'companyInfo', companyInfo: this.companyInfoForm.value, registerNow: true });
    } else {
      this.publicService?.validateAllFormFields(this.companyInfoForm);
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
