import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { keys } from '../../configs/localstorage-key';
import { TranslateModule } from '@ngx-translate/core';
import { footerDataAr, footerDataEn } from './footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslateModule,
    CommonModule,
    RouterModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  data: any;
  currentLanguage: any;
  form: any = this.fb.group({
    email: ['']
  });
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // Aos.init();
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }
    this.currentLanguage == 'ar' ? this.data = footerDataAr : this.data = footerDataEn;
  }
  submit(): void { }
}
