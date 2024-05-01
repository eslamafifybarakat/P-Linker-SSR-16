import { environment } from './../../environments/environment';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { keys } from '../shared/configs/localstorage-key';
import { isPlatformBrowser } from '@angular/common';
import { roots } from '../shared/configs/roots';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router,
  ) { }

  saveUserLoginData(data: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(keys.userLoginData, JSON.stringify(data));
    }
  }
  removeUserLoginData(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(keys.userLoginData);
    }
  }
  getUserLoginDataLocally(): any {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(keys.userLoginData) || '{}');
    }
    return {};
  }
  getCurrentUserInformationLocally(): any {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(keys.currentUserInformation) || '{}');
    }
    return {};
  }
  saveToken(jwt: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(keys.accessToken, jwt);
    }
  }
  getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(keys.accessToken) || '';
    }
    return '';
  }
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
  forgetPassword(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + roots.auth.forgetPassword, data);
  }
  validateResetCode(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + roots.auth.validateCode,
      data
    );
  }
  resetNewPassword(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + roots.auth.resetNewPassword, data);
  }
  signOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(keys.userLoginData);
      localStorage.removeItem(keys.currentUserInformation);
      // localStorage.removeItem(keys.accessToken);
      // localStorage.removeItem(keys.enc_AccessToken);
    }
    this.router.navigate(['/Auth/Login']);
  }
}
