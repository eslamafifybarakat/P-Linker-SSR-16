import { ContactUsSectionComponent } from '../contact-us-section/contact-us-section.component';
import { FaqsSectionComponent } from '../faqs-section/faqs-section.component';
import { keys } from './../../../shared/configs/localstorage-key';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { featuresDataAr, featuresDataEn } from './features';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule, ContactUsSectionComponent, FaqsSectionComponent],
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {
  currentLanguage: string | null = '';
  data: any;
  cardsData: any = [];
  count = 6;
  skipCount: any = 0;
  carouselData: any = [];
  page: number = 1;
  pageCount: number;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }
    this.data = this.currentLanguage == 'ar' ? featuresDataAr : featuresDataEn;
    this.carouselData = this.data?.features;
    this.count = 6;

    this.pageCount = Math?.ceil(this.carouselData?.length / 6);
    this.carouselData?.forEach((item: any, index: any) => {
      if (index < this.count) {
        this.cardsData?.push(item);
      }
    });
  }

  next(): void {
    if (this.page < this.pageCount) {
      this.page += 1;
    }
    this.count += 6;
    this.skipCount += 6;
    if (this.skipCount >= this.carouselData?.length) {
      this.skipCount = 0;
    }
    this.cardsData = this.carouselData?.slice(this.skipCount, this.skipCount + 6);
  }

  previous(): void {
    if (this.page >= 1) {
      this.page -= 1;
    }
    this.skipCount -= 6;
    if (this.skipCount < 0) {
      this.skipCount = this.carouselData?.length - 6;
    }
    this.cardsData = this.carouselData?.slice(this.skipCount, this.skipCount + 6);
  }
  openVideo(): void {
    //   this.dialog.open(VideoModalComponent, {
    //     width: "90%",
    //     panelClass: 'video-dialog',
    //     data: {
    //       url_video: this.data?.videoLink,
    //       image_video: this.data?.thumbnailImage,
    //     }
    //   });
  }
}
