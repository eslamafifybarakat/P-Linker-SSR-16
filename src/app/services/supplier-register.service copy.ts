import { environment } from '../../environments/environment';
import { roots } from '../shared/configs/endPoints';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupplierRegisterService {
  apiUrl: string = environment?.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  checkCompanyNameAvailability(companyName?: any): Observable<any> {
    let params = new HttpParams();
    if (companyName) {
      params = params?.append("companyName", companyName);
    }
    return this.http?.get<any>(this.apiUrl + roots?.suppliersRegister?.checkCompanyNameAvailability, { params: params });
  }
  IsCRNumberAvailable(CRNumber?: any): Observable<any> {
    let params = new HttpParams();
    if (CRNumber) {
      params = params?.append("cr", CRNumber);
    }
    return this.http?.get<any>(this.apiUrl + roots?.suppliersRegister?.isCRNumberAvailable, { params: params });
  }
  IsVatAvailable(vatId: any, countryId?: any): Observable<any> {
    let params = new HttpParams();
    if (vatId) {
      params = params?.append("VatNumber", vatId);
    }
    if (countryId != null) {
      params = params?.append("CountryId", countryId);
    }
    return this.http?.get<any>(this.apiUrl + roots?.suppliersRegister?.isVatIdAvailable, { params: params });
  }
  IsVatAvailableRegister(vatId: any, countryId?: any): Observable<any> {
    let params = new HttpParams();
    if (vatId) {
      params = params?.append("VatNumber", vatId);
    }
    if (countryId != null) {
      params = params?.append("CountryId", countryId);
    }
    return this.http?.get<any>(this.apiUrl + roots?.suppliersRegister?.isVatIdAvailableRegister, { params: params });
  }
  IsTaxIdAvailable(taxId: any): Observable<any> {
    let params = new HttpParams();
    if (taxId) {
      params = params?.append("TaxId", taxId);
    }
    return this.http?.get<any>(this.apiUrl + roots?.suppliersRegister?.isTaxIdAvailable, { params: params });
  }
  IsDunsNumberAvailable(dunsNumber?: any): Observable<any> {
    let params = new HttpParams();
    if (dunsNumber) {
      params = params?.append("DunsNumber", dunsNumber);
    }
    return this.http?.get<any>(this.apiUrl + roots?.suppliersRegister?.isDunsNumberAvailable, { params: params });
  }
  IsUserNameAvailable(userName: any): Observable<any> {
    let params = new HttpParams();
    if (userName) {
      params = params?.append("username", userName);
    }
    return this.http?.get<any>(this.apiUrl + roots?.suppliersRegister?.isUserNameAvailable, { params: params });
  }
}
