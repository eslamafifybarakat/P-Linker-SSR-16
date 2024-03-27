import { keys } from './../../shared/configs/localstorage-key';
import { PublicService } from './../../services/generic/public.service';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { homeDataAr, homeDataEn } from './home';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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

