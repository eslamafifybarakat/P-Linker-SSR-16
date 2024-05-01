import { Component, Inject, Input, Output, PLATFORM_ID, EventEmitter } from '@angular/core';
import { UserListingItem } from '../../../../interfaces/dashboard/users';
import { keys } from '../../../../shared/configs/localstorage-key';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [TranslateModule, CommonModule],
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() item: UserListingItem;
  currentLanguage: string;
  @Output() itemDetailsHandler: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }
  }
  itemDetails(item: any): void {
    this.itemDetailsHandler.emit(item);
  }
}
