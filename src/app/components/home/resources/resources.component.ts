import { ContactUsSectionComponent } from '../contact-us-section/contact-us-section.component';
import { keys } from './../../../shared/configs/localstorage-key';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { resourcesDataAr, resourcesDataEn } from './resources';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [TranslateModule, CommonModule, ContactUsSectionComponent, PaginatorModule, RouterModule],
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {
  currentLanguage: string | null = '';
  data: any;
  totalRecords!: number;
  rows!: number;
  first!: number;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }
    this.data = this.currentLanguage == 'ar' ? resourcesDataAr : resourcesDataEn;
    this.first = 0;
    this.rows = 6;
    this.totalRecords = this.data?.resources?.length;

  }
  onPageChange(event: any): void {
    this.first = event?.first;
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
