import { keys } from './../../../shared/configs/localstorage-key';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { contactDataAr, contactDataEn } from './contactUs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule],
  selector: 'contact-us-section',
  templateUrl: './contact-us-section.component.html',
  styleUrls: ['./contact-us-section.component.scss']
})
export class ContactUsSectionComponent {
  currentLanguage: string | null = '';
  data: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }
    this.data = this.currentLanguage == 'ar' ? contactDataAr : contactDataEn;
  }

}
