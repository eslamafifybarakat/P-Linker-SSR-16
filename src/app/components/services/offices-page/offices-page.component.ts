// Modules
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Services
import { MetadataService } from '../../../services/generic/metadata.service';
import { catchError, debounceTime, finalize, tap } from 'rxjs/operators';
import { OfficesService } from '../../../services/offices.service';
import { Subject, Subscription } from 'rxjs';

// Components
import { OfficeCardItemComponent } from './office-card-item/office-card-item.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-offices-page',
  standalone: true,
  imports: [
    // Modules
    TranslateModule,
    PaginatorModule,
    RouterModule,
    CommonModule,

    // Components
    OfficeCardItemComponent
  ],
  templateUrl: './offices-page.component.html',
  styleUrls: ['./offices-page.component.scss']
})
export class OfficesPageComponent {
  private subscriptions: Subscription[] = [];

  /* --- Start Hero Section Variables --- */

  /* --- End Hero Section Variables --- */

  /* --- Start Filteration Section Variables --- */
  /* --- End Filteration Section Variables --- */

  /* --- Start Offices List Section Variables --- */
  isLoadingOfficesList: boolean = false;
  officesList: any[] = [];
  placesCount: number = 0;
  page: number = 1;
  perPage: number = 18;

  /* Filteration Keys */
  search: any = null;
  isLoadingSearch: boolean = false;
  private searchSubject = new Subject<any>();

  locationId: number | string;
  nationalityId: number | string;
  /*  --- End Offices List Section Variables ---  */

  constructor(
    private metadataService: MetadataService,
    private officesService: OfficesService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.searchSubject.pipe(debounceTime(500)).subscribe(event => {
      this.searchOfficesList(event);
    });
  }
  private loadData(): void {
    this.updateMetaTagsForSEO();
    this.getOfficesList();
  }
  private updateMetaTagsForSEO(): void {
    this.metadataService.updateTitle(`المكاتب`);
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: `المكاتب` },
      { name: 'description', content: 'الوصف' }
    ]);
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:title', content: `المكاتب` },
      { property: 'og:description', content: 'الوصف' }
    ]);
  }
  /* --- Start Hero Section Functions --- */

  /* --- End Hero Section Functions --- */

  /* --- Start Filteration Section Functions --- */
  handleOfficesListSearch(event: any): void {
    this.searchSubject.next(event);
  }
  searchOfficesList(event: any): void {
    this.search = event;
    this.page = 1;
    this.isLoadingSearch = true;
    this.getOfficesList();
  }
  clearOfficesListSearchValue(event: any): void {
    event.value = '';
    this.page = 1;
    this.search = null;
    this.isLoadingSearch = true;
    this.getOfficesList();
  }
  /* --- End Filteration Section Functions --- */


  /* --- Start Offices List Section Functions --- */
  private getOfficesList(preventLoading?: boolean): void {
    if (!preventLoading) {
      this.isLoadingOfficesList = true;
    }
    let officesListSubscription: Subscription = this.officesService.getOffices(this.page, this.perPage, this.search, this.locationId, this.nationalityId).pipe(
      tap((res: any) => {
        if (res.code == 200) {
          if (res.data) {
            this.officesList = res.data.items;
            this.placesCount = res.data.total;
          }
        } else {
          this.handleError(res?.message);
        }
      }),
      catchError(err => this.handleError(err)),
      finalize(() => {
        setTimeout(() => {
          this.setDummyData();
          this.isLoadingOfficesList = false;
          this.isLoadingSearch = false;
        }, 1000);
      })
    ).subscribe();

    this.subscriptions.push(officesListSubscription);
  }
  private setDummyData(): void {
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].forEach(element => {
      this.officesList.push({
        id: element,
        title: 'مكتب عبر البلدان للاستقدام',
        rate: 4.5,
        views: 25,
        countryFlag: 'data:image/jpeg;base64,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',
        countryName: 'المملكة العربية السعودية',
        location: 'الرياض',
        available: true
      });
    });
  }
  onPageChange(event: any) {
    console.log(event);
    this.page = event.first;
    this.getOfficesList();
  }
  goToOfficeDetails(queryKey: string | null): void {
    if (queryKey) {
      // this.route?.navigate(['/events/details/' + queryKey]);
    } else {
      // Data is not valid
    }
  }
  /* --- End Offices List Section Functions --- */

  /* --- Handle api requests error messages --- */
  private handleError(err: any): any {
    this.setErrorMessage(err || 'An error has occurred');
  }
  private setErrorMessage(message: string): void {
    // Implementation for displaying the error message, e.g., using a sweetalert
    console.log(message);
    // this.alertsService?.openSweetAlert('error', message);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
