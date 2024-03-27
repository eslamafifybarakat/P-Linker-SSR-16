import { keys } from './../../../shared/configs/localstorage-key';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { aboutDataAr, aboutDataEn } from './about';
import { ContactUsSectionComponent } from '../contact-us-section/contact-us-section.component';

@Component({
  standalone: true,
  imports: [TranslateModule, CommonModule, ContactUsSectionComponent],
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  @ViewChild("videoPlayer") videoPlayer: ElementRef | undefined;
  isPlay: boolean = false;
  data: any;
  currentLanguage: any;
  owlcarousel1Options = {
    loop: true,
    margin: 10,
    nav: false,
    dot: true,
    items: 6,
    responsive: {
      0: {
        items: 2
      },
      500: {
        items: 3
      },
      767: {
        items: 4
      },
      991: {
        items: 6
      }
    }
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }
    this.data = this.currentLanguage == 'ar' ? aboutDataAr : aboutDataEn;
  }
  playVideo(): void {
    this.isPlay = true;
    this.videoPlayer?.nativeElement?.play();
  }
}
