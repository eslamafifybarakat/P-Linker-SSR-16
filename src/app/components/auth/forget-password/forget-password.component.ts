import { LanguageSelectorComponent } from './../../../shared/components/language-selector/language-selector.component';
import { patterns } from './../../../shared/configs/patterns';
import { AlertsService } from './../../../services/generic/alerts.service';
import { PublicService } from './../../../services/generic/public.service';
import { AuthService } from './../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, TranslateModule, LanguageSelectorComponent],
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  private subscriptions: Subscription[] = [];
  isLoadingBtn: boolean = false;

  constructor(
    public authUserService: AuthService,
    public publicService: PublicService,
    public alertsService: AlertsService,
    public fb: FormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  forgetPasswordForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.pattern(patterns?.email)]]
    }, { updateOn: "blur" }
  );
  get formControls(): any {
    return this.forgetPasswordForm?.controls;
  }

  submit(): void {
    if (!this.forgetPasswordForm?.valid) {
      this.publicService.validateAllFormFields(this.forgetPasswordForm);
      return;
    }

    this.isLoadingBtn = true;
    const data = {
      emailAddress: this.forgetPasswordForm?.value?.email
    };

    let forgetPasswordSubscription = this.authUserService?.forgetPassword(data)?.subscribe(
      (res: any) => {
        this.isLoadingBtn = false;
        if (res?.success === true) {
          this.handleSuccess(res);
        } else {
          this.handleError(res?.error?.message);
        }
      },
      (err: any) => {
        this.handleError(err);
      }
    );
    this.subscriptions.push(forgetPasswordSubscription);
  }

  private handleSuccess(res: any): void {
    this.router.navigate(['/auth/verification-code', { email: this.forgetPasswordForm?.value?.email }]);
    this.forgetPasswordForm?.reset();
  }

  private handleError(error: any): void {
    this.isLoadingBtn = false;
    if (error) {
      this.alertsService?.openToast('error', 'error', error || this.publicService.translateTextFromJson('general.errorOccur'));
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
