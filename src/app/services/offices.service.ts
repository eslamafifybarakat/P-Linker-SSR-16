import { environment } from '../../environments/environment';
import { roots } from '../shared/configs/endPoints';

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { keys } from '../shared/configs/localstorage-key';
import { Observable } from 'rxjs/internal/Observable';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {
  apiUrl: string = environment?.apiUrl;
  currentLanguage: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) { }

  getOffices(page?: number, perPage?: number, search?: string, locationId?: number | string, nationalityId?: number | string): Observable<any> {
    let params = new HttpParams();
    if (page != null) {
      params = params.append('page', page);
    }
    if (perPage) {
      params = params.append('per_page', perPage);
    }
    if (search) {
      params = params.append('search', search);
    }
    if (locationId) {
      params = params.append('location-_d', locationId);
    }
    if (nationalityId) {
      params = params.append('nationality_id', nationalityId);
    }
    return this.http.get(`${this.apiUrl}/${roots.services.offices.getAll}`, { params: params });
  }
  getOfficeItemData(queryKey: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roots?.services.offices.getAll}/${queryKey}`);
  }

  // Return Static Data
  private getCurrentLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window?.localStorage?.getItem(keys?.language) || 'ar'; // Default to Arabic if language is not set
    }
    return 'ar'; // Default to Arabic if not running in a browser
  }
}
