import { TranslateModule } from '@ngx-translate/core';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-office-card-item',
  standalone: true,
  imports: [
    TranslateModule,
    RatingModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './office-card-item.component.html',
  styleUrls: ['./office-card-item.component.scss']
})
export class OfficeCardItemComponent {
  @Input() item: any;
}
