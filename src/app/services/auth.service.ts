import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { roots } from '../shared/configs/roots';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + roots.auth.login, data);
  }
  IsEmailFound(Email?: any): Observable<any> {
    let params = new HttpParams();
    if (Email) {
      params = params?.append("Email", Email);
    }
    return this.http?.get<any>(this.apiUrl + roots?.auth?.isEmailFound, { params: params });
  }
  IsUserNameFound(UserName?: any): Observable<any> {
    let params = new HttpParams();
    if (UserName) {
      params = params?.append("UserName", UserName);
    }
    return this.http?.get<any>(this.apiUrl + roots?.auth?.isUserNameFound, { params: params });
  }
  IsVatAvailableRegister(vatId: any, countryId?: any): Observable<any> {
    let params = new HttpParams();
    if (vatId) {
      params = params?.append("VatNumber", vatId);
    }
    if (countryId != null) {
      params = params?.append("CountryId", countryId);
    }
    return this.http?.get<any>(this.apiUrl + roots?.auth?.isVatIdAvailableRegister, { params: params });
  }
  checkCompanyNameAvailability(companyName?: any): Observable<any> {
    let params = new HttpParams();
    if (companyName) {
      params = params?.append("companyName", companyName);
    }
    return this.http?.get<any>(this.apiUrl + roots?.auth?.checkCompanyNameAvailability, { params: params });
  }
  register(data: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.auth?.register, data);
  }
}
