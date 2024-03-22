// Components
import { LanguageSelectorComponent } from './../../../shared/components/language-selector/language-selector.component';

import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from './../../../services/generic/alerts.service';
import { PublicService } from './../../../services/generic/public.service';
import { keys } from './../../../shared/configs/localstorage-key';
import { AuthService } from './../../../services/auth.service';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription, catchError, tap } from 'rxjs';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
@Component({
  standalone: true,
  imports: [LanguageSelectorComponent, RouterModule, TranslateModule, FormsModule, ReactiveFormsModule, CommonModule, PasswordModule, CheckboxModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private subscriptions: Subscription[] = [];

  isLoadingBtn: boolean = false;

  loginForm = this.fb.group({
    userName: ['', { validators: Validators.required, updateOn: 'blur' }],
    password: ['', { validators: Validators.required, updateOn: 'blur' }],
    remember: [false, []],
  });
  get formControls(): any {
    return this.loginForm?.controls;
  }
  constructor(
    private alertsService: AlertsService,
    public publicService: PublicService,
    private authService: AuthService,
    private location: Location,
    private fb: FormBuilder,
  ) { }

  back(): void {
    this.location.back();
  }

  submit(): void {
    if (this.loginForm?.valid) {
      this.isLoadingBtn = true;
      let data = {
        userName: this.loginForm?.value?.userName,
        password: this.loginForm?.value?.password,
      };
      //Send Request to login
      let loginSubscription: any = this.authService?.login(data)?.pipe(
        tap(res => this.handleSuccessLoggedIn(res)),
        catchError(err => this.handleError(err))
      ).subscribe();
      this.subscriptions.push(loginSubscription);
    } else {
      this.publicService.validateAllFormFields(this.loginForm);
    }
  }
  private handleSuccessLoggedIn(res: any): void {
    if (res?.success == true) {
      window.localStorage.setItem(keys.userData, JSON.stringify(res?.data));
    } else {
      this.handleError(res?.error?.message || 'An error has occurred');
    }
  }
  private handleError(err: any): any {
    this.setErrorMessage(err || 'An error has occurred');
  }
  private setErrorMessage(message: string): void {
    this.alertsService.openToast('error', 'error', message);
    this.isLoadingBtn = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
