import { AuthService } from './../../../../services/auth.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { ConfirmPasswordValidator } from './../../../../shared/configs/confirm-password-validator';
import { PublicService } from './../../../../services/generic/public.service';
import { CommonModule } from '@angular/common';
import { patterns } from './../../../../shared/configs/patterns';
import { Component, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordModule } from 'primeng/password';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslateModule, CommonModule, PasswordModule],
  selector: 'basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent {
  private subscriptions: Subscription[] = [];
  @Output() handleBasicInfo: EventEmitter<any> = new EventEmitter();

  isUserNameFound: boolean = false;
  isCheckUserName: boolean = false;

  basicInfoForm: any = this.fb?.group({
    userName: ['', { validators: [Validators.required, Validators.pattern(patterns?.userName), Validators?.minLength(6)], updateOn: 'blur' }],
    password: ['', { validators: [Validators.required, Validators.pattern(patterns?.password)], updateOn: 'blur' }],
    confirmPassword: ['', { validators: [Validators.required, Validators.pattern(patterns?.password)], updateOn: 'blur' }],
  }, {
    validator: ConfirmPasswordValidator.MatchPassword
  }
  );
  get formControls(): any {
    return this.basicInfoForm?.controls;
  }

  constructor(
    private alertsService: AlertsService,
    public publicService: PublicService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) { }

  IsUserNameFound(username: string): void {
    this.isCheckUserName = true;
    if (this.authService) {
      let usernameSubscription = this.authService.IsUserNameFound(username).subscribe(
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
      this.isUserNameFound = res.data === true;
    } else {
      this.isUserNameFound = false;
      this.handleError(res.error?.message);
    }
    this.isCheckUserName = false;
    this.cdr.detectChanges();
  };
  handleError = (err: any) => {
    if (err) {
      this.alertsService.openToast('error', 'error', err.message || this.publicService.translateTextFromJson('general.errorOccur'));
    }
    this.isCheckUserName = false;
  };
  onKeyUpEvent(): void {
    this.isCheckUserName = false;
  }

  continue(): void {
    if (this.basicInfoForm?.valid) {
      // if (!this.isUserNameFound) {
      this.handleBasicInfo.emit({ name: 'basicInfo', basicInfo: this.basicInfoForm.value, nextStep: 3 });
      // }
    } else {
      this.publicService?.validateAllFormFields(this.basicInfoForm);
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
