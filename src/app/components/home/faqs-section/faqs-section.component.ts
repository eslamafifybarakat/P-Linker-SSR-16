import { keys } from './../../../shared/configs/localstorage-key';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, AccordionModule],
  selector: 'faqs-section',
  templateUrl: './faqs-section.component.html',
  styleUrls: ['./faqs-section.component.scss']
})
export class FaqsSectionComponent {
  currentLanguage: string | null = '';
  data: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }
    this.currentLanguage == 'ar' ? this.data = {
      faqs: [{
        title: 'كيف أدفع مقابل الموارد التي أستهلكها؟',
        description: 'Lorem ipsum dolor sit amet consectetur. Lorem feugiat enim nunc mattis netus elementum lectus. Dignissim feugiat tellus in sit congue praesent sed ultricies aliquam. Risus interdum aliquam nunc id felis mattis. Ultrices consequat donec lacus tellus enim. Tincidunt aliquet diam diam consequat cras. Vulputate auctor elit nullam a elementum. Sed vestibulum ipsum'
      }, {
        title: 'كيف أدفع مقابل الموارد التي أستهلكها2؟',
        description: 'Lorem ipsum dolor sit amet consectetur. Lorem feugiat enim nunc mattis netus elementum lectus. Dignissim feugiat tellus in sit congue praesent sed ultricies aliquam. Risus interdum aliquam nunc id felis mattis. Ultrices consequat donec lacus tellus enim. Tincidunt aliquet diam diam consequat cras. Vulputate auctor elit nullam a elementum. Sed vestibulum ipsum'
      }, {
        title: 'كيف أدفع مقابل الموارد التي أستهلكها3؟',
        description: 'Lorem ipsum dolor sit amet consectetur. Lorem feugiat enim nunc mattis netus elementum lectus. Dignissim feugiat tellus in sit congue praesent sed ultricies aliquam. Risus interdum aliquam nunc id felis mattis. Ultrices consequat donec lacus tellus enim. Tincidunt aliquet diam diam consequat cras. Vulputate auctor elit nullam a elementum. Sed vestibulum ipsum'
      }]
    } : this.data = {
      faqs: [{
        title: 'How do I pay for the resources I consume?',
        description: 'Lorem ipsum dolor sit amet consectetur. Lorem feugiat enim nunc mattis netus elementum lectus. Dignissim feugiat tellus in sit congue praesent sed ultricies aliquam. Risus interdum aliquam nunc id felis mattis. Ultrices consequat donec lacus tellus enim. Tincidunt aliquet diam diam consequat cras. Vulputate auctor elit nullam a elementum. Sed vestibulum ipsum'
      }, {
        title: 'How do I pay for the resources I consume2?',
        description: 'Lorem ipsum dolor sit amet consectetur. Lorem feugiat enim nunc mattis netus elementum lectus. Dignissim feugiat tellus in sit congue praesent sed ultricies aliquam. Risus interdum aliquam nunc id felis mattis. Ultrices consequat donec lacus tellus enim. Tincidunt aliquet diam diam consequat cras. Vulputate auctor elit nullam a elementum. Sed vestibulum ipsum'
      }, {
        title: 'How do I pay for the resources I consume3?',
        description: 'Lorem ipsum dolor sit amet consectetur. Lorem feugiat enim nunc mattis netus elementum lectus. Dignissim feugiat tellus in sit congue praesent sed ultricies aliquam. Risus interdum aliquam nunc id felis mattis. Ultrices consequat donec lacus tellus enim. Tincidunt aliquet diam diam consequat cras. Vulputate auctor elit nullam a elementum. Sed vestibulum ipsum'
      }]
    };
  }

}
