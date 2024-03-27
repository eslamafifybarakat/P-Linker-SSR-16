import { ContactUsSectionComponent } from '../../contact-us-section/contact-us-section.component';
import { featureDetailsDataAr, featureDetailsDataEn } from './feature-details';
import { keys } from './../../../../shared/configs/localstorage-key';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [TranslateModule, CommonModule, ContactUsSectionComponent],
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.scss']
})
export class FeatureDetailsComponent {
  currentLanguage: string | null = '';
  data: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }
    this.data = this.currentLanguage == 'ar' ? featureDetailsDataAr : featureDetailsDataEn;
  }
  openVideo(): void {
    // this.dialog.open(VideoModalComponent, {
    //   width: "90%",
    //   panelClass: 'video-dialog',
    //   data: {
    //     url_video: this.data?.videoLink,
    //     image_video: this.data?.thumbnailImage,
    //   }
    // });
  }

}
