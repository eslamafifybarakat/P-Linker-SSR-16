import { PublicService } from './../../../services/generic/public.service';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgOptimizedImage, RouterModule, TranslateModule, CommonModule, LanguageSelectorComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  collapsedMenu: boolean = false;
  scrollDown: boolean = false;
  collapsed: boolean = false;
  isLoggedIn: boolean = false;
  currentUrl: string = '';
  title: any = '';
  typeModule: any;

  @HostListener("window:scroll", ["$event"])
  handleKeyDown() {
    let element = document?.querySelector(".navbar") as HTMLElement;
    if (window.pageYOffset > 20) {
      element?.classList?.add("headerScroll");
      this.scrollDown = true;
    } else {
      element?.classList?.remove("headerScroll");
      this.scrollDown = false;
    }
  }

  constructor(
    public publicService: PublicService,
  ) { }

  ngOnInit(): void {
  }
}

