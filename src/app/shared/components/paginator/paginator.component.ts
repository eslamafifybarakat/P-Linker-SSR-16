// Modules
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';

//Services

// Components
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    // Modules
    TranslateModule,
    PaginatorModule,
    CommonModule
  ],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() page: number;
  @Input() perPage: number;
  @Input() totalRecords: number;
  @Output() pageChange: EventEmitter<any> = new EventEmitter();

  onPageChange(event: any) {
    this.pageChange.emit(event);
  }

}
