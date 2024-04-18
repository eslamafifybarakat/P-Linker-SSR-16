import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicService } from './../../../services/generic/public.service';
import { keys } from './../../../shared/configs/localstorage-key';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { homeDataAr, homeDataEn } from './../home';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  @ViewChild("videoPlayer") videoPlayer: ElementRef | undefined;
  isPlay: boolean = false;

  homeData: any;
  currentLanguage: string = '';
  activeIndex1: any;
  form = this.fb.group({
    email: ['']
  })
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public publicService: PublicService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Aos.init();

    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }
    this.homeData = this.currentLanguage == 'ar' ? homeDataAr : homeDataEn;
  }
  openVideo(): void { }
  submit(): void { }

  playVideo(): void {
    this.isPlay = true;
    this.videoPlayer?.nativeElement?.play();
  }
}

