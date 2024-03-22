import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { PublicService } from './../../../../services/generic/public.service';
import { AuthService } from './../../../../services/auth.service';
import { patterns } from './../../../../shared/configs/patterns';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, RouterModule],
  selector: 'personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent {
  private subscriptions: Subscription[] = [];
  @Output() nextStep: EventEmitter<any> = new EventEmitter();

  isEmailFound: boolean = false;
  isCheckEmail: boolean = false;

  personalInfoForm = this.fb.group({
    firstName: ['', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }],
    lastName: ['', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }],
    email: ['', { validators: [Validators.required, Validators.pattern(patterns?.email)], updateOn: 'blur' }],
  });
  get formControls(): any {
    return this.personalInfoForm?.controls;
  }
  constructor(
    public publicService: PublicService,
    private alertsService: AlertsService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) { }

  isEmailFounded(email: string): void {
    this.isCheckEmail = true;
    if (this.authService) {
      let emailSubscription = this.authService.IsEmailFound(email).subscribe(
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

  }
  handleSuccess = (res: any) => {
    if (res.code === 200) {
      this.isEmailFound = res.data === true;
    } else {
      this.isEmailFound = false;
      this.handleError(res.error?.message);
    }
    this.isCheckEmail = false;
    this.cdr.detectChanges();
  };
  handleError = (err: any) => {
    if (err) {
      this.alertsService.openToast('error', 'error', err.message || this.publicService.translateTextFromJson('general.errorOccur'));
    }
    this.isCheckEmail = false;
  };

  onKeyUpEvent(type: any): void {
    type == 'email' ? this.isEmailFound = false : '';
  }
  continue(): void {
    if (this.personalInfoForm?.valid) {
      // if (!this.isEmailFound) {
      this.nextStep.emit({ name: 'personalInfo', personalInfo: this.personalInfoForm.value, nextStep: 2 });
      // }
    } else {
      this.publicService?.validateAllFormFields(this.personalInfoForm);
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
