import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicService } from './../../../services/generic/public.service';
import { AlertsService } from './../../../services/generic/alerts.service';
import { AuthService } from './../../../services/auth.service';
import { patterns } from './../../../shared/configs/patterns';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  private unsubscribe: Subscription[] = [];
  currentLanguage: any;

  detailsForm: any = this.fb?.group({
    fullName: ['', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)], updateOn: 'blur' }],
    email: ['', { validators: [Validators.required, Validators.pattern(patterns?.email)], updateOn: 'blur' }],
    subject: ['', { validators: [Validators.required], updateOn: 'blur' }],
    massage: ['', { validators: [Validators.required, Validators.minLength(50), Validators.maxLength(200)], updateOn: 'blur' }],
  },
  );
  get formControls(): any {
    return this.detailsForm?.controls;
  }


  constructor(
    private alertsService: AlertsService,
    public publicService: PublicService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.currentLanguage = localStorage?.getItem('language');
  }

  submit(): void {
    if (this.detailsForm?.valid) {
      let data: any = {
        fullName: this.detailsForm?.value?.fullName,
        email: this.detailsForm?.value?.email,
        subject: this.detailsForm?.value?.subject,
        massage: this.detailsForm?.value?.massage,
      }
      this.publicService?.showGlobalLoader?.next(true);
      // this.mainService?.sendQuestion(data)?.subscribe(
      //   (res: any) => {
      //     if (res) {
      //       this.publicService?.showGlobalLoader?.next(false);
      //     } else {
      //       this.publicService?.showGlobalLoader?.next(false);
      //       res?.error?.message ? this.alertsService?.openSweetAlert('error', res?.err?.message) : '';
      //     }
      //   },
      //   (err: any) => {
      //     this.publicService?.showGlobalLoader?.next(false);
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
